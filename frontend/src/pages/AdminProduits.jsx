/* eslint-disable no-unused-vars */
import LeftSlide from "@components/Leftslide";
import ProduitsEditor from "@components/ProduitsEditor";
import Topslide from "@components/Topslide";
import React from "react";

const AdminProduits = ({ toggle }) => {
  return (
    <section className="background-home">
      <LeftSlide />
      <Topslide />
      <div className="position-admin--editor">
        <div className="background-texteditor-produits">
          <ProduitsEditor />
          {/* <button type="button" onClick={toggle}>
            CLICK
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default AdminProduits;
