import { expect } from 'chai';

const register = require('../src/registerFunctionalities.ts');
const hash = require('../src/hashFunctionalities');


describe("Testing Registration Functionalities", () => {

    const username: string = "testUser";
    it("Creating a user", async () => {
        const salt: string = hash.getSalt();
        const password: string = hash.hash("test", salt)

        const createUser = await register.registerUser(username, password);
        expect(createUser.message).to.equal("Successfully created a user")
    })

    it("Deleting a user", async () => {
        const delUser = await register.deleteUser(username);

        expect(delUser.message).to.equal("Successfully deleted user")
    })
})