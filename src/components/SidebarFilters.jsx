import React, { useState, useEffect } from "react";
import { Box, Slider, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { fetchProducts } from "../services/productService"; 

const categories = ["Teclado", "Pantalla", "Ratón", "Portátil"]; 

// Función para normalizar texto (elimina tildes y convierte a minúsculas)
const normalizeText = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

const SidebarFilters = ({ setFilteredProducts }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]); // Se amplió a 1000 por si el portátil queda fuera del rango
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts(); 
      setProducts(data);
      setFilteredProducts(data); 
    };

    loadProducts();
  }, [setFilteredProducts]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.name;
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  useEffect(() => {
    console.log("🔥 Categorías seleccionadas:", selectedCategories);
    console.log("💰 Rango de precios:", priceRange);

    const filtered = products.filter((product) => {
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];

      const productCategory = normalizeText(product.category || "");
      const selectedCategoriesNormalized = selectedCategories.map(normalizeText);

      console.log(`🔎 Comparando producto: "${product.name}" | Precio: ${product.price} | Categoría: "${product.category}" (${productCategory})`);

      const inCategory =
        selectedCategories.length === 0 ? true : selectedCategoriesNormalized.includes(productCategory);

      console.log(`✅ inPriceRange: ${inPriceRange}, inCategory: ${inCategory}`);

      return inPriceRange && inCategory;
    });

    console.log("✅ Productos filtrados FINAL:", filtered);
  
    setFilteredProducts(filtered);
  }, [priceRange, selectedCategories, products, setFilteredProducts]);
  

  return (
    <Box sx={{ padding: 2, width: "250px" }}>
      <Typography variant="h6">Filtra por Precio</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000} // Aseguramos que cubra todos los productos
      />
      <Typography variant="body2">Rango seleccionado: {priceRange[0]}€ - {priceRange[1]}€</Typography>

      <Typography variant="h6" sx={{ marginTop: 2 }}>Filtra por Categoría</Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
                name={category}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SidebarFilters;
