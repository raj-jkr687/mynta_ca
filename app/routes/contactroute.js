var express = require('express');
var contactRouter = express.Router();
const contactController = require('../controllers/contacts');

contactRouter.get('/', contactController.index);
contactRouter.post('/', contactController.create);
contactRouter.put('/:id', contactController.update);
contactRouter.delete('/:id', contactController.deleteContact);

module.exports = contactRouter;
