const Member = require('./models');

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching members' });
  }
};

exports.addMember = async (req, res) => {
  const newMember = new Member(req.body);
  try {
    await newMember.save();
    res.status(201).send({ message: 'Member added successfully!' });
  } catch (error) {
    res.status(400).send({ message: 'Error adding member' });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) {
      res.status(404).send({ message: 'Member not found' });
    } else {
      res.json(member);
    }
  } catch (error) {
    res.status(400).send({ message: 'Error updating member' });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      res.status(404).send({ message: 'Member not found' });
    } else {
      res.send({ message: 'Member deleted successfully!' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting member' });
  }
};

exports.searchMember = async (req, res) => {
  try {
    const query = req.query.name;
    const members = await Member.find({ name: { $regex: query, $options: 'i' } });
    res.json(members);
  } catch (error) {
    res.status(500).send({ message: 'Error searching member' });
  }
};
