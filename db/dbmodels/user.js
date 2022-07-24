module.exports = (sequelize, Sequelize)=>{
const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  registrationDate: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
});
User.sync()
return User
}
