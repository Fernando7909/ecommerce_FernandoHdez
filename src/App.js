import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import AdminDashboard from "./components/AdminDashboard";
import Authentication from "./components/Authentication"; 
import { Box, CssBaseline } from "@mui/material";

// Páginas nuevas
import PoliticaPrivadesa from "./components/PoliticaPrivadesa"; 
import CondicionsUs from "./components/CondicionsUs"; 
import ContactForm from "./components/ContactForm";

// Página de error 404
const NotFound = () => <h1>Pàgina no trobada (404)</h1>;

const Success = () => <h1>Pagament completat!</h1>;
const Cancel = () => <h1>El pagament s'ha cancel·lat.</h1>;

const App = () => {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Asegura que el Footer siempre quede al final
        }}
      >
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <ProductGrid />
              </>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/authentication" element={<Authentication />} />
          {/* <Route path="/ecommerce_fernando" element={<ProductGrid />} />  */}

          {/* Rutas nuevas para las páginas legales y contacto */}
          <Route path="/politica-privadesa" element={<PoliticaPrivadesa />} />
          <Route path="/condicions-us" element={<CondicionsUs />} />
          <Route path="/contacte" element={<ContactForm />} />

          {/* 🚨 Ruta de fallback para manejar errores 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
