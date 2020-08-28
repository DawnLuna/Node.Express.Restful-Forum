import { methodNotAllowed } from '../middleware/http4xxErrors';
import { notImplemented } from '../middleware/http5xxErrors';

import { authCheck, loginCheck } from '../controllers/authController';
import { forumValidator, addSectionValidator, threadValidator, replyValidator } from '../middleware/validators';
import { getForum, getSections, getThreads, postThread, editThread, getThread, getReplies, postReply, getReply, editReply } from '../controllers/forumController';
import { addForumAdmin, removeForumAdmin, editForum, addSection, editSection } from '../controllers/adminController';

const forumRoutes = (app) => {

    /* 
    * '/'
    *  get: fourm info
    *  put: edit fourm info
    */
    app.route('/')
        .get(getForum)
        .put(authCheck, loginCheck, forumValidator, editForum)
        .all(methodNotAllowed);

    app.route('/admin')
        .post(authCheck, loginCheck, addForumAdmin)
        .delete(authCheck, loginCheck, removeForumAdmin)
        .all(methodNotAllowed);

    /*
    * '/section'
    *  get: list all sections
    *  post: add new sections (logging requird)
    */
    app.route('/section')
        .get(getSections)
        .post(authCheck, loginCheck, addSectionValidator, addSection)
        .all(methodNotAllowed);

    /*
    * '/section/:sid'
    *  get: list all thread in the section by id 
    *  post: add new thread to the section by id (logging requird)
    *  put: edit section info by id (logging requird)
    *  delete: hide the section by id (logging requird)
    */
    app.route('/section/:sid')
        .get(getThreads)
        .post(authCheck, loginCheck, threadValidator, postThread)
        .put(authCheck, loginCheck, addSectionValidator, editSection)
        .delete(notImplemented)
        .all(methodNotAllowed);

    /*
    * '/thread/:tid'
    *  get: get the thread by id
    *  post: add a new reply to the thread by id (logging requird)
    *  put: edit the thread by id (logging requird)
    *  delete: hide the thread by id (logging requird)
    */
    app.route('/thread/:tid')
        .get(getThread)
        .post(authCheck, loginCheck, replyValidator, postReply)
        .put(authCheck, loginCheck, threadValidator, editThread)
        .delete(notImplemented)
        .all(methodNotAllowed);

    /*
    * '/getreply/:tid'
    *  get: get all replies from the thread by id
    */
    app.route('/getreply/:tid')
        .get(getReplies)
        .all(methodNotAllowed);

    /*
    *  '/reply/:pid
    *  get: get the reply by id
    *  put: edit the reply by id (logging requird)
    *  delete: hide the reply by id (logging requird)
    */
    app.route('/reply/:pid')
        .get(getReply)
        .put(authCheck, loginCheck, replyValidator, editReply)
        .delete(notImplemented)
        .all(methodNotAllowed);

};

export default forumRoutes;