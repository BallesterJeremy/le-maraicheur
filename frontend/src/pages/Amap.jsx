import Navbar from "@components/Navbar";
import MenuBurger from "@components/MenuBurger";
import Footer from "@components/Footer";
import Preorder from "@components/Preorder";
import TextAmap from "@components/TextAmap/TextAmap";
import TextAmapSecond from "@components/TextAmap/TextAmapSecond";
import TextAmapThird from "@components/TextAmap/TextAmapThird";
import TextAmapFourth from "@components/TextAmap/TextAmapFourth";
import TextAmapFifth from "@components/TextAmap/TextAmapFifth";
import ImageAmapFirst from "@components/ImageAmap/ImageAmapFirst";
import ImageAmapSec from "@components/ImageAmap/ImageAmapSec";
import ImageAmapThird from "@components/ImageAmap/ImageAmapThird";
import ImageAmapFourth from "@components/ImageAmap/ImageAmapFourth";
import { Helmet } from "react-helmet";

export default function Amap() {
  return (
    <>
      <Helmet>
        <meta
          charSet="utf-8"
          name="content"
          content="Antoine Debray, Le Maraicheur maraicher situé à La Croix-du-Perche"
        />
        <title>Amap - Le Maraicheur </title>
        <link href="http://lemaraicheur.com/amap" />
      </Helmet>
      <Navbar />
      <MenuBurger />
      <ImageAmapFirst />
      <div className="amap-container">
        <h2 className="amap-main-title">
          AMAP
          <span className="spanLine" />
        </h2>
        <TextAmap />
        <div className="Amap-grid">
          <div className="amap-grid-1">
            <h2 className="amapTitle">
              MES AVANTAGES
              <span className="spanLine" />
            </h2>
            <TextAmapSecond />
          </div>
          <div className="amap-grid-2">
            <ImageAmapSec />
          </div>
          <div className="amap-grid-4">
            <h2 className="amapTitle">
              PANIER
              <span className="spanLine" />
            </h2>
            <TextAmapFifth />
          </div>
          <div className="amap-grid-3">
            <ImageAmapThird />
          </div>
        </div>
        <h2 className="amapTitle">
          L'AMAP Maraîcheur
          <span className="spanLine" />
        </h2>
        <TextAmapThird />
        <ImageAmapFourth />
        <h2 className="amapTitle">
          ABONNEMENTS
          <span className="spanLine" />
        </h2>
        <TextAmapFourth />
        <h2 className="amapTitle">
          PRÉCOMMANDER
          <span className="spanLine" />
        </h2>
      </div>
      <Preorder />
      <Footer />
    </>
  );
}
