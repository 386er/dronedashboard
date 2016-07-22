var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./users');
require('mongoose-currency').loadType(mongoose);



var modelSchema = new Schema({
    id:  {
        type: String,
    },
    label:  {
        type: String,
    },
    name:  {
        type: String,
    },
    'chart-type':  {
        type: String,
    },
    connectionEstablished:  {
        type: Boolean,
    }
});


var segmentationSchema = new Schema({
    col:  {
        type: Number,
    },
    row:  {
        type: Number,
    },
    size_x:  {
        type: Number,
    },
    size_y:  {
        type: Number,
    }
});




var streamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    models: [modelSchema],
    segmentation: [segmentationSchema]
}, {
    timestamps: true
});


var Streams = mongoose.model('Stream', streamSchema);
module.exports = Streams;

