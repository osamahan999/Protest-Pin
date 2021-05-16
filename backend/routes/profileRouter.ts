import { Request, Response } from "express";

export { } //Fixes the bug "Cannot redeclare block-scoped variable 'router'.ts" 

const router = require('express').Router();
const profileFunctionalities = require('../src/profileFunctionalities')

/**
 * Gets user profile information
 * 
 * @param {number} user_id The user id
 */
router.route('/profile').get(async (req: Request, res: Response) => {
    const userId = req.query.userId;

    let response = await profileFunctionalities.getProfile(userId);
    res.status(response.http_id).json(response);
})

/**
 *  Gets uswer activity
 *  * @param {number} userId The user id

 */
router.route('/activity').get(async (req: Request, res: Response) => {
    const userId = req.query.userId;

    let response = await profileFunctionalities.getActivity(userId);
    res.status(response.http_id).json(response)
})

/**
 * lets user vote on another user
 *
 * @param {number} user_id The user id
 * @param {number} organizer_id The organizer_id
 * @param {string} review
 * @param {number} votes
 */
router.route('/voteOnOrganizer').post(async (req: Request, res: Response) => {
    const user_id: number = req.body.user_id;
    const organizer_id: number = req.body.organizer_id;
    const review: string = req.body.review;
    const votes: number = req.body.votes;

    let response = await profileFunctionalities.voteOnOrganizer(user_id, organizer_id, review, votes);
    res.status(response.http_id).json(response);
})






module.exports = router