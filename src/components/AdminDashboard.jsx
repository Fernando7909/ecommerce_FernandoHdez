import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
 
const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [isSeller, setIsSeller] = useState(false);
  const db = getFirestore();
  const auth = getAuth();
 
  // Verifica si l'usuari és un venedor
  useEffect(() => {
    const checkSellerRole = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDocs(doc(db, "users", currentUser.uid));
        if (userDoc.exists() && userDoc.data().role === "seller") {
          setIsSeller(true);
        } else {
          setIsSeller(false);
        }
      }
    };
 
    checkSellerRole();
  }, [auth, db]);
 
  // Carrega els productes associats al venedor
  const fetchProducts = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
 
    const sellerId = currentUser.uid;
    const productsQuery = query(
      collection(db, "products"),
      where("sellerId", "==", sellerId)
    );
 
    const querySnapshot = await getDocs(productsQuery);
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsData);
  };
 
  // Afegeix un nou producte
  const handleAddProduct = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
 
    try {
      await addDoc(collection(db, "product"), {
        ...newProduct,
        sellerId: currentUser.uid, // Associa el producte al venedor
      });
      fetchProducts();
      setOpenDialog(false);
      setNewProduct({ name: "", price: "", image: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
 
  // Elimina un producte
  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "product", id));
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
 
  useEffect(() => {
    fetchProducts();
  }, [auth]);
 
  if (!isSeller) {
    return (
      <Box sx={{ textAlign: "center", padding: "50px" }}>
        <Typography variant="h6">
          No tens permís per accedir a aquest tauler.
        </Typography>
      </Box>
    );
  }
 
  return (
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Tauler de Productes
      </Typography>
 
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: "20px" }}
        onClick={() => setOpenDialog(true)}
      >
        Afegir Producte
      </Button>
 
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">Preu: €{product.price}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ marginTop: "10px" }}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
 
      {/* Diàleg per afegir un producte */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Afegir Nou Producte</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom del Producte"
            fullWidth
            margin="dense"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <TextField
            label="Preu"
            type="number"
            fullWidth
            margin="dense"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <TextField
            label="URL de la Imatge"
            fullWidth
            margin="dense"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel·lar
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Afegir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
 
export default AdminDashboard;
