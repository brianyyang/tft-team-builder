const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const setNumberToFilterBy = process.argv[3];
const filterIconPaths = process.argv[4];

if (!filePath || !setNumberToFilterBy) {
  console.log(
    'Usage: node filterTraitData.js <filePath> <setNumber> <filterIconPaths>'
  );
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

// Function to filter JSON data and change image icon paths for downloading assets
function filterIconPathsBySetNumber(data, setNumber) {
  return data.reduce((result, trait) => {
    if (trait.set === `TFTSet${setNumber}`) {
      result.push({ ...trait, icon_path: mapPathFromJson(trait.icon_path) });
    }
    return result;
  }, []);
}

// In the JSON files, asset paths can be mapped to URLs:
// /lol-game-data/assets/<path> -> plugins/rcp-be-lol-game-data/global/default/<lowercased-path>.
const mapPathFromJson = (pathFromJson) => {
  const keyword = 'assets';
  const keywordIndex = pathFromJson.indexOf(keyword);

  if (keywordIndex !== -1) {
    // Extract the path starting right after the word assets
    const result = pathFromJson
      .substring(keywordIndex + keyword.length)
      .toLowerCase()
      .replace('.tex', '.png')
      .replace('.jpg', '.png');
    return `plugins/rcp-be-lol-game-data/global/default${result}`;
  } else {
    console.log(`Keyword not found in the path: ${pathFromJson}`);
    process.exit(1);
  }
};

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
    convertedBreakpoints.push({
      championsRequired: breakpoint.min_units,
      color: breakpoint.style_name.substring(1).toLowerCase(),
    })
  );
  convertedBreakpoints.sort(
    (a, b) => a.championsRequired - b.championsRequired
  );
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
    let filteredData;
    if (filterIconPaths === 'true') {
      filteredData = filterIconPathsBySetNumber(data, setNumberToFilterBy);
    } else {
      // Filter data into typescript traits
      filteredData = filterBySetNumber(data, setNumberToFilterBy);
    }

    const sortedData = filteredData.sort((trait1, trait2) =>
      trait1.name < trait2.name ? -1 : 1
    );

    // Write filtered data to a new JSON file in the same directory as the input file
    const outputFileName =
      filterIconPaths === 'true' ? 'traiticons.json' : 'traits.json';
    const outputFilePath = path.join(path.dirname(filePath), outputFileName);
    fs.writeFile(outputFilePath, JSON.stringify(sortedData, null, 2), (err) => {
      if (err) {
        console.log('Error writing file:', err);
        return;
      }
      console.log(`Filtered data written to '${outputFilePath}'`);
    });
  } catch (err) {
    console.log('Error parsing JSON:', err);
  }
});
