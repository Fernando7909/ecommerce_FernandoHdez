import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  // Carrega les comandes de l'usuari
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(ordersQuery);
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

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

  if (orders.length === 0) {
    return (
      <Box sx={{ textAlign: "center", padding: "50px" }}>
        <Typography variant="h6">No tens cap comanda registrada.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Historial de Comandes
      </Typography>
      {orders.map((order) => (
        <Card key={order.id} sx={{ marginBottom: "15px" }}>
          <CardContent>
            <Typography variant="body1">ID Comanda: {order.id}</Typography>
            <Typography variant="body2">
              Data: {new Date(order.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">Total: €{order.total}</Typography>
            <Typography variant="body2">Estat: {order.status}</Typography>
            <Typography variant="body2" sx={{ marginTop: "10px" }}>
              Productes:
            </Typography>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} unitats - €{item.price}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default OrderHistory;