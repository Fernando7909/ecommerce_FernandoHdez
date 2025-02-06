import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";

const Checkout = ({ cartItems, onPlaceOrder }) => {
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Funció per calcular el total
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Gestió de canvis en els camps d'enviament
  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  // Validació de dades d’enviament
  const isShippingValid = () => {
    return (
      shippingDetails.name &&
      shippingDetails.address &&
      shippingDetails.city &&
      shippingDetails.postalCode
    );
  };

  // Simula el processament del pagament
  const handlePayment = () => {
    if (!isShippingValid()) {
      alert("Si us plau, completa totes les dades d'enviament.");
      return;
    }

    setPaymentProcessing(true);

    // Simulació d'un retard per a Firebase o altres serveis
    setTimeout(() => {
      setPaymentProcessing(false);
      onPlaceOrder(shippingDetails);
    }, 2000);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: "center", padding: "50px" }}>
        <Typography variant="h5">El teu carretó està buit</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Procés de Pagament
      </Typography>
      <Grid container spacing={4}>
        {/* Detalls del carretó */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Productes al Carretó
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ display: "flex", marginBottom: "15px" }}>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{ width: "100px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2">
                  Quantitat: {item.quantity}
                </Typography>
                <Typography variant="body2">
                  Preu: €{item.price * item.quantity}
                </Typography>
              </CardContent>
            </Card>
          ))}
          <Typography variant="h6" sx={{ marginTop: "20px" }}>
            Total: €{calculateTotal()}
          </Typography>
        </Grid>

        {/* Informació d'enviament */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Dades d’Enviament
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          <Box component="form">
            <TextField
              label="Nom complet"
              name="name"
              value={shippingDetails.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              label="Adreça"
              name="address"
              value={shippingDetails.address}
              onChange={handleChange}
              fullWidth
              required
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              label="Ciutat"
              name="city"
              value={shippingDetails.city}
              onChange={handleChange}
              fullWidth
              required
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              label="Codi Postal"
              name="postalCode"
              value={shippingDetails.postalCode}
              onChange={handleChange}
              fullWidth
              required
              sx={{ marginBottom: "15px" }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
            onClick={handlePayment}
            disabled={paymentProcessing}
          >
            {paymentProcessing ? "Processant Pagament..." : "Realitzar Comanda"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;