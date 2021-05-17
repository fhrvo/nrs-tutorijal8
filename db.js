const Sequelize = require("sequelize");
const sequelize = new Sequelize('nrs_tut8', 'root', 'root', {
   host: 'localhost', dialect: 'mysql',
   pool: {
       max: 5,
       min: 0,
       acquire: 30000,
       idle: 10000
   }
});

const db={};
db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.Grad = sequelize.define('Grad', {
   naziv: Sequelize.STRING,
   broj_stanovnika: Sequelize.INTEGER
});

module.exports=db;