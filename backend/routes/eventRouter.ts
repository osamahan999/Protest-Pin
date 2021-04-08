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
    const user_id: number = req.body.user_id;
    const event_name: string = req.body.event_name;
    const event_description: string = req.body.event_description;
    const time_of_event: string = req.body.time_of_event;
    const latitude: number = req.body.latitude;
    const longitude: number = req.body.longitude;

    let response = await eventFunctionalities.createEvent(user_id, event_name, event_description, time_of_event, latitude, longitude)
    res.status(response.http_id).json(response.message);
})


router.route('/getAllEvents').get(async (req: Request, res: Response) => {
    let response = await eventFunctionalities.getEvents()
    res.status(response.http_id).json(response.message)
})



module.exports = router