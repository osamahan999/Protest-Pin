import { expect } from "chai"

const axios = require("axios")

describe("API Routers are working", () => {
    describe("Event router", () => {
        //Expected Output:       ✓ /createEvent
        it("/createEvent", async () => {
            axios.post(process.env.SERVER + ":" + process.env.PORT + "/event/createEvent", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })
        //Expected Output:       ✓ /joinEvent
        it("/joinEvent", async () => {
            axios.post(process.env.SERVER + ":" + process.env.PORT + "/event/joinEvent", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })
        //Expected Output:       ✓ /getAllEvents
        it("/getAllEvents", async () => {
            axios.get(process.env.SERVER + ":" + process.env.PORT + "/event/getAllEvents", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })
        //Expected Output:       ✓ /getUserEvents
        it("/getUserEvents", async () => {
            axios.get(process.env.SERVER + ":" + process.env.PORT + "/event/getUserEvents", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })
    })

    describe("Login router", () => {
        //Expected Output:       ✓ /loginUser
        it("/loginUser", async () => {
            axios.get(process.env.SERVER + ":" + process.env.PORT + "/login/loginUser", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })
        //Expected Output:       ✓ /loginWithToken
        it("/loginWithToken", async () => {
            axios.get(process.env.SERVER + ":" + process.env.PORT + "/login/loginWithToken", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })
    })

    describe("Registration router", () => {
        //Expected Output:       ✓ /userRegister
        it("/userRegister", async () => {
            axios.post(process.env.SERVER + ":" + process.env.PORT + "/register/userRegister", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })
    })
})
