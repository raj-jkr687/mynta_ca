
const Group = require('../model/group');
const Contact = require('../model/contactm');
const {
    getAllGroups,
    getGroupById,
    addGroup,
    removeGroup,
    updateGroup
} = require('../services/groupservice');

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
    console.log("===========keys===" + keys)
    if (keys.includes('name'))
        message = 'Group name already exists';
    if (keys.includes('contact_id'))
        message = 'Contact Already to the group'
            return message;
}

const index = async(req, res) => {
    console.log(req.query);
    const query = req.query;
    const Groups = await getAllGroups(query)
        console.log(Groups);
    res.status(200).json({
        Groups,
        status: 'success'
    })
}

const addContactToGroup = async(req, res) => {
    try {
        const body = req.body;
        console.log("===========body===" + body);
        const group_name = body.group_name;
        const contact_name = body.contact_name;
        console.log("===========group_name===" + group_name);
        console.log("===========contact_name===" + contact_name);
        const group = await Group.findOne({
            name: group_name
        });
        if (group === null) {
            return res.status(200).json({
                message: 'Group doesnt exist',
                status: ' false '
            });
        }

        console.log("===========group===" + group);
        const contact = await Contact.findOne({
            first_name: contact_name
        });

        if (contact === null) {
            return res.status(200).json({
                message: 'contact doesnt exist',
                status: 'success'
            })
        }

        await Group.findOneAndUpdate({
            '_id': group._id
        }, {
            $addToSet: {
                contacts: contact._id
            }
        },{safe: true, new: true});

        console.log("===========contact===" + contact);

        return res.status(200).json({
            message: 'contact add successfully',
            status: 'success'
        })

    } catch (err) {
        let msg = 'something went wrong';
        console.log("==========" + err);
        if (err.code === 11000)
            msg = handleDuplicateField(err);
        if (err.name === 'ValidationError')
            msg = handleValidationError(err);
        return res.status(400).json({
            success: false,
            message: msg,
        });
    }

}

const getallContactBelongsGroup = async(req, res) => {
    try {

        const query = req.query;
        console.log("===========query===" + query);
        const group_name = query.group_name;
        console.log("===========group_name===" + group_name);
        const groupcontats = await Group.findOne({
            name: group_name
        })
            .populate("contacts")
            .then(group => {
                res.json(group);
            });

    } catch (err) {
        let msg = 'something went wrong';
        console.log("==========" + err);
        return res.status(400).json({
            success: false,
            message: msg,
        });
    }

}

const view = async(req, res) => {
    const group = await getGroupById(req.params.id)

        if (!group) {
            return res.status(404).json({
                message: 'Not found'
            })
        }

        res.status(200).json({
            group,
            status: 'success'
        })
}

const create = async(req, res) => {
    try {
        const group = await addGroup(req.body)
            res.status(201).json({
                group,
                status: 'success'
            })
    } catch (err) {
        let msg = 'something went wrong';
        console.log("==========" + err);
        if (err.code === 11000)
            msg = handleDuplicateField(err);
        if (err.name === 'ValidationError')
            msg = handleValidationError(err);
        return res.status(400).json({
            success: false,
            message: msg,
        });
    }
}

const update = async(req, res) => {
    try {
        const group = await updateGroup(req.params.id, req.body)

            if (!group) {
                return res.status(404).json({
                    message: 'Not found'
                })
            }

            res.status(200).json({
                group,
                status: 'success'
            })
    } catch {
        let msg = 'something went wrong';

        return res.status(400).json({
            success: false,
            message: msg,
        });
    }
}

const deleteGroup = async(req, res) => {
    try {
        const result = await removeGroup(req.params.id)

            if (!result) {
                return res.status(404).json({
                    message: 'Not found'
                })
            }

            res.status(200).json({
                message: 'group deleted'
            })
    } catch {
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
    deleteGroup,
    addContactToGroup,
    getallContactBelongsGroup
}
