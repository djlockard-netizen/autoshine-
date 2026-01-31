# Dirty D's Auto Shine - API Contracts

## Overview
This document outlines the API contracts for the booking system.

## Mock Data Location
- `/app/frontend/src/data/mock.js` - Contains services, time slots, business info

## API Endpoints

### POST /api/bookings
Create a new booking request and send email notification.

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (required)",
  "service": "string (required)",
  "date": "string (required) - ISO date format",
  "time": "string (required)",
  "vehicle": "string (optional)",
  "notes": "string (optional)"
}
```

**Response (201):**
```json
{
  "id": "string",
  "message": "Booking request submitted successfully",
  "email_sent": true
}
```

### GET /api/bookings
Get all bookings (admin use).

**Response (200):**
```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "service": "string",
    "date": "string",
    "time": "string",
    "vehicle": "string",
    "notes": "string",
    "created_at": "datetime",
    "status": "pending | confirmed | completed | cancelled"
  }
]
```

## Frontend Integration
- Update `BookingForm.jsx` to call `POST /api/bookings`
- Replace mock submission with actual API call
- Handle success/error responses

## Email Notification
- Send to: DJLockard@iCloud.com
- Include: Customer name, contact info, service, date/time, vehicle info, notes
