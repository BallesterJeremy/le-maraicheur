const AbstractManager = require("./AbstractManager");

class TeamManager extends AbstractManager {
  static table = "team";

  findAll() {
    return this.connection.query(`SELECT * FROM ${TeamManager.table}`);
  }

  insert(team) {
    return this.connection.query(`INSERT INTO ${TeamManager.table} SET ?`, [
      team,
    ]);
  }

  update(team) {
    return this.connection.query(
      `update ${TeamManager.table} SET ? WHERE id = ?`,
      [team, team.id]
    );
  }

  findTeamById(teamId) {
    return this.connection
      .query(`SELECT * FROM ${TeamManager.table} WHERE id = ?`, [teamId])
      .then((result) => result[0]);
  }

  findByTeam(teamId) {
    return this.connection.query(`SELECT * FROM ${TeamManager.table} `, [
      teamId,
    ]);
  }

  deleteTeam(teamId) {
    return this.connection.query(
      `DELETE FROM ${TeamManager.table} WHERE id =?`,
      [teamId]
    );
  }
}

module.exports = TeamManager;
