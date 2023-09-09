const BASE_URL = "https://uam-proyect-production.up.railway.app"

function getFilePath(file){
    const filePath = file.path;
    const fileSplit = filePath.split("/")

    return `${fileSplit[1]}/${fileSplit[2]}`;
}

function getImageUrl(imagePath){
    console.log(`${BASE_URL}/${imagePath}`);
    return `${BASE_URL}/${imagePath}`;
}

module.exports = {
    getFilePath,
    getImageUrl
}