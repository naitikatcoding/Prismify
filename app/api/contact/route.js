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

    // 2. Discover SMTP credentials with support for multiple alias names
    const rawSmtpUser =
      process.env.EMAIL_SERVER_USER ||
      process.env.SMTP_USER ||
      process.env.GMAIL_USER ||
      process.env.EMAIL_USER ||
      process.env.USER_EMAIL ||
      "naitikgupta2713@gmail.com";

    const rawSmtpPass =
      process.env.EMAIL_SERVER_PASSWORD ||
      process.env.SMTP_PASS ||
      process.env.SMTP_PASSWORD ||
      process.env.GMAIL_APP_PASSWORD ||
      process.env.GMAIL_PASSWORD ||
      process.env.EMAIL_PASS ||
      process.env.EMAIL_PASSWORD ||
      process.env.APP_PASSWORD ||
      process.env.GOOGLE_APP_PASSWORD;

    const smtpUser = rawSmtpUser ? rawSmtpUser.trim() : "";
    // Google App Passwords often contain spaces (e.g. "abcd efgh ijkl mnop"), strip them:
    const smtpPass = rawSmtpPass ? rawSmtpPass.trim().replace(/\s+/g, "") : "";

    let emailDelivered = false;
    let deliveryMessage = "Feedback saved to database.";
    let needsActivation = false;

    if (smtpPass) {
      try {
        console.log(`[Contact API] Attempting Gmail SMTP dispatch with user: ${smtpUser}`);

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

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

            <div style="font-size: 12px; color: #718078; border-top: 1px solid #2d3934; padding-top: 16px;">
              <span>Prismify Website Feedback — Reply directly to this email to reach the user</span>
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
        deliveryMessage = "Feedback sent directly to your email inbox via SMTP!";
        console.log(`[Contact API] Successfully dispatched email to ${RECIPIENT_EMAIL}`);
      } catch (mailError) {
        console.error("[Contact API] SMTP delivery error:", mailError.message);
      }
    }

    // 3. Fallback: If SMTP wasn't used or failed, try FormSubmit zero-setup HTTP relay
    if (!emailDelivered) {
      try {
        const origin = req.headers.get("origin") || "http://localhost:3000";
        const formSubmitRes = await fetch(
          `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Referer: origin,
            },
            body: JSON.stringify({
              _subject: `[Prismify Feedback] ${cleanCategory}: ${cleanSubject}`,
              Name: cleanName,
              Email: cleanEmail,
              Category: cleanCategory,
              Rating: `${cleanRating} / 5`,
              Subject: cleanSubject,
              Message: cleanMessage,
              _template: "table",
            }),
          }
        );

        const fsData = await formSubmitRes.json();
        if (fsData.success === "true" || fsData.success === true) {
          emailDelivered = true;
          deliveryMessage = "Feedback routed directly to your email inbox!";
        } else if (
          typeof fsData.message === "string" &&
          fsData.message.toLowerCase().includes("activation")
        ) {
          needsActivation = true;
          deliveryMessage =
            "An activation link has been sent to your email! Click it once to receive all future feedback directly in your inbox.";
        }
      } catch (fsErr) {
        console.error("[Contact API] FormSubmit fallback warning:", fsErr.message);
      }
    }

    // Update MongoDB status if delivered
    if (emailDelivered && savedFeedback) {
      savedFeedback.emailSent = true;
      await savedFeedback.save();
    }

    // 4. Construct direct client links for instant compose
    const mailSubject = `[Prismify Feedback] ${cleanCategory}: ${cleanSubject}`;
    const mailBody = `Hello Naitik,\n\nHere is feedback from Prismify:\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nCategory: ${cleanCategory}\nRating: ${cleanRating}/5\n\nMessage:\n${cleanMessage}\n`;

    const encodedSubject = encodeURIComponent(mailSubject);
    const encodedBody = encodeURIComponent(mailBody);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${RECIPIENT_EMAIL}&su=${encodedSubject}&body=${encodedBody}`;
    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;

    return NextResponse.json({
      success: true,
      deliveredVia: emailDelivered ? "email" : "database",
      emailDelivered,
      needsActivation,
      recipient: RECIPIENT_EMAIL,
      gmailUrl,
      mailtoUrl,
      message: deliveryMessage,
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { error: "Failed to process feedback. Please try again." },
      { status: 500 }
    );
  }
}
