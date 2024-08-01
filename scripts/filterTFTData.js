const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const setNumberToFilterBy = process.argv[3];
const filterPlanner = process.argv[4];

if (!filePath || !setNumberToFilterBy) {
  console.log(
    'Usage: node filterTFTData.js <filePath> <setNumber> <filterPlanner>'
  );
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

// Function to filter JSON data and change image icon paths for TFT planner
function filterPlannerIconPaths(data) {
  return data[Object.keys(data)[0]].reduce((result, champion) => {
    result.push({
      ...champion,
      squareIconPath: mapPathFromJson(champion.squareIconPath),
      squareSplashIconPath: mapPathFromJson(champion.squareSplashIconPath),
    });
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
    return `plugins/rcp-be-lol-game-data/global/default${result}`;
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

    let filteredData;
    if (filterPlanner) {
      filteredData = filterPlannerIconPaths(data);
    } else {
      // Filter data by set
      filteredData = filterBySetNumber(data, setNumberToFilterBy);
    }

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
/**
 * 
Hi, I'm Brian! My goal this year was to stream at least twice a week. Currently I'm playing two games, Celeste on Tuesdays and Outer Wilds on Thursdays. I'm excited to share my first playthroughs on stream with y'all :)
Currently I'm playing two games, Celeste on Tuesdays and Outer Wilds on Thursdays. I'm excited to share my first playthroughs on stream with y'all :)
*/
