var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var usb = require('serialport');
var readLine = require('@serialport/parser-readline');

var usb_port = 'COM6'; // Arduino usb port
var sport = new usb(usb_port, { baudRate: 9600 });
var parser = sport.pipe(new readLine({ delimiter: '\n' }));

var main = io.of('/main');

var port = process.env.PORT || 4000;

app.get('/', function(req, res)
{
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

sport.on("open", () =>
{
    console.log('Ready');

    parser.on('data', data =>
    {
        main.emit('usb output', data);
    });

    main.on('connection', function(socket)
    {
        // console.log('User connected');

        socket.on('usb input', function(data)
        {
            sport.write(data + '\n', (err) =>
            {
                if (err)
                {
                    return console.log('Error on write: ', err.message);
                }
            });
        });

        socket.on('disconnect', function()
        {
            // console.log('User disconnected.');
        });
    });
});

http.listen(port, function()
{
  console.log(
    '\n####################\n' +
      'Server is running on\n   localhost:' + port +
    '\n####################\n');
});