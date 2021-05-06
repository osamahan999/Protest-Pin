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

router.route('/joinEvent').post(async (req: Request, res: Response) => {
    const user_id: number = req.body.user_id;
    const event_id: number = req.body.event_id;

    let response = await eventFunctionalities.joinEvent(user_id, event_id);
    res.status(response.http_id).json(response.message);
})

router.route('/leaveEvent').post(async (req: Request, res: Response) => {
    const user_id: number = req.body.user_id;
    const event_id: number = req.body.event_id;

    let response = await eventFunctionalities.leaveEvent(user_id, event_id);
    res.status(response.http_id).json(response.message)
})

router.route('/getAllEvents').get(async (req: Request, res: Response) => {
    let response = await eventFunctionalities.getEvents()        
    res.status(response.http_id).json(response.message)
})

router.route('/getUserEvents').get(async (req: Request, res: Response) => {
    const user_id = req.query.user_id;

    let response = await eventFunctionalities.getUserEvents(user_id);
    res.status(response.http_id).json(response.message)
})

router.route('/getEventRating').get(async (req: Request, res: Response) => {
    const event_id: number | any = req.query.event_id;

    let response = await eventFunctionalities.getEventRating(event_id)
    res.status(response.http_id).json(response.message)
})

router.route('/getSpecificEvent').get(async (req: Request, res: Response) => {
    const event_id: number | any = req.query.event_id;

    let response = await eventFunctionalities.getSpecificEvent(event_id);
    res.status(response.http_id).json(response.message)
})

router.route('/voteOnEvent').post(async (req: Request, res: Response) => {
    const user_id: number = req.body.user_id;
    const event_id: number = req.body.event_id;
    const votes: number = req.body.votes;

    let response = await eventFunctionalities.voteOnEvent(user_id, event_id, votes);
    res.status(response.http_id).json(response.message);
})

router.route('/removeVoteOnEvent').post(async (req: Request, res: Response) => {
    const user_id: number = req.body.user_id;
    const event_id: number = req.body.event_id;

    let response = await eventFunctionalities.removeVoteOnEvent(user_id, event_id);
    res.status(response.http_id).json(response.message);
})

router.route('/getEventsByFilter').get(async (req: Request, res: Response) => {
    const input_name: string | any = req.query.input_name;
    const input_description: string | any = req.query.input_description == undefined ? "" : req.query.input_description;
    const created_after_date: string | any = req.query.created_after_date == undefined || req.query.created_after_date == "" ? "0-0-0" : req.query.created_after_date;
    const occurring_after_date: string | any = req.query.occurring_after_date == undefined || req.query.occurring_after_date == "" ? "0-0-0" : req.query.occurring_after_date;

    let response = await eventFunctionalities.getEventsByFilter(input_name, input_description, created_after_date, occurring_after_date);
    res.status(response.http_id).json(response.message);
})


router.route('/getAllEventsInfo').get(async (req: Request, res: Response) => {
    const user_id: number | any = req.query.user_id;

    let response = await eventFunctionalities.getAllEventsInfo(user_id);
    res.status(response.http_id).json(response.message);
})

router.route("/getUserRating").get(async (req: Request, res: Response) => {
    const user_id: number | any = req.query.user_id;
    let response = await eventFunctionalities.getUserRating(user_id);

    res.status(response.http_id).json(response.message)
})

router.route("/deleteEvent").post(async (req: Request, res: Response) => {
    const user_id: number = req.body.user_id;
    const event_id: number = req.body.event_id;

    let response = await eventFunctionalities.deleteEvent(user_id, event_id);
    res.status(response.http_id).json(response.message)
})
module.exports = router