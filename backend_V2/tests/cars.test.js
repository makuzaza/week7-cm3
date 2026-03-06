const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Vehicle = require("../models/vehicleRentalModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Seed data
const vehicles = [
  {
    vehicleModel: "Toyota Camry",
    category: "Economy",
    description: "Comfortable sedan, automatic transmission",
    agency: {
      name: "CityDrive Rentals",
      contactEmail: "support@citydrive.com",
    },
    location: {
      city: "Helsinki",
      state: "Uusimaa",
    },
    dailyPrice: 59.9,
    availabilityStatus: "available",
    insurancePolicy: "Full coverage included",
    listingDate: "2026-03-06T09:46:29.663Z",
  },
  {
    vehicleModel: "Ford Transit",
    category: "Van",
    description: "Spacious van, perfect for group travel",
    agency: {
      name: "CityDrive Rentals",
      contactEmail: "support@citydrive.com",
    },
    location: {
      city: "Vantaa",
      state: "Uusimaa",
    },
    dailyPrice: 89.9,
    availabilityStatus: "available",
    insurancePolicy: "Full coverage included",
    listingDate: "2026-03-06T09:46:29.663Z",
  },
];

// Helper: read all vehicles straight from the DB
const vehiclesInDb = async () => {
  const allVehicles = await Vehicle.find({});
  return allVehicles.map((t) => t.toJSON());
};

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/auth/signup").send({
    name: "John Doe",
    username: "johndoe",
    password: "R3g5T7#gh",
    phone_number: "1234567890",
    licenseNumber: "LIC123456",
    date_of_birth: "1990-01-01",
    address: {
      licenseExpiryDate: "2030-01-01",
      city: "New York",
      yearsOfExperience: 5,
    },
  });
  token = result.body.token;
});

describe("Vehicle Rental Routes", () => {
  // Seed vehicles via the API (so user_id is set by the controller)
  beforeEach(async () => {
    await Vehicle.deleteMany({});
    await Promise.all(
      vehicles.map((vehicle) =>
        api
          .post("/api/vehicleRentals")
          .set("Authorization", "Bearer " + token)
          .send(vehicle),
      ),
    );
  });

  // ────────────────── GET /api/vehicleRentals ──────────────────
  describe("GET /api/vehicleRentals", () => {
    it("should return all vehicles as JSON with status 200", async () => {
      const response = await api
        .get("/api/vehicleRentals")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveLength(vehicles.length);
    });
  });

  // ────────────────── GET /api/vehicleRentals/:id ──────────────────
  describe("GET /api/vehicleRentals/:id", () => {
    it("should return one vehicle by ID", async () => {
      const vehicle = await Vehicle.findOne();
      const response = await api
        .get(`/api/vehicleRentals/${vehicle._id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.vehicleModel).toBe(vehicle.vehicleModel);
    });

    it("should return 404 for a non-existing vehicle ID", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      await api.get(`/api/vehicleRentals/${nonExistentId}`).expect(404);
    });
  });

  // ────────────────── POST /api/vehicleRentals (protected) ──────────────────
  describe("POST /api/vehicleRentals", () => {
    describe("when the user is authenticated", () => {
      it("should create a new vehicle with status 201", async () => {
        const newVehicle = {
          vehicleModel: "Toyota Camry",
          category: "Sedan",
          description: "Reliable and fuel-efficient sedan",
          agency: {
            name: "CityDrive Rentals",
            contactEmail: "support@citydrive.com",
          },
          location: {
            city: "Helsinki",
            state: "Uusimaa",
          },
          dailyPrice: 59.9,
          availabilityStatus: "available",
          insurancePolicy: "Full coverage included",
          listingDate: "2026-03-06T09:46:29.663Z",
        };

        const response = await api
          .post("/api/vehicleRentals")
          .set("Authorization", "Bearer " + token)
          .send(newVehicle)
          .expect(201);

        expect(response.body.vehicleModel).toBe(newVehicle.vehicleModel);

        const vehiclesAtEnd = await vehiclesInDb();
        expect(vehiclesAtEnd).toHaveLength(vehicles.length + 1);
      });
    });

    describe("when the user is not authenticated", () => {
      it("should return 401 if no token is provided", async () => {
        const newVehicle = {
          vehicleModel: "Toyota Camry",
          category: "Sedan",
          description: "Reliable and fuel-efficient sedan",
          agency: {
            name: "CityDrive Rentals",
            contactEmail: "support@citydrive.com",
          },
          location: {
            city: "Helsinki",
            state: "Uusimaa",
          },
          dailyPrice: 59.9,
          availabilityStatus: "available",
          insurancePolicy: "Full coverage included",
          listingDate: "2026-03-06T09:46:29.663Z",
        };

        await api.post("/api/vehicleRentals").send(newVehicle).expect(401);

        const vehiclesAtEnd = await vehiclesInDb();
        expect(vehiclesAtEnd).toHaveLength(vehicles.length);
      });
    });
  });

  describe("Extra auth cases", () => {
    it("should return 401 for invalid token format", async () => {
      await api
        .post("/api/vehicleRentals")
        .set("Authorization", "Bearer invalid-token")
        .send(vehicles[0])
        .expect(401);
    });

    it("should return 401 for expired token (if applicable)", async () => {
      const user = await User.findOne();
      const expiredToken = jwt.sign(
        { _id: user._id },
        process.env.SECRET || process.env.JWT_SECRET,
        { expiresIn: "-1s" },
      );

      await api
        .post("/api/vehicleRentals")
        .set("Authorization", "Bearer " + expiredToken)
        .send(vehicles[0])
        .expect(401);
    });
  });

  // ────────────────── PUT /api/vehicleRentals/:id (protected) ──────────────────
  describe("PUT /api/vehicleRentals/:id", () => {
    describe("when the user is authenticated", () => {
      it("should update the vehicle and return the updated document", async () => {
        const vehicle = await Vehicle.findOne();
        const updates = {
          vehicleModel: "Honda Civic",
          dailyPrice: 69.9,
        };

        const response = await api
          .put(`/api/vehicleRentals/${vehicle._id}`)
          .set("Authorization", "Bearer " + token)
          .send(updates)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        expect(response.body.vehicleModel).toBe(updates.vehicleModel);
        expect(response.body.dailyPrice).toBe(updates.dailyPrice);

        const updatedVehicle = await Vehicle.findById(vehicle._id);
        expect(updatedVehicle.vehicleModel).toBe(updates.vehicleModel);
        expect(updatedVehicle.dailyPrice).toBe(updates.dailyPrice);
      });
    });

    describe("when the user is not authenticated", () => {
      it("should return 401 if no token is provided", async () => {
        const vehicle = await Vehicle.findOne();
        await api
          .put(`/api/vehicleRentals/${vehicle._id}`)
          .send({ info: "Nope" })
          .expect(401);
      });
    });
  });

  // ────────────────── DELETE /api/vehicleRentals/:id (protected) ──────────────────
  describe("DELETE /api/vehicleRentals/:id", () => {
    describe("when the user is authenticated", () => {
      it("should delete the vehicle and return status 204", async () => {
        const vehiclesAtStart = await vehiclesInDb();
        const vehicleToDelete = vehiclesAtStart[0];

        await api
          .delete(`/api/vehicleRentals/${vehicleToDelete._id}`)
          .set("Authorization", "Bearer " + token)
          .expect(204);

        const vehiclesAtEnd = await vehiclesInDb();
        expect(vehiclesAtEnd).toHaveLength(vehiclesAtStart.length - 1);
        expect(vehiclesAtEnd.map((v) => v.vehicleModel)).not.toContain(
          vehicleToDelete.vehicleModel,
        );
      });
    });

    describe("when the user is not authenticated", () => {
      it("should return 401 if no token is provided", async () => {
        const vehicle = await Vehicle.findOne();
        await api.delete(`/api/vehicleRentals/${vehicle._id}`).expect(401);
      });
    });
  });
});

// Close DB connection once after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
