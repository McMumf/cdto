'use strict';

const hashmap = require('hashmap');
const minimist = require('minimist');

// Create hashmap
var projects = new hashmap();

// Read Arguments
let args = minimist(process.argv.slice(2), {
    alais: {
        a: 'add',
        name: 'project',
        path: 'path',
        h: 'help',
        v: 'version'
    }
});

if(args.a) {
    var newPath = {
        name: args.a,
        path: process.cwd()
    }
    projects.set(newPath.name, newPath.path);
    console.log(projects.size);
}

