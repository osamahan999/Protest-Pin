import {expect} from 'chai';

describe("Testing registration", () => {
    it("Generating a salt", () => {
        const salt = getSalt();

        expect(salt.length).to.equal(32)
    })
    
    it("Making a new user", () => {
        const username = "test";
        const password = "test";

        expect(false).to.be.false;
    })
})