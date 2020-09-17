import { methodNotAllowed } from '../middleware/http4xxErrors';
import { notImplemented } from '../middleware/http5xxErrors';

import { authCheck, loginCheck } from '../controllers/authController';
import { forumValidator, adminValidator, addSectionValidator } from '../middleware/validators';
import { addForumAdmin, removeForumAdmin, editForum, addSection, editSection, addSectionAdmin, removeSectionAdmin } from '../controllers/adminController';

/**
 * sub routes requries auth, login, and appropriate validator
 */
const adminRoutes = (app) => {
    /* 
    * '/admin'
    *  post: add a forum admin as a forum admin
    *  put: edit fourm as a forum admin
    */
    app.route('/admin')
        .post(authCheck, loginCheck, adminValidator, addForumAdmin)
        .put(authCheck, loginCheck, forumValidator, editForum)
        .all(methodNotAllowed);


    /* 
    * '/admin/:uid/:username'
    *  delete: remove the forum admin(:uid/:username) as a forum admin
    */
    app.route('/admin/:uid/:username')
        .delete(authCheck, loginCheck, removeForumAdmin)
        .all(methodNotAllowed);

    /* 
    * '/admin/user'
    *  put: change user setting as a forum admin
    *  delete: deactivate/reactive user as a forum admin
    */
    app.route('/admin/user')
        .put(notImplemented)
        .delete(notImplemented)
        .all(methodNotAllowed);

    /*
    * '/admin/section'
    *  post: add new sections as a forum admin
    *  put: edit section as a forum admin or section admin
    *  delete: hide/unhide a section as a forum admin
    */
    app.route('/admin/section')
        .post(authCheck, loginCheck, addSectionValidator, addSection)
        .put(authCheck, loginCheck, addSectionValidator, editSection)
        .delete(notImplemented)
        .all(methodNotAllowed);

    /*
    * '/admin/section/:sid'
    *  post: add section admins as a forum admin
    *  delete: hide/unhide section admins as a forum admin
    */
    app.route('/admin/section/:sid')
        .post(authCheck, loginCheck, adminValidator, addSectionAdmin)
        .delete(authCheck, loginCheck, adminValidator, removeSectionAdmin)
        .all(methodNotAllowed);

    /*
    * '/admin/thread/:tid'
    *  put: edit a thread as an admin as a forum/section admin
    *  delete: hide/unhide a thread as a forum/section admin
    */
    app.route('/admin/thread/:tid')
        .put(notImplemented)
        .delete(notImplemented)
        .all(methodNotAllowed);

    /*
    * '/admin/reply/:pid'
    *  put: edit a reply as a forum/section admin
    *  delete: hide/unhide a reply as a forum/section admin
    */
    app.route('/admin/reply/:pid')
        .put(notImplemented)
        .delete(notImplemented)
        .all(methodNotAllowed);

}

export default adminRoutes;
