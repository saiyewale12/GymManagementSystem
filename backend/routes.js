const express = require('express');
const memberController = require('./membercollectors');

const router = express.Router();

router.get('/members', memberController.getAllMembers);
router.post('/members', memberController.addMember);
router.put('/members/:id', memberController.updateMember);
router.delete('/members/:id', memberController.deleteMember);
router.get('/members/search', memberController.searchMember);

module.exports = router;
