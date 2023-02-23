/* eslint-disable import/no-unresolved */
const nodemailer = require("nodemailer");
const path = require("path");
const nodemailerHbs = require("nodemailer-express-handlebars");
const { schemaForm } = require("../joiSchema");

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_REPLY,
} = process.env;

let emailConfiguration = {
  service: "gmail",
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
};

if (process.env.EMAIL_HOST.includes("mailhog")) {
  emailConfiguration = {
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secureConnection: false,
    tls: {
      ciphers: "SSLv3",
    },
  };
}

const transporter = nodemailer.createTransport(emailConfiguration);

class EmailController {
  static sendWithText = async (req, res) => {
    const message = {
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: "Test with Nodemailer",
      text: "Hello, this is my first mail sent with Nodemailer",
    };

    try {
      await transporter.sendMail(message);
      res.status(200);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  static sendWithHtml = async (req, res) => {
    const { email } = req.query;
    const message = {
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: "Test with Nodemailer, with HTML content",
      html: `
      <h1 style='color: red; background-color: green'>Hello Nodemailer</h1>
        <ul>
            <li>Orange</li>
            <li>Ananas</li>
            <li>Apple</li>
        </ul>
        <br />
        <h2>${email}</h2>
    `,
    };

    try {
      await transporter.sendMail(message);
      res.status(200).send("Email sent with success");
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  static sendWithHtmlAndFile = async (req, res) => {
    const { firstname } = req.query;

    const message = {
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: "Test with Nodemailer, with HTML content and file",
      html: `
      <h1 style='color: red; background-color: green'>Hello Nodemailer</h1>
        <ul>
            <li>Orange</li>
            <li>Ananas</li>
            <li>Apple</li>
        </ul>
        <br />
        <h2>${firstname}</h2>
    `,
      attachments: [
        {
          filename: "CyberPunk.png",
          path: path.join(
            __dirname,
            "../../public/assets/images/CyberPunk-03.png"
          ),
        },
      ],
    };

    try {
      await transporter.sendMail(message);
      res.status(200).send("Email sent with success");
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  static sendWithHbsTemplate = async (req, res) => {
    transporter.use(
      "compile",
      nodemailerHbs({
        viewEngine: {
          extName: ".hbs",
          partialsDir: path.join(__dirname, "../views"),
          layoutsDir: path.join(__dirname, "../views/layouts"),
          defaultLayout: "",
        },
        viewPath: path.join(__dirname, "../views"),
        extName: ".hbs",
      })
    );

    const message = {
      from: EMAIL_USER,
      to: "anislrg@gmail.com",
      subject: "Test with Nodemailer, with template hbs",
      // attachments: [
      //   // {
      //   //   filename: "Wilder.png",
      //   //   path: path.join(__dirname, "../../public/assets/images/favicon.png"),
      //   //   cid: "Wilder.png",
      //   // },
      // ],
      template: "index",
      context: {
        src: "Wilder.png",
        alt: "Wilder logo",
        firstname: "John",
        lastname: "Doe",
        link: "https://www.google.com/",
        linkName: "Google",
      },
    };

    try {
      await transporter.sendMail(message);
      res.status(200).send("Email sent with success");
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  static sendPasswordForgotten = async (req, res) => {
    const { adm } = req;

    const message = {
      from: EMAIL_USER,
      to: adm.email,
      // to: user.email,
      subject: "Mot de passe oublié - Maraîcheur Administration",
      html: `
      <h1>Mot de passe oublié</h1>
      <p>Votre mot de passe temporaire: ${adm.temporaryPassword}</p>
       <a href="https://lemaraicheur.fr/reset">Cliquer ici pour changer votre mot de passe</a>
    `,
    };

    try {
      await transporter.sendMail(message);
      return res.status(200).send("Email sent with success");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static sendTest = async (req, res, next) => {
    const { email, textMail, name, surname } = req.body;

    const message = {
      from: EMAIL_USER,
      to: EMAIL_REPLY,
      subject: "Nouveau message via le Maraicheur",
      html: `
      <h1>Un nouveaux message via le maraicheur !!</h1>
      <h2>ENVOYÉ DEPUIS: ${email}</h2>
      <p style='font-size: 18px;'>Prénom: ${name} Nom: ${surname} <br/> ${textMail}</p>

    `,
    };

    try {
      await transporter.sendMail(message);
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static Verify = async (req, res, next) => {
    const { message } = req.body;
    try {
      await schemaForm.validateAsync(message);
      return next();
    } catch (err) {
      return res.sendStatus(500);
    }
  };

  static sendWithSuccess = async (req, res) => {
    const { email } = req.body;

    const message = {
      from: EMAIL_USER,
      to: email,
      subject: "Confirmation d'envoi Le Maraicheur",
      html: `
      <h1>Votre email à bien été envoyé</h1> <br/>
      <h2>Nous vous répondrons le plus rapidement possible</h2> <br/>
      <h3>Cordialement, le Maraicheur</h3>

    `,
    };

    try {
      await transporter.sendMail(message);
      return res.status(200).send("Email sent with success");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = EmailController;
