const xss = require('xss')

import { Pool } from 'mysql';
import { JsonObjectExpression } from 'typescript';
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
            async (err, result, fields) => {
                if (err) reject({ http_id: 400, message: "Failed to get user" })
                else {
                    if (result.length != 0) {
                        let hashedPassword = result[0].password;
                        let salt = result[0].salt;
                        let inputPassword: string = hash.hash(xss(password), salt);

                        
                        if (hashedPassword == inputPassword) {

                            const tokenResponse: any = await createUserToken(cleanUsername)
                            if (tokenResponse.http_id == 200) {
                                resolve({ http_id: 200, message: "Log in successful and token generated", username: tokenResponse.username, token: tokenResponse.token })
                            } else
                                resolve({ http_id: 200, message: "Log in successful without token" });


                        }
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

const loginWithToken = (token: string, username: string) => {
    const cleanUsername: string = xss(username);
    const cleanToken = xss(token);

    const query: string = `SELECT * FROM ${process.env.DATABASE_SCHEMA}.user 
                                WHERE user_id=(
                                    SELECT user_id FROM ${process.env.DATABASE_SCHEMA}.login_token 
                                        WHERE login_token = ? AND user_id=(
                                            SELECT user_id FROM ${process.env.DATABASE_SCHEMA}.user 
                                                WHERE username = ?))`
    const inputs: Array<string> = [cleanToken, cleanUsername]

    return (new Promise((resolve, reject) => {
        connectionPool.query(
            query,
            inputs,
            (err, result, fields) => {
                if (err) reject({ http_id: 400, message: "Failed to find login token" })
                else {
                    if (result.length == 0)
                        reject({ http_id: 400, message: "Token not found" })
                    else
                        resolve({ http_id: 200, message: "Token found successfully", user: result[0] })
                }
            }
        )
    }))
}

const createUserToken = (username: string) => {
    const cleanUsername: string = xss(username);
    const token = hash.newLoginToken();

    const query: string = `INSERT INTO ${process.env.DATABASE_SCHEMA}.login_token (user_id, login_token) VALUES 
                            ((SELECT user_id from ${process.env.DATABASE_SCHEMA}.user WHERE username = ?), ?)`
    const inputs: Array<string> = [cleanUsername, token]

    return (new Promise((resolve, reject) => {
        connectionPool.query(query, inputs, (err, result, fields) => {
            if (err)
                reject({ http_id: 400, message: "Failed to connect to db" })
            else
                resolve({ http_id: 200, message: "Successfully created token", username: cleanUsername, token: token })
        })
    }))
}


module.exports = {
    loginUser,
    loginWithToken
}