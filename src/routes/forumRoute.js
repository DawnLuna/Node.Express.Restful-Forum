import { methodNotAllowed } from '../middleware/http4xxErrors';

import { authCheck, loginCheck } from '../controllers/authController';
import { threadValidator, replyValidator } from '../middleware/validators';
import { getForum, getSections, getThreads, postThread, editThread, getThread, getReplies, postReply, getReply, editReply } from '../controllers/forumController';

const forumRoutes = (app) => {

    /* 
    * '/'
    *  get: fourm info
    *  put: edit fourm info
    */
    app.route('/')
        .get(getForum)
        .all(methodNotAllowed);

    /*
    * '/section'
    *  get: list all sections
    */
    app.route('/section')
        .get(getSections)
        .all(methodNotAllowed);

    /*
    * '/section/:sid'
    *  get: list all thread in the section by id 
    *  post: add new thread to the section by id (logging requird)
    */
    app.route('/section/:sid')
        .get(getThreads)
        .post(authCheck, loginCheck, threadValidator, postThread)
        .all(methodNotAllowed);

    /*
    * '/thread/:tid'
    *  get: get the thread by id
    *  post: add a new reply to the thread by id (logging requird)
    *  put: edit the thread by id  as the author
    */
    app.route('/thread/:tid')
        .get(getThread)
        .post(authCheck, loginCheck, replyValidator, postReply)
        .put(authCheck, loginCheck, threadValidator, editThread)
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
    */
    app.route('/reply/:pid')
        .get(getReply)
        .put(authCheck, loginCheck, replyValidator, editReply)
        .all(methodNotAllowed);

};

export default forumRoutes;
