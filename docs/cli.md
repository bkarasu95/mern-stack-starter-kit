# CLI

## Command Generating

You can create your commands.

```shellscript
    node cli make:command <name>
```

It generates a command with required fields. You can execute the command after the created, you don't need the register the command or something. Just be careful that command needs to be in cli/commands folder.

You may execute with:

```shellscript
    node cli <command>
```

To view a list of all available commands, you may use the list command:

```shellscript
    node cli --help
```
