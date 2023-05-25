import chalk from 'chalk';
import fs from 'fs/promises';

const readFile = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
}

const asyncPrint = async (asyncFunc, filePath) => {
    const data = await asyncFunc(filePath);
    console.log(chalk.blue(data));
}

asyncPrint(readFile, './arquivos/texto.md');
