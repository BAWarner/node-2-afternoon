var messages = [];
var id = 0;

var getTime = () => {
    var longTime = new Date();
    var time = longTime.getTime();
    let hours, minutes, seconds;

    hours = longTime.getHours();
    minutes = longTime.getMinutes();
    seconds = longTime.getSeconds();
    

    let timeArray = [hours, minutes, seconds];
    let formattedTime = timeArray.map(
        (val) => {
            if(val < 10){
                return '0' + val;
            }
            else{
                return val;
            }
        }
    );

    return formattedTime.join(':');

}

var createMessage = (req, res) => {
    let {text} = req.body;
    let time = getTime();
    let fullDate = `${new Date().toDateString()} - ${time}`;

    var newMessage = {
        id: id,
        text: text,
        time: fullDate
    }
    messages.push(newMessage);
    
    res
    .status(200)
    .send(messages)

    id++;
}

var readMessages = (req, res) => {
    res
    .status(200)
    .send(messages);
}

var updateMessage = (req, res) => {
    let targetIndex = messages.findIndex(message => message.id == req.params.id);
    let {text} = req.body;

    if(!text){
        res
        .status(400)
        .send('Please enter the updated text');
    }else{

        messages[targetIndex].text = text
        messages[targetIndex].updatedTime = getTime();

        res
        .status(200)
        .send(messages);
    }
}

var deleteMessage = (req, res) => {
    let targetIndex = messages.findIndex(message => message.id == req.params.id);

    messages.splice(targetIndex, 1);

    res
    .status(200)
    .send(messages);
}


module.exports = {
    createMessage,
    readMessages,
    updateMessage,
    deleteMessage
}