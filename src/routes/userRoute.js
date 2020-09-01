import { methodNotAllowed } from '../middleware/http4xxErrors';
import { notImplemented } from '../middleware/http5xxErrors';

import { userRegistrationValidator, userLoginValidator, updatePasswordValidator } from '../middleware/validators';
import { register, login, authCheck, changePassword, loginCheck } from '../controllers/authController';
import { getUserInfoById } from '../controllers/userController';

const userRoutes = (app) => {

    /*
    *  '/user'
    *  put: change user setting by self
    *  delete: deactivate user by self
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
        .post(userRegistrationValidator, register)
        .all(methodNotAllowed);

    /*
    * '/user/login'
    *  post: login user
    */
    app.route('/user/login')
        .post(userLoginValidator, login)
        .all(methodNotAllowed);

    /*
    * '/user/password'
    *  put: change password (logging and validator requird)
    *  post: reset password (validator requird)
    */
    app.route('/user/password')
        .put(authCheck, loginCheck, updatePasswordValidator, changePassword)
        .post(notImplemented)
        .all(methodNotAllowed);

    /*
    * '/user/:uid'
    *  get: get info of the user by uid
    */
    app.route('/user/:uid')
        .get(getUserInfoById)
        .all(methodNotAllowed);

};

export default userRoutes;
