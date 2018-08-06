'use strict';

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

sequelize.sync();

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
        if(projects.length === 0) {
            console.log("No Current Projects!");
        } else {
            console.log("Projects");
            projects.forEach(function(project) {
                console.log(project.dataValues.name + ': ' + project.dataValues.path);
            });
        }
    });
}

/*var navigate = funtction(name) {

}*/

var cli = function() {
    var argv = require('yargs')
        .alias('a', 'Add Project Path')
        .alias('r', 'Remove Priject Path')
        .alias('l', 'List Projects')
        .alias('h', 'help')
        .help('h')
        .argv;

    var path = 'json';
    if (argv._[0]) {
        console.log('Going to project ' + argv._[0]);
    } else if (argv.a) {
        if(argv.a === true) {
            console.log('Please provide a project name to add');
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


