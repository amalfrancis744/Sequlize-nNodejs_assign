import { Sequelize } from "sequelize";


const sequelize = new Sequelize('library','root','root',{
host:"localhost",
dialect:"mysql",

})

try {
    sequelize.authenticate();
   console.log('Database Connection has been established successfully.');
 } catch (error) {
   console.error('Unable to connect to the database:', error);
 }

 export default sequelize