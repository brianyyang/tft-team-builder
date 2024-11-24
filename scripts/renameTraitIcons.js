const fs = require('fs').promises;
const path = require('path');

// Get the command-line arguments
const args = process.argv.slice(2);

// Default values for parameters
let traitFilePath = '';
let setNumber = -1;

// Parse the arguments
for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '-tfp':
    case '--traitFilePath':
      traitFilePath = args[i + 1];
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

async function renameFiles(filePath) {
  try {
    // Read JSON file
    const jsonString = await fs.readFile(path.resolve(filePath), 'utf8');
    const data = JSON.parse(jsonString);
    const directory = `../public/assets/set${setNumber}/traits`;

    data.map((trait) => {
      const oldFileName = path.basename(trait.icon_path);
      const newFileName = trait.trait_id.toLowerCase();
      const oldPath = `${directory}/${oldFileName}`;
      const newPath = `${directory}/${newFileName}.png`;

      // Rename the file
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error('Error renaming file:', err);
        }
      });
      console.log(`File: ${oldFileName} renamed to ${newFileName}!`);
    });
  } catch (err) {
    console.log('Error renaming trait icon files: ', err);
    process.exit(1);
  }
}

if (setNumber <= 0) {
  console.log('Not given set number for the rename.');
  process.exit(1);
}
if (traitFilePath == '') {
  console.log('Not given file path for the trait json.');
  process.exit(1);
}

renameFiles(traitFilePath);
