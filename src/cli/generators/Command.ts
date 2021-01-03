import * as fs from 'fs';

export const command: string = 'make:command [name]'
export const desc = 'Create a command for cli'
export const builder: object = {
    name: { // command name
        required: true
    }
}

// command template
const template: string = `
export const command :string = 'command:test'
export const desc :string = 'Describe the command function'
export const builder :object = {}
export const handler = (argv) => {}`;

export const handler = (argv) => {
    const commandDir = './src/cli/Commands/'; // default command directory
    // TODO add folder support
    const commandFile = commandDir + argv.name + '.ts'; // command file that will create
    fs.stat(commandFile, (err, stats) => {
        if (typeof stats == "undefined") { // if stats is undefined, file doesn't exists
            fs.writeFile(commandFile, template, {
                flag: 'wx' // write flag
            }, function (err) {
                if (err) throw new Error(err.message);
                console.log(argv.name + " command created");
            });
        } else {
            throw new Error('Command exists');
        }
    })

}