'use strict';

var shell = require('shelljs');
var Sequelize = require('sequelize');
var os = require('os');
var homeDIR = os.homedir();
var fs = require('fs');
require('dotenv').config();

var sequelize;

switch(os.platform()) {
    case 'linux':
    case "darwin":
        sequelize = new Sequelize({
            dialect: 'sqlite',
            // SQLite only
            storage: homeDIR + '/projects.sqlite',
            logging: false,
            operatorsAliases: false,
        });
        break;
    case 'win32':
        sequelize = new Sequelize({
            dialect: 'sqlite',
            // SQLite only
            storage: homeDIR + '/projects.sqlite',
            logging: false,
            operatorsAliases: false,
        });
        break;
    default:
        console.log('Operating System not Supported');
        break;
};

const Project = sequelize.define('project', {
    name: Sequelize.STRING,
    path: Sequelize.STRING
});

var checkDB = function() {
    switch(os.platform()) {
        case "linux":
        case "darwin":
            if (!fs.existsSync(homeDIR + '/projects.sqlite')) {
                fs.open("" + homeDIR + '/projects.sqlite', 'w', (err, fd) => {
                    if (err) throw err;
                    fs.close(fd, err => { if (err)throw err; });
                });
            }
            break;
        case 'win32':
            if (!fs.existsSync(homeDIR+ '/projects.sqlite')) {
                fs.open("" + homeDIR + '/projects.sqlite', 'w', (err, fd) => {
                    if (err) throw err;
                    fs.close(fd, err => { if (err)throw err; });
                });
            }
            break;
        default:
            console.log('Operating System not Supported');
            break;
    };
    sequelize.sync();
}

var addProject = function(name, projectPath) {
    Project.create({
        name: name,
        path: projectPath
    }).then(project => {
        console.log(project.name + ' added at ' + project.path);
    });
}

var removeProject = function(name) {
    Project.destroy({
        where: {
            name: name
        }
    }).then(function() {
        console.log(name + ' removed!');
    });
}

var listProjects = function() {
    Project.findAll({

    }).then(projects => {
        if(!projects) {
            console.log("No Current Projects!");
        } else {
            console.log("Projects");
            projects.forEach(function(project) {
                console.log(project.dataValues.name + ': ' + project.dataValues.path);
            });
        }
    });
}

var navigate = function(name) {
    Project.findOne({
        where: {
            name: name
        }
    }).then(project => {
        if(!project) {
            console.log("No Project Found");
        } else {
            console.log('navigating to ' + project.name);
            switch(os.platform()) {
                case "darwin":
                    shell.exec('open -a Terminal "' + project.path + '"');
                    break;
                case 'win32':
                    shell.exec('start cmd /K "cd ' + project.name + '"');
                    break;
                case 'linux':
                    console.log('Coming Soon!');
                    //shell.exec('gnome-terminal ');
                    break;
                default:
                    console.log('Operating System not Supported');
                    break;
            };
        }
    });
}

var cli = function() {

    var pjson = require('./package.json');

    checkDB();

    var argv = require('yargs')
        .alias('a', 'Add Project Path')
        .alias('r', 'Remove Priject Path')
        .alias('l', 'List Projects')
        .alias('v', 'Version')
        .alias('h', 'Help')
        .help('h')
        .argv;

    if (argv._[0]) {
        navigate(argv._[0]);
    } else if (argv.a) {
        if(argv.a === true && argv.name && argv.path) {
            addProject(argv.name, argv.path);
        } else {
            addProject(argv.a, process.cwd());
        }
    } else if (argv.r) {
        if(argv.r === true) {
            console.log('Please provide a project name to remove');
        } else {
            removeProject(argv.r);
        }
    } else if (argv.l) {
        listProjects();
    } else if (argv.v) {
        console.log(pjson.version)
    } else {
        console.log('Not a valid command');
    }
}

exports.cli = cli;


