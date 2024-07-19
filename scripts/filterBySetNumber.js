const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const setNumberToFilterBy = process.argv[3];

if (!filePath || !setNumberToFilterBy) {
  console.log('Usage: node filterByName.js <filePath> <setNumber>');
  process.exit(1);
}

// Function to filter JSON data by set number
function filterBySetNumber(data, setNumber) {
  return data.filter((champion) => champion.name.includes('TFT' + setNumber));
}

// Read JSON file
fs.readFile(path.resolve(filePath), 'utf8', (err, jsonString) => {
  if (err) {
    console.log('Error reading file:', err);
    return;
  }
  try {
    const data = JSON.parse(jsonString);

    // Filter data by name (e.g., 'Alice')
    const filteredData = filterBySetNumber(data, setNumberToFilterBy);

    // Write filtered data to a new JSON file uin the same directory as the input file
    const outputFilePath = path.join(path.dirname(filePath), 'champions.json');
    fs.writeFile(
      outputFilePath,
      JSON.stringify(filteredData, null, 2),
      (err) => {
        if (err) {
          console.log('Error writing file:', err);
          return;
        }
        console.log(`Filtered data written to '${outputFilePath}'`);
      }
    );
  } catch (err) {
    console.log('Error parsing JSON:', err);
  }
});
