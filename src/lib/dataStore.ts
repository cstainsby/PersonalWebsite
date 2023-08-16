
import { JSON_BLOB_LOCATION } from '$env/static/private'

async function getJsonBlobById(userId: number) {
    return await fetch(JSON_BLOB_LOCATION)
        .then(fullBlobSet => fullBlobSet.json())
        .then(jsonBlob => jsonBlob[userId])
}

export {
    getJsonBlobById
}