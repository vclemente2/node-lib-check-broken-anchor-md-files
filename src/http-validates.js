import chalk from 'chalk'

function extractLinks(objectData) {
    return objectData.map((item) => Object.values(item).join());
}

async function validatedList(linkList) {
    const result = await Promise
        .all(linkList.map(async (link) => {
            try {
                const response = await fetch(link, { method: 'HEAD' });
                return response.status;
            } catch (error) {
                return 500
            }
        }))

    return result;
}

function errorHandling() {
    console.log(chalk.red('deu erro'))
}

export default async function httpValidate(data) {
    const links = extractLinks(data);
    const statusList = await validatedList(links)

    return data.map((item, index) => {
        return {
            ...item,
            statusCode: statusList[index]
        }
    })
}
