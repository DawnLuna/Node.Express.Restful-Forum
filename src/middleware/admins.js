import { Forum } from '../models/forumSchema';
import { Section } from '../models/forumSchema';

/* 
 * admins = {
 *      forumaAdmins :[ uid ],
 *      sectionAdmins: {
 *          sid: [ uid ]
 *      }
 * }
 */

const loadForumAdmins = (callback) => {
    Forum.find({}, {}, (err, forums) => {
        if (err) {
            console.log('Errer loading forum infomation, please restart app.');
        } else if (!forums) {
            console.log('Forum is not initiated!');
        } else {
            admins.forumaAdmins = [];
            for (const forum of forums) {
                for (const uid of forum.admins) {
                    admins.forumaAdmins.push(uid);
                }
            }
            console.log('Forum admins loaded!');
        }
        if (callback) callback();
    });
};

const loadSectionAdmins = (callback) => {
    Section.find({}, {}, (err, sections) => {
        if (err) {
            console.log('Errer loading sections infomation, please restart app.');
        } else if (!sections) {
            console.log('There is no sections!');
        } else {
            admins.sectionAdmins = {};
            for (const section of sections) {
                admins.sectionAdmins[section._id] = [];
                for (const uid of section.admins) {
                    admins.sectionAdmins[section._id].push(uid);
                }
            }
            console.log('Section admins loaded!');
        }
        if (callback) callback();
    });
};

var admins = {};

export const loadAdmins = (app) => {
    loadForumAdmins(loadSectionAdmins(() => {
        console.log('Admins loaded!');
        app.locals.admins = admins;
    }));
}