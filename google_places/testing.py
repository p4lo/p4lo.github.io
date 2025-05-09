import os 
import requests
import time
import json

API_KEY = os.getenv("API_KEY")
MIN_LAT, MAX_LAT = 40.7014, 40.8296
MIN_LNG, MAX_LNG = -74.0234, -73.9422
LAT_STEP, LNG_STEP = 0.005, 0.005  # Fine grid for better coverage
RADIUS = 500  # Smaller radius to avoid missing places
TYPES = "bar|restaurant"
MAX_PLACES = 500

# Load neighborhood data
with open("manhattan_neighborhoods.json", "r") as f:
    neighborhood_data = json.load(f)
    ZIPS_TO_NEIGHBORHOODS = neighborhood_data["zips_to_neighborhoods"]

def get_neighborhoods_from_postal_code(postal_code):
    return ZIPS_TO_NEIGHBORHOODS.get(postal_code, [])

# Generate grid points
latitudes = [round(MIN_LAT + i * LAT_STEP, 4) for i in range(int((MAX_LAT - MIN_LAT) / LAT_STEP) + 1)]
longitudes = [round(MIN_LNG + i * LNG_STEP, 4) for i in range(int((MAX_LNG - MIN_LNG) / LNG_STEP) + 1)]

results = []
try:
    for lat in latitudes:
        for lng in longitudes:
            if len(results) >= MAX_PLACES:
                break
                
            print(f"\nSearching at coordinates: {lat}, {lng}")
            url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?key={API_KEY}&location={lat},{lng}&radius={RADIUS}&types={TYPES}"
            response = requests.get(url)
            data = response.json()
            
            while True:
                if data["status"] == "OK":
                    for place in data["results"]:
                        if len(results) >= MAX_PLACES:
                            break
                            
                        print(f"\n=== Processing {len(results) + 1}/{MAX_PLACES}: {place['name']} ===")
                        print(f"Location: {place['vicinity']}")
                        
                        # Fetch detailed information including photos and address components
                        print("Fetching place details...")
                        details_url = f"https://maps.googleapis.com/maps/api/place/details/json?placeid={place['place_id']}&fields=opening_hours,current_opening_hours,secondary_opening_hours,website,photos,address_components&key={API_KEY}"
                        details_response = requests.get(details_url)
                        details_data = details_response.json()
                        
                        if details_data["status"] == "OK":
                            # Extract address components
                            address_info = {
                                # Primary location identifiers
                                "neighborhood": {"long_name": None, "short_name": None},
                                "sublocality": {"long_name": None, "short_name": None},
                                "sublocality_level_1": {"long_name": None, "short_name": None},
                                "sublocality_level_2": {"long_name": None, "short_name": None},
                                "sublocality_level_3": {"long_name": None, "short_name": None},
                                "locality": {"long_name": None, "short_name": None},
                                
                                # Administrative areas
                                "administrative_area_level_1": {"long_name": None, "short_name": None},
                                "administrative_area_level_2": {"long_name": None, "short_name": None},
                                "administrative_area_level_3": {"long_name": None, "short_name": None},
                                
                                # Additional area identifiers
                                "colloquial_area": {"long_name": None, "short_name": None},
                                "political": {"long_name": None, "short_name": None},
                                
                                # Address details
                                "route": {"long_name": None, "short_name": None},
                                "street_number": {"long_name": None, "short_name": None},
                                "postal_code": {"long_name": None, "short_name": None},
                                "postal_town": {"long_name": None, "short_name": None},
                                
                                # Place types
                                "establishment": {"long_name": None, "short_name": None},
                                "point_of_interest": {"long_name": None, "short_name": None},
                                "premise": {"long_name": None, "short_name": None},
                                "subpremise": {"long_name": None, "short_name": None}
                            }
                            
                            postal_code = None
                            if "address_components" in details_data["result"]:
                                for component in details_data["result"]["address_components"]:
                                    # Extract postal code for neighborhood lookup
                                    if "postal_code" in component["types"]:
                                        postal_code = component["long_name"]
                                    
                                    for type_ in component["types"]:
                                        if type_ in address_info:
                                            address_info[type_] = {
                                                "long_name": component["long_name"],
                                                "short_name": component["short_name"]
                                            }
                            
                            # Get neighborhoods from postal code
                            neighborhoods = get_neighborhoods_from_postal_code(postal_code) if postal_code else []
                            
                            place_details = {
                                "name": place["name"],
                                "address": place["vicinity"],
                                "address_components": address_info,
                                "neighborhoods": neighborhoods,
                                "lat": place["geometry"]["location"]["lat"],
                                "lng": place["geometry"]["location"]["lng"],
                                "place_id": place["place_id"],
                                "opening_hours": details_data["result"].get("opening_hours", {}),
                                "current_opening_hours": details_data["result"].get("current_opening_hours", {}),
                                "secondary_opening_hours": details_data["result"].get("secondary_opening_hours", {}),
                                "website": details_data["result"].get("website", ""),
                                "photos": []
                            }
                            
                            # Fetch high quality photos
                            if "photos" in details_data["result"]:
                                for photo in details_data["result"]["photos"]:
                                    if photo.get("width", 0) >= 2000:
                                        photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=4000&photo_reference={photo['photo_reference']}&key={API_KEY}"
                                        photo_response = requests.get(photo_url)
                                        if photo_response.status_code == 200:
                                            place_details["photos"].append({
                                                "url": photo_response.url,
                                                "width": photo.get("width", 0),
                                                "height": photo.get("height", 0)
                                            })
                                            break  # Stop after getting first photo
                                        time.sleep(0.5)
                            
                            results.append(place_details)
                            print(f"Added {place['name']} ({len(results)}/{MAX_PLACES})")
                            time.sleep(2)  # Rate limiting
                        
                    if "next_page_token" in data:
                        time.sleep(2)  # Required delay for next_page_token
                        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?key={API_KEY}&pagetoken={data['next_page_token']}"
                        response = requests.get(url)
                        data = response.json()
                    else:
                        break
                else:
                    print(f"API Error: {data['status']}")
                    break

except Exception as e:
    print(f"Error occurred: {e}")
finally:
    # Save results
    with open("manhattan_bars_restaurants_with_photos.json", "w") as f:
        json.dump(results, f)
    print(f"\nCollection complete! Gathered {len(results)} places.")


#fetch high quality images associated with the place id that are over 2000 pixels wide

