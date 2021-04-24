import { Request, Response } from "express";

export { } //Fixes the bug "Cannot redeclare block-scoped variable 'router'.ts" 

const router = require('express').Router();
const profileFunctionalities = require('../src/profileFunctionalities')

/**
 * 
 * 
 * @param {string} username The username
 */
router.route('/profile').get(async (req: Request, res: Response) => {
    const userId = req.query.userId;

    let response = await profileFunctionalities.getProfile(userId);
    res.status(response.http_id).json(response);
})

router.route('/activity').get(async (req: Request, res: Response) => {
    const userId = req.query.userId;

    let response = await profileFunctionalities.getActivity(userId);
    res.status(response.http_id).json(response)
})






module.exports = router