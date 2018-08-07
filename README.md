# cdto

A npm package to make navigating to projects in the command line easier

## Commands

```shell
    -a: add
    --name: name of project
    --path: path of project
```

## Example

```shell
    cdto -a --name=petproject --name=*pathtoproject*
```

This command adds the current directory you are in, and binds the current
directory to the project name `cdto`

## TODO

    1) Add Windows & Linux Options
    2) Add Command to Edit Project Paths
    3) Add Options to Change Terminal Location

## Knwon Issues

    * Sometimes new terminal windows cannot read the sqlite databse
        * Researching more efficient ways to store projects
    * Sometimes name is null


