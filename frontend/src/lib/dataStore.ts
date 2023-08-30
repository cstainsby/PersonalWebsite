
import { LOCAL_DATA_DIR } from '$env/static/private'

/**
 * read page data from local storageS
 * @param userId 
 * @returns 
 */
async function readPageJsonById(userId: number) {
    const jsonDataPath = `${LOCAL_DATA_DIR}/sampleInfoJson.json`
    
    return await fetch(`${jsonDataPath}`)
        .then(fullBlobSet => fullBlobSet.json())
        .then(jsonBlob => jsonBlob[userId])
        .catch(err => {
            throw err
        })
}

/**
 * read a local project readme from local storage
 * @param projectName 
 * @returns Promise for text content
 */
async function readReadmeFromLocal(projectName: string): Promise<string> {
    const filePath = `${LOCAL_DATA_DIR}/readme/${projectName}/README.md`;

    return await fetch(`${filePath}`)
        .then(readmeFileRes => readmeFileRes.text())
        .catch(err => {
            throw err
        })
}

export {
    readPageJsonById,
    readReadmeFromLocal
}