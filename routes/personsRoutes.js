const express = require('express');
const personsController = require('../controllers/personsController');
const personsRouter = express.Router();

personsRouter.param('id', personsController.checkID);

personsRouter
    .route('/')
    .get(personsController.getAllPersons)
    .post(personsController.checkBody, personsController.createPerson);

personsRouter
    .route('/:id')
    .get(personsController.getPerson)
    .patch(personsController.updatePerson)
    .delete(personsController.deletePerson);

module.exports = personsRouter;