// const express = require('express')
// const app = express()

// var port = 5000

// const server = app.listen(port, () => {
//     console.log('App is running on port %PORT%'.replace('%PORT%', port))
// })

// app.use(function(req, res) {
//     res.status(404).send("Endpoint does not exist")
//     res.type("text/plain")
// })

import { coinFlips, countFlips, coinFlip, flipACoin } from "./modules/coin.mjs";


const http = require('http')
const express = require('express')
const fs = require('fs')
const args = require('minimist')(process.argv.slice(2));

const app = express()

args['port']


var port = 5000
if (args.port != null) {
    port = args.port;
}


// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });


// Endpoint returning JSON of flip function result
app.get('/app/flip/', (req, res) => {
    res.statusCode = 200;
    let aFlip = coinFlip()
    res.json({flip: aFlip})
    res.writeHead(res.statusCode, {'Content-Type' : 'application/json'});
})

// Endpoint returning JSON of flip array & summary
app.get('/app/flips/:number', (req, res) => {
    var flips = coinFlips(req.params.number)
    res.status(200).json({"raw" : flips, "summary" : countFlips(flips)})
});

app.get('/app/flip/call/heads', (req, res) => {
    res.statusCode = 200;
    let answer = flipACoin('heads')
    res.send(answer)
    res.writeHead(res.statusCode, {'Content-Type': 'text/plain'});
})

app.get('/app/flip/call/tails', (req, res) => {
    res.statusCode = 200;
    let answer = flipACoin('tails')
    res.send(answer)
    res.writeHead(res.statusCode, {'Content-Type': 'text/plain'});
})