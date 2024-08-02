const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
// const setNumberToFilterBy = process.argv[3];
const filterIconPaths = process.argv[3];

if (!filePath || !filterIconPaths) {
  console.log('Usage: node filterTFTData.js <filePath> <filterIconPaths>');
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

// Function to filter JSON data and change image icon paths for TFT planner
function filterToChampionType(data) {
  return data[Object.keys(data)[0]].reduce((result, champion) => {
    const championId = champion.character_id.toLowerCase();
    result.push({
      id: championId,
      name: champion.display_name,
      tier: champion.tier,
      traits: convertTraits(champion.traits),
      iconPath: convertToProject(
        mapPathFromJson(champion.squareIconPath),
        championId
      ),
      splashPath: convertToProject(
        mapPathFromJson(champion.squareSplashIconPath),
        championId
      ),
    });
    return result;
  }, []);
}

function convertTraits(traits) {
  return traits.reduce((result, trait) => {
    result.push({ id: trait.id.toLowerCase(), name: trait.name });
    return result;
  }, []);
}

const convertToProject = (filePath, championId) => {
  const pathParts = path.parse(filePath);
  return `/assets/champions/${championId}/${pathParts.base}`;
};

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
      filteredData = filterPlannerIconPaths(data);
    } else {
      // Filter data into typescript champion
      filteredData = filterToChampionType(data);
    }

    // Write filtered data to a new JSON file in the same directory as the input file
    const outputFileName =
      filterIconPaths === 'true' ? 'icons.json' : 'champions.json';
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
