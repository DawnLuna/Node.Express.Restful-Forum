import { Section } from '../models/forumSchema';

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
