export const esErrorDuplicado = (error: any): boolean => {
    if (!error) return false;

    // Caso clásico: MongoDB (índice único) responde code 11000.
    if (error.code === 11000) return true;

    // Mongoose 9: el "unique" valida con una query previa y lanza un
    // MongooseError cuyo mensaje es el custom del schema (sin code 11000).
    // Los mensajes de todos los modelos contienen "registrad..." o "único".
    if (error.name === 'MongooseError' && /registr|únic|E11000|duplicate/i.test(String(error.message))) return true;

    return false;
};

export default { esErrorDuplicado };