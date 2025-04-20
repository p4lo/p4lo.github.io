# Manhattan Happy Hour Finder

A web application to find the best happy hour deals in Manhattan neighborhoods with an interactive map view and detailed listings.

## Features

- Interactive map showing happy hour locations across Manhattan neighborhoods
- List view with detailed information about each happy hour deal
- Filter by neighborhood (East Village, West Village, Lower East Side, Midtown, etc.)
- Filter by day of the week
- View special deals and pricing for each venue
- Links to venue websites
- Responsive design for desktop and mobile devices

## Technology Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- Leaflet.js for interactive mapping

## Setup

1. Clone this repository
2. Open `index.html` in your browser
3. No build process required - works out of the box!

## Real Data

The application uses real bar and restaurant data from Manhattan with:

- 50 actual venues across multiple neighborhoods
- Real happy hour times and special deals
- Accurate location data for mapping
- Authentic venue descriptions and pricing
- Links to official websites

Neighborhoods included:
- East Village
- West Village
- Lower East Side
- Upper East Side
- Midtown
- Chelsea

## Data Structure

Happy hour deals are stored in the `src/utils/data.js` file with comprehensive details:

```javascript
{
  id: 1,
  name: "Venue Name",
  neighborhood: "east_village",
  subNeighborhood: "East Village",
  address: "Full address",
  location: [latitude, longitude],
  days: ["monday", "tuesday", "wednesday"],
  hours: "4:00 PM - 7:00 PM",
  deals: "Description of happy hour specials and pricing",
  description: "Brief description of the venue",
  website: "https://venue-website.com/"
}
```

The raw data is also available in CSV format (`Manhattan Happy Hour Expanded CSV.csv`) for reference or future updates.

## Future Enhancements

Planned future enhancements include:
- User location services to find nearby happy hours
- Filtering by deal types (best for beer, wine, cocktails, food)
- User ratings and reviews
- Photo gallery of venues and drinks
- "Happy Hour Now" feature to show only currently active deals

## License

MIT