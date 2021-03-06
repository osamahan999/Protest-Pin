const xss = require('xss')

import { Pool } from 'mysql';
const connectionPool: Pool = require('../connectionPool.ts');


/**
 * Creates an event
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

/**
 * Gets all the events
 * @returns All event data
 */
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
    })).then((success) => {
        return success
    }).catch((err) => {
        return err
    })
}

/**
 * Adds a user to user_attending_event for a event
 * @param user_id The user joining
 * @param event_id The event they want to join
 * @returns
 */
const joinEvent = (user_id: number, event_id: number) => {
    const clean_user_id: number = xss(user_id);
    const clean_event_id: number = xss(event_id);
    const inputs: Array<number> = [clean_event_id, clean_user_id];

    const join_event_query: string =
        `INSERT INTO 
            ${process.env.DATABASE_SCHEMA}.user_attending_event 
                (event_id, user_id) 
            VALUES 
                (?, ?)`;

    return (new Promise((resolve, reject) => {
        connectionPool.query(join_event_query, inputs, (err, result, fields) => {
            if (err) reject({ http_id: 400, message: "Failed to join event" })
            else resolve({ http_id: 200, message: "Successfully joined event!" })
        })
    })).then((success) => {
        return success
    }).catch((err) => {
        return err
    })
}

/**
 * Removes user from event
 * @param user_id The user leaving
 * @param event_id Event to leave
 * @returns
 */
const leaveEvent = (user_id: number, event_id: number) => {
    const clean_user_id: number = xss(user_id)
    const clean_event_id: number = xss(event_id);

    const query: string = `DELETE FROM ${process.env.DATABASE_SCHEMA}.user_attending_event WHERE user_id=? and event_id=?`;
    const inputs: Array<number> = [clean_user_id, clean_event_id];

    return (new Promise((resolve, reject) => {
        connectionPool.query(query, inputs, (err, result, fields) => {
            if (err) reject({ http_id: 400, message: "Failed to leave event" })
            else resolve({ http_id: 200, message: "Left event" })
        })
    })).then((success) => { return success }).catch((err) => { return err })
}
/**
 * Gets events info and if user rated the event
 * @param user_id
 * @returns
 */
const getUserEvents = (user_id: number) => {
    const clean_user_id: number = xss(user_id);
    const query: string = `SELECT A.event_id, A.organizer_id, A.event_name, A.event_description, A.creation_date, 
            A.time_of_event, A.latitude, A.longitude, A.votes, A.total_stars, IFNULL(B.user_id, -1) AS "user_id",
            IFNULL((SELECT votes FROM ${process.env.DATABASE_SCHEMA}.user_voted_on_event C WHERE C.user_id=? AND C.event_id=A.event_id), -1) AS "Votes"
            FROM ${process.env.DATABASE_SCHEMA}.event A left outer join ${process.env.DATABASE_SCHEMA}.user_attending_event B 
            on A.event_id=B.event_id and B.user_id=?`
    const inputs: Array<number> = [clean_user_id, clean_user_id];

    return (new Promise((resolve, reject) => {
        connectionPool.query(
            query,
            inputs,
            (err, result, fields) => {
                if (err) reject({ http_id: 400, message: "Failed to get events" })
                else resolve({ http_id: 200, message: result })
            }
        )
    })).then((success) => {
        return success
    }).catch((err) => {
        return err
    })
}

/**
 * Returns a users username and rating
 * @param user_id
 * @returns
 */
const getUserRating = (user_id: number) => {
    const clean_user_id: number = xss(user_id)
    const query: string = `SELECT (select username from ${process.env.DATABASE_SCHEMA}.user where user_id=?) as 'User',
        SUM(rating_score)/COUNT(*) as "User Average" FROM ${process.env.DATABASE_SCHEMA}.user_reviews where user_id=?`
    const inputs: Array<number> = [clean_user_id, clean_user_id]

    return (new Promise((resolve, reject) => {
        connectionPool.query(
            query,
            inputs,
            (err, result, fields) => {
                if (err) reject({ http_id: 400, message: "Failed to get user rating" })
                else resolve({ http_id: 200, message: result })
            }
        )
    })).then((success) => {
        return success
    }).catch((err) => {
        return err
    })
}

/**
 * Gets rating of event
 * @param event_id
 * @returns
 */
const getEventRating = (event_id: number) => {
    const clean_event_id: number = xss(event_id)

    const query: string = `SELECT votes, total_stars FROM ${process.env.DATABASE_SCHEMA}.event WHERE event_id=?`
    const inputs: Array<number> = [clean_event_id]

    return (new Promise((resolve, reject) => {
        connectionPool.query(query, inputs, (err, result, fields) => {
            if (err) reject({ http_id: 400, message: "Failed to get event" })
            else {
                if (result[0]["votes"] == 0) resolve({ http_id: 200, message: { "rating": 0 } })
                else resolve({ http_id: 200, message: { "rating": result[0]["total_stars"] / result[0]["votes"] } })
            }
        })
    })).then((success) => {
        return success
    }).catch((err) => {
        return err
    })
}

/**
 * Get event data and organizer data
 * @param event_id
 * @returns
 */
const getSpecificEvent = (event_id: number) => {
    const clean_event_id = xss(event_id);

    const query: string = `SELECT event_id, organizer_id, event_name, event_description, creation_date, time_of_event
        , latitude, longitude, username FROM ${process.env.DATABASE_SCHEMA}.event join ${process.env.DATABASE_SCHEMA}.user 
        on event.organizer_id=user.user_id WHERE event_id=?`;
    const inputs: Array<number> = [clean_event_id];

    return (new Promise((resolve, reject) => {
        connectionPool.query(query, inputs, (err, result, fields) => {
            if (err) reject({ http_id: 400, message: "Failed to get event" })
            else resolve({ http_id: 200, message: { "event": result[0] } })
        })
    })).then((success) => {
        return success
    }).catch((err) => {
        return err
    })
}

/**
 * A user can vote on an event
 * @param user_id
 * @param event_id
 * @param votes
 * @returns
 */
const voteOnEvent = (user_id: number, event_id: number, votes: number) => {
    const clean_user_id: number = xss(user_id)
    const clean_event_id: number = xss(event_id);
    const clean_votes: number = xss(votes);

    const query: string = `INSERT INTO ${process.env.DATABASE_SCHEMA}.user_voted_on_event (user_id, event_id, votes) 
        VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE votes=?`;
    const inputs: Array<string | number> = [clean_user_id, clean_event_id, clean_votes, clean_votes];

    return (new Promise((resolve, reject) => {
        connectionPool.query(query, inputs, (err, result, fields) => {
            if (err) reject({ http_id: 400, message: "Failed to update db" })
            else resolve({ http_id: 200, message: "Update successful" })
        })
    })).then((success) => {
        return success
    }).catch((error) => {
        return error
    })
}

/**
 * Returns amt of ppl attendding the event
 * @param event_id
 * @returns
 */
const getAmtOfAttendees = (event_id: number) => {
    const clean_event_id: number = xss(event_id)

    const query: string = `SELECT COUNT(*) AS 'Attendees' FROM ${process.env.DATABASE_SCHEMA}.user_attending_event where event_id = ?`
    const inputs = [clean_event_id]

    return (new Promise((resolve, reject) => {
        connectionPool.query(query, inputs, (err, result, fields) => {
            if (err) reject({ http_id: 400, message: "Failed to get total attendees" })
            else resolve({ http_id: 200, message: result })
        })
    }))
}

/**
 * Removes a users vote if they voted
 * @param user_id
 * @param event_id
 * @returns
 */
const removeVoteOnEvent = (user_id: number, event_id: number) => {
    const clean_user_id: number = xss(user_id)
    const clean_event_id: number = xss(event_id);

    const query: string = `DELETE FROM ${process.env.DATABASE_SCHEMA}.user_voted_on_event WHERE event_id = ?
     AND user_id = ?`;
    const inputs: Array<string | number> = [clean_event_id, clean_user_id];

    return (new Promise((resolve, reject) => {
        connectionPool.query(query, inputs, (err, result, fields) => {
            if (err) reject({ http_id: 400, message: "Failed to remove vote" })
            else resolve({ http_id: 200, message: "Delete successful" })
        })
    })).then((success) => {
        return success;
    }).catch((error) => {
        return error;
    })
}

/**
 * Filters events by wildcard
 * @param input_name
 * @param input_description
 * @param created_after_date
 * @param occurring_after_date
 * @returns
 */
const getEventsByFilter = (input_name: string, input_description: string, created_after_date: string, occurring_after_date: string) => {
    const clean_input_name: string = "%" + xss(input_name) + "%";
    const clean_input_description: string = "%" + xss(input_description) + "%";
    const clean_created_after_date: Date = xss(created_after_date);
    const clean_occurring_after_date: Date = xss(occurring_after_date);

    const query: string = `SELECT * FROM ${process.env.DATABASE_SCHEMA}.event WHERE event_name LIKE ? 
                            AND event_description LIKE ? AND creation_date > ? AND time_of_event > ?`;
    const inputs: Array<string | Date> = [clean_input_name, clean_input_description, clean_created_after_date, clean_occurring_after_date];

    return (new Promise((resolve, reject) => {
        connectionPool.query(query, inputs, (err, result, fields) => {
            if (err) reject({ http_id: 400, message: "Failed to get events" })
            else resolve({ http_id: 200, message: { "events": result } })
        })
    })).then((success) => {

        return success;
    }).catch((err) => {

        return err;
    })
}

/**
 * Returns events info and if user attendding
 * @param user_id
 * @returns
 */
const getAllEventsInfo = (user_id: number) => {
    const clean_user_id = xss(user_id);

    const query: string = `SELECT * FROM ${process.env.DATABASE_SCHEMA}.event NATURAL JOIN ${process.env.DATABASE_SCHEMA}.user_attending_event
        WHERE user_id=?`;
    const inputs: Array<number> = [clean_user_id];

    return (new Promise((resolve, reject) => {
        connectionPool.query(query, inputs, (err, result, fields) => {
            if (err) reject({ http_id: 400, message: "Failed to pull events" })
            else resolve({ http_id: 200, message: { events: result } })
        })
    })).then((success) => { return success })
        .catch((err) => { return err })
}

/**
 * Deletes event if user has the permissions
 * @param user_id
 * @param event_id
 * @returns
 */
const deleteEvent = (user_id: number, event_id: number) => {
    const clean_user_id = xss(user_id);
    const clean_event_id = xss(event_id);

    const query: string = `DELETE FROM ${process.env.DATABASE_SCHEMA}.event WHERE event_id=? 
            AND ((SELECT can_delete FROM ${process.env.DATABASE_SCHEMA}.event_permissions where user_id=? AND event_id=?) = 1)`;
    const inputs: Array<number> = [clean_event_id, clean_user_id, clean_event_id];

    return (new Promise((resolve, reject) => {
        connectionPool.query(query, inputs, (err, result, fields) => {
            if (err) reject({ http_id: 400, message: "Failed to delete event" })
            else resolve({ http_id: 200, message: result })
        })
    })).then((success) => { return success })
        .catch((err) => { return err })
}

module.exports = {
    createEvent,
    getEvents,
    joinEvent,
    getUserEvents,
    getEventRating,
    getSpecificEvent,
    voteOnEvent,
    removeVoteOnEvent,
    getEventsByFilter,
    getAllEventsInfo,
    getUserRating,
    deleteEvent,
    leaveEvent,
    getAmtOfAttendees
}