'use strict';
 const {
   Model
 } = require('sequelize');
 module.exports = (sequelize, DataTypes) => {
   class Task extends Model {
     /**
      * Helper method for defining associations.
      * This method is not a part of Sequelize lifecycle.
      * The `models/index` file will call this method automatically.
      */
     static associate(models) {
       // define association here
       Task.belongsTo(models.User, { foreignKey: 'UserId' })
     }
   };
   Task.init({
      detail: DataTypes.STRING,
      category: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Category is required'
          }
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'UserId is required'
          }
        }
      }
    }, {
      sequelize,
      modelName: 'Task',
    });
  return Task;
}; 