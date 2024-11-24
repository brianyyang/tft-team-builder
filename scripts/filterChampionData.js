const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const setNumber = process.argv[3];
const filterIconPaths = process.argv[4];

if (!filePath || !filterIconPaths || !setNumber) {
  console.log(
    'Usage: node filterChampionData.js <filePath> <setNumber> <filterIconPaths>'
  );
  process.exit(1);
}

// Function to filter JSON data and change image icon paths for to download assets
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

// Function to filter JSON data and change image icon paths for tft team builder
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
  return `/assets/set${setNumber}/champions/${championId}/${pathParts.base}`;
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

    const sortedData = filteredData.sort((champion1, champion2) =>
      champion1.name < champion2.name ? -1 : 1
    );

    // Write filtered data to a new JSON file in the same directory as the input file
    const outputFileName =
      filterIconPaths === 'true' ? 'champicons.json' : 'champions.json';
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
