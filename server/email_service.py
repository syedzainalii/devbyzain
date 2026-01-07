from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr
from typing import List
import os
from config import get_settings

settings = get_settings()

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME", ""),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD", ""),
    MAIL_FROM=os.getenv("MAIL_FROM", "noreply@webshop.com"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_FROM_NAME=os.getenv("MAIL_FROM_NAME", "DevbyZain"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

fm = FastMail(conf)

async def send_verification_code(email: EmailStr, code: str):
    """Send verification code to user"""
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #ffffff; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #380036 0%, #0CBABA 100%); padding: 40px; border-radius: 10px;">
                <h1 style="color: #ffffff; text-align: center;">Verify Your Email</h1>
                <p style="font-size: 16px; color: #e2e8f0;">Your verification code is:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; display: inline-block;">
                        <span style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #ffffff;">{code}</span>
                    </div>
                </div>
                
                <p style="font-size: 14px; color: #cbd5e1; text-align: center;">Enter this code to verify your email address.</p>
                <p style="font-size: 14px; color: #cbd5e1; margin-top: 30px; text-align: center;">This code will expire in 10 minutes.</p>
                
                <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 30px 0;">
                
                <p style="font-size: 12px; color: #94a3b8; text-align: center;">
                    If you didn't request this code, please ignore this email.
                </p>
            </div>
        </body>
    </html>
    """
    
    message = MessageSchema(
        subject="Your Verification Code - DevbyZain",
        recipients=[email],
        body=html,
        subtype="html"
    )
    
    try:
        await fm.send_message(message)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False


async def send_template_order_email(email: EmailStr, customer_name: str, product_title: str, order_id: int):
    """Send email notification when user orders a template"""
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #ffffff; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #380036 0%, #0CBABA 100%); padding: 40px; border-radius: 10px;">
                <h1 style="color: #ffffff; text-align: center;">Order Received!</h1>
                <p style="font-size: 16px; color: #e2e8f0;">Hi {customer_name},</p>
                <p style="font-size: 16px; color: #e2e8f0;">Thank you for your order! We've received your request for:</p>
                
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h2 style="color: #ffffff; margin: 0 0 10px 0;">{product_title}</h2>
                    <p style="color: #cbd5e1; margin: 0;">Order ID: #{order_id}</p>
                </div>
                
                <p style="font-size: 16px; color: #e2e8f0;">Our admin will contact you shortly via WhatsApp or email to complete your order and provide the template files.</p>
                
                <div style="background: rgba(139, 92, 246, 0.2); padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6;">
                    <p style="margin: 0; color: #e2e8f0; font-size: 14px;">
                        <strong>Next Steps:</strong><br>
                        1. Wait for admin contact (usually within 24 hours)<br>
                        2. Complete payment details<br>
                        3. Receive your template files
                    </p>
                </div>
                
                <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 30px 0;">
                
                <p style="font-size: 12px; color: #94a3b8; text-align: center;">
                    Questions? Reply to this email or contact us directly.
                </p>
            </div>
        </body>
    </html>
    """
    
    message = MessageSchema(
        subject=f"Order Confirmation - {product_title}",
        recipients=[email],
        body=html,
        subtype="html"
    )
    
    try:
        await fm.send_message(message)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False


async def send_custom_request_email(email: EmailStr, customer_name: str, project_title: str, request_id: int):
    """Send email notification when user requests customization"""
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #ffffff; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #380036 0%, #0CBABA 100%); padding: 40px; border-radius: 10px;">
                <h1 style="color: #ffffff; text-align: center;">Custom Request Received!</h1>
                <p style="font-size: 16px; color: #e2e8f0;">Hi {customer_name},</p>
                <p style="font-size: 16px; color: #e2e8f0;">Thank you for your custom design request! We've received your project:</p>
                
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h2 style="color: #ffffff; margin: 0 0 10px 0;">{project_title}</h2>
                    <p style="color: #cbd5e1; margin: 0;">Request ID: #{request_id}</p>
                </div>
                
                <p style="font-size: 16px; color: #e2e8f0;">Our admin will review your requirements and contact you shortly via WhatsApp or email to discuss your project in detail.</p>
                
                <div style="background: rgba(139, 92, 246, 0.2); padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6;">
                    <p style="margin: 0; color: #e2e8f0; font-size: 14px;">
                        <strong>What's Next:</strong><br>
                        1. Admin will contact you for consultation<br>
                        2. Project quote and timeline discussion<br>
                        3. Development begins after approval
                    </p>
                </div>
                
                <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 30px 0;">
                
                <p style="font-size: 12px; color: #94a3b8; text-align: center;">
                    Questions? Reply to this email or contact us directly.
                </p>
            </div>
        </body>
    </html>
    """
    
    message = MessageSchema(
        subject=f"Custom Request Confirmation - {project_title}",
        recipients=[email],
        body=html,
        subtype="html"
    )
    
    try:
        await fm.send_message(message)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False


async def send_password_reset_email(email: EmailStr, token: str):
    """Send password reset email to user"""
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    reset_link = f"{frontend_url}/reset-password?token={token}"
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #ffffff; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #380036 0%, #0CBABA 100%); padding: 40px; border-radius: 10px;">
                <h1 style="color: #ffffff; text-align: center;">Reset Your Password</h1>
                <p style="font-size: 16px; color: #e2e8f0;">You requested to reset your password. Click the button below to proceed:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{reset_link}" style="background: linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                        Reset Password
                    </a>
                </div>
                
                <p style="font-size: 14px; color: #cbd5e1;">Or copy and paste this link in your browser:</p>
                <p style="font-size: 12px; color: #94a3b8; word-break: break-all;">{reset_link}</p>
                
                <p style="font-size: 14px; color: #cbd5e1; margin-top: 30px;">This link will expire in 1 hour.</p>
                
                <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 30px 0;">
                
                <p style="font-size: 12px; color: #94a3b8; text-align: center;">
                    If you didn't request a password reset, please ignore this email.
                </p>
            </div>
        </body>
    </html>
    """
    
    message = MessageSchema(
        subject="Reset Your Password - DevbyZain",
        recipients=[email],
        body=html,
        subtype="html"
    )
    
    try:
        await fm.send_message(message)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
