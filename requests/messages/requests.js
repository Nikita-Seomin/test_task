
        //request to bd for files in this directory

const requests = {

    //------------addController-----------------------------------------------------------------------------------------------------
    "ADD_MESSAGE" : "INSERT INTO `message` (`chat`, `author`, `text`, `created_at`) VALUES (?, ?, ?, ?)",                           // insert new message
    "SEARCH_ID_MESSAGE" : "SELECT idMessage FROM message WHERE chat=? AND author=? AND text=? ORDER BY idMessage DESC LIMIT 1",    // search added message from the end

    
}

module.exports = requests