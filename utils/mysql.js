const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('testdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
});


const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

     
        await sequelize.sync(); 
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};





module.exports = { sequelize,connectToDatabase };
