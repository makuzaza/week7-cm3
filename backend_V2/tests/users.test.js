const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

// Clean the users collection before each test
beforeEach(async () => {
    await User.deleteMany({});
});

// ────────────────── POST /api/auth/signup ──────────────────
describe("POST /api/auth/signup", () => {
    describe("when the payload is valid", () => {
        it("should signup a new user with status 201 and return a token", async () => {
            const userData = {
                name: "maria maria",
                username: "maria kk",
                password: "1234",
                phone_number: "+3584012345",
                licenseNumber: "FI-DRV-1234567823",
                date_of_birth: "1995-09-21T00:00:00.000Z",
                address: {
                    licenseExpiryDate: "2029-06-30T00:00:00.000Z",
                    city: "Espoo",
                    yearsOfExperience: 8
                }
            };

            const result = await api
                .post("/api/auth/signup")
                .send(userData)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            expect(result.body).toHaveProperty("token");
            expect(result.body.username).toBe(userData.username);

            // Verify user was actually saved in the database
            const savedUser = await User.findOne({ username: userData.username });
            expect(savedUser).not.toBeNull();
            expect(savedUser.name).toBe(userData.name);
        });
    });

    describe("when the payload is invalid", () => {
        it("should return 400 if required fields are missing", async () => {
            const userData = {
                name: "incomplete",
                password: "R3g5T7#gh",
            };

            const result = await api
                .post("/api/auth/signup")
                .send(userData)
                .expect(400);

            expect(result.body).toHaveProperty("error");

            // Verify the user was NOT created
            const savedUser = await User.findOne({ username: userData.username });
            expect(savedUser).toBeNull();
        });
    });

    describe("when the username is already taken", () => {
        it("should return 400 for duplicate username", async () => {
            const userData = {
                name: "maria maria",
                username: "maria kk",
                password: "1234",
                phone_number: "+3584012345",
                licenseNumber: "FI-DRV-1234567823",
                date_of_birth: "1995-09-21T00:00:00.000Z",
                address: {
                    licenseExpiryDate: "2029-06-30T00:00:00.000Z",
                    city: "Espoo",
                    yearsOfExperience: 8
                }
            };

            // Create the first user
            await api.post("/api/auth/signup").send(userData).expect(201);

            // Try to create a second user with the same username
            const result = await api
                .post("/api/auth/signup")
                .send({ ...userData, name: "Second User" })
                .expect(400);

            expect(result.body).toHaveProperty("error");
        });
    });
});

// ────────────────── POST /api/auth/login ──────────────────
describe("POST /api/auth/login", () => {
    // Sign up a user before each login test
    beforeEach(async () => {
        await api.post("/api/auth/signup").send({
            name: "Login Tester",
            username: "login_tester",
            password: "R3g5T7#gh",
            phone_number: "+3584012345",
            licenseNumber: "FI-DRV-1234567829",
            date_of_birth: "1995-09-21T00:00:00.000Z",
            address: {
                licenseExpiryDate: "2029-06-30T00:00:00.000Z",
                city: "Espoo",
                yearsOfExperience: 8
            }
        });
    });

    describe("when the credentials are valid", () => {
        it("should login and return a token with status 200", async () => {
            const result = await api
                .post("/api/auth/login")
                .send({
                    username: "login_tester",
                    password: "R3g5T7#gh"
                })
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(result.body).toHaveProperty("token");
            expect(result.body.username).toBe("login_tester");
        });
    });

    describe("when the credentials are invalid", () => {
        it("should return 400 with a wrong password", async () => {
            const result = await api
                .post("/api/auth/login")
                .send({
                    username: "login_tester",
                    password: "WrongPassword1!",
                })
                .expect(400);

            expect(result.body).toHaveProperty("error");
        });

        it("should return 400 with a non-existing username", async () => {
            const result = await api
                .post("/api/auth/login")
                .send({
                    username: "nonexistent",
                    password: "R3g5T7#gh",
                })
                .expect(400);

            expect(result.body).toHaveProperty("error");
        });
    });
});

// Close DB connection once after all tests
afterAll(async () => {
    await mongoose.connection.close();
});