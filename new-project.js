// open terminal and type "node new-project.js"
// PS: you need to have nodejs and npm installed from your package manager



// prompt-sync installation check
const {execSync} = require('child_process');
const fs = require('fs');

try {
    require('prompt-sync');
    console.log('prompt-sync is already installed.');
} catch (error) {
    console.log('prompt-sync is not installed. Installing...');

    try {
        execSync('npm install prompt-sync', {stdio: 'inherit'});
        console.log('prompt-sync has been installed successfully.');
    } catch (installError) {
        console.error('Failed to install prompt-sync:', installError);
        process.exit(1);
    }
}

const prompt = require('prompt-sync')();

let projectName;
let projectDirectory;

while (true) {
    projectName = prompt("Project name: ");

    if (fs.existsSync(`${__dirname}/${projectName}.html`)) {
        console.log(`A file named '${projectName}.html' already exists. Please choose a different name.`);
    } else {
        break;
    }
}

while (true) {
    projectDirectory = prompt("Project Directory Name (leave empty for current directory): ");

    // Skip the check if the directory is empty
    if (projectDirectory !== "" && fs.existsSync(`${__dirname}/${projectDirectory}`)) {
        console.log(`A directory named '${projectDirectory}' already exists. Please choose a different name.`);
    } else {
        break;
    }
}


// File creation logic
let projectHTML;
let projectCSS;
let projectJS;

if (projectDirectory === "") {
    projectHTML = `${__dirname}/${projectName}.html`;
    projectCSS = `${__dirname}/styles/${projectName}.css`;
    projectJS = `${__dirname}/scripts/${projectName}.js`;

} else {
    projectHTML = `${__dirname}/${projectDirectory}/${projectName}.html`;
    projectCSS = `${__dirname}/${projectDirectory}/styles/${projectName}.css`;
    projectJS = `${__dirname}/${projectDirectory}/scripts/${projectName}.js`;

    fs.mkdirSync(`${__dirname}/${projectDirectory}`, { recursive: true});
    fs.mkdirSync(`${__dirname}/${projectDirectory}/styles`, { recursive: true});
    fs.mkdirSync(`${__dirname}/${projectDirectory}/scripts`, { recursive: true});
}


fs.writeFile(projectHTML, "", (err) => {
    if (err) {
        console.error(`Error creating file: ${err.message}`);
        return
    }
    console.log('File created successfully!');
})
fs.writeFile(projectCSS, "", (err) => {
    if (err) {
        console.error(`Error creating file: ${err.message}`);
        return
    }
    console.log('File created successfully!');
})
fs.writeFile(projectJS, "", (err) => {
    if (err) {
        console.error(`Error creating file: ${err.message}`);
        return
    }
    console.log('File created successfully!');
})

try {
    execSync('npm remove prompt-sync', {stdio: 'inherit'});
    console.log('prompt-sync has been removed successfully.');
} catch (installError) {
    console.error('Failed to remove prompt-sync:', installError);
    process.exit(1);
}

fs.unlink(__dirname + '/package.json', (err) => {
    if (err) {
        console.error('Error deleting file:', err);
        return;
    }
    console.log('File deleted successfully');
})
fs.unlink(__dirname + '/package-lock.json', (err) => {
    if (err) {
        console.error('Error deleting file:', err);
        return;
    }
    console.log('File deleted successfully');
})
try {
    fs.rmSync(__dirname + '/node_modules', { recursive: true, force: true });
    console.log('Directory and its contents deleted successfully');
} catch (err) {
    console.error('Error deleting directory and its contents:', err);
}