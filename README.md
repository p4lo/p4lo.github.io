# NYC Happy Hour Finder

A web application to find the best happy hour deals in New York City neighborhoods with an interactive map view and detailed listings.

## Features

- Interactive map showing 192 happy hour locations across Manhattan, Brooklyn, and surrounding areas
- List view with detailed information about each happy hour deal
- Filter by neighborhood (Manhattan: West Village, East Village, etc.; Brooklyn: Williamsburg, Bushwick, Park Slope)
- Filter by day of the week
- View special deals and pricing for each venue
- Direct links to venue websites
- Mobile-responsive design

## Technology Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- Leaflet.js for interactive mapping

## Setup

1. Clone this repository
2. Open `index.html` in your browser
3. No build process required - works right out of the box!

## Easy Hosting Options

The simplest ways to host this static website are:

1. **GitHub Pages** (Free)
   - Create a GitHub repository and push the code
   - Go to repository Settings > Pages
   - Select your main branch as the source

2. **Netlify** (Free)
   - Create a Netlify account
   - Drag and drop your project folder to their upload area
   - Your site will be live instantly with a random subdomain

3. **Vercel** (Free)
   - Create a Vercel account
   - Connect to your Git repository or upload files
   - Automatically deploys and hosts your site

## Real Data

The application features real New York City bars and restaurants:

- 192 actual venues across Manhattan, Brooklyn, and surrounding areas
- Real happy hour times and special deals
- Accurate location data for mapping
- Authentic venue descriptions
- Direct links to venue websites

Neighborhoods included:

**Manhattan (120+ venues):**
- West Village (17 venues)
- East Village (17 venues)
- Lower East Side (17 venues)
- Midtown (21 venues)
- Chelsea (17 venues)
- Times Square (8 venues)
- Murray Hill (12 venues)
- Financial District (7 venues)
- Upper East Side (4 venues)
- NoMad (5 venues)
- SoHo (11 venues)
- Harlem (7 venues)
- Kips Bay (6 venues)
- Hell's Kitchen (1 venue)
- Nolita (1 venue)
- Union Square (1 venue)
- Gramercy (1 venue)
- Upper West Side (1 venue)

**Brooklyn (35+ venues):**
- Williamsburg (11 venues)
- Bushwick (10 venues)
- Park Slope (10 venues)
- Greenpoint (5 venues)

## Data Sources and Organization

All the data comes from real NYC establishments and has been compiled into a centralized source:

1. Created a comprehensive CSV file (`manhattan_happy_hours_complete.csv`)
2. Combined data from multiple sources
3. Fully formatted for the application with consistent structure
4. Organized by borough and neighborhood with geographical coordinates

The consolidated data structure includes:
```
- Name
- Neighborhood
- Address
- Location coordinates
- Days of the week
- Happy hour times
- Special deal details
- Venue description
- Website URL
```

## Future Enhancements

Planned enhancements include:
- User location services to find nearby happy hours
- Filtering by deal types (best for beer, wine, cocktails, food)
- User ratings and reviews
- Photo gallery integration
- "Happy Hour Now" feature to show only currently active deals
- Expansion to additional boroughs (Queens, Bronx, Staten Island)
- Advanced filtering by price range and deal type

## License

MIT