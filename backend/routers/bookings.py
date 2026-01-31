import os
import asyncio
import logging
import uuid
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
import resend
from motor.motor_asyncio import AsyncIOMotorClient

# Configure logging
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/bookings", tags=["bookings"])

# Resend configuration
resend.api_key = os.environ.get("RESEND_API_KEY")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
OWNER_EMAIL = "DJLockard@iCloud.com"

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'dirty_d_auto_shine')]


class BookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: str
    date: str
    time: str
    vehicle: Optional[str] = ""
    notes: Optional[str] = ""


class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service: str
    date: str
    time: str
    vehicle: str = ""
    notes: str = ""
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)


def generate_email_html(booking: Booking) -> str:
    """Generate HTML email content for booking notification."""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: #000000; padding: 30px; border-radius: 0;">
            <h1 style="color: #00A3FF; margin: 0 0 10px 0;">New Booking Request</h1>
            <p style="color: #ffffff; margin: 0;">Dirty D's Auto Shine</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0;">
            <h2 style="color: #333333; margin-top: 0;">Customer Information</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Name:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">{booking.name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Email:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">{booking.email}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Phone:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">{booking.phone}</td>
                </tr>
            </table>
            
            <h2 style="color: #333333; margin-top: 30px;">Booking Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Service:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #00A3FF; font-weight: bold;">{booking.service}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Date:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">{booking.date}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Time:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">{booking.time}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Vehicle:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">{booking.vehicle or 'Not specified'}</td>
                </tr>
            </table>
            
            {f'<div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #00A3FF;"><strong>Additional Notes:</strong><br>{booking.notes}</div>' if booking.notes else ''}
        </div>
        
        <div style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p>This is an automated notification from your website booking system.</p>
            <p style="color: #00A3FF;">Dirty D's Auto Shine - From Dirty to Dazzling</p>
        </div>
    </body>
    </html>
    """


async def send_booking_notification(booking: Booking) -> bool:
    """Send email notification for new booking."""
    if not resend.api_key:
        logger.warning("RESEND_API_KEY not configured, skipping email")
        return False
    
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [OWNER_EMAIL],
            "subject": f"New Booking: {booking.service} - {booking.name}",
            "html": generate_email_html(booking)
        }
        
        # Run sync SDK in thread to keep FastAPI non-blocking
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Booking notification sent, email_id: {email.get('id')}")
        return True
    except Exception as e:
        logger.error(f"Failed to send booking notification: {str(e)}")
        return False


@router.post("", response_model=dict)
async def create_booking(booking_data: BookingCreate):
    """Create a new booking and send email notification."""
    try:
        # Create booking object
        booking = Booking(**booking_data.dict())
        
        # Save to database
        await db.bookings.insert_one(booking.dict())
        logger.info(f"Booking created: {booking.id}")
        
        # Send email notification
        email_sent = await send_booking_notification(booking)
        
        return {
            "id": booking.id,
            "message": "Booking request submitted successfully",
            "email_sent": email_sent
        }
    except Exception as e:
        logger.error(f"Failed to create booking: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("", response_model=List[Booking])
async def get_bookings():
    """Get all bookings."""
    try:
        bookings = await db.bookings.find().to_list(1000)
        return [Booking(**booking) for booking in bookings]
    except Exception as e:
        logger.error(f"Failed to fetch bookings: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
