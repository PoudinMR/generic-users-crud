const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', async function(req, res, next) {
  const users = await userController.findAllUsers()
  return res.status(200).json(users)
});
router.get('/:userId', async function(req, res, next) {
  const {userId} = req.params
  const user = await userController.findUser(userId)
  if(user.errorMessage) return res.status(404).json(user)
  return res.status(200).json(user)
});
router.post('/', async function(req, res, next){
    const user = await userController.createUser(req.body)
    return res.status(200).json(user)
})
router.put('/:userId', async function(req, res, next){
    const {userId} = req.params
    const user = await userController.updateUser(userId, req.body)
    if(user.errorMessage) return res.status(404).json(user)
    return res.status(200).json(user)
})
router.delete('/:userId', async function(req, res, next){
    const {userId} = req.params
    const result = await userController.deleteUser(userId)
    return res.status(200).json(result)
})
module.exports = router;
