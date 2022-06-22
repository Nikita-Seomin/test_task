
        //request to bd for files in this directory

const requests = {
    //-----------------addController----------------------------------------------------------
    "CHEAK_WHAT_ALL_USERS_EXISTS" :
        "SELECT idUser FROM user WHERE idUser IN (?)",
    "CREATE_CHAT":
        "INSERT INTO `chat` (`name`, `created_at`) VALUES (?, ?)",
    "SEARCH_CHAT_ID" :
        "SELECT idChat FROM chat WHERE name=? ORDER BY idChat DESC LIMIT 1",
    "ADD_USER_TO_CHAT" :
        "REPLACE INTO `peopleInChat` (`personID`, `chatID`) VALUES (?, ?)",


}

module.exports = requests