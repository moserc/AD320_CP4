/*
 * Name: Cheryl Moser
 * Date: November 26, 2023
 * AD320 CP4
 * 
 * API for Moss Quotes. Defines a list of topics. Defines one or more quotes for each topic.
 */

'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

//define topics and quotes
let topics = ['computers', 'fashion', 'football', 'sass'];
let computers = [
    {'quote' : "Memory -is- RAM!"},
    {'quote' : "Hello, IT... Have you tried forcing an unexpected reboot?"}
];

let fashion = [
    {'quote' : "I like being weird. Weird\'s all I've got. That and my sweet style."}
];

let football = [
    {'quote' : "Did you see that ludicrous display last night?"}
];

let sass = [
    {'quote' : "Prepare to put mustard on those words, for you will soon be consuming them "+
        "along with this slice of humble pie that comes direct from the oven of shame, set at "+
        "gas mark 'egg on your face'."}, 
    {'quote' : "You'd best put seat belts on your ears, Roy, 'cause I'm about to take them for "+
        "the ride of their lives!"},
    {'quote' : "I came here to drink milk and kick ass, and I've just finished my milk."}
];

/**
 * Endpoint for retrieving the list of topics.
 * @param {String} '/topics' - the endpoint
 */
app.get('/topics', async function(req, res) {
    let msg = '';
    console.log("getting list of topics...");
    for (let i = 0; i < topics.length; i++){
        msg += topics[i] + ' ';
    }
    res.type('text').send(msg);
    console.log("done");
});

/**
 * Endpoint for retrieving a random quote from the user-defined topic, if that topic exists.
 * @param {String} '/:topic' - user-defined endpoint. Must exist in topic list.
 * @throws a status 400 error if entry is not in list.
 */
app.get('/:topic', async function(req, res) {
    let topic = req.params.topic;
    let quote = '';

    try {
        if (topic === 'computers'){
            quote = computers[Math.floor(Math.random() * computers.length)];
        }else if (topic === 'fashion'){
            quote = fashion[Math.floor(Math.random() * fashion.length)];
        }else if (topic === 'football'){
            quote = football[Math.floor(Math.random() * football.length)];
        }else if (topic === 'sass'){
            quote = sass[Math.floor(Math.random() * sass.length)];
        }
    } catch (error) {
        res.status(400).send({'error': 'Unable to find topic. Check spelling. Entries should be all lowercase.'});
        console.log('error');
    }

    res.type('json').send(quote);
    console.log('quote sent');
});

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);