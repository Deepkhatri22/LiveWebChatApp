// import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
// const socket = io('nodeserver-0me8.onrender.com');
const socket = io('nodeserver-6dgw.onrender.com');

const form = document.getElementById('send-conatiner');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('tune.mp3');

const append = (message, position)=> {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
   if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} Joined the chat`, 'right');

})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}` , 'left')
})
socket.on('left', name =>{
    append(`${name} left the chat` , 'left')
})