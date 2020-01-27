/***********************************************************************/
const express = require('express');
const app = express();
const PORT = 3001;
app.listen(PORT, () => console.log(`Party on (${PORT}), Wayne!`))
app.use(express.json());
app.use( express.static(__dirname + '/../public/build') )
/***********************************************************************/
const messageController = require('./controller/messages_controller');

const {createMessage, readMessages, updateMessage, deleteMessage} = messageController;

app.get('/api/messages', readMessages);
app.post('/api/messages', createMessage);
app.put('/api/messages/:id', updateMessage);
app.delete('/api/messages/:id', deleteMessage);