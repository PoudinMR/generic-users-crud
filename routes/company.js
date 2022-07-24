var express = require('express');
var router = express.Router();
var companyController = require('../controller/companyController')

router.get('/', async function(req, res, next) {
  const companies =  await companyController.findAllCompanies()
  return res.status(200).json(companies)
});
router.get('/:companyId', async function(req, res, next){
    const {companyId} = req.params
    const company = await companyController.findCompany(companyId)
    if(company.errorMessage) return res.status(404).json(company)
    return res.status(200).json(company)
})
router.post('/', async function(req, res, next){
    const company = await companyController.createCompany(req.body)
    return res.status(200).json(company)
})
router.post('/:companyId/users', async function(req, res, next){
    const {companyId} = req.params
    const {id} = req.body
    const result = await companyController.addUserToCompany(companyId, id)
    if(result.errorMessage) return res.status(404).json(result)
    return res.status(200).json(result)
})
router.put('/:companyId', async function(req, res, next){
    const {companyId} = req.params
    const company = await companyController.updateCompany(companyId,req.body)
    if(company.errorMessage) return res.status(404).json(company)
    return res.status(200).json(company)

})
router.delete('/:companyId', async function(req, res, next){
    const {companyId} = req.params
    const result = await companyController.deleteCompany(companyId)
    return res.status(200).json(result)
})
router.delete('/:companyId/users', async function(req, res, next){
    const {companyId} = req.params
    const {id} = req.body
    const result = await companyController.removeUserFromCompany(companyId, id)
    if(result.errorMessage) return res.status(404).json(result)
    return res.status(200).json(result)
})
module.exports = router;
