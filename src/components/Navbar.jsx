import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Link,
  Button,
} from "@mui/material";
import { Search, ShoppingCart, Person } from "@mui/icons-material";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [user, setUser] = useState(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString()); // Inicialitza amb l’hora actual
  const [temperature, setTemperature] = useState(null); // Inicialitza sense dades de temperatura

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString()); // Actualitza l’hora actual
    }, 1000); // Interval d’un segon
    return () => clearInterval(interval); // Neteja l’interval
  }, []);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&appid=eaa4f6d50f0c4054c859f41dea0c044f`
        );
        const data = await response.json();
        setTemperature(data.main.temp); // Actualitza l’estat amb la temperatura en °C
      } catch (error) {
        console.error("Error obtenint la temperatura:", error);
      }
    };
    fetchTemperature();
  }, []);
  
  

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = auth.currentUser;
      setUser(currentUser); // Actualiza el estado del usuario autenticado
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "User", currentUser.uid));
        if (userDoc.exists() && userDoc.data().role === "seller") {
          setIsSeller(true);
        } else {
          setIsSeller(false);
        }
      }
    };

    auth.onAuthStateChanged(() => {
      checkAuth();
    });
  }, [auth, db]);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setIsSeller(false);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#232f3e" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          <Link
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            MiTienda
          </Link>
        </Typography>

        {/* Barra de búsqueda */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "0 10px",
            width: "40%",
          }}
        >
          <Search style={{ color: "#888" }} />
          <InputBase
            placeholder="Buscar productos"
            style={{
              marginLeft: "10px",
              flex: 1,
              fontSize: "14px",
            }}
          />
        </div>

        {/* Api weather */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "white" }}>
        <Typography variant="body1">{time}</Typography> 
        {temperature !== null && (
          <Typography variant="body1">{`${temperature}°C`}</Typography>
        )}
      </div>



        {/* Iconos y enlaces */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* Enlace al panel de administración solo si el usuario es un vendedor */}
          {isSeller && (
            <Link
              href="/admin-dashboard"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Panel de Vendedor
            </Link>
          )}
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* Enlace de autenticación o cierre de sesión */}
          {user ? (
            <Button
              color="inherit"
              onClick={handleSignOut}
              style={{ fontWeight: "bold" }}
            >
              Cerrar Sesión
            </Button>
          ) : (
            <Link
              href="/authentication"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
