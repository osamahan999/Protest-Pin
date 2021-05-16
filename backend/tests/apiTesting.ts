import { expect } from "chai"

const axios = require("axios")

describe("API Routers are working", () => {
    describe("Event router", () => {
        it("/createEvent", async () => {
            axios.post(process.env.SERVER + ":" + process.env.PORT + "/event/createEvent", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })

        it("/joinEvent", async () => {
            axios.post(process.env.SERVER + ":" + process.env.PORT + "/event/joinEvent", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })

        it("/getAllEvents", async () => {
            axios.get(process.env.SERVER + ":" + process.env.PORT + "/event/getAllEvents", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })

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
        it("/loginUser", async () => {
            axios.get(process.env.SERVER + ":" + process.env.PORT + "/login/loginUser", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })

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
