const {User, Company} = require('../db/db')
const userController = require('./userController')
const companyController = {}

const findAllCompanies = async ()=>{
    const companies = await Company.findAll({ 
        include: [ { model: User, as: 'Users' }]
    })
    return companies
}
const findCompany = async(companyId)=>{
    const company = await Company.findOne({
        where:{id:companyId},
        incude:[{ model: User, as: 'Users' }]
    })
    if(!company) return {errorMessage:"No such company"}
    return company
}
const createCompany=async(companyInfo)=>{
    const {name, address} = companyInfo
    const company = await Company.create({name:name,address:address})
    return company
}
const updateCompany=async(companyId, companyInfo)=>{
    const {name, address} = companyInfo
    const company = await findCompany(companyId)
    if(company.errorMessage) return {errorMessage:"No such company"}
    if(name) company.name = name
    if(address) company.address = address
    company.save()
    return company
}
const addUserToCompany=async(companyId, userId)=>{
    const user = await User.findOne({
        where:{id:userId}
    })
    if(!user) return {errorMessage:'No such user'}
    const company = await Company.findOne({
        where:{id:companyId}
    })
    if(!company) return  {errorMessage:'No such company'}
    console.log('here')
    const result = await company.addUser(user)
    if(!result) return {errorMessage:'User already belongs to this company'}
    return result
}
const deleteCompany = async (companyId)=>{
    const result = await Company.destroy({where:{id:companyId}})
    return result
}
const removeUserFromCompany = async (companyId, userId)=>{
    const company = await findCompany(companyId)
    if(company.errorMessage) return company
    const user = await userController.findUser(userId)
    if(user.errorMessage) return user
    company.removeUser(user)
    return company
}
companyController.addUserToCompany=addUserToCompany
companyController.updateCompany = updateCompany
companyController.findCompany = findCompany
companyController.createCompany = createCompany
companyController.findAllCompanies = findAllCompanies
companyController.deleteCompany = deleteCompany
companyController.removeUserFromCompany = removeUserFromCompany
module.exports = companyController