const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // app.js already connects to DB
const api = supertest(app);
const VehicleRental = require("../models/vehicleRentalModel");

const example1 = {
  "vehicleModel": "Audi A6",
  "category": "Compact",
  "description": "A comfortable and efficient compact car for your daily commute.",
  "agency": {
    "name": "Hedin Automotive",
    "contactEmail": "contact@hedinautomotive.com",
    "fleetSize": 100
  },
  "location": {
    "city": "Jyväskylä",
    "state": "Keski-Suomi"
  },
  "dailyPrice": 50,
  "listingDate": "2024-10-11",
  "availabilityStatus": "available",
  "bookingDeadline": "2024-10-15",
  "insurancePolicy": "Policy"
};
const example2 = {
  "vehicleModel": "Audi A4",
  "category": "Compact",
  "description": "A comfortable and efficient compact car for your daily commute.",
  "agency": {
    "name": "Hedin Automotive",
    "contactEmail": "contact@hedinautomotive.com",
    "fleetSize": 100
  },
  "location": {
    "city": "Jyväskylä",
    "state": "Keski-Suomi"
  },
  "dailyPrice": 50,
  "listingDate": "2024-10-11",
  "availabilityStatus": "available",
  "bookingDeadline": "2024-10-15",
  "insurancePolicy": "Policy"
};

beforeAll(async () => {
  await VehicleRental.deleteMany({});
  await VehicleRental.create(example1);
  await VehicleRental.create(example2);
});

describe("GET /api/vehicleRentals", () => {
  it("should return 200 and retreive all vehicle rentals", async () => {
    const response = await api
      .get("/api/vehicleRentals")
      .expect(200);

    const data = response.body;

    expect(data.length).toBe(2);
    expect(data[0].vehicleModel).toBe(example2.vehicleModel);
    expect(data[1].vehicleModel).toBe(example1.vehicleModel);
  });
});

describe("POST /api/vehicleRentals", () => {
  it("should return 201 and create a new vehicle rental", async () => {
    const example3 = { ...example1 };
    example3.vehicleModel = "Toyota Corolla";

    const response = await api
      .post("/api/vehicleRentals")
      .send(example3)
      .expect(201);

    const data = response.body;

    expect(data.vehicleModel).toBe(example3.vehicleModel);
  });
  it("should return 400 for missing fields", async () => {
    const example4 = { ...example1 };
    example4.category = undefined;

    await api
      .post("/api/vehicleRentals")
      .send(example4)
      .expect(400);
  });
  it("should return 400 for invalid fields", async () => {
    const example5 = { ...example1 };
    example5.availabilityStatus = "invalid_status";

    await api
      .post("/api/vehicleRentals")
      .send(example5)
      .expect(400);
  });
});

describe("GET /api/vehicleRentals/:id", () => {
  it("should return 200 and retreive a vehicle rental by the ID", async () => {
    const example = { ...example1 };

    const newVehicleResponse = await api
      .post("/api/vehicleRentals")
      .send(example)
      .expect(201);

    const newVehicleData = newVehicleResponse.body;
    const id = newVehicleData._id;

    const response = await api
      .get("/api/vehicleRentals/" + id)
      .expect(200);

    const data = response.body;

    expect(data.vehicleModel).toBe(example.vehicleModel);
  });
  it("should return 400 for an invalid ID format", async () => {
    await api
      .get("/api/vehicleRentals/invalid_format")
      .expect(400);
  });
  it("should return 404 for a non-existing object", async () => {
    const id = new mongoose.Types.ObjectId();
    await api
      .get("/api/vehicleRentals/" + id)
      .expect(404);
  });
});

describe("PUT /api/vehicleRentals/:id", () => {
  it("should return 200 and update a vehicle rental by the ID", async () => {
    const example = { ...example1 };

    const newVehicleResponse = await api
      .post("/api/vehicleRentals")
      .send(example)
      .expect(201);

    const newVehicleData = newVehicleResponse.body;
    const id = newVehicleData._id;

    expect(newVehicleData.vehicleModel).toBe(example.vehicleModel);

    example.vehicleModel = "Skoda Octavia";

    const response = await api
      .put("/api/vehicleRentals/" + id)
      .send(example)
      .expect(200);

    const data = response.body;

    expect(data.vehicleModel).toBe(example.vehicleModel);
  });
  it("should return 400 for an invalid ID format", async () => {
    await api
      .put("/api/vehicleRentals/invalid_format")
      .send(example1)
      .expect(400);
  });
  it("should return 404 for a non-existing object", async () => {
    const id = new mongoose.Types.ObjectId();
    await api
      .put("/api/vehicleRentals/" + id)
      .send(example1)
      .expect(404);
  });
});

describe("DELETE /api/vehicleRentals/:id", () => {
  it("should return 204 and delete a vehicle rental by the ID", async () => {
    const example = { ...example1 };

    const newVehicleResponse = await api
      .post("/api/vehicleRentals")
      .send(example)
      .expect(201);

    const newVehicleData = newVehicleResponse.body;
    const id = newVehicleData._id;

    expect(newVehicleData.vehicleModel).toBe(example.vehicleModel);

    const response = await api
      .delete("/api/vehicleRentals/" + id)
      .expect(204);
  });
  it("should return 400 for an invalid ID format", async () => {
    await api
      .delete("/api/vehicleRentals/invalid_format")
      .expect(400);
  });
  it("should return 404 for a non-existing object", async () => {
    const id = new mongoose.Types.ObjectId();
    await api
      .delete("/api/vehicleRentals/" + id)
      .expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
