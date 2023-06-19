import url from './url.js';
import user from './user.js';
import shorter from './shorter.js';

/**
 * Defines routes slices
 */
function routes(app) {
    app.use('/api/url', url);
    app.use('/api/user', user);
    app.use('/', shorter);
}

export default routes;