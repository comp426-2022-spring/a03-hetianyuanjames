import { coinFlips, countFlips, coinFlip, flipACoin } from "./modules/coin.mjs";
import minimist from 'minimist'; 
import express from 'express'; 


const app = express()

var min = minimist(process.argv.slice(2))
var port = 'port'
const HTTP_PORT = min[port] || 5000


const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});


app.get('/app/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain'});
    res.end(res.statusCode+ ' ' +res.statusMessage)
});


app.get('/app/flip/', (req, res) => {
    res.statusCode = 200;
    let aFlip = coinFlip()
    res.json({flip: aFlip})
    res.writeHead(res.statusCode, {'Content-Type' : 'application/json'});
})


app.get('/app/flips/:number', (req, res) => {
    var coins = coinFlips(req.params.number)

    var heads = 0
    var tails = 0
    for (var i=0; i<coins.length; i++) {
        if (coins[i].valueOf() == "heads") {
            heads ++
        } else {
            tails ++
        }
    }

    res.json({"raw" : coins, "summary" : {"heads" : heads, "tails" : tails}})
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


app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});
