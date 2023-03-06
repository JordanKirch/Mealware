import { UserService } from "../models/user.js";
const us = new UserService();

class UsersController {
    // Handles the logic required for user-related actions. i.e. When logging in a user, you
    // would check for a valid username/password combo here, and then use the user service to 
    // create a login token in the DB.
    // Each function is going to take a request and response param, and then send back a response

    async checkUsernameAvailable(req, res) {
        const username = req.query.username;

        if (!username) {
            res.status(400).send('Request must specify a username query parameter');
        }

        const isAvailable = await us.checkUsernameAvailable(username);

        res.status(200).send({isAvailable});
    }

    async login(req, res) {
        const {username, password} = req.body;

        // Validate login info
        if (!username || !password) {
            res.status(400).send("Username and password must be non-null");
        }

        // If correct, create login token
        const wasValidated = await us.validateLogin(username, password);
        if (wasValidated) {
            const user = await us.getUserByUsername(username);
            const token = await us.createAuthToken(user.id);
            user.uuid = token;
            res.status(200).cookie('uuid', user.uuid).send(user);
        }
        // If incorrect, return error message
        else {
            res.status(401).send('Invalid username or password');
        }
    }

    async signup(req, res) {
        try {
            const {firstName, lastName, email, username, password} = req.body;

            const newUser = await us.createEndUser(firstName, lastName, email, username, password);

            const token = await us.createAuthToken(newUser.id);
            newUser.uuid = token;
            
            res.status(200).cookie('uuid', newUser.uuid).send(newUser);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }

    async getCurrentUser(req, res) {
        res.status(200).send({user: req.user});
    }

    async forgotPassword(req, res)
    {
        const {password, email} = req.body;
        if(!password)
            res.status(400).send('No password');
        else {
            await us.updateUserPassword(email, password);
            res.status(200).send();
        }
    }

    async getAccountSettings(req, res) {
        if(!req.user){
            res.status(401).send("Unauthorized");
        }
        const accountInfo = await us.getAccountSettings(req.user.username);
        res.status(200).send(accountInfo);

    }

    async changeEmail(req, res){
        if(!req.user){
            res.status(401).send("Unauthorized");
        }
        const {email} = req.body;
        await us.updateEmail(req.user.id, email);
        res.status(200).send();
    }

    async changeUser(req, res){
        if(!req.user){
            res.status(401).send("Unauthorized");
        }
        const {username} = req.body;
        await us.updateUsername(req.user.id, username);
        res.status(200).send();
    }

    async changePassword(req, res){
        if(!req.user){
            res.status(401).send("Unauthorized");
        }
        const {currentPassword, password} = req.body;
        const wasValidated = await us.validateLogin(req.user.username, currentPassword);
        if(wasValidated){
            await us.updateUserPassword(req.user.email, password);
            res.status(200).send();
        }
        else{
            res.status(401).send("Incorrect Password");
        }
    }

    async search(req, res) {
        const {searchInput} = req.body;

        if (!req.user) {
            res.status(401).send("Unauthorized");
        }
        else if (req.user.role !== 'admin') {
            res.status(403).send("You're not authorized to search for users");
        }
        else if (!searchInput) {
            res.status(400).send('Search input must be specified');
        }
        else {
            const results = await us.generalSearch(searchInput, 'enduser');
            res.status(200).send(results);
        }
    }
    
}

export default UsersController;