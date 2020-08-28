import { Forum, Section } from '../models/forumSchema';

export const editForum = (req, res) => {
    if (!req.app.locals.admins.forumaAdmins.includes(req.user.uid)) {
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
    if (!mongoose.Types.ObjectId.isValid(req.params.sid)) {
        return res.status(400).json({ succes: false, message: "Invalid section id!" });
    }
    Section.findOneAndUpdate(
        {
            _id: req.params.sid
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
