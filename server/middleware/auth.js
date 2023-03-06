import { UserService } from "../models/user.js";
const us = new UserService();

/*
 * For each request, look up the user given their auth cookie and 
 * add the user's information to a 'user' property on the request object.
 */
const addAuthToRequest = async (req, res, next) => {
    if (!req.cookies.uuid) {
        req.user = null;
        next();
    }
    else {
        const user = await us.getUserByAuthToken(req.cookies.uuid);
        req.user = user;

        next();
    }
}

export default addAuthToRequest;