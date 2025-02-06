import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const Cart = () => {
  // Exemple de dades del carretó
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Producte 1",
      price: 100,
      quantity: 1,
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Producte 2",
      price: 200,
      quantity: 2,
      image: "https://via.placeholder.com/200",
    },
  ]);

  // Funció per actualitzar la quantitat
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
      )
    );
  };

  // Funció per eliminar un producte
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Càlcul del total
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: "center", padding: "50px" }}>
        <Typography variant="h5">El carretó està buit</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        El teu Carretó
      </Typography>
      <Grid container spacing={3}>
        {cartItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{ width: "150px", objectFit: "cover" }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">Preu: €{item.price}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                  <Typography>Quantitat:</Typography>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                    sx={{ width: "80px" }}
                  />
                </Box>
              </CardContent>
              <IconButton
                color="error"
                onClick={() => removeItem(item.id)}
                sx={{ marginRight: "10px" }}
              >
                <Delete />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: "20px", textAlign: "right" }}>
        <Typography variant="h5" gutterBottom>
          Total: €{calculateTotal()}
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Procedir al Pagament
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;