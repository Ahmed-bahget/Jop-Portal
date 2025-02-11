import DatauriParser from 'datauri/parser.js';

import path from 'path';

const getDataUri = (file)=> {
    const Parser = new DatauriParser();
    const extName = path.extname(file.originalname).toString();
    return Parser.format(extName, file.buffer);
}

export default getDataUri; 