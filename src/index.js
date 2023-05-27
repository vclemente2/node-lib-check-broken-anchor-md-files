import fs from 'fs/promises';

const readFile = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf-8');
    const results = await extractLinks(data.toString());

    return results;
}

const extractLinks = async (text) => {
    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s]*?)\)/gm;
    const caught = [...text.matchAll(regex)];

    const results = caught.map(item => {
        return { [item[1]]: item[2] }
    });

    return results;
}

export default readFile;
