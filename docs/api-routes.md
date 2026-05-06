# API Routes

Base URL:

```text
http://localhost:5000/api
```

## Auth

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/auth/register` | Public | Register customer or worker |
| POST | `/auth/login` | Public | Login and receive JWT |
| GET | `/auth/me` | Authenticated | Get current user |

## Services

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/services` | Public | List active service categories |
| POST | `/services` | Admin | Create service category |
| PATCH | `/services/:id` | Admin | Update service category |
| DELETE | `/services/:id` | Admin | Deactivate service category |

## Bookings

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/bookings` | Customer | Create booking |
| GET | `/bookings/my-bookings` | Customer | View own bookings |
| GET | `/bookings/assigned-jobs` | Worker | View assigned jobs |
| PATCH | `/bookings/:id/accept` | Worker | Accept job |
| PATCH | `/bookings/:id/start` | Worker | Start job |
| PATCH | `/bookings/:id/complete` | Worker | Complete job |
| PATCH | `/bookings/:id/cancel` | Customer/Admin | Cancel booking |

## Workers

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/workers/profile` | Worker | Create or update worker profile |
| GET | `/workers/profile/me` | Worker | Get own profile |
| PATCH | `/workers/availability` | Worker | Update availability |

## Admin

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/admin/summary` | Admin | Dashboard summary |
| GET | `/admin/customers` | Admin | List customers |
| GET | `/admin/workers` | Admin | List workers and profiles |
| PATCH | `/admin/workers/:profileId/approval` | Admin | Approve or reject worker |
| GET | `/admin/bookings` | Admin | List bookings |
| PATCH | `/admin/bookings/:bookingId/assign` | Admin | Assign worker manually |

## Ratings

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/ratings` | Customer | Rate worker after completed booking |
| GET | `/ratings/worker/:workerId` | Authenticated | View worker ratings |

## Complaints

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/complaints` | Authenticated | Create complaint |
| GET | `/complaints` | Admin | List complaints |
| PATCH | `/complaints/:id/status` | Admin | Update complaint status |

## Notifications

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/notifications` | Authenticated | List my notifications |
| PATCH | `/notifications/:id/read` | Authenticated | Mark notification as read |
