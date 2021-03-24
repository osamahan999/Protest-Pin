import { Request, Response } from "express";

export { } //Fixes the bug "Cannot redeclare block-scoped variable 'router'.ts" 

const router = require('express').Router();
const loginFunctionalities = require('../src/loginFunctionalities')

/**
 * Logs in if credentials are correct
 * 
 * @param {string} username The username
 * @param {string} password The password
 */
router.route('/loginUser').get(async (req: Request, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    let response = await loginFunctionalities.loginUser(username);
    res.status(response.http_id).json(response.message);
})




module.exports = router