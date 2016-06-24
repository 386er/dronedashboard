var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);



var modelSchema = new Schema({
    id:  {
        type: Number,
        required: true,
        unique: true
    },
    label:  {
        type: String,
        required: true
    },
    name:  {
        type: String,
        required: true
    },
    'chart-type':  {
        type: String,
        required: true
    },
    connectionEstablished:  {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});


var segmentationSchema = new Schema({
    col:  {
        type: Number,
        required: true,
        unique: true
    },
    row:  {
        type: Number,
        required: true
    },
    size_x:  {
        type: Number,
        required: true
    },
    size_y:  {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});





var streamSchema = new Schema({
    name: {
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

