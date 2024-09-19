import sequelize from "../config/db.js";
import Author from "./author.js";
import Book from "./book.js";

Book.belongsTo(Author,{foreignKey:'author',targetKey:"name",as:'authorDetailes'})


export default {
    Book,Author,sequelize
}