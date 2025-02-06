import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Asegúrate de importar correctamente tu configuración de Firebase

const ProductDetails = () => {
  const { id } = useParams(); // Obtener el ID desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Realiza una consulta donde el campo `id` coincide con el valor recibido por la URL
        const productsRef = collection(db, "product"); // Asegúrate de que "Products" sea tu colección
        const q = query(productsRef, where("id", "==", id)); 
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Extrae el primer producto encontrado (asume que `id` es único)
          const productData = querySnapshot.docs[0].data();
          setProduct(productData);
        } else {
          console.log("Producto no encontrado.");
        }
      } catch (error) {
        console.error("Error obteniendo los datos del producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">No se encontró el producto.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={product.imageURL || "https://via.placeholder.com/400"}
              alt={product.name}
              sx={{ height: "400px", objectFit: "contain" }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Precio: {product.price} €
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>
          <Box sx={{ marginTop: "20px", display: "flex", gap: "15px" }}>
            <Button variant="contained" color="primary">
              Añadir al carrito
            </Button>
            <Button variant="outlined" color="secondary">
              Comprar ahora
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;