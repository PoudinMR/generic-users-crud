const userRoute = require('../routes/user')
const companyRoute = require('../routes/company')
const request = require('supertest')
const assert = require('assert')
const app = require('../app')
const db = require('../db/db')
const {User, Company} = db
const chai = require('chai')


const {expect} = chai
describe('GET /company', async function () {
    it('should return the list of all companies', async()=>{
        let companies = await Company.findAll({include:[{model:User,as:'Users'}]})
        let res = await request(app)
            .get('/company')
            .expect(200)
        assert.deepStrictEqual(res.body,JSON.parse(JSON.stringify(companies)))
    })
})
describe('POST /company/:companyId/users', async function(){
    it('should return the newly created joint table', async()=>{
        const company = await Company.create({name:"test",address:"address"})
        const user = await User.create({name:'test'})
        const res = await request(app)
            .post(`/company/${company.id}/users`)
            .send({id:user.id})
            .expect(200)
        assert.deepEqual(res.body[0],{UserId:user.id,CompanyId:company.id})
        await User.destroy({where:{name:"test"}})
        await Company.destroy({where:{name:"test"}})
    })
    it('should return an error if the user doesnt exist', async()=>{
        const company = await Company.findOne()
        const res = await request(app)
            .post(`/company/${company.id}/users`)
            .send({id:555555})
            .expect(404)
        expect(res.body).to.have.property('errorMessage')
    })
})
