const Contact = require('../model/contactm')

const getAllContacts = async (query) => {
//const {first_name = null,last_name=null} = query
const filter = query;

const contacts = await Contact.find(filter);

  return contacts;
}

const getContactById = async (contactId) => {
  const contact = await Contact.findOne({_id: contactId })
  return contact
}

const addContact = async (body) => {
  const newContact = await Contact.create({ ...body })
  return newContact
}

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findOneAndUpdate({ _id: contactId }, body, { new: true })
  return updatedContact
}

const removeContact = async (contactId) => {
  const contact = await Contact.findOneAndRemove({ _id: contactId })
  return contact
}

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact
}