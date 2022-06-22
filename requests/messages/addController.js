const mysql = require("mysql2");
const {dbConfig} = require("../../setting");
const async = require("async");
const requests = require("./requests");
require('x-date') ;


class addController {
    add(req, res) {

        const {
            chat,
            author,
            text
        } = req.body;                                                                           // take username from request body
        const connection = mysql.createConnection(dbConfig);                                    //create connection to db


        async.waterfall([                                                                       //make several consecutive requests


            // insert user message
            function (callback) {
                let dateTimeNow = new Date().format('yyyy-mm-dd HH:MM:ss');              //receive data in format
                let sql = requests.ADD_MESSAGE                                                //insert request for add message to message table
                connection.query(sql,                                                         // connection for sql request
                    [chat, author,text,dateTimeNow],                                    // values are substituted in the request instead of ?
                    (err) => {
                        if (err)                                                               //if err => return err to last function
                            return callback(err);
                        callback(null);                                                        //if everything is fine then follow the request
                    });
            },


            // select user id which insert
            function (callback) {
                //search for the id of the added message from the end of the table
                let sql = requests.SEARCH_ID_MESSAGE;
                connection.query(sql, [chat, author,text],
                    (err, results) => {
                    if (err)
                        return callback(err);
                    callback(null, results[0]['idMessage']);                                      //if everything is fine then end requests and send to last func adding idMessage
                });
            },


        ], function (err, results) {
            if (err)
                res.status(err.statusCode || 500).send(err.message);                                    //if something is bed then send status 500 and message
            res.status(200).json(results);                                                              //if everything is fine send message id and status 200
        });
    }
}

module.exports = new addController();