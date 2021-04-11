const xss = require('xss')

import { Pool } from 'mysql';
const connectionPool: Pool = require('../connectionPool.ts');


/**
 * 
 * @param user_id ID of user creating the event
 * @param event_name Name of the event 
 * @param event_description Description of the event
 * @param time_of_event     When the event is happening
 * @param latitude
 * @param longitude
 * @returns 
 */
const createEvent =
    (
        user_id: Number,
        event_name: String,
        event_description: String,
        time_of_event: String,
        latitude: Number,
        longitude: Number

    ) => {
        const clean_user_id = xss(user_id)
        const clean_event_name = xss(event_name)
        const clean_event_description = xss(event_description)
        const clean_time_of_event: Date = new Date(xss(time_of_event))
        const clean_latitude = +xss(latitude)
        const clean_longitude = +xss(longitude)

        const query: string = `INSERT INTO ${process.env.DATABASE_SCHEMA}.event 
            (organizer_id, event_name, event_description, time_of_event, latitude, longitude) VALUES (?,?,?,?,?,?)`
        const inputs: Array<Number | string> = [clean_user_id, clean_event_name, clean_event_description, clean_time_of_event, clean_latitude, clean_longitude]

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

const getEvents = () => {
    const query: string = `SELECT * FROM ${process.env.DATABASE_SCHEMA}.event `

    return (new Promise((resolve, reject) => {
        connectionPool.query(
            query,
            [],
            (err, result, fields) => {
                if (err) reject({ http_id: 400, message: "Failed to get events" })
                else resolve({ http_id: 200, message: result })
            }
        )
    }))
}

const joinEvent = (login_token: string, event_id: number) => {
    const clean_token: string = xss(login_token);
    const clean_event_id: number = xss(event_id);
    const inputs: Array<number | string> = [clean_event_id, clean_token];

    const join_event_query: string =
        `INSERT INTO 
            ${process.env.DATABASE_SCHEMA}.user_attending_event 
                (event_id, user_id) 
            VALUES 
                (?, (SELECT user_id FROM ${process.env.DATABASE_SCHEMA}.login_token WHERE login_token.login_token=?))`;

    return (new Promise((resolve, reject) => {
        connectionPool.query(join_event_query, inputs, (err, result, fields) => {
            if (err) reject({ http_id: 400, message: "Failed to join event" })
            else resolve({ http_id: 200, message: "Successfully joined event!" })
        })
    }))
}

const getUserEvents = (user_token: string) => {
    const clean_user_token: string = xss(user_token)
    const query: string = `SELECT * FROM ${process.env.DATABASE_SCHEMA}.user_attending_event 
        WHERE user_attending_event.user_id=
            (SELECT user_id FROM ${process.env.DATABASE_SCHEMA}.login_token WHERE login_token.login_token=?)`
    const inputs: Array<string> = [clean_user_token];

    return (new Promise((resolve, reject) => {
        connectionPool.query(
            query,
            inputs,
            (err, result, fields) => {
                if (err) reject({ http_id: 400, message: "Failed to get events" })
                else resolve({ http_id: 200, message: result })
            }
        )
    }))
}


module.exports = {
    createEvent,
    getEvents,
    joinEvent,
    getUserEvents
}