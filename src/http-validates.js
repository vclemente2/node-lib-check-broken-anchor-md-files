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
                return errorHandling(error)
            }
        }))

    return result;
}

function errorHandling(error) {
    if (error.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado'
    } else {
        return 'Erro ao efetuar a requisição'
    }
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
