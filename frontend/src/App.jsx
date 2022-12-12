/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import AdminLogin from "@pages/AdminLogin";

const Accueil = lazy(() => import("@pages/Accueil"));
const Methode = lazy(() => import("@pages/Methode"));
const Upload = lazy(() => import("@pages/Upload"));
const Produit = lazy(() => import("@pages/Produit"));
const Amap = lazy(() => import("@pages/Amap"));
const Propos = lazy(() => import("@pages/Propos"));
const Contact = lazy(() => import("@pages/ContactForm"));

const AdminHome = lazy(() => import("@pages/AdminHome"));
const AdminPopup = lazy(() => import("@pages/AdminPopup"));
const AdminMethode = lazy(() => import("@pages/AdminMethode"));
const AdminPropos = lazy(() => import("@pages/AdminPropos"));
const AdminNews = lazy(() => import("@pages/AdminNews"));
const ResetPassword = lazy(() => import("@pages/ResetPassword"));
const AdminClient = lazy(() => import("@pages/AdminClient"));
const AdminProduits = lazy(() => import("@pages/AdminProduits"));
const AdminMarket = lazy(() => import("@pages/AdminMarket"));

const Error404 = lazy(() => import("@pages/Error404"));

function App() {
  const [adm, setAdm] = useState({ email: "", id: null });

  const checkConnection = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}adm/refreshToken/1`, {
          withCredentials: true,
        })
        .then((result) => result.data);
      return setAdm(data);
    } catch (err) {
      // eslint-disable-next-line
      return alert(err);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading ...</div>}>
        <Routes>
          <Route exact path="/" element={<Accueil />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/methode" element={<Methode />} />
          <Route path="/produit" element={<Produit />} />
          <Route path="/amap" element={<Amap />} />
          <Route path="/propos" element={<Propos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reset" element={<ResetPassword />} />

          <Route exact path="/admin" element={<AdminLogin setAdm={setAdm} />} />
          {adm.email && (
            <>
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/popup" element={<AdminPopup />} />
              <Route path="/admin/methode" element={<AdminMethode />} />
              <Route path="/admin/produits" element={<AdminProduits />} />
              <Route path="/admin/apropos" element={<AdminPropos />} />
              <Route path="/admin/client" element={<AdminClient />} />
              <Route path="/admin/articles" element={<AdminNews />} />
              <Route path="/admin/market" element={<AdminMarket />} />
            </>
          )}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
