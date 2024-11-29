const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  
  // Configuración del transportador de Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER || 'yourEmail@example.com',
      pass: process.env.EMAIL_PASS || 'yourEmailPassword'
    }
  });

  // Configuración del correo electrónico
  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL || 'recipient@example.com',
    subject: 'Nuevo mensaje de contacto',
    text: `Nombre: ${name}\nCorreo Electrónico: ${email}\nMensaje: ${message}`
  };

  // Enviar correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    }
    console.log('Correo electrónico enviado:', info.response);
    res.status(200).json({ success: true, message: 'Mensaje enviado exitosamente' });
  });
});

module.exports = router;
