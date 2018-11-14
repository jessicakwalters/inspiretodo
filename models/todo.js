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
        
    }

});

const TODO = MONGOOSE.Model('Todo', TODOSCHEMA);

module.exports = TODO;