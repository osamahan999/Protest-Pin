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
    const username = req.query.username;
    const password = req.query.password;

    let response = await loginFunctionalities.loginUser(username, password);
    res.status(response.http_id).json(response);
})

router.route('/loginWithToken').get(async (req: Request, res: Response) => {
    const token = req.query.token;

    let response = await loginFunctionalities.loginWithToken(token);
    res.status(response.http_id).json(response)
})




module.exports = router