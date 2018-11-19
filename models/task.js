const MONGOOSE = require('mongoose');

const TODOSCHEMA = new MONGOOSE.Schema({
    task:{
        type: String,
        required: 'Task cannot be blank'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    due_date: {
        type: Date, 
        
    },
    author: {
        id: {
            type: MONGOOSE.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
    }

});

const TASK = MONGOOSE.model('Task', TODOSCHEMA);

module.exports = TASK;