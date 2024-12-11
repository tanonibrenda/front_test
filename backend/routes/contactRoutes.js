const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  console.log('ContactRoutes.js - Datos recibidos en el cuerpo de la solicitud:', { name, email, message });
  
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  console.log('ContactRoutes.js - Configuración del transportador de correo:', { user: process.env.EMAIL_USER });

  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Nuevo mensaje de contacto',
    text: `Nombre: ${name}\nCorreo Electrónico: ${email}\nMensaje: ${message}`
  };
  console.log('ContactRoutes.js - Opciones del correo:', mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('ContactRoutes.js - Error al enviar el correo electrónico:', error);
      return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    }
    console.log('ContactRoutes.js - Correo electrónico enviado:', info.response);
    res.status(200).json({ success: true, message: 'Mensaje enviado exitosamente' });
  });
});

module.exports = router;
