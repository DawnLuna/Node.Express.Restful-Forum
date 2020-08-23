import { Section } from '../models/forumSchema';

export const addSection = (req, res) => {
    let newSection = new Section(req.body);
    newSection.save((err, section) => {
        if (err) {
            res.send(err.massage);
        } else {
            section.__v = undefined;
            section.hidden = undefined;
            res.json(section);
        }
    });
}