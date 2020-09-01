import mongoose from 'mongoose';
import { Forum, Section } from '../models/forumSchema';
import { User } from '../models/userSchema';

const isFourmAdmins = (req, uid) => {
    return req.app.locals.admins.forumaAdmins.includes(uid);
}

/*
* methed: newAdminValidation
* @param: { _id, username}
* @return user exsits and not banned
*/
const newAdminValidation = async (user) => {
    try {
        let result = await User.findOne({
            _id: user._id,
            username: user.username,
            banned: false
        }).exec();
        if (result) return true;
        return false;
    } catch (error) {
        handleError(res, error.message);
    }
}

/*
* methed: isSectionAdmins
* @param: req, sid, uid
* @return the user(uid) is an admin of the section(sid)
*/
const isSectionAdmins = (req, sid, uid) => {
    return req.app.locals.admins.sectionAdmins[sid].includes(uid);
}


/*
* methed: addForumAdmin
* playload: { _id, username}
*/
export const addForumAdmin = (req, res) => {
    if (!isFourmAdmins(req, req.user.uid)) {
        return res.status(403).json({ succes: false, message: "Invlid permission!" })
    }
    if (isFourmAdmins(req, req.body._id)) {
        return res.status(400).json({ succes: false, message: "This user is already an admin of the forum!" })
    }
    if (!newAdminValidation(req.body)) {
        return res.status(400).json({ succes: false, message: "This user can not be added as an admin!" });
    }
    let addAdmin = async () => {
        try {
            let forum = await Forum.findOne({}).exec();
            if (!forum) {
                return res.status(400).json({ succes: false, message: "Forum information not found!" });
            } else {
                forum.admins.push(req.body._id + "");
                forum.save();
                req.app.locals.admins.forumaAdmins.push(req.body._id + "");
                return res.status(400).json({ succes: true, message: `${req.body.username} is now an admin!` });
            }
        } catch (error) {
            return res.status(500).json({ succes: false, message: error.message });
        }
    }
    addAdmin();
}

/*
* methed: removeForumAdmin
* playload: { _id, username}
*/
export const removeForumAdmin = (req, res) => {
    if (!isFourmAdmins(req, req.user.uid)) {
        return res.status(403).json({ succes: false, message: "Invlid permission!" })
    }
    if (!isFourmAdmins(req, req.body._id)) {
        return res.status(400).json({ succes: false, message: "This user is NOT an admin of the forum!" })
    }
    Forum.updateOne(
        {},
        { $pullAll: { admins: [req.body._id] } },
        (err, forum) => {
            if (err) {
                return res.status(500).json({ succes: false, message: error.message });
            } else {
                const index = req.app.locals.admins.forumaAdmins.indexOf(req.body._id + "");
                if (index > -1) {
                    req.app.locals.admins.forumaAdmins.splice(index, 1);
                }
                return res.status(400).json({ succes: true, message: `${req.body.username} is not an admin anymore!` });
            }
        }
    );
}

export const editForum = (req, res) => {
    if (!isFourmAdmins(req, req.user.uid)) {
        return res.status(403).json({ succes: false, message: "Invlid permission!" })
    }
    Forum.findOneAndUpdate(
        {},
        {
            name: req.body.name,
            description: req.body.description,
            shortDescription: req.body.shortDescription
        },
        {
            returnOriginal: false
        },
        (err, forum) => {
            if (err) return res.status(500).json({ succes: false, message: "Database error!" });
            forum.id = undefined;
            forum.__v = undefined;
            forum.createdAt = undefined;
            forum.updatedAt = undefined;
            forum._id = undefined;
            res.json(forum);
        });
}

export const addSection = (req, res) => {
    if (!isFourmAdmins(req, req.user.uid)) {
        return res.status(403).json({ succes: false, message: "Invlid permission!" })
    }
    let newSection = new Section(req.body);
    newSection.save((err, section) => {
        if (err) {
            res.send({ succes: false, massage: err.massages });
        } else {
            section.__v = undefined;
            section.hidden = undefined;
            res.json(section);
        }
    });
}

export const editSection = (req, res) => {
    if (!isFourmAdmins(req, req.user.uid)) {
        return res.status(403).json({ succes: false, message: "Invlid permission!" })
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.sid)) {
        return res.status(400).json({ succes: false, message: "Invalid section id!" });
    }
    Section.findOneAndUpdate(
        {
            _id: req.body.sid
        },
        {
            title: req.body.title,
            description: req.body.description
        },
        {
            returnOriginal: false
        },
        (err, section) => {
            if (err) {
                res.send(err.massage);
            } else {
                section.__v = undefined;
                section.hidden = undefined;
                res.json(section);
            }
        }
    );
}

export const addSectionAdmin = (req, res) => {
    if (!isFourmAdmins(req, req.user.uid)) {
        return res.status(403).json({ succes: false, message: "Invlid permission!" })
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.sid)) {
        return res.status(400).json({ succes: false, message: "Invalid section id!" });
    }
    if (isSectionAdmins(req, req.params.sid, req.body._id)) {
        return res.status(400).json({ succes: false, message: "This user is already an admin of the section!" })
    }

    let addAdmin = async () => {
        try {
            let section = await Section.findOne({ _id: req.params.sid }).exec();
            if (!section) {
                return res.status(400).json({ succes: false, message: "Section information not found!" });
            } else {
                section.admins.push(req.body._id + "");
                section.save();
                req.app.locals.admins.sectionAdmins[req.params.sid].push(req.body._id + "");
                return res.status(400).json({ succes: true, message: `${req.body.username} is now an admin!` });
            }
        } catch (error) {
            return res.status(500).json({ succes: false, message: error.message });
        }
    }
    addAdmin();

}

export const removeSectionAdmin = (req, res) => {
    if (!isFourmAdmins(req, req.user.uid)) {
        return res.status(403).json({ succes: false, message: "Invlid permission!" })
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.sid)) {
        return res.status(400).json({ succes: false, message: "Invalid section id!" });
    }
    if (!isSectionAdmins(req, req.params.sid, req.body._id)) {
        return res.status(400).json({ succes: false, message: "This user is NOT an admin of the section!" })
    }
    Section.updateOne(
        { _id: req.params.sid },
        { $pullAll: { admins: [req.body._id] } },
        (err, section) => {
            if (err) {
                return res.status(500).json({ succes: false, message: error.message });
            } else {
                const index = req.app.locals.admins.sectionAdmins[req.params.sid].includes(req.body._id + "");
                if (index > -1) {
                    req.app.locals.admins.sectionAdmins[req.params.sid].splice(index, 1);
                }
                return res.json({ succes: true, message: `${req.body.username} is now an admin!` });
            }
        }
    );
}