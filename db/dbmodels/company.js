module.exports = (sequelize, Sequelize)=>{
    const Company = sequelize.define('Company', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    Company.sync()
    return Company
}
    