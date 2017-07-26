// server.js
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const Pusher = require('pusher');

//initialize Pusher with your appId, key and secret
const pusher = new Pusher({
    appId: '373570',
    key: '149a270250e559e6ff2a',
    secret: '77abd734a0c425ceb122',
    cluster: 'us2',
    encrypted: true
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API route which the chat messages will be sent to
app.post('/message/send', (req, res) => {
  // 'private' is prefixed to indicate that this is a private channel
    pusher.trigger( 'private-devout-galaxy-chat', 'messages', {
        message: req.body.message,
        username: req.body.username
    });
    res.sendStatus(200);
});

// API route used by Pusher as a way of authenticating users
app.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
});

// Set port to be used by Node.js
app.set('port', (5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
