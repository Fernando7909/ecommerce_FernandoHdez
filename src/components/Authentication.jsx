import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
} from "@mui/material";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
 
const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
 
  const auth = getAuth();
  const db = getFirestore();
  const googleProvider = new GoogleAuthProvider();
 
  const handleSubmit = async () => {
    setError(null);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
 
        // Desa el rol de l'usuari
        await setDoc(doc(db, "User", user.uid), {
          email: user.email,
          role: isSeller ? "seller" : "user",
        });
 
        setUser(user);
        setIsSeller(isSeller); // Actualitza l'estat segons l'opció triada durant el registre
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
 
        // Obté el rol des de Firestore
        const userDoc = await getDoc(doc(db, "User", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          setIsSeller(role === "seller"); // Estableix isSeller si el rol és "seller"
        }
 
        setUser(user);
      }
    } catch (err) {
      setError(err.message);
    }
  };
 
  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
 
      // Desa el rol de l'usuari per defecte com "user"
      const userDocRef = doc(db, "User", user.uid);
      await setDoc(userDocRef, { email: user.email, role: "user" }, { merge: true });
 
      // Comprova el rol a Firestore
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        setIsSeller(role === "seller");
      }
 
      setUser(user);
    } catch (err) {
      setError(err.message);
    }
  };
 
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setIsSeller(false); // Reinicia isSeller després del tancament de sessió
  };
 
  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      {user ? (
        <Box>
          <Typography variant="h6">
            Benvingut, {user.email} {isSeller && "(Venedor)"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
            onClick={handleSignOut}
          >
            Tancar Sessió
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>
            {isSignUp ? "Registre" : "Inicia Sessió"}
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: "20px" }}>
              {error}
            </Alert>
          )}
          <TextField
            label="Correu Electrònic"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            label="Contrasenya"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ marginBottom: "20px" }}
          />
          {isSignUp && (
            <Typography variant="body2">
              <label>
                <input
                  type="checkbox"
                  checked={isSeller}
                  onChange={() => setIsSeller(!isSeller)}
                />
                Registrar-me com a venedor
              </label>
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            {isSignUp ? "Registra't" : "Inicia Sessió"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ marginTop: "15px" }}
            onClick={handleGoogleSignIn}
          >
            Inicia Sessió amb Google
          </Button>
          <Typography
            variant="body2"
            sx={{ marginTop: "20px", cursor: "pointer" }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Ja tens un compte? Inicia sessió."
              : "No tens un compte? Registra't."}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
 
export default Authentication;
