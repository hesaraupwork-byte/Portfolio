const nodemailer = require('nodemailer');

// @route   POST /api/contact
// @desc    Send a contact form message to the site owner's inbox
// @access  Public
exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide name, email, and message' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio contact form: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res.json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Send Message Error:', err.message);
    res.status(500).json({ message: 'Server error sending message' });
  }
};
