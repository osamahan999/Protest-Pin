import { Request, Response } from "express";

export { } //Fixes the bug "Cannot redeclare block-scoped variable 'router'.ts" 

const router = require('express').Router();
const registerFunctionalities = require('../src/registerFunctionalities')

/**
 * Registers a user if username is not taken
 * 
 * @param {string} username The username
 * @param {string} password The password
 */
router.route('/userRegister').post(async (req: Request, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const birthday: string = req.body.birthday; 

    let response = await registerFunctionalities.registerUser(username, password, birthday);
    res.status(response.http_id).json(response.message);
})




module.exports = router