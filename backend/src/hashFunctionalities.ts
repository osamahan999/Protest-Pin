import * as crypto from 'crypto';


export const getSalt = () => {
    return crypto.randomBytes(16).toString('hex')

}

const dog : string = "hi"

export const hash = (password: string, salt: string) => {
    const hashAlgorithm = crypto.createHash('sha256'); // imports the sha256 hashing algorithm from the crypto module
    const pwd = hashAlgorithm.update(salt + password).digest('hex') //hashes the combination of salt and hash using sha256 and converts to hex
    
    return pwd;


}