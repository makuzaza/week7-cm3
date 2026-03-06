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
