const mysql = require("mysql2");
const {dbConfig} = require("../../setting");
const async = require("async");
const requests = require("./requests");

class addController {
    add(req, res) {

        const {
            users,
            name
        } = req.body;                                                                           // take chat name and users from request body
        const connection = mysql.createConnection(dbConfig);                                    //create connection to db

        async.waterfall([                                                                       //make several consecutive requests

            function (callback) {
                if (!users) callback(new Error("you should pass users field"));
                else if (!name ) callback(new Error("you should pass name field"));
                else callback(null)
            },

            // is all users exist ? check
            function (callback) {
                let sql = requests.CHEAK_WHAT_ALL_USERS_EXISTS;                                 //search users who exist sql req text
                connection.query(sql, [users],                                            //data for sql req (users list)
                    (err, results) => {
                        if (err)
                            return callback(err);                                               //if err then return err
                        if (results.length !== users.length)                                    //if  some users not found in db then throw err
                            return callback(new Error("Some users does not exist"));
                        else callback(null);                                                    //if everything is fine then end requests
                    });
            },

            // create chat
            function (callback) {
                let dateTimeNow = new Date().format('yyyy-mm-dd HH:MM:ss');                //receive data in format
                let sql = requests.CREATE_CHAT;                                                 //create chat sql req text
                connection.query(sql, [name, dateTimeNow],                                //data for sql req (chat name and dateTime now)
                    (err) => {
                        if (err)
                            return callback(err);                                               //if err then return err
                        else callback(null, dateTimeNow);                                       //if everything is fine then end requests and return created at to find chat id
                    });
            },

            // find chat id
            function (created_at, callback) {
                let sql = requests.SEARCH_CHAT_ID;                                              //search chat id sql req text
                connection.query(sql, [name, created_at],                                 //data for sql req (chat name and created_at)
                    (err, results) => {
                        if (err)
                            return callback(err);                                               //if err then return err
                        else callback(null, results[0]['idChat']);                              //if everything is fine then end requests and return chat id

                    });
            },

            // add users to chat
            function (idChat, callback) {
                let sql = requests.ADD_USER_TO_CHAT;                                            //add user in chat sql req text
                let error                                                                       //variable for err in sql req to break from for cycle
                for (let i in users) {
                    connection.query(sql, [users[i], idChat],                             //data for sql req (username and chat if)
                        (err) => {
                            if (err) error = err;                                               //if err then return err
                        });
                    if (error) break;                                                           //if error not empty break and send err
                }
                if (error)
                    return callback(error);
                return callback(null, idChat);                                                  //if everything is fine then end requests and return chat id

            },


        ], function (err, results) {
            if (err)
                res.status(err.statusCode || 500).send(err.message);                           //if something is bed then send status 500 and message
            res.status(200).json(results);                                                     //if everything is fine send message id and status 200
        });

    }

}

module.exports = new addController();