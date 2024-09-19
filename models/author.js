import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
   
     unique: 'author_unique_index'
  },
  birth_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
     unique: 'author_unique_index'
  },
}, {
  tableName: 'authors',
  timestamps: false,

});

export default Author
