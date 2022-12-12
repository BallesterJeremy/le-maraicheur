import TextPropos from "@components/TextPropos/TextPropos";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import MenuBurger from "@components/MenuBurger";
import { Helmet } from "react-helmet";

export default function Propos() {
  return (
    <div>
      <Helmet>
        <meta
          charSet="utf-8"
          name="content"
          content="Antoine Debray, Le Maraicheur maraicher situé à La Croix-du-Perche"
        />
        <title>A Propos - Le Maraicheur </title>
        <link href="http://lemaraicheur.com/apropos" />
      </Helmet>
      <Navbar />
      <MenuBurger />
      <TextPropos />
      <Footer />
    </div>
  );
}
