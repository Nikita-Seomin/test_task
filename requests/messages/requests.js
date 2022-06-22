
        //request to bd for files in this directory

const requests = {

    //------------addController-----------------------------------------------------------------------------------------------------
    "ADD_MESSAGE" : "INSERT INTO `message` (`chat`, `author`, `text`, `created_at`) VALUES (?, ?, ?, ?)",                           // insert new message
    "SEARCH_ID_MESSAGE" : "SELECT idMessage FROM message WHERE chat=? AND author=? AND text=? ORDER BY idMessage DESC LIMIT 1",    // search added message from the end

    //-------------getController--------------------------------------------------------------------------------------------------
    "CHAT_IS_EXISTS" : "SELECT * FROM `chat` WHERE idChat=? LIMIT 1",                                                                //search chat on id in chat table
    "GET_CHAT_MESSAGES" : "SELECT * FROM message WHERE chat=? ORDER BY created_at"                                                    //return all messages of chat on chat id and sort by date create

}

module.exports = requests