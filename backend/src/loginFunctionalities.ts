const xss = require('xss')

import { Pool } from 'mysql';
const connectionPool: Pool = require('../connectionPool.ts');

const hash = require('../src/hashFunctionalities')


/**
 * Takes in a username and a password, generates a salt, hashes the password
 * with the generated salt, and inserts the Username, Password, and Salt into the datbase. 
 * 
 * Note: Database checks for uniqueness of username. Returns error if not unique
 * @param username 
 * @param password 
 * 
 * @return {http_id = 400 | 200, 
 * message = "Failed to create a user" | "Successfully created a user"} 
 */
const loginUser = (username: string, password: string) => {
    const cleanUsername: string = xss(username);

    const salt: string = hash.getSalt();

    // const cleanPassword: string = hash.hash(xss(password), salt);

    //The question marks get replaced with the inputs in the inputs array.
    //This is done to prevent sql injection attacks
    const query: string = `SELECT * FROM ${process.env.DATABASE_SCHEMA}.user WHERE username=?`;
    // const inputs: Array<string> = [cleanUsername, cleanPassword, salt];

    /**
     * We return a promise due to synchronicity issues
     */
    return (new Promise((resolve, reject) => {
        //connectionPool.query automatically gets a connection from our pool, queries, and then releases it.
        connectionPool.query(
            query,
            cleanUsername,
            (err, result, fields) => {
                if (err) reject({ http_id: 400, message: "Failed to get user" })
                else {
                    if (result.length != 0) {
                        let hashedPassword = result[0].password;
                        let salt = result[0].salt;
                        let inputPassword: string = hash.hash(xss(password), salt);

                        
                        if (hashedPassword == inputPassword) 
                            resolve({ http_id: 200, message: "Log in successful" });
                        else 
                            reject({ http_id: 400, message: "Username or password is incorrect"});
                    }
                    else reject({http_id: 400, message: "Username does not exist"})


                }
                


            })
    })).then((success) => {
        return success;
    }).catch((err) => {
        return err;
    })
}



module.exports = {
    loginUser
}