const { Sequelize } = require('sequelize');
require('dotenv').config();

    const sequelize = new Sequelize(process.env.DATABASE,process.env.DBUSER,process.env.DBPASS, {
        host: 'localhost',
        dialect:'mysql'
    });
    const User = require('./dbmodels/user')(sequelize, Sequelize)
    const Company = require('./dbmodels/company')(sequelize, Sequelize)
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }


    const CompanyUsers = sequelize.define(
        "Company_Users",
        {},
        {timestamps:false}    
    )
    User.belongsToMany(Company, { through: CompanyUsers });
    Company.belongsToMany(User, { through: CompanyUsers });

    User.sync()
    Company.sync()
    CompanyUsers.sync()

    const db= {}
    db.User = User
    db.Company = Company
    module.exports = db
