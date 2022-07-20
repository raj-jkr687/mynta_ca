const Group = require('../model/group')

const getAllGroups = async (query) => {

const filter = query;

const groups = await Group.find(filter);

  return groups;
}

const getGroupById = async (groupId) => {
  const group = await Group.findOne({_id: groupId })
  return group
}

const addGroup = async (body) => {
  const newGroup = await Group.create({ ...body })
  return newGroup
}

const updateGroup = async (groupId, body) => {
  const updatedGroup = await Group.findOneAndUpdate({ _id: groupId }, body, { new: true })
  return updatedGroup
}

const removeGroup = async (groupId) => {
  const group = await Group.findOneAndRemove({ _id: groupId })
  return group
}

module.exports = {
  getAllGroups,
  getGroupById,
  addGroup,
  updateGroup,
  removeGroup
}