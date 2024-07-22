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
  return data.reduce((result, champion) => {
    if (champion.name.includes('TFT' + setNumber)) {
      result.push({
        ...champion,
        character_record: {
          ...champion.character_record,
          squareIconPath: mapPathFromJson(
            champion.character_record.squareIconPath
          ),
        },
      });
    }
    return result;
  }, []);
}

// In the JSON files, asset paths can be mapped to URLs:
// /lol-game-data/assets/ASSETS/<path> -> plugins/rcp-be-lol-game-data/global/default/<lowercased-path>.
const mapPathFromJson = (pathFromJson) => {
  const keyword = 'ASSETS';
  const keywordIndex = pathFromJson.indexOf(keyword);

  if (keywordIndex !== -1) {
    // Extract the path starting right after the word assets
    const result = pathFromJson
      .substring(keywordIndex + keyword.length)
      .toLowerCase()
      .replace('.tex', '.png');
    return `plugins/rcp-be-lol-game-data/global/default/${result}`;
  } else {
    console.log(`Keyword not found in the path: ${pathFromJson}`);
    process.exit(1);
  }
};

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
