'use strict';

var shell = require('shelljs');
var Sequelize = require("sequelize");


const sequelize = new Sequelize({
    dialect: 'sqlite',
    // SQLite only
    storage: './projects.sqlite',
    logging: false,
    operatorsAliases: false,
});

const Project = sequelize.define('project', {
    name: Sequelize.STRING,
    path: Sequelize.STRING
    });

var addProject = function(name, path) {
    Project.create({
        name: name,
        path: path
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
            shell.exec('open -a Terminal \"' + project.path + '\"');
        }
    });
}

var cli = function() {

    var fs = require('fs');
    var path = './projects.sqlite'

    if (!fs.existsSync(path)) {
        fs.openSync(path, 'w');
        fs.closeSync(fs.openSync(path, 'w'));
    }

    sequelize.sync();

    var argv = require('yargs')
        .alias('a', 'Add Project Path')
        .alias('r', 'Remove Priject Path')
        .alias('l', 'List Projects')
        .alias('h', 'help')
        .help('h')
        .argv;

    var path = 'json';
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
    } else {

    }
}

exports.cli = cli;


