import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
 
// Obté tots els productes
export const fetchProducts = async () => {
  const productsCollection = collection(db, "product");
  const productSnapshot = await getDocs(productsCollection);
  return productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
 
// Obté productes associats a un venedor específic
export const fetchSellerProducts = async (sellerId) => {
  const productsCollection = collection(db, "product");
  const productsQuery = query(productsCollection, where("sellerId", "==", sellerId));
  const productSnapshot = await getDocs(productsQuery);
  return productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
