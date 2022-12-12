const multer = require("multer");
const path = require("path");
const fs = require("fs");
const models = require("../models");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../../public/assets/images/"));
  },

  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const deleteTeam = (pathTeam) => {
  try {
    fs.unlinkSync(pathTeam);
  } catch (err) {
    console.error(err);
  }
};

const upload = multer({ storage }).single("image");
class TeamController {
  static uploadTeam = (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      const pictureData = JSON.parse(req.body.pictureData);

      req.team = {
        name: pictureData.teamName,
        image: req.file.filename,
        alt: pictureData.teamAlt,
        text: pictureData.teamText,
      };
      return next();
    });
  };

  static browse = (req, res) => {
    models.team
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.team
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const team = req.body;
    team.id = parseInt(req.params.id, 10);

    models.team
      .update(team)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = async (req, res) => {
    let team = req.body;
    if (req.team) {
      team = req.team;
    }
    models.team
      .insert(team)
      .then(([result]) => {
        res.status(201).send({ ...team, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = async (req, res) => {
    const teamId = parseInt(req.params.id, 10);
    try {
      const [team] = await models.team.findTeamById(teamId);
      if (!team) {
        return res.status(404).send(`Team with id : ${teamId} not found`);
      }
      const deletedTeam = await models.team.delete(teamId);
      if (deletedTeam.affectedRows === 0) {
        return res.status(404).send("error deleting the related image");
      }
      deleteTeam(
        path.join(__dirname, `../../public/assets/images/${team.image}`)
      );
      return res.status(204).send("Team deleted successfully");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = TeamController;
