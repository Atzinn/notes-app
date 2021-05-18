import mongoose from 'mongoose';
const schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const roles =  {
    values: ['ADMIN','USER'],
    message: "{VALUE} - That rol does not exists"
};

const userSchema = new schema({

    nombre: {
        type: String,
        required: [true, "The name is required"]
    },
    email: {
        type: String,
        required: [true,"The email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "The password is required"] 
    },
    date: {
        type: Date,
        default: Date.now
    },
    rol: {
        type: String,
        default: "USER",
        enum: roles
    },
    active: {
        type: Boolean,
        default: true
    }
});

userSchema.plugin(uniqueValidator, { message: 'Error, this {PATH} is already registered' });

userSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    return obj
}

const User = mongoose.model('User', userSchema);

export default User;