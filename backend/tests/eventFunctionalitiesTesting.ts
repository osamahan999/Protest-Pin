import { expect } from 'chai';

const event = require('../src/eventFunctionalities.ts');


describe("Testing Events Functionalities", () => {

    const user_token: string = "28fa37a1589e38a13dd737b54bd88d474ff7d953170d3f3035a610af6b0556f4804bda7a9bb7e3117690ca431a6f0fb4e2d039f38288944587d8eabaab491304";
    const user_id: number = 98
    const event_id: number = 10
    it("Creating an event", async () => {

        const new_event = await event.createEvent(user_id, "test_name", "test_description", new Date(), 10, 10);
        expect(new_event.message).to.equal("Event made successfully")
    })

    it("Join the event", async () => {
        const join_event = await event.joinEvent(user_token, event_id);

        expect(join_event.message).to.equal("Successfully joined event!")
    })

    it("Get events", async () => {
        const events = await event.getEvents();
        expect(events.http_id).to.equal(200)
    })

    it("Get specific user's events", async () => {
        const user_events = await event.getUserEvents(user_token)
        expect(user_events.http_id).to.equal(200)
    })
})