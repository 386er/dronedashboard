var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Streams = require('../models/streams');
var streamRouter = express.Router();
var Verify = require('./verify');
streamRouter.use(bodyParser.json());

streamRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Streams.find({}, function (err, stream) {
        if (err) throw err;
        res.json(stream);
    });
})

.post( Verify.verifyOrdinaryUser, function (req, res, next) {
    Streams.create(req.body, function (err, stream) {
        if (err) throw err;
        console.log('stream created!');
        var id = stream._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the stream with id: ' + id);
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    Streams.findOneAndUpdate({}, {
        $set: req.body
    }, {
        new: true
    }, function (err, stream) {
        if (err) throw err;
        res.json(stream);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Streams.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});





streamRouter.route('/:streamId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
		Streams.find({"createdBy": req.params.streamId}, function (err, stream) {
		if (err) throw err;
		res.json(stream);
	});
});


/*



.delete(function (req, res, next) {
    Streams.findByIdAndRemove(req.params.streamId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});


streamRouter.route('/:streamId/comments')
.get(function (req, res, next) {
    Streams.findById(req.params.streamId, function (err, stream) {
        if (err) throw err;
        res.json(stream.comments);
    });
})

.post(function (req, res, next) {
    Streams.findById(req.params.streamId, function (err, stream) {
        if (err) throw err;
        stream.comments.push(req.body);
        stream.save(function (err, stream) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(stream);
        });
    });
})

.delete(function (req, res, next) {
    Streams.findById(req.params.streamId, function (err, stream) {
        if (err) throw err;
        for (var i = (stream.comments.length - 1); i >= 0; i--) {
            stream.comments.id(stream.comments[i]._id).remove();
        }
        stream.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

*/

module.exports = streamRouter;

