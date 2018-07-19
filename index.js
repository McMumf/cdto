'use strict';

const minimist = require('minimist');
const fs = require('fs');

var content = fs.readFileSync('paths.json');
var paths = JSON.parse(content);

let args = minimist(process.argv.slice(2), {
    alais: {
        a: 'add',
        name: 'project',
        path: 'path',
        h: 'help',
        v: 'version'
    }
});

console.log("args:", args);

console.log(args.a);

if(args.a) {
    var newPath = {
        name: args.name,
        path: args.path
    }
    console.log(newPath);
    paths += newPath;
    fs.writeFile("paths.json", paths);
}

