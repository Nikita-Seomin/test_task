const mysql = require("mysql2");
const {dbConfig} = require("../../setting");
const requests = require("./requests");
const async = require("async");



class getController {
    get(req, res) {

        const {chat} = req.body;                                                                // take username from request body
        const connection = mysql.createConnection(dbConfig);                                    //create connection to db

        async.waterfall([                                                                       //make several consecutive requests

            // checking the chat for existence
            function (callback) {
                let sql = requests.CHAT_IS_EXISTS;                                              //search chat on id in chat table sql req text
                connection.query(sql, [chat],                                                   // param for req ( chat id)
                    (err, results) => {
                    if (err)                                                                   //if err => return err to last function
                        return callback(err);
                    if (results.length===0)                                                    //if chat does not found then throw custom err
                        return callback(new NotExistsError());
                    callback(null);                                                            //if everything is fine then follow the request
                });
            },



            // get chat messages on chat id
            function (callback) {
                let sql = requests.GET_CHAT_MESSAGES;                                         //get all info about chat messages on id and sort by create sql req text
                connection.query(sql, [chat],                                                 // [] param for req ( chat id)
                    (err, results) => {
                    if (err)                                                                  //if err => return err to last function
                        return callback(err);
                    callback(null, results[0]);                                               //if everything is fine then follow the request
                });
            },


        ], function (err, results) {
            if (err)
                res.status(err.statusCode || 500).send(err.message);                            //if something is bed then send err status and message
            res.status(200).json(results);                                                      //if everything is fine send message id and status 200
        });

    }
}

module.exports = new getController();



//custom err for trow if chat does not exist
function NotExistsError() {
    this.statusCode = 404;
    this.message = "This chat does not exist";
}
NotExistsError.prototype = Error.prototype;




