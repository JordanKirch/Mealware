import mysql2 from 'mysql2';
import mysqlssh from 'mysql-ssh';
import util from 'util';

export class Database {
    static pool = null;
    static devDB = null;

    /*
     * Creates a new database pool connection. Only called once when the server is first started.
     */
    static async connect() {
        if (process.env.MODE === 'dev') {
            mysqlssh.connect(
                {
                    host: process.env.DB_SSH_HOST,
                    user: process.env.DB_SSH_USER,
                    password: process.env.DB_SSH_PASSWORD
                },
                {
                    host: process.env.DEV_DB_HOST,
                    user: process.env.DEV_DB_USER,
                    password: process.env.DEV_DB_PASSWORD,
                    database: process.env.DEV_DB_NAME
                }
            )
            .then(client => {
                this.devDB = client;
                this.execQuery = util.promisify(this.devDB.query).bind(this.devDB);
            })
            .catch(err => {
                console.log(err)
            })
        }
        else {
            this.pool = mysql2.createPool({
                connectionLimit: 10,
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            });
    
            this.execQuery = util.promisify(this.pool.query).bind(this.pool);
        }
    }

    /*
     * Queries the database connection.
     * queryString - a string representing the DB query
     * params - an array containing a list of query parameters that will be filled into the query string. 
     */
    static query(queryString, params) {
        return this.execQuery(mysql2.format(queryString, params));
    }

    /*
     * Shuts down the database connection. Generally shouldn't be needed.
     */
    static shutdown() {
        this.pool.end(function(err) {
            if (err) {
              return console.log(err.message);
            }
        });
    }
}