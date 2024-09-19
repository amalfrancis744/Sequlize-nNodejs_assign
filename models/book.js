import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Book = sequelize.define('Book',{

 id:{

    type : DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
 },
 title:{ 
    type : DataTypes.STRING,
    allowNull:false
 },
 author:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
    
 },
 published_year:{
    type:DataTypes.INTEGER,
    allowNull:false
 },
 genre:{
    type:DataTypes.STRING,
    allowNull:false,
 },

}, {
    timestamps: false,
    tableName:'books',
    indexes:[
        {
            name:"idx_author",
            fields:['author'],
        }
      ],
 }

)

export default Book