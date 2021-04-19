const xss = require('xss')

import { Pool } from 'mysql';
import { JsonObjectExpression } from 'typescript';
const connectionPool: Pool = require('../connectionPool.ts');



/**

 * 
 * Note: Database checks for uniqueness of username. Returns error if not unique
 * @param username 
 * 
 * @return {http_id = 400 | 200, 
 * message = "Failed to create a user" | "Successfully created a user"} 
 */
const getProfile = (userId: Number) => {
    const cleanUserId: string = xss(userId);

    //The question marks get replaced with the inputs in the inputs array.
    //This is done to prevent sql injection attacks
    const query: string = `SELECT * FROM ${process.env.DATABASE_SCHEMA}.user_profile WHERE user_id=?`;
    // const inputs: Array<string> = [cleanUsername, cleanPassword, salt];

    /**
     * We return a promise due to synchronicity issues
     */
    return (new Promise((resolve, reject) => {
        //connectionPool.query automatically gets a connection from our pool, queries, and then releases it.
        connectionPool.query(
            query,
            cleanUserId,
            async (err, result, fields) => {
                if (err) reject({ http_id: 400, message: "Failed to get profile for user" })
                else {
                    if (result.length != 0) {
                        resolve({ http_id: 200, result})

            
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

const getActivity = (userId: Number) => {
    const cleanUserId = xss(userId);

    const query: string = `SELECT * FROM ${process.env.DATABASE_SCHEMA}.user_attending_event
                                WHERE user_id=?`
    const inputs: Array<string> = [cleanUserId]

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
                        resolve({ http_id: 200, message: result })
                }
            }
        )
    })).then((success) => {
        return success;
    }).catch((err) => {
        return err;
    })
}



module.exports = {
    getProfile,
    getActivity

}