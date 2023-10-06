const { Router } = require('express')
const pharmacistController = require('../controllers/pharmacist.controller')

const pharmacistRoutes = new Router()


pharmacistRoutes.get('/:id', pharmacistController.getPharmacist)


module.exports = { pharmacistRoutes };