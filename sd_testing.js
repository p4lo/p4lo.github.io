const fs = require('fs');
const path = require('path');

// Read the data file
const dataFilePath = path.join(__dirname, './src/utils/data.js');
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

// Extract the array from the file content using regex
const arrayMatch = fileContent.match(/\[[\s\S]*\]/);
if (!arrayMatch) {
    console.error('Could not find array in data.js');
    process.exit(1);
}

// Evaluate the array (be careful with this in production!)
const data = eval(arrayMatch[0]);

function convertToCSV(data) {
    // Get headers from first object's keys
    const headers = Object.keys(data[0]);
    
    // Create CSV header row
    let csv = headers.join(',') + '\n';
    
    // Add data rows
    data.forEach(row => {
        let values = headers.map(header => {
            let value = row[header];
            
            // Handle arrays - convert to semicolon separated string
            if (Array.isArray(value)) {
                value = `"${value.join(';')}"`;
            }
            // Handle strings that may contain commas
            else if (typeof value === 'string') {
                value = `"${value.replace(/"/g, '""')}"`;
            }
            
            return value;
        });
        
        csv += values.join(',') + '\n';
    });

    return csv;
}

// Convert to CSV
const csv = convertToCSV(data);

// Save to file
const outputPath = path.join(__dirname, './bars.csv');
fs.writeFileSync(outputPath, csv);

console.log(`CSV file has been created at: ${outputPath}`);