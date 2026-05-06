# Database Design

## Collections

## Users

Stores login and role information for customers, workers, and admins.

Fields:

- `name`
- `email`
- `phone`
- `password`
- `role`: `customer`, `worker`, `admin`
- `isActive`
- `createdAt`
- `updatedAt`

## WorkerProfiles

Stores worker-specific information separate from login data.

Fields:

- `userId`
- `services`
- `experience`
- `serviceAreas`
- `availabilityStatus`
- `approvalStatus`: `pending`, `approved`, `rejected`, `blocked`
- `rating`
- `profileImage`
- `documents`

## ServiceCategories

Stores admin-managed service types.

Fields:

- `name`
- `description`
- `baseVisitFee`
- `isActive`

## Bookings

Stores customer service requests and job progress.

Fields:

- `customerId`
- `workerId`
- `serviceCategoryId`
- `description`
- `images`
- `address`
- `location.latitude`
- `location.longitude`
- `status`: `pending`, `assigned`, `accepted`, `in_progress`, `completed`, `cancelled`
- `visitFee`
- `finalAmount`
- `paymentMethod`

## Ratings

Stores customer ratings for completed worker jobs.

Fields:

- `bookingId`
- `customerId`
- `workerId`
- `rating`
- `comment`

## Complaints

Stores issues reported by users.

Fields:

- `bookingId`
- `reportedBy`
- `reportedUser`
- `reason`
- `description`
- `status`

## Notifications

Stores app notifications and future push notification records.

Fields:

- `userId`
- `title`
- `message`
- `type`
- `isRead`
