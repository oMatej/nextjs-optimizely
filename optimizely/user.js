import { v4 as uuid } from 'uuid';
import Cookies from 'cookies';

const OPTIMIZELY_USER_ID = 'optimizelyEndUserId';

export const getOptimizelyUserId = (req, res) => {
    const cookies = new Cookies(req, res);
    let id = cookies.get(OPTIMIZELY_USER_ID);

    if (!id) {
        id = uuid();

        cookies.set(OPTIMIZELY_USER_ID, id, { maxAge: 180 * 24 * 60 * 60 * 1000 });
    }

    return id;
};