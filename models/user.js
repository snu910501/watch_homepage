const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phoneNumber : {
        type:Sequelize.STRING(),
        allowNull: false,
      }
    },
      {
        sequelize,
        timestamps: true,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
      }
    )
  }
  static associate(db) {

  }
}