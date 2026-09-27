import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectToDatabase from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

const RECIPIENT_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || "naitikgupta2713@gmail.com";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, category, rating, message } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message content cannot be empty." },
        { status: 400 }
      );
    }

    const cleanName = (name && name.trim()) || "Anonymous User";
    const cleanEmail = (email && email.trim()) || "Not provided";
    const cleanSubject = (subject && subject.trim()) || `Feedback: ${category || "General"}`;
    const cleanCategory = category || "General Feedback";
    const cleanRating = Number(rating) || 5;
    const cleanMessage = message.trim();

    // 1. Always persist to MongoDB so feedback is securely recorded
    let savedFeedback = null;
    try {
      await connectToDatabase();
      savedFeedback = await Feedback.create({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        category: cleanCategory,
        rating: cleanRating,
        message: cleanMessage,
        emailSent: false,
      });
    } catch (dbError) {
      console.error("[Contact API] Database save warning:", dbError.message);
    }

    // 2. Check for SMTP credentials to deliver directly to email
    const smtpUser =
      process.env.EMAIL_SERVER_USER ||
      process.env.SMTP_USER ||
      process.env.GMAIL_USER;
    const smtpPass =
      process.env.EMAIL_SERVER_PASSWORD ||
      process.env.SMTP_PASS ||
      process.env.GMAIL_APP_PASSWORD;

    let emailDelivered = false;
    let deliveryMessage = "Feedback saved successfully.";

    if (smtpUser && smtpPass) {
      try {
        const isGmail =
          smtpUser.includes("@gmail.com") ||
          process.env.EMAIL_SERVER_HOST?.includes("gmail");

        const transporter = nodemailer.createTransport(
          isGmail
            ? {
                service: "gmail",
                auth: {
                  user: smtpUser,
                  pass: smtpPass,
                },
              }
            : {
                host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
                port: Number(process.env.EMAIL_SERVER_PORT) || 587,
                secure: process.env.EMAIL_SERVER_SECURE === "true",
                auth: {
                  user: smtpUser,
                  pass: smtpPass,
                },
              }
        );

        const ratingStars = "⭐".repeat(Math.max(1, Math.min(5, cleanRating)));

        const htmlEmail = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #101514; color: #f5f1e8; padding: 32px 20px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #2d3934;">
            <div style="border-bottom: 1px solid #2d3934; padding-bottom: 16px; margin-bottom: 24px;">
              <h2 style="color: #c5f56b; margin: 0 0 8px 0; font-size: 24px;">New Prismify Feedback Received</h2>
              <p style="color: #aeb9b0; margin: 0; font-size: 14px;">Direct message from your website feedback form</p>
            </div>

            <div style="background-color: #18221e; border: 1px solid #34433b; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #718078; width: 120px; font-weight: 600;">Category:</td>
                  <td style="padding: 6px 0; color: #c5f56b; font-weight: bold;">${cleanCategory}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #718078; font-weight: 600;">Rating:</td>
                  <td style="padding: 6px 0; color: #f5f1e8;">${ratingStars} (${cleanRating}/5)</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #718078; font-weight: 600;">From:</td>
                  <td style="padding: 6px 0; color: #f5f1e8;">${cleanName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #718078; font-weight: 600;">Sender Email:</td>
                  <td style="padding: 6px 0; color: #c5f56b;">
                    <a href="mailto:${cleanEmail}" style="color: #c5f56b; text-decoration: underline;">${cleanEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #718078; font-weight: 600;">Subject:</td>
                  <td style="padding: 6px 0; color: #f5f1e8;">${cleanSubject}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #718078; font-weight: 600;">Received At:</td>
                  <td style="padding: 6px 0; color: #aeb9b0;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #141d1a; border-left: 4px solid #c5f56b; padding: 16px 20px; border-radius: 4px; margin-bottom: 24px;">
              <h3 style="color: #f5f1e8; font-size: 15px; margin-top: 0; margin-bottom: 8px;">Message:</h3>
              <p style="color: #f5f1e8; font-size: 15px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${cleanMessage}</p>
            </div>

            <div style="font-size: 12px; color: #718078; border-top: 1px solid #2d3934; padding-top: 16px; display: flex; justify-content: space-between;">
              <span>Prismify Website Feedback</span>
              <span>Reply directly to this email to reach the user</span>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"Prismify Feedback" <${smtpUser}>`,
          replyTo: cleanEmail !== "Not provided" ? cleanEmail : undefined,
          to: RECIPIENT_EMAIL,
          subject: `[Prismify Feedback] ${cleanCategory}: ${cleanSubject}`,
          text: `From: ${cleanName} (${cleanEmail})\nCategory: ${cleanCategory}\nRating: ${cleanRating}/5\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}`,
          html: htmlEmail,
        });

        emailDelivered = true;
        deliveryMessage = "Feedback sent directly to your email inbox!";

        if (savedFeedback) {
          savedFeedback.emailSent = true;
          await savedFeedback.save();
        }
      } catch (mailError) {
        console.error("[Contact API] Mail delivery failed:", mailError.message);
        deliveryMessage = "Feedback saved to database. Mail delivery will require checking SMTP credentials.";
      }
    }

    // Build mailto fallback link for seamless zero-config direct email sending
    const mailtoSubject = encodeURIComponent(`[Prismify Feedback] ${cleanCategory}: ${cleanSubject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${cleanName}\nEmail: ${cleanEmail}\nCategory: ${cleanCategory}\nRating: ${cleanRating}/5\n\nFeedback:\n${cleanMessage}`
    );
    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

    return NextResponse.json({
      success: true,
      deliveredVia: emailDelivered ? "smtp" : "database",
      emailDelivered,
      recipient: RECIPIENT_EMAIL,
      mailtoUrl,
      message: emailDelivered
        ? "Your feedback was sent directly to my inbox!"
        : "Feedback received and saved! You can also send a direct email copy if you wish.",
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { error: "Failed to process feedback. Please try again." },
      { status: 500 }
    );
  }
}
