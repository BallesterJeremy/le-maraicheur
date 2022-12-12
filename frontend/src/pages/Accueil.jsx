/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-unresolved */
import TextAccueil from "@components/TextAccueil/TextAccueil";
import TextAccueilSecond from "@components/TextAccueil/TextAccueilSecond";
import Carousels from "@components/Carousels";
import MenuBurger from "@components/MenuBurger";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Newsletter from "@components/Newsletter";
import ArticleCard from "@components/ArticleCard";
import { Helmet } from "react-helmet";

export default function Accueil() {
  return (
    <>
      <Helmet>
        <meta
          charSet="utf-8"
          name="content"
          content="Antoine Debray, Le Maraicheur maraicher situé à La Croix-du-Perche"
        />
        <title>Accueil - Le Maraicheur </title>
        <link href="http://lemaraicheur.com/accueil" />
      </Helmet>
      <Navbar />
      <MenuBurger />
      <Carousels />
      <TextAccueil />
      <h2 className="panierTitle">
        LE PANIER
        <span className="spanLine" />
      </h2>
      <TextAccueilSecond />
      <h2 className="panierTitle">
        PRESSE
        <span className="spanLine" />
      </h2>
      <ArticleCard />
      <h2 className="panierTitle">
        NEWSLETTER
        <span className="spanLine" />
      </h2>
      <Newsletter />
      <Footer />
    </>
  );
}
