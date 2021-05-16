import { expect } from 'chai';

const register = require('../src/registerFunctionalities.ts');
const hash = require('../src/hashFunctionalities');


describe("Testing Registration Functionalities", () => {

    const username: string = "test922993573653656235454";
    const salt: string = hash.getSalt();
    const password: string = hash.hash("test", salt)
    //Expected Output:     ✓ Creating a user (172ms)
    it("Creating a user", async () => {

        const createUser = await register.registerUser(username, password);
        expect(createUser.message).to.equal("Successfully created a user")
    })

    //Expected Output:     ✓ Registering as a taken username (183ms)
    it("Registering as a taken username", async () => {
        const createUser = await register.registerUser(username, password);
        expect(createUser.http_id).to.equal(400)
    })
    //Expected Output:     ✓ Deleting a user (171ms)
    it("Deleting a user", async () => {
        const delUser = await register.deleteUser(username);

        expect(delUser.message).to.equal("Successfully deleted user")
    })

})