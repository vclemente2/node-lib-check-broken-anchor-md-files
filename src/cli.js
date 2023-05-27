import chalk from 'chalk';
import fs from 'fs';
import readFile from './index.js'

const path = process.argv;

async function processText(data) {
    const argPath = data[2]

    try {
        if (fs.lstatSync(argPath).isFile()) {
            const linkList = await readFile(argPath)
            print(linkList);

        } else if (fs.lstatSync(argPath).isDirectory()) {
            const files = await fs.promises.readdir(argPath);

            files.forEach(async (file) => {
                const linkList = await readFile(`${argPath}/${file}`)
                print(linkList, file)
            })
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            return console.log(chalk.red('File or directory not found.'));
        }
    }
}

function print(data, fileName) {
    fileName ?
        console.log(
            chalk.yellow('link list'),
            chalk.black(chalk.bgGreen(fileName)),
            data
        )
        :
        console.log(
            chalk.yellow('link list'),
            data
        );
}

processText(path)
