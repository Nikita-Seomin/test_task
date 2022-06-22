const mysql = require("mysql2");
const {dbConfig} = require("../../setting");
const async = require("async");
const requests = require("./requests");


class getController {
    get(req, res) {


        const {user} = req.body;                                                                // take user from request body
        const connection = mysql.createConnection(dbConfig);                                    // create connection to db

        async.waterfall([                                                                       // make several consecutive requests

            //check that user passed
            function (callback) {
                if (!user) callback(new Error("you should pass user field"));
                else callback(null);
            },


            //check what user exist
            function (callback) {
                let sql = requests.CHEAK_USER_IS_EXIST;                                         //search users sql req text
                connection.query(sql, [user],                                             //data for sql req (user)
                    (err) => {
                        if (err)
                            return callback(err);                                               //if err then return err
                        else callback(null);                                                    //if everything is fine then end requests
                    });
            },


            //select user chats
            function (callback) {
                let sql = requests.SEARCH_ALL_CHATS;                                         //search users sql req text
                connection.query(sql, [user],                                             //data for sql req (user)
                    (err,results) => {
                        if (err)
                            return callback(err);                                               //if err then return err
                        else callback(null, results);                                                    //if everything is fine then end requests
                    });
            },

        ], function (err, results) {
            if (err)
                res.status(err.statusCode || 500).send(err.message);                            //if something is bed then send status 500 and message
            res.status(200).send(results);                                                      //if everything is fine send message id and status 200
        });

    }
}

module.exports = new getController();