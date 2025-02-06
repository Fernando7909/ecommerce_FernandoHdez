import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // Importa Link de react-router-dom

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#232f3e",
        color: "white",
        padding: "20px",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      {/* Missatge principal */}
      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
        © 2024 MiTienda. Tots els drets reservats.
      </Typography>
      
      {/* Enllaços */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <Link
          component={RouterLink}
          to="/politica-privadesa" // Ruta para la Política de Privadesa
          underline="hover"
          sx={{ color: "white", fontSize: "14px" }}
        >
          Política de Privadesa
        </Link>
        <Link
          component={RouterLink}
          to="/condicions-us" // Ruta para las Condicions d'Ús
          underline="hover"
          sx={{ color: "white", fontSize: "14px" }}
        >
          Condicions d'Ús
        </Link>
        <Link
          component={RouterLink}
          to="/contacte" // Ruta para la página de Contacte
          underline="hover"
          sx={{ color: "white", fontSize: "14px" }}
        >
          Contacte
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
