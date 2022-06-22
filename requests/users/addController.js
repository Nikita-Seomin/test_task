const mysql = require("mysql2");
const {dbConfig} = require("../../setting");
const async = require("async");
const requests = require("./requests");
require('x-date') ;

class addController {
    add(req, res) {


        const {username} = req.body;                                                        // take username from request body
        const connection = mysql.createConnection(dbConfig);                                //create connection to db


        async.waterfall([                                                                   //make several consecutive requests


            // insert user
            function (callback) {
                let dateTimeNow = new Date().format('yyyy-mm-dd HH:MM:ss');            //receive data in format
                let sql = requests.ADD_USER;       //insert request text
                connection.query(sql,                                                       // connection for sql request
                    [username, dateTimeNow],                                          // values are substituted in the request instead of ? (username.dateTimeNow)
                    (err) => {
                        if (err)                                                            //if err => return err to last function
                            return callback(err);
                        callback(null);                                                     //if everything is fine then follow the request
                    });
            },


            // select user id which insert
            function (callback) {
                //search for the id of the added user from the end of the table
                let sql = requests.SEARCH_ID_ADDED_USER;                                        //search id added user req text
                connection.query(sql, [username],                                         // values are substituted in the request instead of ? (username)
                    (err, results) => {
                    if (err)
                        return callback(err);                                               //if err => return err to last function
                    callback(null, results[0]['idUser']);                                    //if everything is fine then end requests and send to last func adding idUser
                });
            },


        ], function (err, results) {
            if (err)
                res.status(err.statusCode || 500).send(err.message);                        //if something is bed then send err status and message
            res.status(200).json(results);                                                  //if everything is fine send user id and status 200
        });
    }
}

module.exports = new addController();                                                       //export controller (for route in this directory)