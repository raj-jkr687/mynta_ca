const { getAllContacts, getContactById, addContact, removeContact, updateContact } = require('../services/contactservice')


const handleValidationError = (err) => {
  let message;
  const key = Object.keys(err.errors);
  message = `Invalid ${err.errors[key[0]].path}: ${err.errors[key[0]].value}.`;
  if (err.errors[key[0]] && err.errors[key[0]].properties) {
    message = err.errors[key[0]].properties.message;
  }
  return message;
}

const handleDuplicateField = (err) => {
  let message;
  const keys = Object.keys(err.keyValue);
  console.log("===========keys==="+ keys)
  if (keys.includes('first_name')) message = 'first name already exists';
  return message;
}

const index = async (req, res) => {
	console.log(req.query);
	const query = req.query;
  const contacts = await getAllContacts(query)
  console.log(contacts);
  res.status(200).json({ contacts, status: 'success' })
}

const view = async (req, res) => {
  const contact = await getContactById(req.params.id)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ contact, status: 'success' })
}

const create = async (req, res) => {
	try {
	  const contact = await addContact(req.body)
	  res.status(201).json({ contact, status: 'success' })
	}catch(err){
		 let msg = 'something went wrong';
		 console.log("=========="+ err);
		  if (err.code === 11000) msg = handleDuplicateField(err);
		  if (err.name === 'ValidationError') msg = handleValidationError(err);
		return res.status(400).json({
		  success: false,
		  message: msg,
		});
	}
}

const update = async (req, res) => {
	try{
  const contact = await updateContact(req.params.id, req.body)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ contact, status: 'success' })
	}catch{
			 let msg = 'something went wrong';
			 
    return res.status(400).json({
      success: false,
      message: msg,
    });
	}
}


const deleteContact = async (req, res) => {
	try{
  const result = await removeContact(req.params.id)

  if (!result) {
    return res.status(404).json({ message: 'Not found' })
  }

	res.status(200).json({ message: 'contact deleted' })
	} catch{
			 let msg = 'something went wrong';
    return res.status(400).json({
      success: false,
      message: msg,
    });
	}
}

module.exports = {
  index,
  view,
  create,
  update,
  deleteContact,
}