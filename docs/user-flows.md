# User Flows

## Customer Flow

1. Customer registers or logs in.
2. Customer views service categories.
3. Customer creates a booking with description and address.
4. Booking starts as `pending`.
5. Admin assigns a worker.
6. Booking becomes `assigned`.
7. Customer views assigned worker details.
8. Worker completes the job.
9. Customer rates the worker.

## Worker Flow

1. Worker registers or logs in.
2. Worker creates a worker profile.
3. Worker selects services and service areas.
4. Admin reviews and approves the profile.
5. Worker views assigned jobs.
6. Worker accepts a job.
7. Worker starts the job.
8. Worker completes the job.
9. Worker views job history.

## Admin Flow

1. Admin logs into the dashboard.
2. Admin views dashboard summary.
3. Admin reviews workers.
4. Admin approves or rejects worker profiles.
5. Admin views bookings.
6. Admin manually assigns workers to bookings.
7. Admin manages service categories.
8. Admin reviews complaints later.

## Booking Status Flow

```text
pending -> assigned -> accepted -> in_progress -> completed
```

Any active booking can also become:

```text
cancelled
```
