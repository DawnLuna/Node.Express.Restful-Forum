import mongoose from 'mongoose';
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

const resetForum = () => {
    console.log(`Resetting forum information...`);
    Forum.deleteMany({}, (err, doc) => {
        if (err) {
            console.log(`Error when resetting forum information: ${err.msg}`);
            process.exit(1);
        } else {
            console.log(`Forum information deleted`);
            process.exit(0);
        }
    });
}

const resetAdmin = () => {
    console.log(`Resetting Rootuser...`);
    User.findOneAndDelete(
        {
            username: process.env.ROOTADMIN_USERNAME,
            email: process.env.ROOTADMIN_EMAIL
        }, {},
        (err, user) => {
            if (err) {
                console.log(`Error when find rootuser: ${err.msg}`);
                process.exit(1);
            } else if (!user) {
                console.log(`Rootuser not found`);
                resetForum();
            } else {
                console.log(`Rootuser deleted`);
                resetForum();
            }
        }
    );

}

resetAdmin();
