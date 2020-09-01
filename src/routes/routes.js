import adminRoutes from './adminRoute';
import forumRoutes from './forumRoute';
import userRoutes from './userRoute';

import { notFound } from '../middleware/http4xxErrors';

const routes = (app) => {
    adminRoutes(app);
    forumRoutes(app);
    userRoutes(app);
    app.use(notFound);
}

export default routes;
