const express = require("express");

const AdminRoutes = require("./Adm.routes");
const PicturesRoutes = require("./Pictures.routes");
const PopUpRoutes = require("./PopUp.routes");
const TextRoutes = require("./Text.routes");
const emailRoutes = require("./email.routes");
const PreOrderRoutes = require("./PreOrder.routes");
const ArticleRoutes = require("./Article.routes");
const ProductRoutes = require("./Product.routes");
const TeamRoutes = require("./Team.routes");

const router = express.Router();

router.use("/adm", AdminRoutes);
router.use("/pictures", PicturesRoutes);
router.use("/popup", PopUpRoutes);
router.use("/article", ArticleRoutes);
router.use("/text", TextRoutes);
router.use("/preorder", PreOrderRoutes);
router.use("/emails", emailRoutes);
router.use("/product", ProductRoutes);
router.use("/team", TeamRoutes);

module.exports = router;
