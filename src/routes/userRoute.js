import { methodNotAllowed } from '../middleware/http4xxErrors';
import { notImplemented } from '../middleware/http5xxErrors';

const userRoutes = (app) => {

    /*
    *  '/user'
    *  put: change user setting
    *  delete: deactivate user
    */
    app.route('/user')
        .put(notImplemented)
        .delete(notImplemented)
        .all(methodNotAllowed);

    /* 
    * '/user/register'
    *  post: register new user (validator requird)
    */
    app.route('/user/register')
        .post(notImplemented)
        .all(methodNotAllowed);

    /*
    * '/user/login'
    *  post: login user
    */
    app.route('/user/login')
        .post(notImplemented)
        .all(methodNotAllowed);

    /*
    * '/user/password'
    *  put: change password (logging requird)
    *  post: reset password (validator requird)
    */
    app.route('/user/password')
        .put(notImplemented)
        .post(notImplemented)
        .all(methodNotAllowed);

    /*
    * '/user/:uid'
    *  get: get info of the user by uid (logging requird)
    */
    app.route('/user/:uid')
        .get(notImplemented)
        .all(methodNotAllowed);

};
export default userRoutes;