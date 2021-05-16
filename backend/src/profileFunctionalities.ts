const xss = require('xss')

import { Pool } from 'mysql';
import { JsonObjectExpression } from 'typescript';
const connectionPool: Pool = require('../connectionPool.ts');



/**
 * Returns user profile or err
 * @param user_id
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

/**
 * Returns a specified user's activities
 * @param userId
 * @returns
 */
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
                if (err) reject({ http_id: 400, message: "Failed to find user id" })
                else {
                
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

/**
 * A user can review another user
 * @param user_id
 * @param organizer_id
 * @param review
 * @param votes
 * @returns
 */
const voteOnOrganizer = (user_id: number, organizer_id: number, review: string, votes: number) => {
    const clean_user_id: number = xss(user_id);
    const clean_organizer_id: number = xss(organizer_id);
    const clean_review: string = xss(review);
    const clean_votes: number = xss(votes);

    const query: string = `INSERT INTO ${process.env.DATABASE_SCHEMA}.user_reviews (user_id, rating_score, review, voter_id)
                            VALUES (?, ?, ?,?)`;
    const inputs: Array<string | number> = [clean_organizer_id, clean_votes, clean_review, clean_user_id];

    return (new Promise((resolve, reject) => {
        connectionPool.query(query, inputs, (err, result, fields) => {
            if (err) reject({ http_id: 400, message: err["message"] })
            else resolve({ http_id: 200, message: "Success" })
        })
    })).then((success) => { return success; })
        .catch((err) => { return err })
}


module.exports = {
    getProfile,
    getActivity,
    voteOnOrganizer

}