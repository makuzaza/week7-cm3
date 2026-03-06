# backend_V2 API

## Base URL
`http://localhost:5000`

---

## Auth

JWT token is required for protected routes:

`Authorization: Bearer <token>`

---

## User Routes (`/api/users`)

### `POST /api/auth/login`
Login user.

### `POST /api/auth/signup`
Register user.

---

## Vehicle Rental Routes (`/api/vehicleRentals`)

### Public
### `GET /api/vehicleRentals`
Get all vehicle rentals.

### `GET /api/vehicleRentals/:vehicleRentalId`
Get one vehicle rental by id.

### Protected (after `router.use(requireAuth)`)
### `POST /api/vehicleRentals`
Create a vehicle rental.

### `PUT /api/vehicleRentals/:vehicleRentalId`
Update a vehicle rental.

### `DELETE /api/vehicleRentals/:vehicleRentalId`
Delete a vehicle rental.

Example of the signup data:
```json
{
  "name": "maria maria",
  "username": "maria ku",
  "password": "1234",
  "phone_number": "+358409876543",
  "licenseNumber": "FI-DRV-1234567825",
  "date_of_birth": "1995-09-21T00:00:00.000Z",
  "address": {
    "licenseExpiryDate": "2029-06-30T00:00:00.000Z",
    "city": "Espoo",
    "yearsOfExperience": 8
  }
}
```