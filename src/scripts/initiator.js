import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { Forum } from '../models/forumSchema';
import { User } from '../models/userSchema';

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MONGODB_ADDRESS}/${process.env.MONGODB_DATABASE}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const saveAdmin = (uid) => {
    console.log(`Starting to insert ${uid} as admin`);
    Forum.estimatedDocumentCount({}, (err, count) => {
        if (count === 0) {
            let forumInfo = new Forum({
                id: process.env.FORUM_DEFAULT_NAME,
                name: process.env.FORUM_DEFAULT_NAME,
                description: 'description',
                shortDescription: 's desc',
                admins: []
            });
            forumInfo.admins.push(uid);
            forumInfo.save(
                (err, doc) => {
                    if (err) {
                        console.log(`Error when save forum information: ${err.msg}`);
                        process.exit(1);
                    } else {
                        console.log(`Initiation finished!`);
                        process.exit(0);
                    }
                }
            );
        } else {
            Forum.findOne({
                id: process.env.FORUM_DEFAULT_NAME,
            }, {}, (err, forum) => {
                if (err) {
                    console.log(`Error when find forum information: ${err.msg}`);
                    process.exit(1);
                } else {
                    if (!forum) {
                        console.log(`Error when find forum information: ${err.msg}`);
                        console.log(`You may try reset Forum collection`);
                        process.exit(1);
                    } else {
                        if (forum.admins.indexOf(uid) >= 0) {
                            console.log(`Rootuser is already an admin,exitind initiation!`);
                            process.exit(0);
                        }
                        forum.admins.push(uid);
                        forum.save(
                            (err, doc) => {
                                if (err) {
                                    console.log(`Error when save forum information: ${err.msg}`);
                                    process.exit(1);
                                } else {
                                    console.log(`Initiation finished!`);
                                    process.exit(0);
                                }
                            }
                        );
                    }
                }
            });
        }
    })
}

const initForum = () => {
    console.log(`Start looking for rootuser`);
    User.findOne(
        {
            username: process.env.ROOTADMIN_USERNAME,
            email: process.env.ROOTADMIN_EMAIL
        }, {},
        (err, user) => {
            if (err) {
                console.log(`Error when find rootuser: ${err.msg}`);
                process.exit(1);
            } else if (!user) {
                console.log(`Rootuser not exist, start creating`);
                let rootuser = new User({
                    username: process.env.ROOTADMIN_USERNAME,
                    email: process.env.ROOTADMIN_EMAIL,
                    password: process.env.ROOTADMIN_PASSWORD
                });
                rootuser.password = bcrypt.hashSync(rootuser.password, +process.env.SALT_ROUND);
                rootuser.save((err, user) => {
                    if (err) {
                        console.log(`Error when save rootuser: ${err.msg}`);
                        process.exit(1);
                    } else {
                        console.log(`Rootuser created`);
                        saveAdmin(user._id);
                    }
                })
            } else {
                console.log(`Rootuser found`);
                saveAdmin(user._id);
            }
        }
    )
}

initForum();
