import mongoose from 'mongoose';

import { Forum, Section, Thread, Reply } from '../models/forumSchema';

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

export const getSections = (req, res) => {
    Section.find(
        { hidden: false },
        {
            __v: 0,
            hidden: 0,
            createdAt: 0
        },
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
    newThread.save((err, thread) => {
        if (err) {
            res.send(err.massage);
        } else {
            thread.__v = undefined;
            Section.findOneAndUpdate(
                { _id: thread.section },
                { $inc: { threadCount: 1 } },
                {
                    returnOriginal: false,
                    upsert: false
                }, (countErr, section) => {
                    Thread.populate(thread, { path: 'author', select: 'username' },
                        (err, fullTread) => {
                            if (err) return res.json(thread);
                            return res.json(fullTread);
                        }
                    );
                }
            );
        }
    });
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
        return res.status(400).json({ succes: false, message: "Invalid thread id!" });
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
    newReply.save((err, reply) => {
        if (err) {
            res.send(err.massage);
        } else {
            reply.__v = undefined;
            Thread.findOneAndUpdate(
                { _id: reply.tid },
                {
                    $inc: { replyCount: 1 }
                },
                {
                    returnOriginal: false,
                    upsert: false
                }, (countErr, thread) => {
                    Reply.populate(reply, { path: 'author', select: 'username' },
                        (err, fullReply) => {
                            if (err) return res.json(reply);
                            return res.json(fullReply);
                        }
                    );
                }
            );
        }
    });
};

export const getReply = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
        return res.status(400).json({ succes: false, message: "Invalid reply id!" });
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
