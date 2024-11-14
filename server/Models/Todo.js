const mongoose = require('mongoose');

// Define the Todo schema
const TodoSchema = new mongoose.Schema({
    name: {  
        type: String,
        required: true,  
    },
    status: {  
        type: String,
        enum: ['pending', 'progress', 'done'],
        default: 'pending',  
    }
}, {
    timestamps: true  
});


const TodoModel = mongoose.model('Todo', TodoSchema);  
module.exports = TodoModel;
