import { readFileSync } from "fs";
import { join } from "path"

const localDataDir = join(process.cwd(), "/src/localdata")

/**
 * read page data from local storageS
 * @param userId 
 * @returns 
 */
function readPageJsonById(userId: number) {
    const dataPath = join(localDataDir, "sampleInfoJson.json")
    const jsonData = readFileSync(dataPath, 'utf-8')
    const parsedData = JSON.parse(jsonData)
    
    return parsedData[userId]
}

/**
 * read a local project readme from local storage
 * @param projectName 
 * @returns text content of readme
 */
function readReadmeFromLocal(projectName: string): string {
    const dataPath = join(localDataDir, "readme", projectName, "README.md")
    const readmeData = readFileSync(dataPath, 'utf-8')
    // const parsedData = JSON.parse(jsonData)
    
    return readmeData
}

export {
    readPageJsonById,
    readReadmeFromLocal
}