const {User, Company} = require('../db/db');

const userController = {}

const findAllUsers = async ()=>{
    const users = await User.findAll({
        include:[{model:Company, as: 'Companies'}]
    })
    return users
}
const findUser = async (userId)=>{
    const user = await User.findOne({
        where:{id:userId},
        include:[{model:Company, as: 'Companies'}]
    })
    if(!user) return {errorMessage:"No such user"}
    return user
}
const createUser = async (userInfo)=>{
    const {name} = userInfo
    const user = await User.create({name:name})
    return user
}
const updateUser = async (userId, userInfo)=>{
    const {name} = userInfo
    const user = await findUser(userId)
    if(!user) return {errorMessage:"No such user"}
    if(name) user.name = name
    user.save()
    return user
}
const deleteUser = async (userId)=>{
    const result = await User.destroy({where:{id:userId}})
    return result
}

userController.findAllUsers = findAllUsers
userController.findUser = findUser
userController.createUser = createUser
userController.updateUser=updateUser
userController.deleteUser = deleteUser
module.exports = userController