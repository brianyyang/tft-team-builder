const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

// Get the command-line arguments
const args = process.argv.slice(2);

// Default values for parameters
let downloadType = '';
let championFilePath = '';
let patchNumber = -1;
let setNumber = -1;

// Parse the arguments
for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '-dt':
    case '--downloadType':
      downloadType = args[i + 1]; // the value after the flag
      i++; // skip the next argument since it's a value
      break;
    case '-cfp':
    case '--championFilePath':
      championFilePath = args[i + 1];
      i++;
      break;
    case '-p':
    case '-patch':
      patchNumber = parseInt(args[i + 1]);
      if (isNaN(patchNumber)) {
        console.log('Patch is not a valid number, given: ' + args[i + 1]);
        process.exit(1);
      }
      i++;
      break;
    case '-s':
    case '-set':
      setNumber = parseInt(args[i + 1]);
      if (isNaN(setNumber)) {
        console.log('Set is not a valid number, given: ' + args[i + 1]);
        process.exit(1);
      }
      i++;
      break;
    default:
      console.log(`Unknown option: ${args[i]}`);
  }
}

// Constants
const BASEURL = `https://raw.communitydragon.org/${
  patchNumber > 0 ? patchNumber : 'latest'
}/`;
const TRAIT_ICON_URL = 'game/assets/ux/traiticons/placeholder'; // add a placeholder file name because of my poorly written code
const SECONDS = 1000; // 1000 milliseconds in a second, use for conversion

// Function to delete unneeded files
async function deleteUnneeded(
  directory,
  extensionToKeep,
  substringToKeep = ''
) {
  try {
    const files = await fs.readdir(directory);

    const deletePromises = files
      .filter(
        (file) =>
          path.extname(file) !== extensionToKeep ||
          !file.includes(substringToKeep)
      )
      .map((file) => fs.unlink(path.join(directory, file)));

    await Promise.all(deletePromises);
  } catch (err) {
    console.error('Error deleting files:', err);
  }
}

// Function to run a command
function runCommunityDragonDirectoryDownloader(urlToDownloadFrom, outputPath) {
  const urlParts = path.parse(urlToDownloadFrom);
  const command = `cd-dd -o ${outputPath} ${urlParts.dir}/`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return;
    }

    console.log(`Command output: ${stdout}`);
  });
}

async function processChampionFile(filePath) {
  try {
    // Read JSON file
    const jsonString = await fs.readFile(path.resolve(filePath), 'utf8');
    const data = JSON.parse(jsonString);
    const deleteList = [];

    // download champion assets
    data.map((champion) => {
      const championId = champion.id.toLowerCase();
      const outputPath = `../public/assets/set${setNumber}/champions/${championId}`;
      runCommunityDragonDirectoryDownloader(
        BASEURL + champion.iconPath,
        outputPath
      );
      runCommunityDragonDirectoryDownloader(
        BASEURL + champion.splashPath,
        outputPath
      );
      deleteList.push(outputPath);
    });

    // wait 7 seconds for all the downloads, then we can delete the unwanted downloaded stuff
    setTimeout(() => {
      deleteList.map((outputPath) => {
        deleteUnneeded(outputPath, '.png');
      });
    }, 7 * SECONDS);
  } catch (err) {
    console.log('Error reading file:', err);
    process.exit(1);
  }
}

async function donwloadTraitAssets() {
  try {
    const outputPath = `../public/assets/set${setNumber}/traits`;
    runCommunityDragonDirectoryDownloader(BASEURL + TRAIT_ICON_URL, outputPath);

    // wait 7 seconds for all the downloads, then we can delete the unwanted downloaded stuff
    setTimeout(() => {
      deleteUnneeded(outputPath, '.png', setNumber.toString());
    }, 15 * SECONDS);
  } catch (err) {
    console.log('Error downloading trait assets: ', err);
    process.exit(1);
  }
}

switch (downloadType) {
  case 'champions':
    if (championFilePath == '') {
      console.log('Not given file path for the champion json.');
      process.exit(1);
    }
    if (setNumber <= 0) {
      console.log('Not given set number for the champion assets download.');
      process.exit(1);
    }
    processChampionFile(championFilePath);
    break;
  case 'traits':
    if (setNumber <= 0) {
      console.log('Not given set number for the trait assets download.');
      process.exit(1);
    }
    donwloadTraitAssets();
    break;
  default:
    console.log(`Unknown or missing asset download type: ${downloadType}`);
}
