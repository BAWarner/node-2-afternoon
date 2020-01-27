var messages = [];
var id = 0;

// var getTimeStamp = () => {
//     var date = new Date();
//     let month, day, year, hours, minutes, seconds;

//     month = date.getMonth();
//     day = date.getDate();
//     year = date.getFullYear();

//     hours = date.getHours();
//     minutes = date.getMinutes();
//     seconds = date.getSeconds();
    
//     let dateArray = [(month + 1), day];
//     let formattedDate = dateArray.map(
//         val => {
//             if(val < 10){
//                 return '0' + val;
//             }
//             return val;
//         }
//     );

//     let timeArray = [hours, minutes, seconds];
//     let formattedTime = timeArray.map(
//         (val) => {
//             if(val < 10){
//                 return '0' + val;
//             }
//             else{
//                 return val;
//             }
//         }
//     );

//     return `${formattedDate.join('/')}/${year} - ${formattedTime.join(':')}`;

// }


var createMessage = (req, res) => {
    let {text, time} = req.body;

    var newMessage = {
        id: id,
        text: text,
        time: time
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
    let {text, time} = req.body;

    if(!text){
        res
        .status(400)
        .send('Please enter the updated text');
    }else{

        messages[targetIndex].text = text

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