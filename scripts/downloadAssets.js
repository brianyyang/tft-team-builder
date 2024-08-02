const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const filePath = process.argv[2];
const patch = process.argv[3] || 'latest';

const BASEURL = `https://raw.communitydragon.org/${patch}/`;
const DELETE_TIMEOUT = 7000;

if (!filePath) {
  console.log('Usage: node downloadAssets.js <filePath>');
  process.exit(1);
}

// Function to delete unneeded files
async function deleteUnneeded(directory, extensionToKeep) {
  try {
    const files = await fs.readdir(directory);

    const deletePromises = files
      .filter((file) => path.extname(file) !== extensionToKeep)
      .map((file) => fs.unlink(path.join(directory, file)));

    await Promise.all(deletePromises);
  } catch (err) {
    console.error('Error deleting files:', err);
  }
}

// Function to run a command
function runCommunityDragonDirectoryDownloader(url, champion) {
  const urlParts = path.parse(url);
  const projectPath = '../public/assets/champions/' + champion;
  const command = `cd-dd -o ${projectPath} ${urlParts.dir}/`;
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

async function processFile(filePath) {
  try {
    // Read JSON file
    const jsonString = await fs.readFile(path.resolve(filePath), 'utf8');
    const data = JSON.parse(jsonString);
    const deleteList = [];

    data.map((champion) => {
      const championId = champion.character_id.toLowerCase();
      const outputPath = '../public/assets/champions/' + championId;
      runCommunityDragonDirectoryDownloader(
        BASEURL + champion.squareIconPath,
        championId
      );
      runCommunityDragonDirectoryDownloader(
        BASEURL + champion.squareSplashIconPath,
        championId
      );
      deleteList.push(outputPath);
    });

    // wait 7 seconds for all the downloads, then we can delete the unwanted downloaded stuff
    setTimeout(() => {
      deleteList.map((outputPath) => {
        deleteUnneeded(outputPath, '.png');
      });
    }, DELETE_TIMEOUT);
  } catch (err) {
    console.log('Error reading file:', err);
  }
}

processFile(filePath);
