const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const setNumberToFilterBy = process.argv[3];

if (!filePath || !setNumberToFilterBy) {
  console.log('Usage: node filterTraitData.js <filePath> <setNumber>');
  process.exit(1);
}

// Function to filter JSON data by set number
function filterBySetNumber(data, setNumber) {
  return data.reduce((result, trait) => {
    if (trait.set === `TFTSet${setNumber}`) {
      result.push(convertTrait(trait));
    }
    return result;
  }, []);
}

function convertTrait(trait) {
  return {
    id: trait.trait_id.toLowerCase(),
    name: trait.display_name,
    activeCount: 0,
    breakpoints: convertTraitBreakpoints(trait.conditional_trait_sets),
  };
}

function convertTraitBreakpoints(breakpoints) {
  const convertedBreakpoints = [];
  breakpoints.map((breakpoint) =>
    convertedBreakpoints.push(breakpoint.min_units)
  );
  convertedBreakpoints.sort((a, b) => a - b);
  return convertedBreakpoints;
}

// Read JSON file
fs.readFile(path.resolve(filePath), 'utf8', (err, jsonString) => {
  if (err) {
    console.log('Error reading file:', err);
    return;
  }
  try {
    const data = JSON.parse(jsonString);

    const filteredData = filterBySetNumber(data, setNumberToFilterBy);

    // Write filtered data to a new JSON file in the same directory as the input file
    const outputFileName = 'traits.json';
    const outputFilePath = path.join(path.dirname(filePath), outputFileName);
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
