import { expect } from 'chai';

const hash = require('../src/hashFunctionalities');


describe("Testing Hash Functionalities", () => {

    //Expected Output:     ✓ Generating a salt
    it("Generating a salt", () => {
        const salt: string = hash.getSalt();
        expect(salt.length).to.equal(32)
    })
    //Expected Output:     ✓ Hashing password
    it("Hashing password", () => {
        const passwordToHash: string = "test"
        const salt = hash.getSalt();

        const hashedPassword = hash.hash(passwordToHash, salt);
        expect(hashedPassword.length).to.equal(64)
    })
    //Expected Output:     ✓ Same password has different hashes
    it("Same password has different hashes", () => {
        const passwordToHash: string = "samePassword";
        const salt1 = hash.getSalt();
        const salt2 = hash.getSalt();

        const hashedpassword1 = hash.hash(passwordToHash, salt1)
        const hashedpassword2 = hash.hash(passwordToHash, salt2)

        expect(hashedpassword1).to.not.be.equal(hashedpassword2)
    })
})