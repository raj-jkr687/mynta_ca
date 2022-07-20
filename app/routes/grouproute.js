var express = require('express');
var groupRouter = express.Router();
const groupController = require('../controllers/group');

groupRouter.get('/', groupController.index);
groupRouter.post('/', groupController.create);
groupRouter.put('/:id', groupController.update);
groupRouter.delete('/:id', groupController.deleteGroup);
groupRouter.post('/addToGroup', groupController.addContactToGroup);
groupRouter.get('/getgroupContacts', groupController.getallContactBelongsGroup);

module.exports = groupRouter;
