import * as crypto from 'crypto';


/**
 * @returns {string} Returns a 32 length hex string of random bytes
 */
const getSalt = () => {
    return crypto.randomBytes(16).toString('hex')

}

/**
 * 
 * Uses SHA256 hashing algorithm to hash the salt concattenated with the password and returns the hash string
 * 
 * @param password {string}
 * @param salt {string}
 * 
 * @return hashedPassword {string} length 64
 */
const hash = (password: string, salt: string) => {
    const hashAlgorithm = crypto.createHash('sha256'); // imports the sha256 hashing algorithm from the crypto module
    const pwd = hashAlgorithm.update(salt + password).digest('hex') //hashes the combination of salt and hash using sha256 and converts to hex

    return pwd;


}

module.exports = {
    getSalt,
    hash
}