#!/usr/bin/env node
program = require('commander');
https = require('https');
var exec = require('child_process').exec;

// Setup
let version = '0.0.3';
let installList = require('./version-data.js')
let current = "2.4.1";


// Process Args
program
    .version(version)
    .option('-d, --downgrade [version]', 'Downgrade deps to be compatible with [version]')
    .parse(process.argv)

// Ensure we are running the latest version
ensureLatest();

// Validate we are in an Angular project

// Run the appropriate npm install commands
let ver = program.downgrade;
if (ver) {
    console.log("You asked for version `" + program.downgrade + "`");

} else {
    console.log("Installing version " + current);
    ver = current;
}

if (ver in installList) {

    let installs = ""

    for (let key of Object.keys(installList[ver])) {
        installs += key + '@' + installList[ver][key] + " ";
    }
    let cmd = `npm install ${installs} --save`;
    console.log(cmd);
    child = exec(cmd).stderr.pipe(process.stderr);
} else {
    console.log("Requested version `" + ver + "` was not found.");
    console.log("Try one of:");
    console.log(Object.keys(installList));
}


function ensureLatest() {

    https.get('https://fluindotio-website-93127.firebaseio.com/versions/depup.json', (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
            let re = /(\d+)\.(\d+)\.(\d+)/;
            let newest = re.exec(rawData);
            let current = re.exec(version);
            for (let i = 1; i <= 3; i++) {
                if (current[i] < newest[i]) {
                    console.log('Warning, you are running an out of date version. Run:\n\n' +
                        'npm install -g depup\n\n' +
                        'current: ' + version + '\n' +
                        'newest:  ' + JSON.parse(rawData));
                }
            }

        });
    });
}