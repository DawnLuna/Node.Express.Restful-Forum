import { methodNotAllowed } from '../middleware/http4xxErrors';
import { notImplemented } from '../middleware/http5xxErrors';

import { authCheck } from '../controllers/authController';
import { addSectionValidator } from '../middleware/validators';
import { getSections, addSection, editSection } from '../controllers/forumController';

const forumRoutes = (app) => {

    /* 
    * '/'
    *  get: fourm info
    *  put: edit fourm info
    */
    app.route('/')
        .get(notImplemented)
        .all(methodNotAllowed);

    /*
    * '/section'
    *  get: list all sections
    *  post: add new sections (logging requird)
    */
    app.route('/section')
        .get(getSections)
        .post(authCheck, addSectionValidator, addSection)
        .all(methodNotAllowed);

    /*
    * '/section/:sid'
    *  get: list all thread in the section by id 
    *  post: add new thread to the section by id (logging requird)
    *  put: edit section info by id (logging requird)
    *  delete: hide the section by id (logging requird)
    */
    app.route('/section/:sid')
        .get(notImplemented)
        .post(notImplemented)
        .put(authCheck, addSectionValidator, editSection)
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
        .get(notImplemented)
        .post(notImplemented)
        .put(notImplemented)
        .delete(notImplemented)
        .all(methodNotAllowed);

    /*
    * '/getreply/:tid'
    *  get: get all replies from the thread by id
    */
    app.route('/getreply/:tid')
    .get(notImplemented)
    .all(methodNotAllowed);

    /*
    *  '/reply/:pid
    *  get: get the reply by id
    *  put: edit the reply by id (logging requird)
    *  delete: hide the reply by id (logging requird)
    */
    app.route('/reply/:pid')
    .get(notImplemented)
    .put(notImplemented)
    .delete(notImplemented)
    .all(methodNotAllowed);

};

export default forumRoutes;