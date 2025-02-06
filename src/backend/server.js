const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Stripe = require('stripe');
const nodemailer = require('nodemailer');

// Configura Stripe amb la teva clau secreta
const stripe = new Stripe('sk_test_51QSgOrLqhhGqu8RPiYc4CASf4JSGP0Rj3PpPf39pMVg5RY2jm0O1PlMRt27rz8lo8eNY20TNZIS9plvzCnYBXO5z00IDIK26w6'); // Substitueix amb la clau secreta

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Permet peticions del frontend al port 3000
app.use(bodyParser.json()); // Permet processar el cos de les peticions en format JSON

// Configuració del transportador de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fernandojose.hernandez.lopez@prateducacio.com', // La teva adreça de Gmail
    pass: 'osbz hlsx xibg lyjp', // Contrasenya d'Aplicació de Gmail
  },
});

// Endpoint per enviar correus
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'destinatari@gmail.com', // Correu on vols rebre els missatges
    subject: `${subject} - de ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email enviat correctament');
  } catch (error) {
    console.error('Error enviant el correu:', error);
    res.status(500).send('Error enviant el correu');
  }
});

// Endpoint per crear una sessió de Stripe Checkout
app.post('/create-checkout-session', async (req, res) => {
  const { items, success_url, cancel_url } = req.body;

  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.name },
        unit_amount: item.price * 100, // Convertir a cèntims
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url,
      cancel_url,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creant la sessió de Stripe:', error);
    res.status(500).json({ error: 'No es pot crear la sessió de Stripe' });
  }
});

// Endpoint de prova per comprovar el servidor
app.get('/', (req, res) => {
  res.send('Servidor actiu!');
});

// Executa el servidor
app.listen(PORT, () => {
  console.log(`Servidor escoltant al port ${PORT}`);
});
