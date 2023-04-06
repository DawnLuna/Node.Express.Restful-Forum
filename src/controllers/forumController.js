import mongoose from 'mongoose';

import { Forum, Section, Thread, Reply } from '../models/forumSchema';
import { User } from '../models/userSchema';

export const getForum = (req, res) => {
    Forum.findOne({}, {
        _id: 0,
        id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0
    }).populate(
        { path: 'admins', select: 'username' }
    ).exec(
        (err, forum) => {
            if (err) {
                res.send(err.msg);
            } else {
                res.json(forum);
            }
        }
    );
}

export const getSection = (req, res) => {
    let sid = req.params.sid;
    Section.findOne({
        _id: sid,
        hidden: false
    }, {
        __v: 0,
        hidden: 0,
        createdAt: 0
    }).populate(
        { path: 'admins', select: 'username' }
    ).exec(
        (err, section) => {
            if (err) {
                res.send(err.massage);
            } else {
                res.json(section);
            }
        }
    );
};

export const getSections = (req, res) => {
    Section.find({
        hidden: false
    }, {
        __v: 0,
        hidden: 0,
        createdAt: 0
    }).sort(
        { 'index': 'asc' }
    ).populate(
        { path: 'admins', select: 'username' }
    ).exec(
        (err, sections) => {
            if (err) {
                res.send(err.massage);
            } else {
                res.json(sections);
            }
        }
    );
};

export const getThreads = (req, res) => {
    let sid = req.params.sid;
    Thread.find(
        {
            section: sid
        },
        {
            section: 0,
            content: 0,
            __v: 0
        }
    ).sort(
        { 'updatedAt': 'desc' }
    ).populate({ path: 'author', select: 'username' }).exec(
        (err, threads) => {
            if (err) {
                res.send(err.massage);
            } else {
                res.json(threads);
            }
        }
    );
};

export const postThread = (req, res) => {
    let threadData = {
        author: req.user.uid,
        section: req.params.sid,
        title: req.body.title,
        content: req.body.content
    };
    let newThread = new Thread(threadData);
    let posing = async () => {
        let section = await Section.findById(req.params.sid).exec();
        if (!section) return res.status(400).json({ success: false, message: "Section dose not exist!" });
        await newThread.save();
        newThread.__v = undefined;
        section.threadCount += 1;
        await section.save();
        await User.findOneAndUpdate(
            { _id: newThread.author },
            { $inc: { threadCount: 1 } },
            { returnOriginal: false }
        ).exec();
        Thread.populate(newThread, { path: 'author', select: 'username' },
            (err, fullTread) => {
                if (err) return res.json(newThread);
                fullTread.__v = undefined;
                return res.json(fullTread);
            }
        );
    }
    try {
        posing();
    } catch (error) {
        handleError(res, error.message);
    }
};

export const editThread = (req, res) => {
    Thread.findOneAndUpdate(
        {
            _id: req.params.tid,
            author: req.user.uid,
        },
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            returnOriginal: false
        },
        (err, thread) => {
            if (err) {
                res.send(err.massage);
            } else {
                thread.__v = undefined;
                res.json(thread);
            }
        }
    );
}

export const getThread = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.tid)) {
        return res.status(400).json({ success: false, message: "Invalid thread id!" });
    }
    Thread.findOne(
        {
            _id: req.params.tid
        },
        {
            __v: 0
        }
    ).populate(
        { path: 'section', select: 'title' }
    ).populate(
        { path: 'author', select: 'username' }
    ).exec(
        (err, thread) => {
            if (err) {
                res.send(err.massage);
            } else {
                res.json(thread);
            }
        }
    );
};

export const getReplies = (req, res) => {
    let tid = req.params.tid;
    Reply.find(
        {
            tid: tid
        },
        {
            tid: 0,
            __v: 0
        }
    ).populate({ path: 'author', select: 'username' }).exec(
        (err, posts) => {
            if (err) {
                res.send(err.massage);
            } else {
                res.json(posts);
            }
        }
    );
}

export const postReply = (req, res) => {
    let replyData = {
        author: req.user.uid,
        tid: req.params.tid,
        content: req.body.content
    }
    let newReply = new Reply(replyData);

    let posing = async () => {
        let thread = await Thread.findById(req.params.tid).exec();
        if (!thread) return res.status(400).json({ success: false, message: "Thread dose not exist!" });
        await newReply.save();
        newReply.__v = undefined;
        thread.replyCount += 1;
        await thread.save();
        await User.findOneAndUpdate(
            { _id: newReply.author },
            { $inc: { replyCount: 1 } },
            { returnOriginal: false }
        ).exec();
        Reply.populate(newReply, { path: 'author', select: 'username' },
            (err, fullReply) => {
                if (err) return res.json(reply);
                fullReply.__v = undefined;
                return res.json(fullReply);
            }
        );
    }
    try {
        posing();
    } catch (error) {
        handleError(res, error.message);
    }

};

export const getReply = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
        return res.status(400).json({ success: false, message: "Invalid reply id!" });
    }
    Reply.findOne(
        {
            _id: req.params.pid
        },
        {
            __v: 0
        }
    ).populate(
        { path: 'tid', select: 'title' }
    ).populate(
        { path: 'author', select: 'username' }
    ).exec(
        (err, thread) => {
            if (err) {
                res.send(err.massage);
            } else {
                res.json(thread);
            }
        }
    );
};

export const editReply = (req, res) => {
    Reply.findOneAndUpdate(
        {
            _id: req.params.pid,
            author: req.user.uid,
        },
        {
            content: req.body.content
        },
        {
            returnOriginal: false
        },
        (err, reply) => {
            if (err) {
                res.send(err.massages);
            } else {
                reply.__v = undefined;
                res.json(reply);
            }
        }
    );
}
