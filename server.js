const express = require( "express" );
const app = express();
const chatsAC =require('./requests/chats/router')       // AC = action router
const messagesAC =require('./requests/messages/router')
const usersAC =require('./requests/users/router')
require("dotenv").config()

app.use(express.json());


app.use('/chats', chatsAC);                 // AC = action router
app.use('/messages' , messagesAC);
app.use('/users', usersAC);


app.listen(process.env.PORT , () => {
    console.log('Application listening on port 9000!');
});

module.exports = app;

//--------------------------------------------------------------------------------------------------