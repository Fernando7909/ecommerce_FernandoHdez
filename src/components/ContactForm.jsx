import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
 
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
 
    try {
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
 
      if (response.ok) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSuccess(true);
      } else {
        console.error("Error enviant el formulari");
      }
    } catch (error) {
      console.error("Error a la sol·licitud:", error);
    }
  };
 
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: "600px", margin: "auto", padding: "20px" }}
    >
      <Typography variant="h4" gutterBottom>
        Contacta'ns
      </Typography>
      {success && <Alert severity="success">Missatge enviat correctament!</Alert>}
      <TextField
        label="Nom"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        sx={{ marginBottom: "15px" }}
      />
      <TextField
        label="Correu electrònic"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        sx={{ marginBottom: "15px" }}
      />
      <TextField
        label="Assumpte"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        fullWidth
        required
        sx={{ marginBottom: "15px" }}
      />
      <TextField
        label="Missatge"
        name="message"
        value={formData.message}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        required
        sx={{ marginBottom: "15px" }}
      />
      <Button variant="contained" type="submit" color="primary" fullWidth>
        Enviar
      </Button>
    </Box>
  );
};
 
export default ContactForm;
