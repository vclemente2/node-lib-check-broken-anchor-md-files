import readFile from './index.js'

const path = process.argv;

console.log(await readFile(path[2]));
