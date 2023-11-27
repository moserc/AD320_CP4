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

//error constants
let BAD_REQUEST = 400;

//define topics and quotes
let topics = ['computers', 'fashion', 'football', 'sass'];
let computers = [
    {'quote' : '"Memory -is- RAM!"'},
    {'quote' : '"Hello, IT... Have you tried forcing an unexpected reboot?"'},
    {'quote' : '"What kind of operating system does it use?" Police: "Vista!" Moss: "We\'re going to die!"'}
];

let fashion = [
    {'quote' : '"I like being weird. Weird\'s all I\'ve got. That and my sweet style."'},
    {'quote' : '"Let me put on my slightly larger glasses."'},
    {'quote' : 'Coworker: "I like your glasses." Moss: "Thank you, they\re not for sale."'}
];

let football = [
    {'quote' : '"Did you see that ludicrous display last night?"'},
    {'quote' : '"Hooray. He\'s kicked the ball. Now the ball\'s over there. That man '+
        'has it now. That\'s an interesting development. Maybe he\'ll kick the ball. '+
        'He has indeed and apparently that deserves a round of applause."'}
];

let sass = [
    {'quote' : '"Prepare to put mustard on those words, for you will soon be consuming them '+
        'along with this slice of humble pie that comes direct from the oven of shame, set at '+
        'gas mark \'egg on your face\'."'}, 
    {'quote' : '"You\'d best put seat belts on your ears, Roy, \'cause I\'m about to take them for '+
        'the ride of their lives!"'},
    {'quote' : '"I came here to drink milk and kick ass, and I\'ve just finished my milk."'}
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

    if (topic === 'computers'){
        quote = computers[Math.floor(Math.random() * computers.length)];
    }else if (topic === 'fashion'){
        quote = fashion[Math.floor(Math.random() * fashion.length)];
    }else if (topic === 'football'){
        quote = football[Math.floor(Math.random() * football.length)];
    }else if (topic === 'sass'){
        quote = sass[Math.floor(Math.random() * sass.length)];
    }else{
        res.status(BAD_REQUEST).json({
            'error': 'Unable to find topic. Check spelling. Entries should be all lowercase.'
        });
        console.log('error');
    }
    res.type('json').send(quote);
    console.log('quote sent');
});

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);