const xss = require('xss')

import { Pool } from 'mysql';
const connectionPool: Pool = require('../connectionPool.ts');


/**
 * 
 * @param user_id ID of user creating the event
 * @param event_name Name of the event 
 * @param event_description Description of the event
 * @returns 
 */
const createEvent =
    (
        user_id: Number,
        event_name: string,
        event_description: string
    ) => {
        const clean_user_id = xss(user_id)
        const clean_event_name = xss(event_name)
        const clean_event_description = xss(event_description)

        const query: string = `INSERT INTO ${process.env.DATABASE_SCHEMA}.event (organizer_id, event_name, event_description) VALUES (?,?,?)`
        const inputs: Array<Number | string> = [clean_user_id, clean_event_name, clean_event_description]

        return (new Promise((resolve, reject) => {
            connectionPool.query(
                query,
                inputs,
                (err, result, fields) => {
                    if (err) reject({ http_id: 400, message: "Failed to create event" })
                    else resolve({ http_id: 200, message: "Event made successfully" })
                }
            )
        })).then((success) => {
            return success
        })
            .catch((err) => {
                return err
            })
    }

module.exports = {
    createEvent
}