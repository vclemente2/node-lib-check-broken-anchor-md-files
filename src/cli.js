import chalk from 'chalk';
import fs from 'fs';
import readFile from './index.js'
import httpValidate from './http-validates.js';

const path = process.argv;

async function processText(data) {
    const argPath = data[2]
    const validate = data[3] === '--validate'

    try {
        if (fs.lstatSync(argPath).isFile()) {
            const linkList = await readFile(argPath)
            print(validate, linkList);

        } else if (fs.lstatSync(argPath).isDirectory()) {
            const files = await fs.promises.readdir(argPath);

            files.forEach(async (file) => {
                const linkList = await readFile(`${argPath}/${file}`)
                print(validate, linkList, file)
            })
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            return console.log(chalk.red('File or directory not found.'));
        }
    }
}

async function print(validate, data, fileName = '') {
    validate ?
        console.log(
            chalk.yellow('validated links'),
            chalk.black(chalk.bgGreen(fileName)),
            await httpValidate(data)
        )
        :
        console.log(
            chalk.yellow('link list'),
            chalk.black(chalk.bgGreen(fileName)),
            data
        );
}

processText(path)
