// NYC Happy Hour Finder - Comprehensive Dataset
// Data compiled from multiple sources including CSV and text files
// Last updated: April 2025

// Restaurant image mapping from CSV
const restaurantImageMapping = [
  { name: "The Spaniard", address: "190 West 4th Street, NY 10014", image: "restaurant_images/image1.jpg" },
  { name: "Hudson Hound", address: "575 Hudson Street, NY 10014", image: "restaurant_images/image2.jpg" },
  { name: "Dante NYC", address: "79-81 MacDougal St, NY 10012", image: "restaurant_images/image3.jpg" },
  { name: "61 Grove Street", address: "61 Grove Street, NY 10014", image: "restaurant_images/image4.jpg" },
  { name: "Bobo", address: "181 W 10th St, NY 10014", image: "Error" },
  { name: "Down the Hatch", address: "179 W 4th St, NY 10014", image: "restaurant_images/image6.jpg" },
  { name: "Boucherie West Village", address: "99 7th Avenue South, NY 10014", image: "Error" },
  { name: "LELABAR", address: "75 Washington Pl, NY 10011", image: "restaurant_images/image8.jpg" },
  { name: "Due West", address: "189 W 10th St, NY 10014", image: "Error" },
  { name: "Bandits", address: "44 Bedford St, NY 10014", image: "restaurant_images/image10.jpg" },
  { name: "The Happiest Hour", address: "121 W 10th St, NY 10011", image: "restaurant_images/image11.jpg" },
  { name: "Katana Kitten", address: "531 Hudson St, New York, NY 10014", image: "restaurant_images/image12.jpg" },
  { name: "Tile Bar", address: "115 1st Ave, NY 10003", image: "restaurant_images/image13.jpg" },
  { name: "The Gray Mare", address: "61 2nd Ave, NY 10003", image: "restaurant_images/image14.jpg" },
  { name: "The Mermaid Inn", address: "96 2nd Ave, NY 10003", image: "restaurant_images/image15.jpg" },
  { name: "The Black Ant", address: "60 2nd Ave, NY 10003", image: "restaurant_images/image16.jpg" },
  { name: "The Wayland", address: "700 E 9th St, NY 10009", image: "restaurant_images/image17.jpg" },
  { name: "Keybar", address: "432 E 13th St, NY 10009", image: "Error" },
  { name: "A10 Kitchen", address: "162 Avenue A, NY 10009", image: "restaurant_images/image19.jpg" },
  { name: "The Smith", address: "55 3rd Ave, New York, NY 10003", image: "restaurant_images/image20.jpg" },
  { name: "Empellón Al Pastor", address: "132 St Marks Pl, New York, NY 10009", image: "restaurant_images/image21.jpg" },
  { name: "Upstate Craft Beer", address: "95 1st Ave, NY 10003", image: "restaurant_images/image22.jpg" },
  { name: "Loreley Beer Garden", address: "7 Rivington St, New York, NY 10002", image: "restaurant_images/image23.jpg" },
  { name: "Bar Belly", address: "14 Orchard St, New York, NY 10002", image: "restaurant_images/image24.jpg" },
  { name: "Verlaine", address: "110 Rivington St, NY, NY 10002", image: "Error" },
  { name: "The Ten Bells", address: "247 Broome St, New York, NY 10002", image: "restaurant_images/image26.jpg" },
  { name: "The Magician", address: "118 Rivington St, New York, NY 10002", image: "restaurant_images/image27.jpg" },
  { name: "Nurse Bettie", address: "106 Norfolk St, New York, NY 10002", image: "restaurant_images/image28.jpg" },
  { name: "The Friki Tiki", address: "357 W 44th St, NY 10036", image: "restaurant_images/image29.jpg" },
  { name: "Valerie", address: "45 W 45th St, NY 10036", image: "restaurant_images/image30.jpg" },
  { name: "The Rum House", address: "228 W 47th St, NY 10036", image: "restaurant_images/image31.jpg" },
  { name: "The Perfect Pint", address: "123 W 45th St, NY 10036", image: "restaurant_images/image32.jpg" },
  { name: "P.J. Clarke's", address: "915 3rd Ave, New York, NY 10022", image: "restaurant_images/image33.jpg" },
  { name: "The Campbell", address: "15 Vanderbilt Ave, NY 10017", image: "restaurant_images/image34.jpg" },
  { name: "Industry Bar", address: "355 W 52nd St, NY 10019", image: "Error" },
  { name: "The Mermaid Inn Chelsea", address: "227 10th Ave, New York, NY 10011", image: "restaurant_images/image36.jpg" },
  { name: "Porchlight", address: "271 11th Ave, NY 10001", image: "restaurant_images/image37.jpg" },
  { name: "Fonda", address: "189 9th Ave, New York, NY 10011", image: "restaurant_images/image38.jpg" },
  { name: "Bathtub Gin", address: "132 9th Ave, NY 10011", image: "restaurant_images/image39.jpg" },
  { name: "Bocca di Bacco", address: "169 9th Ave, New York, NY 10011", image: "restaurant_images/image40.jpg" },
  { name: "The Chelsea Bell", address: "316 8th Ave, New York, NY 10001", image: "restaurant_images/image41.jpg" },
  { name: "Mermaid Oyster Bar Times Square", address: "127 W 43rd St, NY 10036", image: "restaurant_images/image42.jpg" },
  { name: "Haven Rooftop", address: "132 W 47th St, NY 10036", image: "restaurant_images/image43.jpg" },
  { name: "Jimmy's Corner", address: "140 W 44th St, NY 10036", image: "restaurant_images/image44.jpg" },
  { name: "Dutch Fred's", address: "307 W 47th St, New York, NY 10036", image: "restaurant_images/image45.jpg" },
  { name: "The Long Room", address: "120 W 44th St, NY 10036", image: "restaurant_images/image46.jpg" },
  { name: "The Ginger Man", address: "11 East 36th Street, NY 10016", image: "restaurant_images/image47.jpg" },
  { name: "Cask Bar & Kitchen", address: "167 E 33rd St, New York, NY 10016", image: "restaurant_images/image48.jpg" },
  { name: "Joshua Tree", address: "513 3rd Avenue, NY 10016", image: "restaurant_images/image49.jpg" },
  { name: "The Flying Cock", address: "497 3rd Ave, NY 10016", image: "restaurant_images/image50.jpg" },
  { name: "The Dead Rabbit", address: "30 Water St, New York, NY 10004", image: "restaurant_images/image51.jpg" },
  { name: "BlackTail", address: "22 Battery Pl, New York, NY 10004", image: "restaurant_images/image52.jpg" },
  { name: "The Jeffrey", address: "311 E 60th St, New York, NY 10022", image: "restaurant_images/image53.jpg" },
  { name: "The Penrose", address: "1590 2nd Ave, New York, NY 10028", image: "restaurant_images/image54.jpg" },
  { name: "As Is", address: "734 10th Ave, New York, NY 10019", image: "restaurant_images/image55.jpg" },
  { name: "Mother's Ruin", address: "18 Spring St, New York, NY 10012", image: "restaurant_images/image56.jpg" },
  { name: "Barn Joo", address: "35 Union Square W, New York, NY 10003", image: "restaurant_images/image57.jpg" },
  { name: "Oscar Wilde", address: "45 W 27th St, New York, NY 10001", image: "restaurant_images/image58.jpg" },
  { name: "Dear Irving", address: "55 Irving Pl, New York, NY 10003", image: "restaurant_images/image59.jpg" },
  { name: "Skinny Dennis", address: "152 Metropolitan Ave, Brooklyn, NY 11211", image: "restaurant_images/image60.jpg" },
  { name: "Le Crocodile", address: "80 Wythe Ave, Brooklyn, NY 11249", image: "restaurant_images/image61.jpg" },
  { name: "Ensenada", address: "168 Borinquen Pl, Brooklyn, NY 11211", image: "restaurant_images/image62.jpg" },
  { name: "Westlight", address: "111 N 12th St, Brooklyn, NY 11249", image: "restaurant_images/image63.jpg" },
  { name: "The Ides", address: "80 Wythe Ave, Brooklyn, NY 11249", image: "restaurant_images/image64.jpg" },
  { name: "Radegast Hall", address: "113 N 3rd St, Brooklyn, NY 11249", image: "restaurant_images/image65.jpg" },
  { name: "The Rookery", address: "425 Troutman St, Brooklyn, NY 11237", image: "restaurant_images/image66.jpg" },
  { name: "Maite", address: "159 Central Ave, Brooklyn, NY 11221", image: "restaurant_images/image67.jpg" },
  { name: "Left Hand Path", address: "89 Wyckoff Ave, Brooklyn, NY 11237", image: "restaurant_images/image68.jpg" },
  { name: "The Johnson's", address: "369 Troutman St, Brooklyn, NY 11237", image: "restaurant_images/image69.jpg" },
  { name: "The Cobra Club", address: "6 Wyckoff Ave, Brooklyn, NY 11237", image: "restaurant_images/image70.jpg" },
  { name: "Siren Oyster Bar", address: "596 5th Ave, Brooklyn, NY 11215", image: "restaurant_images/image71.jpg" },
  { name: "The Owl Farm", address: "297 7th St, Brooklyn, NY 11215", image: "restaurant_images/image72.jpg" },
  { name: "The Gate", address: "321 5th Ave, Brooklyn, NY 11215", image: "restaurant_images/image73.jpg" },
  { name: "The Garret", address: "296 Bleecker St, New York, NY 10014", image: "restaurant_images/image74.jpg" },
  { name: "William Barnacle Tavern", address: "80 St Marks Pl, NY 10003", image: "restaurant_images/image75.jpg" },
  { name: "Lovers of Today", address: "132½ E 7th St, NY 10009", image: "restaurant_images/image76.jpg" },
  { name: "Bibi Wine Bar", address: "211 E 4th St, NY 10009", image: "restaurant_images/image77.jpg" },
  { name: "Yuca Bar & Restaurant", address: "111 Avenue A, NY 10009", image: "restaurant_images/image78.jpg" },
  { name: "Death & Company", address: "433 E 6th St, NY 10009", image: "restaurant_images/image79.jpg" },
  { name: "Mercury Bar", address: "659 9th Ave, NY 10036", image: "restaurant_images/image80.jpg" },
  { name: "The Shakespeare", address: "24 E 39th St, NY 10016", image: "restaurant_images/image81.jpg" },
  { name: "The Irish Pub", address: "837 7th Ave, NY 10019", image: "restaurant_images/image82.jpg" },
  { name: "The Mean Fiddler", address: "266 W 47th St, NY 10036", image: "restaurant_images/image83.jpg" },
  { name: "The Long Acre Tavern", address: "146 W 47th St, NY 10036", image: "restaurant_images/image84.jpg" },
  { name: "The Stag's Head", address: "252 E 51st St, NY 10022", image: "restaurant_images/image85.jpg" },
  { name: "Draught 55", address: "245 E 55th St, NY 10022", image: "restaurant_images/image86.jpg" },
  { name: "The Horny Ram", address: "951 2nd Ave, NY 10022", image: "restaurant_images/image87.jpg" },
  { name: "Castell Rooftop Lounge", address: "260 W 40th St, NY 10018", image: "restaurant_images/image88.jpg" },
  { name: "The Tippler", address: "425 W 15th St, NY 10011", image: "restaurant_images/image89.jpg" },
  { name: "The Frying Pan", address: "207 12th Ave, NY 10001", image: "restaurant_images/image90.jpg" },
  { name: "The Standard Biergarten", address: "848 Washington St, NY 10014", image: "restaurant_images/image91.jpg" },
  { name: "The Flatiron Room", address: "37 W 26th St, NY 10010", image: "restaurant_images/image92.jpg" },
  { name: "Upside Down", address: "218 W 23rd St, New York, NY 10011", image: "restaurant_images/image93.jpg" },
  { name: "Cull & Pistol", address: "75 9th Ave, New York, NY 10011", image: "restaurant_images/image94.jpg" },
  { name: "The Copper Still", address: "206 7th Ave, New York, NY 10011", image: "restaurant_images/image95.jpg" },
  { name: "The Cutting Room", address: "44 E 32nd St, NY 10016", image: "restaurant_images/image96.jpg" },
  { name: "The Churchill Tavern", address: "45 E 28th St, NY 10016", image: "restaurant_images/image97.jpg" },
  { name: "Jadis", address: "42 Rivington St, New York, NY 10002", image: "restaurant_images/image98.jpg" },
  { name: "Bonnie Vee", address: "17 Stanton St, New York, NY 10002", image: "restaurant_images/image99.jpg" },
  { name: "Essex", address: "124 Rivington St, New York, NY 10002", image: "restaurant_images/image100.jpg" },
  { name: "O'Lunney's", address: "145 W 45th St, NY 10036", image: "restaurant_images/image101.jpg" },
  { name: "The Blind Tiger", address: "281 Bleecker St, NY 10014", image: "restaurant_images/image102.jpg" },
  { name: "The Four-Faced Liar", address: "165 W 4th St, NY 10014", image: "restaurant_images/image103.jpg" },
  { name: "The Half Pint", address: "76 W 3rd St, NY 10012", image: "restaurant_images/image104.jpg" },
  { name: "Greenwich Treehouse", address: "46 Greenwich Ave, NY 10011", image: "restaurant_images/image105.jpg" },
  { name: "The Lions Bar & Grill", address: "132 1st Ave, NY 10009", image: "restaurant_images/image106.jpg" },
  { name: "The Scratcher", address: "209 E 5th St, NY 10003", image: "restaurant_images/image107.jpg" },
  { name: "The Irish Times", address: "254 W 31st St, NY 10001", image: "restaurant_images/image108.jpg" },
  { name: "The Bar at Times Square", address: "255 W 43rd St, NY 10036", image: "restaurant_images/image109.jpg" },
  { name: "The Liberty", address: "29 W 35th St, NY 10001", image: "restaurant_images/image110.jpg" },
  { name: "RPM Underground", address: "246 W 54th St, NY 10019", image: "restaurant_images/image111.jpg" },
  { name: "Crown Alley", address: "263 W 19th St, NY 10011", image: "restaurant_images/image112.jpg" },
  { name: "Bar Veloce", address: "176 7th Ave, NY 10011", image: "restaurant_images/image113.jpg" },
  { name: "The Orchard Townhouse", address: "242 10th Ave, NY 10001", image: "restaurant_images/image114.jpg" },
  { name: "The Joyce Public House", address: "315 W 39th St, NY 10018", image: "restaurant_images/image115.jpg" },
  { name: "The Half King", address: "505 W 23rd St, NY 10011", image: "restaurant_images/image116.jpg" },
  { name: "169 Bar", address: "169 E Broadway, NY 10002", image: "restaurant_images/image117.jpg" },
  { name: "The Bowery Beer Garden", address: "93 Bowery, NY 10002", image: "restaurant_images/image118.jpg" },
  { name: "The Delancey", address: "168 Delancey St, NY 10002", image: "restaurant_images/image119.jpg" },
  { name: "The Skinny Bar & Lounge", address: "174 Orchard St, NY 10002", image: "restaurant_images/image120.jpg" },
  { name: "The DL", address: "95 Delancey St, NY 10002", image: "restaurant_images/image121.jpg" },
  { name: "The Back Room", address: "102 Norfolk St, NY 10002", image: "restaurant_images/image122.jpg" },
  { name: "Attaboy", address: "134 Eldridge St, NY 10002", image: "restaurant_images/image123.jpg" },
  { name: "The Slipper Room", address: "167 Orchard St, NY 10002", image: "restaurant_images/image124.jpg" },
  { name: "Las' Lap", address: "74 Orchard St, NY 10002", image: "restaurant_images/image125.jpg" },
  { name: "Fan Fried Rice Bar", address: "92 S 6th St, Brooklyn, NY 11249", image: "Place not found" },
  { name: "Cozy Royale", address: "434 Humboldt St, Brooklyn, NY 11211", image: "restaurant_images/image127.jpg" },
  { name: "The Exley", address: "1 Jackson St, Brooklyn, NY 11211", image: "restaurant_images/image128.jpg" },
  { name: "The Gibson", address: "108 Bedford Ave, Brooklyn, NY 11249", image: "restaurant_images/image129.jpg" },
  { name: "The Counting Room", address: "44 Berry St, Brooklyn, NY 11249", image: "restaurant_images/image130.jpg" },
  { name: "Beyond The Pale", address: "53 Spring St, NY 10012", image: "restaurant_images/image131.jpg" },
  { name: "The Crosby Bar", address: "79 Crosby St, NY 10012", image: "restaurant_images/image132.jpg" },
  { name: "Pegu Club", address: "77 W Houston St, NY 10012", image: "restaurant_images/image133.jpg" },
  { name: "Jimmy SoHo", address: "15 Thompson St, NY 10013", image: "restaurant_images/image134.jpg" },
  { name: "Little Prince", address: "199 Prince St, NY 10012", image: "restaurant_images/image135.jpg" },
  { name: "The Ship", address: "158 Lafayette St, NY 10013", image: "restaurant_images/image136.jpg" },
  { name: "City Winery", address: "155 Varick St, NY 10013", image: "restaurant_images/image137.jpg" },
  { name: "Lola Taverna", address: "210 6th Ave, NY 10014", image: "restaurant_images/image138.jpg" },
  { name: "The Woo", address: "206 Spring St, NY 10012", image: "restaurant_images/image139.jpg" },
  { name: "The Spring Lounge", address: "48 Spring St, NY 10012", image: "restaurant_images/image140.jpg" },
  { name: "The Mulberry", address: "76 Mulberry St, NY 10013", image: "No photo available" },
  { name: "The Honey Well", address: "3604 Broadway, NY 10031", image: "restaurant_images/image142.jpg" },
  { name: "The Edge Harlem", address: "101 Edgecombe Ave, NY 10030", image: "restaurant_images/image143.jpg" },
  { name: "Lolo's Seafood Shack", address: "303 W 116th St, NY 10026", image: "restaurant_images/image144.jpg" },
  { name: "The Grange Bar & Eatery", address: "1635 Amsterdam Ave, NY 10031", image: "restaurant_images/image145.jpg" },
  { name: "Harlem Hops", address: "2268 Adam Clayton Powell Jr Blvd, NY 10030", image: "restaurant_images/image146.jpg" },
  { name: "Harlem Tavern", address: "2153 Frederick Douglass Blvd, NY 10026", image: "restaurant_images/image147.jpg" },
  { name: "67 Orange Street", address: "2130 Frederick Douglass Blvd, NY 10026", image: "restaurant_images/image148.jpg" },
  { name: "The Growler", address: "55 Stone St, NY 10004", image: "restaurant_images/image149.jpg" },
  { name: "The Black Hound", address: "301 South End Ave, NY 10280", image: "restaurant_images/image150.jpg" },
  { name: "The Beekman Pub", address: "15 Beekman St, NY 10038", image: "restaurant_images/image151.jpg" },
  { name: "The Paris Cafe", address: "119 South St, NY 10038", image: "restaurant_images/image152.jpg" },
  { name: "The Stone Street Tavern", address: "52 Stone St, NY 10004", image: "restaurant_images/image153.jpg" },
  { name: "Sereneco", address: "113 Franklin St, Brooklyn, NY 11222", image: "restaurant_images/image154.jpg" },
  { name: "The Pencil Factory", address: "142 Franklin St, Brooklyn, NY 11222", image: "restaurant_images/image155.jpg" },
  { name: "Elder Greene", address: "160 Franklin St, Brooklyn, NY 11222", image: "restaurant_images/image156.jpg" },
  { name: "Threes Brewing", address: "113 Franklin St, Brooklyn, NY 11222", image: "restaurant_images/image157.jpg" },
  { name: "Brooklyn Winery", address: "61 Guernsey St, Brooklyn, NY 11222", image: "restaurant_images/image158.jpg" },
  { name: "The Keep", address: "205 Cypress Ave, Brooklyn, NY 11237", image: "restaurant_images/image159.jpg" },
  { name: "The Wheelhouse", address: "165 Wilson Ave, Brooklyn, NY 11237", image: "restaurant_images/image160.jpg" },
  { name: "The Evergreen", address: "1281 Myrtle Ave, Brooklyn, NY 11221", image: "Place not found" },
  { name: "The Bad Old Days", address: "1684 Woodbine St, Brooklyn, NY 11237", image: "restaurant_images/image162.jpg" },
  { name: "The Bodega", address: "1402 St Nicholas Ave, Brooklyn, NY 11237", image: "restaurant_images/image163.jpg" },
  { name: "The Double Windsor", address: "210 Prospect Park West, Brooklyn, NY 11215", image: "restaurant_images/image164.jpg" },
  { name: "Blueprint", address: "196 5th Ave, Brooklyn, NY 11217", image: "restaurant_images/image165.jpg" },
  { name: "The Commissioner", address: "247 5th Ave, Brooklyn, NY 11215", image: "restaurant_images/image166.jpg" },
  { name: "Freddy's Bar", address: "627 5th Ave, Brooklyn, NY 11215", image: "restaurant_images/image167.jpg" },
  { name: "High Dive", address: "243 5th Ave, Brooklyn, NY 11215", image: "restaurant_images/image168.jpg" },
  { name: "Fonda", address: "431 7th Ave, Brooklyn, NY 11215", image: "restaurant_images/image169.jpg" },
  { name: "Bar Basic", address: "504 5th Ave, Brooklyn, NY 11215", image: "restaurant_images/image170.jpg" },
  { name: "Hugo & Sons", address: "367 7th Ave, Brooklyn, NY 11215", image: "restaurant_images/image171.jpg" },
  { name: "Korzo", address: "667 5th Ave, Brooklyn, NY 11215", image: "restaurant_images/image172.jpg" },
  { name: "Pasta Louise", address: "803 8th Ave, Brooklyn, NY 11215", image: "restaurant_images/image173.jpg" },
  { name: "The Stumble Inn", address: "1454 2nd Ave, NY 10021", image: "restaurant_images/image174.jpg" },
  { name: "Jake's Dilemma", address: "430 Amsterdam Ave, NY 10024", image: "restaurant_images/image175.jpg" },
  { name: "Hillstone", address: "378 Park Ave S, NY 10010", image: "restaurant_images/image176.jpg" },
  { name: "The Playwright", address: "27 W 35th St, NY 10001", image: "restaurant_images/image177.jpg" },
  { name: "The Cannibal", address: "113 E 29th St, NY 10016", image: "restaurant_images/image178.jpg" },
  { name: "Tavern 29", address: "47 E 29th St, NY 10016", image: "restaurant_images/image179.jpg" },
  { name: "Tara Rose", address: "384 3rd Ave, NY 10016", image: "restaurant_images/image180.jpg" },
  { name: "Sundays Well", address: "360 3rd Ave, NY 10016", image: "restaurant_images/image181.jpg" },
  { name: "The Gem Saloon", address: "375 3rd Ave, NY 10016", image: "restaurant_images/image182.jpg" },
  { name: "Bella Union", address: "411 3rd Ave, NY 10016", image: "restaurant_images/image183.jpg" },
  { name: "Ernie O'Malley's", address: "140 E 27th St, NY 10016", image: "restaurant_images/image184.jpg" },
  { name: "Dog & Bone Tavern", address: "3rd Ave, NY 10016", image: "restaurant_images/image185.jpg" },
  { name: "Albion", address: "575 2nd Ave, NY 10016", image: "restaurant_images/image186.jpg" },
  { name: "The Junction", address: "329 Lexington Ave, NY 10016", image: "No photo available" },
  { name: "Park Avenue Tavern", address: "99 Park Ave, NY 10016", image: "restaurant_images/image188.jpg" },
  { name: "Slattery's Midtown Pub", address: "8 E 36th St, NY 10016", image: "restaurant_images/image189.jpg" },
  { name: "La Cava Wine Bar", address: "939 2nd Ave, NY 10022", image: "restaurant_images/image190.jpg" },
  { name: "Murray Hill Local", address: "539 3rd Ave, NY 10016", image: "restaurant_images/image191.jpg" },
  { name: "Ethyl's Alcohol & Food", address: "1629 2nd Ave, NY 10028", image: "restaurant_images/image192.jpg" }
];
// Function to match venues with their images
function addImagesToDeals(deals, imageMapping) {
  return deals.map(deal => {
    // Find matching image by venue name
    const match = imageMapping.find(item => item.name === deal.name);
    
    // Add image path if found and valid
    if (match) {
      if (match.image !== "Error" && 
          match.image !== "Place not found" && 
          match.image !== "No photo available") {
        // Extract just the filename (e.g., "image1.jpg")
        const filename = match.image.split('/').pop();
        // Use the confirmed working path pattern: images/[filename]
        deal.imagePath = `images/${filename}`;
      }
    }
    
    return deal;
  });
}

// Original happy hour deals array
const happyHourDealsOriginal = [
  // West Village
  {
    id: 1,
    name: "The Spaniard",
    neighborhood: "west_village",
    subNeighborhood: "West Village",
    address: "190 West 4th Street, NY 10014",
    location: [40.7340, -74.0030],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 6:00 PM",
    deals: "$9 'Little Spaniard' burger, $2 off all draft beers",
    description: "Lively gastropub with vintage charm and extensive whiskey selection",
    website: "https://thespaniardnyc.com/"
  },
  {
    id: 2,
    name: "Hudson Hound",
    neighborhood: "west_village",
    subNeighborhood: "West Village",
    address: "575 Hudson Street, NY 10014",
    location: [40.7340, -74.0061],
    days: ["tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 6:00 PM",
    deals: "$7 draught beer, $10 Aperol Spritz/Margarita/Sangria, 25% off wine, $20 beer bucket",
    description: "Irish-American gastropub with cozy atmosphere",
    website: "https://hudsonhoundnyc.com/"
  },
  {
    id: 3,
    name: "Dante NYC",
    neighborhood: "west_village",
    subNeighborhood: "Greenwich Village",
    address: "79-81 MacDougal St, NY 10012",
    location: [40.7286, -74.0015],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "3:00 PM - 5:00 PM",
    deals: "$10 martinis, $8 negronis, $1.50 oysters",
    description: "Award-winning historic cafe known for Negronis and Italian fare",
    website: "https://dantenewyork.com/"
  },
  {
    id: 4,
    name: "61 Grove Street",
    neighborhood: "west_village",
    subNeighborhood: "West Village",
    address: "61 Grove Street, NY 10014",
    location: [40.7332, -74.0025],
    days: ["monday", "tuesday", "wednesday", "thursday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$6 Pilsners, $10 house wines/Aperol Spritz/Margarita, food $6-$14",
    description: "Neighborhood tavern with craft beers and comfort food",
    website: "https://61grovestreet.com/"
  },
  {
    id: 5,
    name: "Bobo",
    neighborhood: "west_village",
    subNeighborhood: "West Village",
    address: "181 W 10th St, NY 10014",
    location: [40.7350, -74.0026],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "$2 oysters, $8 wines, $10 cocktails, $5 beer; Late night: $14 martinis",
    description: "Romantic French restaurant in a townhouse setting",
    website: "https://bobonyc.com/"
  },
  {
    id: 6,
    name: "Down the Hatch",
    neighborhood: "west_village",
    subNeighborhood: "West Village",
    address: "179 W 4th St, NY 10014",
    location: [40.7323, -74.0021],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "Open - 7:00 PM",
    deals: "1/2 off bar, $5 Jell-O shots, $5 Michelob Ultra; $1 wings Mon",
    description: "Underground sports bar with award-winning buffalo wings",
    website: "https://downthehatchnyc.com/"
  },
  {
    id: 7,
    name: "Boucherie West Village",
    neighborhood: "west_village",
    subNeighborhood: "West Village",
    address: "99 7th Avenue South, NY 10014",
    location: [40.7334, -74.0029],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "2:00 PM - 7:00 PM",
    deals: "$9 Kronenbourg, $12 house wines, $14 cocktails, $12 absinthe, $17 half dozen oysters",
    description: "French steakhouse with Belle Époque ambiance",
    website: "https://boucherieus.com/location/boucherie-west-village/"
  },
  {
    id: 8,
    name: "LELABAR",
    neighborhood: "west_village",
    subNeighborhood: "West Village",
    address: "75 Washington Pl, NY 10011",
    location: [40.7307, -73.9997],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Until 6:00 PM",
    deals: "$12 wine/glass, $44/bottle, $6 beer, $3 oysters, $5 cheese/charcuterie",
    description: "Intimate wine bar with curved counters and curated selection",
    website: "https://lelabar.com/"
  },
  {
    id: 9,
    name: "Due West",
    neighborhood: "west_village",
    subNeighborhood: "West Village",
    address: "189 W 10th St, NY 10014",
    location: [40.7348, -74.0031],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$10-$11 draft cocktails, $7 wines, $5-$6 beers, $1.50 oysters (min 6)",
    description: "Contemporary American bar with stylish interior",
    website: "https://duewestnyc.com/"
  },
  {
    id: 10,
    name: "Bandits",
    neighborhood: "west_village",
    subNeighborhood: "West Village",
    address: "44 Bedford St, NY 10014",
    location: [40.7318, -74.0034],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "$10 martini, $15 Martini 'Happy Meal' (martini + tots, add $2 for gin)",
    description: "Retro-inspired cocktail bar with vibrant atmosphere",
    website: "https://banditsnyc.com/"
  },
  {
    id: 11,
    name: "The Happiest Hour",
    neighborhood: "west_village",
    subNeighborhood: "West Village",
    address: "121 W 10th St, NY 10011",
    location: [40.7344, -74.0022],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "$5 burgers, $6 beers, $8 cocktails",
    description: "Palm Beach-inspired cocktail bar with renowned burgers",
    website: "https://happiesthournyc.com/"
  },
  {
    id: 12,
    name: "Katana Kitten",
    neighborhood: "west_village",
    subNeighborhood: "West Village",
    address: "531 Hudson St, New York, NY 10014",
    location: [40.7356, -74.0064],
    days: ["sunday", "monday", "tuesday", "wednesday", "thursday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "$10 highballs, $9 wine, $8 draft beers, half-price bar food",
    description: "Japanese-American cocktail bar with inventive drinks",
    website: "https://katarakitten.com/"
  },

  // East Village
  {
    id: 13,
    name: "Tile Bar",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "115 1st Ave, NY 10003",
    location: [40.7273, -73.9861],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "5:00 PM - 8:00 PM",
    deals: "$4 well drinks, $3 Bud/Bud Light drafts",
    description: "Historic dive bar in former radio station building",
    website: ""
  },
  {
    id: 14,
    name: "The Gray Mare",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "61 2nd Ave, NY 10003",
    location: [40.7256, -73.9889],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$6 draft beers, $8 cocktails, wines by the glass",
    description: "Neighborhood sports bar with craft beer selection",
    website: "https://thegraymarenyc.com/"
  },
  {
    id: 15,
    name: "The Mermaid Inn",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "96 2nd Ave, NY 10003",
    location: [40.7267, -73.9888],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 6:00 PM",
    deals: "$1.50 oysters, $8 wines, $6 beers",
    description: "New England-style seafood restaurant with daily happy hour",
    website: "https://themermaidnyc.com/"
  },
  {
    id: 16,
    name: "The Black Ant",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "60 2nd Ave, NY 10003",
    location: [40.7255, -73.9889],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "$8 margaritas, $6 beers, $10 small plates",
    description: "Creative Mexican restaurant with innovative cocktails",
    website: "https://theblackantnyc.com/"
  },
  {
    id: 17,
    name: "The Wayland",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "700 E 9th St, NY 10009",
    location: [40.7261, -73.9784],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$1 oysters, discounted select beers, wines, cocktails",
    description: "Rustic neighborhood cocktail bar with live music",
    website: "https://thewaylandnyc.com/"
  },
  {
    id: 18,
    name: "Keybar",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "432 E 13th St, NY 10009",
    location: [40.7300, -73.9798],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "4:00 PM - 10:00 PM",
    deals: "$4 bottles, shots; $5 drafts, well drinks; $6 wines; $7 margaritas",
    description: "High-energy nightlife spot with DJ and dancing",
    website: "http://www.keybar.com/"
  },
  {
    id: 19,
    name: "A10 Kitchen",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "162 Avenue A, NY 10009",
    location: [40.7278, -73.9824],
    days: ["tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$13 burgers; $9 wings; pitchers: margarita $21, mojito $23, sangria $30",
    description: "Asian fusion restaurant with eclectic menu and vibrant atmosphere",
    website: "https://www.a10kitchen.com/"
  },
  {
    id: 20,
    name: "The Smith",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "55 3rd Ave, New York, NY 10003",
    location: [40.7315, -73.9883],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 6:30 PM",
    deals: "$7 select beers, $9 glasses of wine, $10 signature cocktails, $8 bar snacks",
    description: "Bustling bistro with modern American comfort food and craft cocktails",
    website: "https://thesmithrestaurant.com/"
  },
  {
    id: 21,
    name: "Empellón Al Pastor",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "132 St Marks Pl, New York, NY 10009",
    location: [40.7268, -73.9833],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$4 tacos, $8 margaritas, $5 draft beers, $7 frozen drinks",
    description: "Mexican taqueria with excellent tacos and tequila selection",
    website: "https://www.empellon.com/"
  },
  {
    id: 22,
    name: "Upstate Craft Beer",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "95 1st Ave, NY 10003",
    location: [40.7267, -73.9864],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "$12 for 6 oysters and a beer",
    description: "Intimate seafood and craft beer restaurant with fresh oysters",
    website: "http://www.upstatenyc.com/"
  },
  
  // Lower East Side
  {
    id: 23,
    name: "Loreley Beer Garden",
    neighborhood: "lower_east_side",
    subNeighborhood: "Lower East Side",
    address: "7 Rivington St, New York, NY 10002",
    location: [40.7208, -73.9913],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "$2 off draft beer, $16 one-liter steins, $12 beer flights, $2 off glasses of wine",
    description: "German-style beer garden with outdoor space",
    website: "https://www.loreleynyc.com/"
  },
  {
    id: 24,
    name: "Bar Belly",
    neighborhood: "lower_east_side",
    subNeighborhood: "Lower East Side",
    address: "14 Orchard St, New York, NY 10002",
    location: [40.7167, -73.9906],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "$1 happy hour oysters",
    description: "Sleek cocktail lounge with live music and seafood",
    website: "https://www.barbellynyc.com/"
  },
  {
    id: 25,
    name: "Verlaine",
    neighborhood: "lower_east_side",
    subNeighborhood: "Lower East Side",
    address: "110 Rivington St, NY, NY 10002",
    location: [40.7195, -73.9898],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "5:00 PM - 10:00 PM",
    deals: "Lychee martini for $8, limited drink selection",
    description: "Sleek lounge with Southeast Asian inspired drinks and food",
    website: "https://www.verlainenyc.com/"
  },
  {
    id: 26,
    name: "The Ten Bells",
    neighborhood: "lower_east_side",
    subNeighborhood: "Lower East Side",
    address: "247 Broome St, New York, NY 10002",
    location: [40.7184, -73.9911],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "$1.50 oysters, $20 carafes of wine (about 16 oz)",
    description: "Rustic wine bar with tapas and natural wines",
    website: "https://tenbellsnyc.com/"
  },
  {
    id: 27,
    name: "The Magician",
    neighborhood: "lower_east_side",
    subNeighborhood: "Lower East Side",
    address: "118 Rivington St, New York, NY 10002",
    location: [40.7192, -73.9880],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "Select well liquor, draft beer, and wines for $6 each",
    description: "No-frills neighborhood bar with casual vibe",
    website: "https://www.themagicianbar.com/"
  },
  {
    id: 28,
    name: "Nurse Bettie",
    neighborhood: "lower_east_side",
    subNeighborhood: "Lower East Side",
    address: "106 Norfolk St, New York, NY 10002",
    location: [40.7192, -73.9866],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "$6 well drinks and beer, $8 cucumber vodka soda, constant specials",
    description: "Pinup-themed cocktail bar with burlesque shows",
    website: "https://nursebettie.com/"
  },
  
  // Midtown
  {
    id: 29,
    name: "The Friki Tiki",
    neighborhood: "midtown",
    subNeighborhood: "Midtown",
    address: "357 W 44th St, NY 10036",
    location: [40.7596, -73.9911],
    days: ["tuesday", "wednesday", "thursday", "friday", "saturday"],
    hours: "5:00 PM - 8:00 PM",
    deals: "$10 frozen drinks, $9 wine, $6 beer",
    description: "Tropical tiki bar with island-inspired cocktails",
    website: "https://www.frikitiki.com/"
  },
  {
    id: 30,
    name: "Valerie",
    neighborhood: "midtown",
    subNeighborhood: "Midtown",
    address: "45 W 45th St, NY 10036",
    location: [40.7567, -73.9812],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$12 cocktails, $9 select wines, $7 select beers, $1 oysters",
    description: "Art deco cocktail bar with upscale ambiance",
    website: "https://www.valerienyc.com/"
  },
  {
    id: 31,
    name: "The Rum House",
    neighborhood: "midtown",
    subNeighborhood: "Times Square",
    address: "228 W 47th St, NY 10036",
    location: [40.7593, -73.9858],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "4:00 PM - 6:00 PM",
    deals: "$10 classic cocktails, $8 select wines, $6 beers",
    description: "Classic piano bar in The Edison Hotel specializing in rum",
    website: "https://www.therumhousenyc.com/"
  },
  {
    id: 32,
    name: "The Perfect Pint",
    neighborhood: "midtown",
    subNeighborhood: "Midtown",
    address: "123 W 45th St, NY 10036",
    location: [40.7574, -73.9843],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 select pints, $6 house wines, $7 well drinks",
    description: "Irish pub with rooftop beer garden and extensive beer selection",
    website: "https://www.theperfectpintnyc.com/"
  },
  {
    id: 33,
    name: "P.J. Clarke's",
    neighborhood: "midtown",
    subNeighborhood: "Midtown East",
    address: "915 3rd Ave, New York, NY 10022",
    location: [40.7585, -73.9675],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "3:00 PM - 6:00 PM",
    deals: "$7 draft beers, $9 wine, $10 signature cocktails, half-price bar menu",
    description: "Historic tavern serving New Yorkers since 1884",
    website: "https://pjclarkes.com/"
  },
  {
    id: 34,
    name: "The Campbell",
    neighborhood: "midtown",
    subNeighborhood: "Midtown East",
    address: "15 Vanderbilt Ave, NY 10017",
    location: [40.7528, -73.9772],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 6:00 PM",
    deals: "$12 cocktails, $8 wines, $6 beers",
    description: "Historic Grand Central cocktail bar in former apartment",
    website: "https://thecampbellnyc.com/"
  },
  {
    id: 35,
    name: "Industry Bar",
    neighborhood: "midtown",
    subNeighborhood: "Hell's Kitchen",
    address: "355 W 52nd St, NY 10019",
    location: [40.7640, -73.9867],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "$5 well drinks, $4 beers",
    description: "Popular LGBTQ+ bar with video screens and dancing",
    website: "http://www.industry-bar.com/"
  },
  
  // Chelsea
  {
    id: 36,
    name: "The Mermaid Inn Chelsea",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "227 10th Ave, New York, NY 10011",
    location: [40.7466, -74.0035],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "4:30 PM - 6:30 PM",
    deals: "$1.25 oysters (min 6), $6 beer, $10 cocktails and wine",
    description: "New England-style seafood restaurant in Chelsea Market",
    website: "https://themermaidnyc.com/"
  },
  {
    id: 37,
    name: "Porchlight",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "271 11th Ave, NY 10001",
    location: [40.7509, -74.0045],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "3:00 PM - 7:00 PM",
    deals: "$11 select cocktails, $6 beer, $5 flasks of punch",
    description: "Southern-inspired cocktail bar with hospitality and whiskey focus",
    website: "https://porchlightbar.com/"
  },
  {
    id: 38,
    name: "Fonda",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "189 9th Ave, New York, NY 10011",
    location: [40.7443, -74.0024],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "4:00 PM - 6:00 PM",
    deals: "$11 appetizers, $7-12 alcoholic beverages, $12 mezcalita",
    description: "Contemporary Mexican restaurant from Chef Roberto Santibañez",
    website: "https://fondarestaurant.com/"
  },
  {
    id: 39,
    name: "Bathtub Gin",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "132 9th Ave, NY 10011",
    location: [40.7424, -74.0039],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "$10 cocktails, $6 beers, $8 wines",
    description: "Speakeasy-style cocktail bar with actual bathtub",
    website: "https://bathtubginnyc.com/"
  },
  {
    id: 40,
    name: "Bocca di Bacco",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "169 9th Ave, New York, NY 10011",
    location: [40.7432, -74.0020],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 beer, $8 wine, $10 cocktails, $1.50 oysters, meatballs",
    description: "Upscale Italian restaurant with extensive wine list",
    website: "https://www.boccadibacconyc.com/"
  },
  {
    id: 41,
    name: "The Chelsea Bell",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "316 8th Ave, New York, NY 10001",
    location: [40.7474, -73.9991],
    days: ["monday", "tuesday", "wednesday", "thursday"],
    hours: "12:00 PM - 7:00 PM",
    deals: "$6 bottled domestic brews, $7 select drafts, $7 cocktails, $9 wine",
    description: "Sports bar with American pub fare and lively atmosphere",
    website: "https://www.thechelseabell.com/"
  },
  
  // Times Square
  {
    id: 42,
    name: "Mermaid Oyster Bar Times Square",
    neighborhood: "times_square",
    subNeighborhood: "Times Square",
    address: "127 W 43rd St, NY 10036",
    location: [40.7554, -73.9845],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "4:00 PM - 5:30 PM",
    deals: "$8-$12 drinks, $2 oysters (min 6), $4-$12 snacks",
    description: "Seafood restaurant with nautical theme and fresh oysters",
    website: "https://themermaidnyc.com/"
  },
  {
    id: 43,
    name: "Haven Rooftop",
    neighborhood: "times_square",
    subNeighborhood: "Times Square",
    address: "132 W 47th St, NY 10036",
    location: [40.7588, -73.9841],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$7 beers, $9 wines, $10 cocktails",
    description: "Rooftop lounge with city views and French-inspired cuisine",
    website: "https://havenrooftop.com/"
  },
  {
    id: 44,
    name: "Jimmy's Corner",
    neighborhood: "times_square",
    subNeighborhood: "Times Square",
    address: "140 W 44th St, NY 10036",
    location: [40.7567, -73.9849],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 beers, $6 well drinks",
    description: "Legendary boxing-themed dive bar with affordable drinks",
    website: ""
  },
  {
    id: 45,
    name: "Dutch Fred's",
    neighborhood: "times_square",
    subNeighborhood: "Times Square",
    address: "307 W 47th St, New York, NY 10036",
    location: [40.7605, -73.9886],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$6 select beers, $8 wines, $10 cocktails, half-price appetizers",
    description: "Pre-theater cocktail bar with speakeasy atmosphere",
    website: "https://dutchfredsnyc.com/"
  },
  {
    id: 46,
    name: "The Long Room",
    neighborhood: "times_square",
    subNeighborhood: "Times Square",
    address: "120 W 44th St, NY 10036",
    location: [40.7569, -73.9845],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$6 beers, $8 wines, $10 cocktails",
    description: "Sleek pub with extensive beer selection and upscale ambiance",
    website: "https://thelongroomnyc.com/"
  },
  
  // Murray Hill
  {
    id: 47,
    name: "The Ginger Man",
    neighborhood: "murray_hill",
    subNeighborhood: "Murray Hill",
    address: "11 East 36th Street, NY 10016",
    location: [40.7493, -73.9822],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$7 craft beer, $6 wine, discounted appetizers",
    description: "Renowned beer bar with over 70 taps and 160 bottles",
    website: "https://gingermanny.com/"
  },
  {
    id: 48,
    name: "Cask Bar & Kitchen",
    neighborhood: "murray_hill",
    subNeighborhood: "Murray Hill",
    address: "167 E 33rd St, New York, NY 10016",
    location: [40.7448, -73.9782],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "3:00 PM - 7:00 PM",
    deals: "Half-price draft beers, $8 wine, $10 cocktails, $8 bar bites",
    description: "Relaxed neighborhood gastro pub with craft beer focus",
    website: "https://casknyc.com/"
  },
  {
    id: 49,
    name: "Joshua Tree",
    neighborhood: "murray_hill",
    subNeighborhood: "Murray Hill",
    address: "513 3rd Avenue, NY 10016",
    location: [40.7486, -73.9762],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 8:00 PM",
    deals: "$5 beer, $6 wine, $7 well drinks",
    description: "Popular sports bar and nightlife spot",
    website: "https://joshuatreenyc.com/"
  },
  {
    id: 50,
    name: "The Flying Cock",
    neighborhood: "murray_hill",
    subNeighborhood: "Murray Hill",
    address: "497 3rd Ave, NY 10016",
    location: [40.7481, -73.9766],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 drafts, $7 wines, $8 cocktails",
    description: "Lively gastropub with craft beer and comfort food",
    website: "https://theflyingcocknyc.com/"
  },
  
  // Financial District
  {
    id: 51,
    name: "The Dead Rabbit",
    neighborhood: "financial_district",
    subNeighborhood: "Financial District",
    address: "30 Water St, New York, NY 10004",
    location: [40.7034, -74.0108],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "$8 select cocktails, $6 draft beers, $10 wine, $1 oysters",
    description: "Award-winning Irish pub with vintage cocktail menu",
    website: "https://deadrabbitnyc.com/"
  },
  {
    id: 52,
    name: "BlackTail",
    neighborhood: "financial_district",
    subNeighborhood: "Financial District",
    address: "22 Battery Pl, New York, NY 10004",
    location: [40.7041, -74.0173],
    days: ["tuesday", "wednesday", "thursday", "friday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "Half-price daiquiris, $9 beer and shot combo, $10 wine",
    description: "Cuban-inspired cocktail bar with Prohibition-era theme",
    website: "https://blacktailnyc.com/"
  },
  
  // Upper East Side
  {
    id: 53,
    name: "The Jeffrey",
    neighborhood: "upper_east_side",
    subNeighborhood: "Upper East Side",
    address: "311 E 60th St, New York, NY 10022",
    location: [40.7608, -73.9628],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$1 oysters, $6 draft beers, $10 cocktails, $2 off house wines",
    description: "Industrial-chic craft beer bar with espresso cafe and outdoor space",
    website: "https://thejeffreynyc.com/"
  },
  {
    id: 54,
    name: "The Penrose",
    neighborhood: "upper_east_side",
    subNeighborhood: "Upper East Side",
    address: "1590 2nd Ave, New York, NY 10028",
    location: [40.7740, -73.9495],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "3:00 PM - 7:00 PM",
    deals: "$2 off beer, wine, and well drinks",
    description: "Hip gastropub with rustic decor and craft beer selection",
    website: "https://www.penrosebar.com/"
  },
  
  // Hells Kitchen
  {
    id: 55,
    name: "As Is",
    neighborhood: "hells_kitchen",
    subNeighborhood: "Hell's Kitchen",
    address: "734 10th Ave, New York, NY 10019",
    location: [40.7634, -73.9928],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "$9 cocktails, $6-8 craft beer, half-price small plates",
    description: "Stylish craft beer and cocktail bar with rotating beer selections",
    website: "https://www.asisnyc.com/"
  },
  
  // Nolita
  {
    id: 56,
    name: "Mother's Ruin",
    neighborhood: "nolita",
    subNeighborhood: "Nolita",
    address: "18 Spring St, New York, NY 10012",
    location: [40.7215, -73.9957],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "1:00 PM - 7:00 PM",
    deals: "$6 draft beers, $10 frozen drinks, $10 daily punch, half-price wings",
    description: "Popular neighborhood bar with craft cocktails and comfort food",
    website: "https://mothersruinnyc.com/"
  },
  
  // Union Square
  {
    id: 57,
    name: "Barn Joo",
    neighborhood: "union_square",
    subNeighborhood: "Union Square",
    address: "35 Union Square W, New York, NY 10003",
    location: [40.7369, -73.9916],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$7 house wine, $7 select beers, $8 cocktails, half-price bar snacks",
    description: "Korean gastropub with fusion dishes and K-pop vibes",
    website: "https://www.barnjoo.com/"
  },
  
  // NoMad
  {
    id: 58,
    name: "Oscar Wilde",
    neighborhood: "nomad",
    subNeighborhood: "NoMad",
    address: "45 W 27th St, New York, NY 10001",
    location: [40.7453, -73.9903],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$7 select beers, $8 wine, $9 cocktails, $1 oysters, $8 small plates",
    description: "Victorian-themed bar with the longest bar counter in NYC",
    website: "https://oscarwildenyc.com/"
  },
  
  // Gramercy
  {
    id: 59,
    name: "Dear Irving",
    neighborhood: "gramercy",
    subNeighborhood: "Gramercy",
    address: "55 Irving Pl, New York, NY 10003",
    location: [40.7367, -73.9873],
    days: ["sunday", "monday", "tuesday", "wednesday"],
    hours: "5:00 PM - 8:00 PM",
    deals: "$10 signature cocktails, $9 wine, half-price oysters",
    description: "Upscale cocktail parlor with time-period themed rooms",
    website: "https://dearirving.com/"
  },
  
  // BROOKLYN
  
  // Williamsburg
  {
    id: 60,
    name: "Skinny Dennis",
    neighborhood: "williamsburg",
    subNeighborhood: "Williamsburg",
    address: "152 Metropolitan Ave, Brooklyn, NY 11211",
    location: [40.7157, -73.9614],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "12:00 PM - 7:00 PM",
    deals: "Discounted beers and well drinks, $2 Tito's shots on Tuesdays",
    description: "Honky-tonk bar with live country music and divey ambiance",
    website: "https://skinnydennis.bar/"
  },
  {
    id: 61,
    name: "Le Crocodile",
    neighborhood: "williamsburg",
    subNeighborhood: "Williamsburg",
    address: "80 Wythe Ave, Brooklyn, NY 11249",
    location: [40.7219, -73.9582],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 6:00 PM",
    deals: "$2 oysters, $10 spritzes, discounted small plates",
    description: "Upscale French brasserie with elegant dining room",
    website: "https://lecrocodile.com/"
  },
  {
    id: 62,
    name: "Ensenada",
    neighborhood: "williamsburg",
    subNeighborhood: "Williamsburg",
    address: "168 Borinquen Pl, Brooklyn, NY 11211",
    location: [40.7099, -73.9529],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "$8 margaritas, $6 shrimp tacos",
    description: "Vibrant taqueria specializing in seafood and Baja cuisine",
    website: "https://ensenadanyc.com/"
  },
  {
    id: 63,
    name: "Westlight",
    neighborhood: "williamsburg",
    subNeighborhood: "Williamsburg",
    address: "111 N 12th St, Brooklyn, NY 11249",
    location: [40.7223, -73.9562],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$7 cocktails, $5 beers, $6 wines",
    description: "Rooftop bar on 22nd floor with panoramic views of NYC",
    website: "https://westlightnyc.com/"
  },
  {
    id: 64,
    name: "The Ides",
    neighborhood: "williamsburg",
    subNeighborhood: "Williamsburg",
    address: "80 Wythe Ave, Brooklyn, NY 11249",
    location: [40.7219, -73.9582],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 6:00 PM",
    deals: "$8 cocktails, $6 beers, $7 wines",
    description: "Stylish rooftop bar at the Wythe Hotel with Manhattan skyline views",
    website: "https://wythehotel.com/"
  },
  {
    id: 65,
    name: "Radegast Hall",
    neighborhood: "williamsburg",
    subNeighborhood: "Williamsburg",
    address: "113 N 3rd St, Brooklyn, NY 11249",
    location: [40.7165, -73.9594],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 beers, $7 wines, $8 cocktails",
    description: "Authentic Bavarian-style beer hall with live music",
    website: "https://radegasthall.com/"
  },
  
  // Bushwick
  {
    id: 66,
    name: "The Rookery",
    neighborhood: "bushwick",
    subNeighborhood: "Bushwick",
    address: "425 Troutman St, Brooklyn, NY 11237",
    location: [40.7059, -73.9236],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 beers, $7 cocktails, $6 wines",
    description: "British-inspired pub with outdoor patio and craft beer",
    website: "https://therookerybar.com/"
  },
  {
    id: 67,
    name: "Maite",
    neighborhood: "bushwick",
    subNeighborhood: "Bushwick",
    address: "159 Central Ave, Brooklyn, NY 11221",
    location: [40.6985, -73.9350],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "$8 cocktails, $6 wines, $5 beers",
    description: "Intimate Basque-influenced restaurant with creative cocktails",
    website: "https://maitebk.com/"
  },
  {
    id: 68,
    name: "Left Hand Path",
    neighborhood: "bushwick",
    subNeighborhood: "Bushwick",
    address: "89 Wyckoff Ave, Brooklyn, NY 11237",
    location: [40.7057, -73.9169],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$6 beers, $8 wines, $10 cocktails",
    description: "Chic cocktail bar with outdoor space and cozy atmosphere",
    website: "https://lefthandpathbk.com/"
  },
  {
    id: 69,
    name: "The Johnson's",
    neighborhood: "bushwick",
    subNeighborhood: "Bushwick",
    address: "369 Troutman St, Brooklyn, NY 11237",
    location: [40.7058, -73.9229],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 beers, $7 wines, $8 cocktails",
    description: "Retro dive bar with 1970s decor and pool table",
    website: "https://thejohnsonsbar.com/"
  },
  {
    id: 70,
    name: "The Cobra Club",
    neighborhood: "bushwick",
    subNeighborhood: "Bushwick",
    address: "6 Wyckoff Ave, Brooklyn, NY 11237",
    location: [40.7065, -73.9221],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 beers, $7 wines, $8 cocktails",
    description: "Multi-purpose space with yoga studio, coffee shop, and bar",
    website: "https://thecobraclub.com/"
  },
  
  // Park Slope
  {
    id: 71,
    name: "Siren Oyster Bar",
    neighborhood: "park_slope",
    subNeighborhood: "Park Slope",
    address: "596 5th Ave, Brooklyn, NY 11215",
    location: [40.6661, -73.9885],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 6:00 PM",
    deals: "$1.50 oysters, $8 wines, $6 beers",
    description: "Seafood-focused restaurant with raw bar and craft cocktails",
    website: "https://sirenoysterbar.com/"
  },
  {
    id: 72,
    name: "The Owl Farm",
    neighborhood: "park_slope",
    subNeighborhood: "Park Slope",
    address: "297 7th St, Brooklyn, NY 11215",
    location: [40.6724, -73.9831],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 select drafts, $7 wines",
    description: "Eclectic beer bar with rotating taps and pinball machines",
    website: "https://theowlfarm.com/"
  },
  {
    id: 73,
    name: "The Gate",
    neighborhood: "park_slope",
    subNeighborhood: "Park Slope",
    address: "321 5th Ave, Brooklyn, NY 11215",
    location: [40.6731, -73.9818],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 beers, $7 wines, $8 cocktails",
    description: "Neighborhood pub with dog-friendly outdoor seating",
    website: "https://thegatebrooklyn.com/"
  },
  
  // Additional Manhattan venues
  {
    id: 74,
    name: "The Garret",
    neighborhood: "west_village",
    subNeighborhood: "West Village",
    address: "296 Bleecker St, New York, NY 10014",
    location: [40.7318, -74.0030],
    days: ["monday", "tuesday", "wednesday", "thursday"],
    hours: "5:00 PM - 8:00 PM",
    deals: "$10 specialty cocktails, $8 beer, $12 wine, $8 appetizers",
    description: "Hidden speakeasy above Five Guys with creative cocktails",
    website: "https://thegarretwest.com/"
  },
  {
    id: 75,
    name: "William Barnacle Tavern",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "80 St Marks Pl, NY 10003",
    location: [40.7277, -73.9854],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "1:00 PM - 7:00 PM",
    deals: "Discounted drinks, creative sandwiches",
    description: "Historic speakeasy with absinthe specialties",
    website: ""
  },
  {
    id: 76,
    name: "Lovers of Today",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "132½ E 7th St, NY 10009",
    location: [40.7263, -73.9841],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "5:00 PM - 7:00 PM",
    deals: "Discounted select cocktails, beers",
    description: "Intimate cocktail bar with speakeasy vibe",
    website: ""
  },
  {
    id: 77,
    name: "Bibi Wine Bar",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "211 E 4th St, NY 10009",
    location: [40.7251, -73.9844],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Until 8:00 PM",
    deals: "$8 glasses, $28 bottles of select wines",
    description: "Intimate wine bar focused on natural and organic wines",
    website: "http://www.bibiwinebar.com/"
  },
  {
    id: 78,
    name: "Yuca Bar & Restaurant",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "111 Avenue A, NY 10009",
    location: [40.7275, -73.9826],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Until 8:00 PM",
    deals: "Half-priced drinks",
    description: "Latin American restaurant with tropical cocktails",
    website: "http://www.yucabarnyc.com/"
  },
  {
    id: 79,
    name: "Death & Company",
    neighborhood: "east_village",
    subNeighborhood: "East Village",
    address: "433 E 6th St, NY 10009",
    location: [40.7260, -73.9847],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "By reservation only",
    deals: "Happy hour not specified",
    description: "Pioneering speakeasy-style cocktail bar with expert mixology",
    website: "https://www.deathandcompany.com/"
  },
  {
    id: 80,
    name: "Mercury Bar",
    neighborhood: "midtown",
    subNeighborhood: "Midtown",
    address: "659 9th Ave, NY 10036",
    location: [40.7613, -73.9923],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "11:00 AM - 8:00 PM",
    deals: "$5 beers, $6 wines, $7 cocktails, $5 tacos Tue, $1 wings Wed",
    description: "Casual sports bar with daily specials and beer selection",
    website: "https://mercurybarnyc.com/"
  },
  {
    id: 81,
    name: "The Shakespeare",
    neighborhood: "midtown",
    subNeighborhood: "Midtown",
    address: "24 E 39th St, NY 10016",
    location: [40.7507, -73.9802],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$6 beers, $8 wines, $10 cocktails",
    description: "English pub with literary theme and classic British fare",
    website: "https://theshakespearenyc.com/"
  },
  {
    id: 82,
    name: "The Irish Pub",
    neighborhood: "midtown",
    subNeighborhood: "Midtown",
    address: "837 7th Ave, NY 10019",
    location: [40.7639, -73.9822],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 beers, $6 well drinks, $7 wines",
    description: "Classic Irish pub with traditional atmosphere",
    website: ""
  },
  {
    id: 83,
    name: "The Mean Fiddler",
    neighborhood: "midtown",
    subNeighborhood: "Midtown",
    address: "266 W 47th St, NY 10036",
    location: [40.7599, -73.9873],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 8:00 PM",
    deals: "$5 beers, $6 wines, $7 cocktails",
    description: "Irish pub with live music and dancing",
    website: "https://themeanfiddlernyc.com/"
  },
  {
    id: 84,
    name: "The Long Acre Tavern",
    neighborhood: "midtown",
    subNeighborhood: "Midtown",
    address: "146 W 47th St, NY 10036",
    location: [40.7591, -73.9845],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$6 beers, $8 wines, $10 cocktails",
    description: "Theater district tavern with craft beers and cocktails",
    website: "https://longacretavern.com/"
  },
  {
    id: 85,
    name: "The Stag's Head",
    neighborhood: "midtown",
    subNeighborhood: "Midtown",
    address: "252 E 51st St, NY 10022",
    location: [40.7551, -73.9693],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "$5 select beers; $6 well drinks; $7 select wines",
    description: "Craft beer bar with rustic charm",
    website: "https://www.stagheadsnyc.com/"
  },
  {
    id: 86,
    name: "Draught 55",
    neighborhood: "midtown",
    subNeighborhood: "Midtown",
    address: "245 E 55th St, NY 10022",
    location: [40.7593, -73.9660],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "$9 select cocktails; $5 beer; $6 well drinks; $2 off wine",
    description: "Cozy pub with extensive draft beer selection",
    website: "https://www.draught55.com/"
  },
  {
    id: 87,
    name: "The Horny Ram",
    neighborhood: "midtown",
    subNeighborhood: "Midtown",
    address: "951 2nd Ave, NY 10022",
    location: [40.7541, -73.9707],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "$8 Aperol spritz, mules, and select wines; $6 beers; 2 bites for $16",
    description: "Modern gastropub with two floors and rooftop seating",
    website: "https://www.thehornyram.com/"
  },
  {
    id: 88,
    name: "Castell Rooftop Lounge",
    neighborhood: "midtown",
    subNeighborhood: "Midtown",
    address: "260 W 40th St, NY 10018",
    location: [40.7559, -73.9915],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "$10 select cocktails; $8 wines; $7 beers",
    description: "Stylish rooftop lounge with city views",
    website: "https://www.castellnyc.com/"
  },
  {
    id: 89,
    name: "The Tippler",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "425 W 15th St, NY 10011",
    location: [40.7422, -74.0059],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$7 cocktails, $5 beers, $6 wines",
    description: "Underground cocktail den beneath Chelsea Market",
    website: "https://thetipplernyc.com/"
  },
  {
    id: 90,
    name: "The Frying Pan",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "207 12th Ave, NY 10001",
    location: [40.7486, -74.0088],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$6 beers, $8 wines, $10 cocktails",
    description: "Historic lightship converted to floating bar on the Hudson",
    website: "https://fryingpan.nyc/"
  },
  {
    id: 91,
    name: "The Standard Biergarten",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "848 Washington St, NY 10014",
    location: [40.7405, -74.0083],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 beers, $7 wines, $8 cocktails",
    description: "German-style beer garden under the High Line",
    website: "https://www.standardhotels.com/new-york/features/biergarten"
  },
  {
    id: 92,
    name: "The Flatiron Room",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "37 W 26th St, NY 10010",
    location: [40.7444, -73.9899],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 6:00 PM",
    deals: "$8 cocktails, $6 beers, $7 wines",
    description: "Upscale whiskey bar with live jazz and extensive selection",
    website: "https://theflatironroom.com/"
  },
  {
    id: 93,
    name: "Upside Down",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "218 W 23rd St, New York, NY 10011",
    location: [40.7451, -73.9974],
    days: ["monday", "tuesday", "wednesday", "thursday"],
    hours: "5:00 PM - 8:00 PM",
    deals: "$6 draft beers, $8 wine, $10 specialty cocktails, half-price flatbreads",
    description: "Casual rooftop bar with great skyline views and outdoor seating",
    website: "https://upsidedownchelsea.com/"
  },
  {
    id: 94,
    name: "Cull & Pistol",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "75 9th Ave, New York, NY 10011",
    location: [40.7422, -74.0048],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 6:00 PM",
    deals: "Half-priced oysters",
    description: "Seafood restaurant and oyster bar in Chelsea Market",
    website: "https://www.cullandpistol.com/"
  },
  {
    id: 95,
    name: "The Copper Still",
    neighborhood: "chelsea",
    subNeighborhood: "Chelsea",
    address: "206 7th Ave, New York, NY 10011",
    location: [40.7434, -73.9970],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "12:00 PM - 6:00 PM",
    deals: "$10 cocktails, $6 draft beers, under $6 for fries, sliders, popcorn",
    description: "Cozy Irish pub with whiskey selection and comfort food",
    website: "https://www.thecopperstillnyc.com/"
  },
  {
    id: 96,
    name: "The Cutting Room",
    neighborhood: "murray_hill",
    subNeighborhood: "Murray Hill",
    address: "44 E 32nd St, NY 10016",
    location: [40.7465, -73.9828],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$6 beers, $8 wines, $10 cocktails",
    description: "Iconic music venue with craft cocktails",
    website: "https://thecuttingroomnyc.com/"
  },
  {
    id: 97,
    name: "The Churchill Tavern",
    neighborhood: "murray_hill",
    subNeighborhood: "Murray Hill",
    address: "45 E 28th St, NY 10016",
    location: [40.7438, -73.9851],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$6 beers, $8 wines, $10 cocktails",
    description: "British pub with Winston Churchill theme and authentic fare",
    website: "https://thechurchillny.com/"
  },
  {
    id: 98,
    name: "Jadis",
    neighborhood: "lower_east_side",
    subNeighborhood: "Lower East Side",
    address: "42 Rivington St, New York, NY 10002",
    location: [40.7204, -73.9916],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "Wines starting at $7, shareable dishes under $10",
    description: "Cozy wine bar with brick walls and intimate atmosphere",
    website: "http://jadisnyc.com/"
  },
  {
    id: 99,
    name: "Bonnie Vee",
    neighborhood: "lower_east_side",
    subNeighborhood: "Lower East Side",
    address: "17 Stanton St, New York, NY 10002",
    location: [40.7222, -73.9926],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "$11 mimosas, martinis, gimlets, $10 house wines, shareable appetizers",
    description: "Cocktail bar with backyard garden and vintage decor",
    website: "https://www.bonnievee.com/"
  },
  {
    id: 100,
    name: "Essex",
    neighborhood: "lower_east_side",
    subNeighborhood: "Lower East Side",
    address: "124 Rivington St, New York, NY 10002",
    location: [40.7192, -73.9872],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    hours: "Happy Hour Daily",
    deals: "$8 signature cocktails, beer, wine, and sangria for less, snacks under $10",
    description: "Contemporary restaurant in historic market building",
    website: "https://www.essexnyc.com/"
  },
  {
    id: 101,
    name: "O'Lunney's",
    neighborhood: "times_square",
    subNeighborhood: "Times Square",
    address: "145 W 45th St, NY 10036",
    location: [40.7575, -73.9847],
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: "4:00 PM - 7:00 PM",
    deals: "$5 drafts, $7 wines, $8 cocktails",
    description: "Traditional Irish pub with hearty food and welcoming atmosphere",
    website: "https://olunneys.com/"
  }
,
  
  // New venues added from additional data sources
  {
  id: 102,
  name: "The Blind Tiger",
  neighborhood: "west_village",
  subNeighborhood: "West Village",
  address: "281 Bleecker St, NY 10014",
  location: [
    40.7313,
    -74.0031
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$1 off craft beers, $7 wines, $8 cocktails",
  description: "Renowned craft beer bar with extensive rotating tap selection",
  website: "https://blindtigeralehouse.com/"
},
  {
  id: 103,
  name: "The Four-Faced Liar",
  neighborhood: "west_village",
  subNeighborhood: "West Village",
  address: "165 W 4th St, NY 10014",
  location: [
    40.7318,
    -74.0025
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $6 well drinks, $7 wines",
  description: "Cozy Irish pub with literary theme and authentic atmosphere",
  website: "https://thefourfacedliar.com/"
},
  {
  id: 104,
  name: "The Half Pint",
  neighborhood: "west_village",
  subNeighborhood: "West Village",
  address: "76 W 3rd St, NY 10012",
  location: [
    40.7306,
    -74.0012
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "3:00 PM - 7:00 PM",
  deals: "$5 Espresso Martini/Aperol Spritz/Frozen Irish Coffee, $8 well drinks, $8 wine, $6 beer",
  description: "Casual pub with extensive beer selection and comfort food",
  website: "https://thehalfpint.com/"
},
  {
  id: 105,
  name: "Greenwich Treehouse",
  neighborhood: "west_village",
  subNeighborhood: "West Village",
  address: "46 Greenwich Ave, NY 10011",
  location: [
    40.7352,
    -74.0008
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "sunday"
  ],
  hours: "5:00 PM - 8:00 PM",
  deals: "$1 off beer/wine/well drinks, $5 Jell-O shot, $8 beer and shot",
  description: "Relaxed neighborhood bar with rustic decor and outdoor seating",
  website: "https://www.greenwichtreehouse.com/"
},
  {
  id: 106,
  name: "The Lions Bar & Grill",
  neighborhood: "east_village",
  subNeighborhood: "East Village",
  address: "132 1st Ave, NY 10009",
  location: [
    40.7272,
    -73.9862
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 6:00 PM",
  deals: "$14 martini, $18 martini & fries, $8 margarita, $5 select beer, $7 Guinness",
  description: "Casual sports bar with great drink specials and pub fare",
  website: "https://www.thelionsbar.com/"
},
  {
  id: 107,
  name: "The Scratcher",
  neighborhood: "east_village",
  subNeighborhood: "East Village",
  address: "209 E 5th St, NY 10003",
  location: [
    40.7267,
    -73.9865
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Authentic Irish pub with basement setting and live music",
  website: "https://thescratchernyc.com/"
},
  {
  id: 108,
  name: "The Irish Times",
  neighborhood: "midtown",
  subNeighborhood: "Midtown",
  address: "254 W 31st St, NY 10001",
  location: [
    40.7499,
    -73.9936
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Authentic Irish pub near Penn Station with great beer selection",
  website: "https://theirishtimesnyc.com/"
},
  {
  id: 109,
  name: "The Bar at Times Square",
  neighborhood: "midtown",
  subNeighborhood: "Times Square",
  address: "255 W 43rd St, NY 10036",
  location: [
    40.7576,
    -73.9876
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Lively bar with dueling pianos and great drink specials",
  website: ""
},
  {
  id: 110,
  name: "The Liberty",
  neighborhood: "midtown",
  subNeighborhood: "Midtown",
  address: "29 W 35th St, NY 10001",
  location: [
    40.7497,
    -73.985
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Upscale gastropub with craft beer and creative American cuisine",
  website: "https://thelibertynyc.com/"
},
  {
  id: 111,
  name: "RPM Underground",
  neighborhood: "midtown",
  subNeighborhood: "Times Square",
  address: "246 W 54th St, NY 10019",
  location: [
    40.7644,
    -73.984
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "1:00 PM - 7:00 PM",
  deals: "50% off everything",
  description: "Rock 'n' roll themed bar with retro vibes and vinyl records",
  website: "https://rpmunderground.us/"
},
  {
  id: 112,
  name: "Crown Alley",
  neighborhood: "chelsea",
  subNeighborhood: "Chelsea",
  address: "263 W 19th St, NY 10011",
  location: [
    40.7428,
    -73.9991
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beer, $8 wine, $8 cocktails, $2.50 oysters (min 6)",
  description: "Cozy neighborhood bar with craft cocktails and Irish influence",
  website: "https://crownalleynyc.com/"
},
  {
  id: 113,
  name: "Bar Veloce",
  neighborhood: "chelsea",
  subNeighborhood: "Chelsea",
  address: "176 7th Ave, NY 10011",
  location: [
    40.7432,
    -73.9982
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ],
  hours: "5:00 PM - 7:00 PM",
  deals: "$7 prosecco, rosato, red wine",
  description: "Sleek Italian wine bar with panini and small plates",
  website: "https://winebarveloce.com/"
},
  {
  id: 114,
  name: "The Orchard Townhouse",
  neighborhood: "chelsea",
  subNeighborhood: "Chelsea",
  address: "242 10th Ave, NY 10001",
  location: [
    40.7494,
    -74.0032
  ],
  days: [
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "3:00 PM - 6:00 PM",
  deals: "$10 cocktails, sharable appetizers",
  description: "Elegant British-inspired townhouse with garden and refined cocktails",
  website: "https://theorchardtownhouse.com/"
},
  {
  id: 115,
  name: "The Joyce Public House",
  neighborhood: "chelsea",
  subNeighborhood: "Chelsea",
  address: "315 W 39th St, NY 10018",
  location: [
    40.7568,
    -73.9939
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Irish pub with literary inspiration and comfort food",
  website: "https://thejoycepublichouse.com/"
},
  {
  id: 116,
  name: "The Half King",
  neighborhood: "chelsea",
  subNeighborhood: "Chelsea",
  address: "505 W 23rd St, NY 10011",
  location: [
    40.7487,
    -74.0048
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 drafts, $7 wines, $8 cocktails",
  description: "Literary hangout founded by writers with regular readings and events",
  website: "https://thehalfking.com/"
},
  {
  id: 117,
  name: "169 Bar",
  neighborhood: "lower_east_side",
  subNeighborhood: "Lower East Side",
  address: "169 E Broadway, NY 10002",
  location: [
    40.7142,
    -73.99
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ],
  hours: "2:00 PM - 7:00 PM",
  deals: "$2 off liquor drinks (except well shots), $1 off any beer",
  description: "Eclectic dive bar with leopard print pool table and tropical ambiance",
  website: "https://169barnyc.com/"
},
  {
  id: 118,
  name: "The Bowery Beer Garden",
  neighborhood: "lower_east_side",
  subNeighborhood: "Lower East Side",
  address: "93 Bowery, NY 10002",
  location: [
    40.7176,
    -73.9941
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Spacious outdoor beer garden with global pub fare",
  website: "https://bowerybeergarden.com/"
},
  {
  id: 119,
  name: "The Delancey",
  neighborhood: "lower_east_side",
  subNeighborhood: "Lower East Side",
  address: "168 Delancey St, NY 10002",
  location: [
    40.7178,
    -73.9864
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Multi-level venue with rooftop garden and live music",
  website: "https://thedelanceynyc.com/"
},
  {
  id: 120,
  name: "The Skinny Bar & Lounge",
  neighborhood: "lower_east_side",
  subNeighborhood: "Lower East Side",
  address: "174 Orchard St, NY 10002",
  location: [
    40.7209,
    -73.9881
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Narrow bar with DJs, dancing, and lively atmosphere",
  website: "https://theskinnybar.com/"
},
  {
  id: 121,
  name: "The DL",
  neighborhood: "lower_east_side",
  subNeighborhood: "Lower East Side",
  address: "95 Delancey St, NY 10002",
  location: [
    40.7183,
    -73.9878
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Multi-level venue with rooftop lounge and nightclub",
  website: "https://thedl-nyc.com/"
},
  {
  id: 122,
  name: "The Back Room",
  neighborhood: "lower_east_side",
  subNeighborhood: "Lower East Side",
  address: "102 Norfolk St, NY 10002",
  location: [
    40.719,
    -73.9868
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "5:00 PM - 7:00 PM",
  deals: "$8 cocktails, $6 beers, $7 wines",
  description: "Authentic prohibition-era speakeasy with vintage decor",
  website: "https://backroomnyc.com/"
},
  {
  id: 123,
  name: "Attaboy",
  neighborhood: "lower_east_side",
  subNeighborhood: "Lower East Side",
  address: "134 Eldridge St, NY 10002",
  location: [
    40.7192,
    -73.991
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "5:00 PM - 7:00 PM",
  deals: "$10 select cocktails, $6 beers",
  description: "Intimate speakeasy with bespoke cocktails and no menu",
  website: "https://attaboy.us/"
},
  {
  id: 124,
  name: "The Slipper Room",
  neighborhood: "lower_east_side",
  subNeighborhood: "Lower East Side",
  address: "167 Orchard St, NY 10002",
  location: [
    40.7208,
    -73.9883
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Burlesque theater and cocktail lounge with vintage vibes",
  website: "https://slipperroom.com/"
},
  {
  id: 125,
  name: "Las' Lap",
  neighborhood: "lower_east_side",
  subNeighborhood: "Lower East Side",
  address: "74 Orchard St, NY 10002",
  location: [
    40.7171,
    -73.9913
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday"
  ],
  hours: "5:00 PM - 8:00 PM",
  deals: "$6 beer, $9 wine, $13 cocktails",
  description: "Caribbean-inspired cocktail bar with tropical drinks",
  website: ""
},
  {
  id: 126,
  name: "Fan Fried Rice Bar",
  neighborhood: "williamsburg",
  subNeighborhood: "Williamsburg",
  address: "92 S 6th St, Brooklyn, NY 11249",
  location: [
    40.7118,
    -73.9674
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ],
  hours: "Until 6:00 PM",
  deals: "$7 draft pilsner, $8 sake, $10 wines, $12 specialty cocktails",
  description: "Taiwan-inspired eatery serving creative fried rice dishes",
  website: ""
},
  {
  id: 127,
  name: "Cozy Royale",
  neighborhood: "williamsburg",
  subNeighborhood: "Williamsburg",
  address: "434 Humboldt St, Brooklyn, NY 11211",
  location: [
    40.7177,
    -73.9481
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "5:00 PM - 7:00 PM",
  deals: "$10 smash burger with fries, $10 martini",
  description: "Neighborhood restaurant from The Meat Hook team with butcher-focused menu",
  website: "https://www.cozyroyale.com/"
},
  {
  id: 128,
  name: "The Exley",
  neighborhood: "williamsburg",
  subNeighborhood: "Williamsburg",
  address: "1 Jackson St, Brooklyn, NY 11211",
  location: [
    40.7164,
    -73.9678
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Intimate cocktail bar in a former auto repair shop",
  website: "https://theexley.com/"
},
  {
  id: 129,
  name: "The Gibson",
  neighborhood: "williamsburg",
  subNeighborhood: "Williamsburg",
  address: "108 Bedford Ave, Brooklyn, NY 11249",
  location: [
    40.7197,
    -73.9569
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Cozy neighborhood bar with craft cocktails and vintage ambiance",
  website: "https://thegibsonbar.com/"
},
  {
  id: 130,
  name: "The Counting Room",
  neighborhood: "williamsburg",
  subNeighborhood: "Williamsburg",
  address: "44 Berry St, Brooklyn, NY 11249",
  location: [
    40.719,
    -73.9612
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Two-level bar with wine cellar and cocktail lounge",
  website: "https://thecountingroombk.com/"
},
  {
  id: 131,
  name: "Beyond The Pale",
  neighborhood: "soho",
  subNeighborhood: "SoHo",
  address: "53 Spring St, NY 10012",
  location: [
    40.7218,
    -73.997
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:30 PM - 7:00 PM",
  deals: "$10 cocktails, $8 wine, $6 beer",
  description: "Irish-inspired bar with craft cocktails and stylish interior",
  website: "https://beyondthepalenyc.com/"
},
  {
  id: 132,
  name: "The Crosby Bar",
  neighborhood: "soho",
  subNeighborhood: "SoHo",
  address: "79 Crosby St, NY 10012",
  location: [
    40.7226,
    -73.9985
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$10 house cocktails, $8 wine, $7 beers",
  description: "Sophisticated hotel bar with British influence and modern design",
  website: "https://crosbyhotel.com/"
},
  {
  id: 133,
  name: "Pegu Club",
  neighborhood: "soho",
  subNeighborhood: "SoHo",
  address: "77 W Houston St, NY 10012",
  location: [
    40.7268,
    -74.0002
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ],
  hours: "5:00 PM - 7:00 PM",
  deals: "$9 classic cocktails, $8 beer, $6 bar snacks",
  description: "Influential cocktail bar with colonial Burma-inspired decor",
  website: "https://peguclub.com/"
},
  {
  id: 134,
  name: "Jimmy SoHo",
  neighborhood: "soho",
  subNeighborhood: "SoHo",
  address: "15 Thompson St, NY 10013",
  location: [
    40.7242,
    -74.0036
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday"
  ],
  hours: "4:00 PM - 6:00 PM",
  deals: "$12 specialty cocktails, $9 wine, $7 beer",
  description: "Rooftop cocktail bar with stunning city views",
  website: "https://jimmysoho.com/"
},
  {
  id: 135,
  name: "Little Prince",
  neighborhood: "soho",
  subNeighborhood: "SoHo",
  address: "199 Prince St, NY 10012",
  location: [
    40.7261,
    -74.0011
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$9 cocktails, $8 wine, $6 beer, $5 oysters",
  description: "French bistro with literary theme and intimate atmosphere",
  website: "https://littleprincenyc.com/"
},
  {
  id: 136,
  name: "The Ship",
  neighborhood: "soho",
  subNeighborhood: "SoHo",
  address: "158 Lafayette St, NY 10013",
  location: [
    40.7205,
    -73.9988
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "5:00 PM - 7:00 PM",
  deals: "$8 beer, $9 wine, $11 cocktails",
  description: "Nautical-themed cocktail bar with subterranean space",
  website: "https://theshipnyc.com/"
},
  {
  id: 137,
  name: "City Winery",
  neighborhood: "soho",
  subNeighborhood: "SoHo",
  address: "155 Varick St, NY 10013",
  location: [
    40.7263,
    -74.0055
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 6:00 PM",
  deals: "$7 house wine, $5 beer, discounted small plates",
  description: "Urban winery, restaurant, and music venue with house-made wines",
  website: "https://citywinery.com/"
},
  {
  id: 138,
  name: "Lola Taverna",
  neighborhood: "soho",
  subNeighborhood: "SoHo",
  address: "210 6th Ave, NY 10014",
  location: [
    40.7282,
    -74.0008
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "3:00 PM - 6:00 PM",
  deals: "$10 cocktails, $8 wine, $6 beer",
  description: "Greek taverna with Mediterranean menu and lively atmosphere",
  website: "https://lolatavernanyc.com/"
},
  {
  id: 139,
  name: "The Woo",
  neighborhood: "soho",
  subNeighborhood: "SoHo",
  address: "206 Spring St, NY 10012",
  location: [
    40.7259,
    -74.0032
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 6:00 PM",
  deals: "$7 cocktails, $5 beers, $6 wines",
  description: "Korean-inspired restaurant with craft cocktails",
  website: "https://thewoonyc.com/"
},
  {
  id: 140,
  name: "The Spring Lounge",
  neighborhood: "soho",
  subNeighborhood: "SoHo",
  address: "48 Spring St, NY 10012",
  location: [
    40.7216,
    -73.9963
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Historic dive bar with shark-themed decor and beer focus",
  website: "https://thespringlounge.com/"
},
  {
  id: 141,
  name: "The Mulberry",
  neighborhood: "soho",
  subNeighborhood: "Little Italy",
  address: "76 Mulberry St, NY 10013",
  location: [
    40.717,
    -73.9975
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Italian-American bar and restaurant with classic fare",
  website: ""
},
  {
  id: 142,
  name: "The Honey Well",
  neighborhood: "harlem",
  subNeighborhood: "Harlem",
  address: "3604 Broadway, NY 10031",
  location: [
    40.833,
    -73.9465
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Basement cocktail lounge with 70s decor and vinyl records",
  website: "https://thehoneywellnyc.com/"
},
  {
  id: 143,
  name: "The Edge Harlem",
  neighborhood: "harlem",
  subNeighborhood: "Harlem",
  address: "101 Edgecombe Ave, NY 10030",
  location: [
    40.8081,
    -73.9471
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$7 cocktails, $5 beers, $6 wines",
  description: "Caribbean-influenced restaurant with warm aesthetic",
  website: "https://theedgeharlem.com/"
},
  {
  id: 144,
  name: "Lolo's Seafood Shack",
  neighborhood: "harlem",
  subNeighborhood: "Harlem",
  address: "303 W 116th St, NY 10026",
  location: [
    40.8044,
    -73.9551
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Caribbean-New England seafood fusion in colorful beachside setting",
  website: "https://lolosseafoodshack.com/"
},
  {
  id: 145,
  name: "The Grange Bar & Eatery",
  neighborhood: "harlem",
  subNeighborhood: "Harlem",
  address: "1635 Amsterdam Ave, NY 10031",
  location: [
    40.8261,
    -73.9455
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Farm-to-table restaurant with craft cocktails and rustic setting",
  website: "https://thegrangenyc.com/"
},
  {
  id: 146,
  name: "Harlem Hops",
  neighborhood: "harlem",
  subNeighborhood: "Harlem",
  address: "2268 Adam Clayton Powell Jr Blvd, NY 10030",
  location: [
    40.8107,
    -73.9478
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 craft beers, $8 wines",
  description: "Black-owned craft beer bar focusing on small, independent breweries",
  website: "https://harlemhops.com/"
},
  {
  id: 147,
  name: "Harlem Tavern",
  neighborhood: "harlem",
  subNeighborhood: "Harlem",
  address: "2153 Frederick Douglass Blvd, NY 10026",
  location: [
    40.8028,
    -73.9549
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$8 select red & white wine, $9 sangria, $7 house mixed drinks",
  description: "Spacious beer garden with outdoor seating and live music",
  website: "https://harlemtavern.com/"
},
  {
  id: 148,
  name: "67 Orange Street",
  neighborhood: "harlem",
  subNeighborhood: "Harlem",
  address: "2130 Frederick Douglass Blvd, NY 10026",
  location: [
    40.8025,
    -73.9551
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "5:00 PM - 7:00 PM",
  deals: "$12 cocktails, $8 beer, $12 glasses of wine, $40 bottles",
  description: "Craft cocktail speakeasy named after historic Almack's dance hall",
  website: "https://67orangestreet.com/"
},
  {
  id: 149,
  name: "The Growler",
  neighborhood: "financial_district",
  subNeighborhood: "Financial District",
  address: "55 Stone St, NY 10004",
  location: [
    40.7043,
    -74.0103
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Historic Stone Street pub with extensive craft beer selection",
  website: "https://thegrowlernyc.com/"
},
  {
  id: 150,
  name: "The Black Hound",
  neighborhood: "financial_district",
  subNeighborhood: "Financial District",
  address: "301 South End Ave, NY 10280",
  location: [
    40.7113,
    -74.0168
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Craft cocktail lounge with upscale ambiance and small plates",
  website: "https://blackhoundny.com/"
},
  {
  id: 151,
  name: "The Beekman Pub",
  neighborhood: "financial_district",
  subNeighborhood: "Financial District",
  address: "15 Beekman St, NY 10038",
  location: [
    40.711,
    -74.0078
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Classic New York pub with historic character",
  website: "https://beekmanpub.com/"
},
  {
  id: 152,
  name: "The Paris Cafe",
  neighborhood: "financial_district",
  subNeighborhood: "South Street Seaport",
  address: "119 South St, NY 10038",
  location: [
    40.706,
    -74.0021
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Historic waterfront tavern dating back to 1873",
  website: "https://pariscafenyc.com/"
},
  {
  id: 153,
  name: "The Stone Street Tavern",
  neighborhood: "financial_district",
  subNeighborhood: "Financial District",
  address: "52 Stone St, NY 10004",
  location: [
    40.7039,
    -74.0101
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 drafts, $7 wines, $8 cocktails",
  description: "Colonial-era cobblestone street location with outdoor seating",
  website: "https://stonestreettavernnyc.com/"
},
  {
  id: 154,
  name: "Sereneco",
  neighborhood: "greenpoint",
  subNeighborhood: "Greenpoint",
  address: "113 Franklin St, Brooklyn, NY 11222",
  location: [
    40.7301,
    -73.9586
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$10 cocktails, $5-6 beers, $2 oysters",
  description: "Airy restaurant in historic Pencil Factory with seasonal cuisine",
  website: "https://sereneconyc.com/"
},
  {
  id: 155,
  name: "The Pencil Factory",
  neighborhood: "greenpoint",
  subNeighborhood: "Greenpoint",
  address: "142 Franklin St, Brooklyn, NY 11222",
  location: [
    40.731,
    -73.9582
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Historic bar in former pencil factory with old-school vibe",
  website: "https://pencilfactorybar.com/"
},
  {
  id: 156,
  name: "Elder Greene",
  neighborhood: "greenpoint",
  subNeighborhood: "Greenpoint",
  address: "160 Franklin St, Brooklyn, NY 11222",
  location: [
    40.7315,
    -73.9577
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Cozy cocktail bar with vintage vibe and elegant drinks",
  website: "https://eldergreene.com/"
},
  {
  id: 157,
  name: "Threes Brewing",
  neighborhood: "greenpoint",
  subNeighborhood: "Greenpoint",
  address: "113 Franklin St, Brooklyn, NY 11222",
  location: [
    40.7301,
    -73.9586
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Local brewery with experimental beers and food collaborations",
  website: "https://threesbrewing.com/"
},
  {
  id: 158,
  name: "Brooklyn Winery",
  neighborhood: "greenpoint",
  subNeighborhood: "Greenpoint",
  address: "61 Guernsey St, Brooklyn, NY 11222",
  location: [
    40.7249,
    -73.9534
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Urban winery with rustic chic decor and small-batch wines",
  website: "https://brooklynwinery.com/"
},
  {
  id: 159,
  name: "The Keep",
  neighborhood: "bushwick",
  subNeighborhood: "Bushwick",
  address: "205 Cypress Ave, Brooklyn, NY 11237",
  location: [
    40.7046,
    -73.9143
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Medieval-themed bar with absinthe focus and dark ambiance",
  website: "https://thekeepbk.com/"
},
  {
  id: 160,
  name: "The Wheelhouse",
  neighborhood: "bushwick",
  subNeighborhood: "Bushwick",
  address: "165 Wilson Ave, Brooklyn, NY 11237",
  location: [
    40.7011,
    -73.9277
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Neighborhood bar with bicycle theme and casual atmosphere",
  website: "https://wheelhousebk.com/"
},
  {
  id: 161,
  name: "The Evergreen",
  neighborhood: "bushwick",
  subNeighborhood: "Bushwick",
  address: "1281 Myrtle Ave, Brooklyn, NY 11221",
  location: [
    40.7,
    -73.9302
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Plant-filled cocktail bar with garden party atmosphere",
  website: "https://theevergreenbk.com/"
},
  {
  id: 162,
  name: "The Bad Old Days",
  neighborhood: "bushwick",
  subNeighborhood: "Ridgewood",
  address: "1684 Woodbine St, Brooklyn, NY 11237",
  location: [
    40.706,
    -73.9066
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Cozy neighborhood bar with vintage furniture and board games",
  website: ""
},
  {
  id: 163,
  name: "The Bodega",
  neighborhood: "bushwick",
  subNeighborhood: "Bushwick",
  address: "1402 St Nicholas Ave, Brooklyn, NY 11237",
  location: [
    40.7062,
    -73.9106
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Latinx-owned bar with convenience store theme and deli sandwiches",
  website: ""
},
  {
  id: 164,
  name: "The Double Windsor",
  neighborhood: "park_slope",
  subNeighborhood: "Park Slope",
  address: "210 Prospect Park West, Brooklyn, NY 11215",
  location: [
    40.662,
    -73.9798
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Craft beer bar with great burgers and casual vibe",
  website: "https://doublewindsorbk.com/"
},
  {
  id: 165,
  name: "Blueprint",
  neighborhood: "park_slope",
  subNeighborhood: "Park Slope",
  address: "196 5th Ave, Brooklyn, NY 11217",
  location: [
    40.6778,
    -73.9799
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Intimate cocktail bar with extensive wine list and small plates",
  website: "https://blueprintbrooklyn.com/"
},
  {
  id: 166,
  name: "The Commissioner",
  neighborhood: "park_slope",
  subNeighborhood: "Park Slope",
  address: "247 5th Ave, Brooklyn, NY 11215",
  location: [
    40.677,
    -73.9819
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Cocktail bar and restaurant with Irish whiskey focus",
  website: "https://thecommissionerbrooklyn.com/"
},
  {
  id: 167,
  name: "Freddy's Bar",
  neighborhood: "park_slope",
  subNeighborhood: "South Slope",
  address: "627 5th Ave, Brooklyn, NY 11215",
  location: [
    40.6647,
    -73.9884
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Historic dive bar with live music and quirky atmosphere",
  website: "https://freddysbar.com/"
},
  {
  id: 168,
  name: "High Dive",
  neighborhood: "park_slope",
  subNeighborhood: "Park Slope",
  address: "243 5th Ave, Brooklyn, NY 11215",
  location: [
    40.6773,
    -73.9818
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Relaxed bar with free popcorn, pinball, and jukebox",
  website: "https://highdivebrooklyn.com/"
},
  {
  id: 169,
  name: "Fonda",
  neighborhood: "park_slope",
  subNeighborhood: "Park Slope",
  address: "431 7th Ave, Brooklyn, NY 11215",
  location: [
    40.6663,
    -73.9847
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "5:00 PM - 7:00 PM",
  deals: "$7 classic margaritas, $6 draft beer, $8 wine",
  description: "Chef Roberto Santibañez's upscale Mexican restaurant",
  website: "https://fondarestaurant.com/"
},
  {
  id: 170,
  name: "Bar Basic",
  neighborhood: "park_slope",
  subNeighborhood: "Park Slope",
  address: "504 5th Ave, Brooklyn, NY 11215",
  location: [
    40.6684,
    -73.9863
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ],
  hours: "12:00 PM - 7:00 PM",
  deals: "$4 draft beers, $5 well drinks, $6 wine",
  description: "No-frills neighborhood bar with wallet-friendly happy hour",
  website: ""
},
  {
  id: 171,
  name: "Hugo & Sons",
  neighborhood: "park_slope",
  subNeighborhood: "Park Slope",
  address: "367 7th Ave, Brooklyn, NY 11215",
  location: [
    40.6681,
    -73.9839
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ],
  hours: "3:00 PM - 6:00 PM",
  deals: "$6 draft beer, $8 wine, $8 well drinks",
  description: "Italian-American restaurant with warm, homey atmosphere",
  website: "https://www.hugoandsons.com/"
},
  {
  id: 172,
  name: "Korzo",
  neighborhood: "park_slope",
  subNeighborhood: "Park Slope",
  address: "667 5th Ave, Brooklyn, NY 11215",
  location: [
    40.6639,
    -73.9889
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 Slovakian draft beers, $7 wine, $7 well drinks",
  description: "Central European restaurant known for fried-burger specialty",
  website: "https://www.korzobrooklyn.com/"
},
  {
  id: 173,
  name: "Pasta Louise",
  neighborhood: "park_slope",
  subNeighborhood: "Park Slope",
  address: "803 8th Ave, Brooklyn, NY 11215",
  location: [
    40.6586,
    -73.9871
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 6:00 PM",
  deals: "$6 draft beer, $8 wine, $8 select cocktails",
  description: "Family-friendly Italian restaurant with handmade pasta",
  website: "https://www.pastalouise.com/"
},
  {
  id: 174,
  name: "The Stumble Inn",
  neighborhood: "upper_east_side",
  subNeighborhood: "Upper East Side",
  address: "1454 2nd Ave, NY 10021",
  location: [
    40.7699,
    -73.9554
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "Open - 7:00 PM",
  deals: "Half off everything",
  description: "Fun sports bar with games and extensive draft beer selection",
  website: ""
},
  {
  id: 175,
  name: "Jake's Dilemma",
  neighborhood: "upper_west_side",
  subNeighborhood: "Upper West Side",
  address: "430 Amsterdam Ave, NY 10024",
  location: [
    40.7851,
    -73.9778
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "3:00 PM - 7:00 PM",
  deals: "Half off entire bar, with some exclusions",
  description: "Lively sports bar with arcade games and casual atmosphere",
  website: "https://www.jakesdilemmanyc.com/"
},
  {
  id: 176,
  name: "Hillstone",
  neighborhood: "nomad",
  subNeighborhood: "NoMad",
  address: "378 Park Ave S, NY 10010",
  location: [
    40.7429,
    -73.9841
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 6:00 PM",
  deals: "$8 cocktails, $6 beers, $7 wines",
  description: "Upscale American restaurant chain with consistent quality",
  website: "https://hillstonerestaurant.com/"
},
  {
  id: 177,
  name: "The Playwright",
  neighborhood: "nomad",
  subNeighborhood: "NoMad",
  address: "27 W 35th St, NY 10001",
  location: [
    40.75,
    -73.9852
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beers, $7 wines, $8 cocktails",
  description: "Irish pub with theater district vibe and traditional fare",
  website: "https://playwrighttavern.com/"
},
  {
  id: 178,
  name: "The Cannibal",
  neighborhood: "nomad",
  subNeighborhood: "NoMad",
  address: "113 E 29th St, NY 10016",
  location: [
    40.7435,
    -73.9827
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beers, $8 wines, $10 cocktails",
  description: "Butcher shop and restaurant focusing on meat dishes and craft beer",
  website: "https://thecannibalnyc.com/"
},
  {
  id: 179,
  name: "Tavern 29",
  neighborhood: "nomad",
  subNeighborhood: "NoMad",
  address: "47 E 29th St, NY 10016",
  location: [
    40.744,
    -73.9848
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$7 beer, $8 wine, $9 select cocktails",
  description: "Three-story gastropub with rooftop beer garden",
  website: ""
},
  {
  id: 180,
  name: "Tara Rose",
  neighborhood: "kips_bay",
  subNeighborhood: "Kips Bay",
  address: "384 3rd Ave, NY 10016",
  location: [
    40.7415,
    -73.9805
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$7 cocktails, 2-for-14 bites, BOGO apps",
  description: "Modern Irish pub with cocktail focus and upscale atmosphere",
  website: "https://tararosenyc.com/"
},
  {
  id: 181,
  name: "Sundays Well",
  neighborhood: "kips_bay",
  subNeighborhood: "Kips Bay",
  address: "360 3rd Ave, NY 10016",
  location: [
    40.741,
    -73.9806
  ],
  days: [
    "sunday"
  ],
  hours: "All Day",
  deals: "$10 specialty drinks, $10 burger, $1 oysters",
  description: "Irish-owned neighborhood bar with game screenings",
  website: "http://www.sundayswellnyc.com/"
},
  {
  id: 182,
  name: "The Gem Saloon",
  neighborhood: "kips_bay",
  subNeighborhood: "Kips Bay",
  address: "375 3rd Ave, NY 10016",
  location: [
    40.7414,
    -73.9803
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$8 wine, $5 beer, half-price drinks",
  description: "Western-themed bar with craft cocktails and vintage decor",
  website: "http://www.thegemsaloonnyc.com/"
},
  {
  id: 183,
  name: "Bella Union",
  neighborhood: "kips_bay",
  subNeighborhood: "Kips Bay",
  address: "411 3rd Ave, NY 10016",
  location: [
    40.7426,
    -73.979
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "Check website for current specials",
  description: "Italian-American restaurant with welcoming atmosphere",
  website: "http://www.bellaunionnyc.com/"
},
  {
  id: 184,
  name: "Ernie O'Malley's",
  neighborhood: "kips_bay",
  subNeighborhood: "Kips Bay",
  address: "140 E 27th St, NY 10016",
  location: [
    40.7426,
    -73.9821
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "Until 7:00 PM",
  deals: "Good beer selection for drafts and cans",
  description: "Traditional Irish pub with historical namesake",
  website: "https://www.ernieomalleys.com/"
},
  {
  id: 185,
  name: "Dog & Bone Tavern",
  neighborhood: "kips_bay",
  subNeighborhood: "Kips Bay",
  address: "3rd Ave, NY 10016",
  location: [
    40.7417,
    -73.9805
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "Check venue for current specials",
  description: "British-style pub with traditional fare and ales",
  website: ""
},
  {
  id: 186,
  name: "Albion",
  neighborhood: "murray_hill",
  subNeighborhood: "Murray Hill",
  address: "575 2nd Ave, NY 10016",
  location: [
    40.7452,
    -73.9772
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "3:00 PM - 7:00 PM",
  deals: "$6 beer, $7 wine, $9 cocktails",
  description: "British-inspired gastropub with craft beer and quality pub fare",
  website: "http://albionnyc.com/"
},
  {
  id: 187,
  name: "The Junction",
  neighborhood: "murray_hill",
  subNeighborhood: "Murray Hill",
  address: "329 Lexington Ave, NY 10016",
  location: [
    40.7463,
    -73.9793
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$6 beer, $7 wine, $8 well drinks",
  description: "Casual neighborhood bar with sports screen and friendly staff",
  website: "http://thejunctionnyc.com/"
},
  {
  id: 188,
  name: "Park Avenue Tavern",
  neighborhood: "murray_hill",
  subNeighborhood: "Murray Hill",
  address: "99 Park Ave, NY 10016",
  location: [
    40.7488,
    -73.9798
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "3:00 PM - 6:00 PM",
  deals: "$8 signature cocktails, $7 wine, $6 beer",
  description: "Elegant tavern with self-serve beer taps and speakeasy basement",
  website: "http://parkavenuetavernnyc.com/"
},
  {
  id: 189,
  name: "Slattery's Midtown Pub",
  neighborhood: "murray_hill",
  subNeighborhood: "Murray Hill",
  address: "8 E 36th St, NY 10016",
  location: [
    40.7496,
    -73.9819
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$5 beer, $6 wine, $8 well drinks",
  description: "Classic Irish pub with sports screens and traditional menu",
  website: "http://slatterysmidtownpub.com/"
},
  {
  id: 190,
  name: "La Cava Wine Bar",
  neighborhood: "murray_hill",
  subNeighborhood: "Murray Hill",
  address: "939 2nd Ave, NY 10022",
  location: [
    40.7539,
    -73.9684
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 7:00 PM",
  deals: "$8 glasses of wine, $7 beer, discounted charcuterie",
  description: "Cozy wine bar with Spanish and Italian influences",
  website: "http://lacavany.com/"
},
  {
  id: 191,
  name: "Murray Hill Local",
  neighborhood: "murray_hill",
  subNeighborhood: "Murray Hill",
  address: "539 3rd Ave, NY 10016",
  location: [
    40.7481,
    -73.9775
  ],
  days: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
  ],
  hours: "4:00 PM - 8:00 PM",
  deals: "$6 beer, $7 wine, $8 cocktails",
  description: "Neighborhood bar with rustic charm and friendly service",
  website: "http://murrayhilllocal.com/"
},
  {
  id: 192,
  name: "Ethyl's Alcohol & Food",
  neighborhood: "upper_east_side",
  subNeighborhood: "Upper East Side",
  address: "1629 2nd Ave, NY 10028",
  location: [
    40.7774,
    -73.9512
  ],
  days: [
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ],
  hours: "5:00 PM - 7:00 PM",
  deals: "$5 beer, $6 wine, $10 select cocktails",
  description: "70s-themed bar with go-go dancers and retro atmosphere",
  website: ""
}
];

// Apply the image paths to all venues
const happyHourDeals = addImagesToDeals(happyHourDealsOriginal, restaurantImageMapping);

// Log the total number of happy hour deals for debugging
console.log("Total happy hour deals loaded:", happyHourDeals.length);