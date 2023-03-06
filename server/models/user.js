import {Database as db} from '../util/db.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
    async getUserByUsername(username) {
        const rows = await db.query('SELECT id, first_name, last_name, email, username, role FROM user WHERE username = ?', [username]);
        if (rows.length !== 1) {
            return null;
        }

        const user = rows[0];
        return user;
    }

    async getUserById(userId) {
        const rows = await db.query('SELECT id, first_name, last_name, email, username, role FROM user WHERE id = ?', [userId]);
        if (rows.length !== 1) {
            return null;
        }

        const user = rows[0];
        return user;
    }

    async generalSearch(searchInput, role = 'enduser') {
        const input = '%'+searchInput+'%';
        const rows = await db.query('SELECT id, first_name, last_name, email, username FROM user WHERE role = ? AND (id = ? OR first_name LIKE ? OR last_name LIKE ? OR username LIKE ? OR email LIKE ?) LIMIT 100', [role, input, input, input, input, input]);
        return rows;
    }

    async validateLogin(username, password) {
        const rows = await db.query('SELECT hashedPassword FROM user WHERE username = ?', [username]);
        if (rows.length !== 1) {
            return false;
        }
        
        const storedPassword = rows[0].hashedPassword;

        // Verify that hashed passwords match
        const match = await bcrypt.compare(password, storedPassword);
        if (match) {
            return true;
        }
        
        return false;
    }

    async checkUsernameAvailable(username) {
        const rows = await db.query('SELECT COUNT(*) as count FROM user WHERE username = ?', [username]);
        const count = rows[0].count;

        if (count > 0) {
            return false;
        }
        else {
            return true;
        }
    }

    async createEndUser(firstName, lastName, email, username, password) {
        const hashedPassword = await this.createHashedPassword(password);

        await db.query('INSERT INTO user (first_name, last_name, email, username, hashedPassword, role) VALUES (?, ?, ?, ?, ?, ?)', [firstName, lastName, email, username, hashedPassword, 'enduser']);
        const rows = await db.query('SELECT id, first_name, last_name, username, role, email FROM user WHERE username = ?', [username]);
        const user = rows[0];
        return user;
    }

    async getAccountSettings(username){
        const result = await db.query("SELECT first_name, last_name, email, username FROM user WHERE username = ?", [username]);
        return result[0];
    }

    async createHashedPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async createAuthToken(userId) {
        const token = uuidv4();
        let expiration = new Date();
        expiration.setDate(expiration.getDate() + 1);

        await db.query('INSERT INTO user_session (session_token, user_id, expires) VALUES (?, ?, ?)', [token, userId, expiration]);
        
        return token;
    }

    async getUserByAuthToken(token) {
        const rows = await db.query('SELECT user_id FROM user_session WHERE session_token = ?', [token]);
        if (rows.length !== 1) {
            return null;
        }

        const userId = rows[0].user_id;
        const user = this.getUserById(userId);
        
        return user;
    }

    async updateUserPassword(email, password) {
        const hashedPassword = await this.createHashedPassword(password);
        await db.query('UPDATE user SET hashedPassword = ? WHERE email = ?', [hashedPassword, email]);
    }

    async updateUsername(id, username){
        await db.query('UPDATE user SET username = ? WHERE id = ?', [username, id]);
    }
    
    async updateEmail(id, email){
        await db.query('UPDATE user SET email = ? WHERE id = ?', [email, id]);
    }
}