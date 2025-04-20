// Script to merge existing venues with new venues
const fs = require('fs');
const path = require('path');

// Read the existing data.js file
let existingDataContent = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');

// Extract the array from the data.js file
const happyHourDealsMatch = existingDataContent.match(/const happyHourDeals = \[([\s\S]*)\];/);
if (!happyHourDealsMatch) {
  console.error('Could not parse data.js file');
  process.exit(1);
}

// Import the new venues
const newVenues = require('./new_venues');

// Create the merged content
const header = `// NYC Happy Hour Finder - Comprehensive Dataset
// Data compiled from multiple sources including CSV and text files
// Last updated: April 2025
const happyHourDeals = [`;

// Extract the existing data array content without the closing bracket
const existingDataArray = happyHourDealsMatch[1];

// Create the merged file content
const mergedContent = `${header}${existingDataArray},
  
  // New venues added from additional data sources
  ${newVenues.map(venue => JSON.stringify(venue, null, 2).replace(/"([^"]+)":/g, '$1:')).join(',\n  ')}
];`;

// Write the merged content to data.js
fs.writeFileSync(path.join(__dirname, 'data.js'), mergedContent);

console.log('Successfully merged venue data!');
console.log(`Total venues: ${101 + newVenues.length}`);