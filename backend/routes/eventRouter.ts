import { Request, Response } from "express";

export { } //Fixes the bug "Cannot redeclare block-scoped variable 'router'.ts" 

const router = require('express').Router();
const eventFunctionalities = require('../src/eventFunctionalities')

/**
 * Creates an event
 * 
 * @param {Number}      user_id                 User id of the organizer
 * @param {string}      event_name              Name of event
 * @param {string}      event_description       Description of the event
 * @param {string}      time_of_event           When the event takes place
 */
router.route('/createEvent').post(async (req: Request, res: Response) => {
    console.log("/createEvent")
    const user_id: number = req.body.user_id;
    const event_name: string = req.body.event_name;
    const event_description: string = req.body.event_description;
    const time_of_event: string = req.body.time_of_event;
    const latitude: number = req.body.latitude;
    const longitude: number = req.body.longitude;

    let response = await eventFunctionalities.createEvent(user_id, event_name, event_description, time_of_event, latitude, longitude)
    res.status(response.http_id).json(response.message);
})

/**
 * Adds a user to the event attendee list
 *
 * @param {number} user_id The user id
 * @param {number} event_id
 */
router.route('/joinEvent').post(async (req: Request, res: Response) => {
    const user_id: number = req.body.user_id;
    const event_id: number = req.body.event_id;

    let response = await eventFunctionalities.joinEvent(user_id, event_id);
    res.status(response.http_id).json(response.message);
})

/**
 * if user attending event, leave
 * @param {number} user_id The user id
 * @param {number} event_id The event id
 */
router.route('/leaveEvent').post(async (req: Request, res: Response) => {
    const user_id: number = req.body.user_id;
    const event_id: number = req.body.event_id;

    let response = await eventFunctionalities.leaveEvent(user_id, event_id);
    res.status(response.http_id).json(response.message)
})

/**
 * Returns all events info
 */
router.route('/getAllEvents').get(async (req: Request, res: Response) => {
    let response = await eventFunctionalities.getEvents()        
    res.status(response.http_id).json(response.message)
})

/**
 * Returns events & if user rated it
 *
 * @param {number} user_id The user id
 */
router.route('/getUserEvents').get(async (req: Request, res: Response) => {
    const user_id = req.query.user_id;

    let response = await eventFunctionalities.getUserEvents(user_id);
    res.status(response.http_id).json(response.message)
})

/**
 * Returns rating of a event
 * @param {number} event_id
 */
router.route('/getEventRating').get(async (req: Request, res: Response) => {
    const event_id: number | any = req.query.event_id;

    let response = await eventFunctionalities.getEventRating(event_id)
    res.status(response.http_id).json(response.message)
})

/**
 * Gets event info with organizer information
 * @param {number} event_id
 */
router.route('/getSpecificEvent').get(async (req: Request, res: Response) => {
    const event_id: number | any = req.query.event_id;

    let response = await eventFunctionalities.getSpecificEvent(event_id);
    res.status(response.http_id).json(response.message)
})

/**
 * User votes on aan event or updates ther previous vote
  * @param {number} user_id The user id
  * @param {number} event_id
  * @param {number} votes

 */
router.route('/voteOnEvent').post(async (req: Request, res: Response) => {
    const user_id: number = req.body.user_id;
    const event_id: number = req.body.event_id;
    const votes: number = req.body.votes;

    let response = await eventFunctionalities.voteOnEvent(user_id, event_id, votes);
    res.status(response.http_id).json(response.message);
})

/**
 * Removes a user's vote from an event
  * @param {number} user_id
  * @param {number} event_id
 */
router.route('/removeVoteOnEvent').post(async (req: Request, res: Response) => {
    const user_id: number = req.body.user_id;
    const event_id: number = req.body.event_id;

    let response = await eventFunctionalities.removeVoteOnEvent(user_id, event_id);
    res.status(response.http_id).json(response.message);
})

/**
 * Sorts by any input
 * @param {string} input_name Text to filter name by
 * @param {string} input_description Text to filter event describtion
 * @param {string} created_after_date A date to sort by
 * @param {string} occurring_after_date a date to sort by after
 */
router.route('/getEventsByFilter').get(async (req: Request, res: Response) => {
    const input_name: string | any = req.query.input_name == undefined ? "" : req.query.input_name;
    const input_description: string | any = req.query.input_description == undefined ? "" : req.query.input_description;
    const created_after_date: string | any = req.query.created_after_date == undefined || req.query.created_after_date == "" ? "0-0-0" : req.query.created_after_date;
    const occurring_after_date: string | any = req.query.occurring_after_date == undefined || req.query.occurring_after_date == "" ? "0-0-0" : req.query.occurring_after_date;

    let response = await eventFunctionalities.getEventsByFilter(input_name, input_description, created_after_date, occurring_after_date);
    res.status(response.http_id).json(response.message);
})

/**
 * Returns events and if user attending
 *
   * @param {number} user_id
 */
router.route('/getAllEventsInfo').get(async (req: Request, res: Response) => {
    const user_id: number | any = req.query.user_id;

    let response = await eventFunctionalities.getAllEventsInfo(user_id);
    res.status(response.http_id).json(response.message);
})

/**
 * Returns a users rating
   * @param {number} user_id
 */
router.route("/getUserRating").get(async (req: Request, res: Response) => {
    const user_id: number | any = req.query.user_id;
    let response = await eventFunctionalities.getUserRating(user_id);

    res.status(response.http_id).json(response.message)
})

/**
 * If user has deletion permissions, deletes event
  * @param {number} user_id
  * @param {number} event_id
 */
router.route("/deleteEvent").post(async (req: Request, res: Response) => {
    const user_id: number = req.body.user_id;
    const event_id: number = req.body.event_id;

    let response = await eventFunctionalities.deleteEvent(user_id, event_id);
    res.status(response.http_id).json(response.message)
})

/**
 * Returns amt of attending users
  * @param {number} event_id
 */
router.route("/getEventAttendees").get(async (req: Request, res: Response) => {
    const event_id: number | any = req.query.event_id;
    let response = await eventFunctionalities.getAmtOfAttendees(event_id);
    res.status(response.http_id).json(response.message)

})
module.exports = router