
        //request to bd for files in this directory

const requests = {
    "ADD_USER" : "INSERT INTO `user` (`userName`, `created_at`) VALUES (?, ?)",                  //insert new user
    "SEARCH_ID_ADDED_USER" : "SELECT idUser FROM user WHERE userName=? ORDER BY idUser DESC LIMIT 1"    // search added user from the end
}

module.exports = requests