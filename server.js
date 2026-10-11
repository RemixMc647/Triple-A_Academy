// Small Node server for Render: serves the website and sends the contact form through Resend.
// Needs two environment variables on Render: RESEND_API_KEY and SCHOOL_EMAIL

const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "20kb" }));
app.use(express.static(__dirname, { extensions: ["html"] }));

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

app.post("/api/contact", async (req, res) => {
  const { name, email, topic, message } = req.body || {};

  if (!name || !email || !topic || !message || !/^\S+@\S+\.\S+$/.test(email) || message.length > 500) {
    return res.status(400).json({ error: "Invalid form data" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Triple A Website <onboarding@resend.dev>", // change after you verify your own domain in Resend
        to: [process.env.SCHOOL_EMAIL],
        reply_to: email,
        subject: `${topic} - website enquiry from ${name}`,
        html: `<p><b>Name:</b> ${esc(name)}</p><p><b>Email:</b> ${esc(email)}</p><p><b>Topic:</b> ${esc(topic)}</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`
      })
    });

    if (!response.ok) return res.status(502).json({ error: "Email failed" });
    res.json({ ok: true });
  } catch (error) {
    res.status(502).json({ error: "Email failed" });
  }
});

app.listen(process.env.PORT || 3000);
