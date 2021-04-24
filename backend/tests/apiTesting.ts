import { expect } from "chai"

const axios = require("axios")

describe("API Routers are working", () => {
    describe("Event router", () => {
        it("/createEvent", async () => {
            axios.post("http://localhost:3306/event/createEvent", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })

        it("/joinEvent", async () => {
            axios.post("http://localhost:3306/event/joinEvent", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })

        it("/getAllEvents", async () => {
            axios.get("http://localhost:3306/event/getAllEvents", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })

        it("/getUserEvents", async () => {
            axios.get("http://localhost:3306/event/getUserEvents", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })
    })

    describe("Login router", () => {
        it("/loginUser", async () => {
            axios.get("http://localhost:3306/login/loginUser", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })

        it("/loginWithToken", async () => {
            axios.get("http://localhost:3306/login/loginWithToken", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })
    })

    describe("Registration router", () => {
        it("/userRegister", async () => {
            axios.post("http://localhost:3306/register/userRegister", {

            }).then((res: any) => {
                expect(res.http_id).equals(200)
            }).catch((res: any) => {
                expect(res.http_id).equals(400)
            })
        })
    })
})
