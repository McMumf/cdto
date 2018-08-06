# goto

A npm package to make navigating to projects in the command line easier

## Commands

```shell
    -a: add
```

## Example

```shell
    goto -a goto
```

This command adds the current directory you are in, and binds the current
directory to the project name `goto`

## TODO

    1) Store Projects
        * Use hashmap and store in memory?
        * Use JSON file to store long term?
        * Read JSON file into system memory as hashmap at system startup?
    2) Register Program as Environment Variable