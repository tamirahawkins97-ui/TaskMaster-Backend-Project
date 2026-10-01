//DEPENDANCIES 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//HASHING AND SALTING OPERATIONS.
const userSchema = mongoose.Schema({
username:
{
 type: String,
 required:[true, 'Username is required.'],
 trim:true, 
 unique: true
},

email: 
{
 type: String, 
 match: [/.+@.+\..+/, "Please provide a valid email address."],
 unique: true, 
 required: [true, 'email is required.']
},

password: 
{
type: String, 
 required: [true, "Password is required"],
 minlength: [8, "Password must be at least 8 characters long!"],
 trim: [true, 'password is required.']
},

role: 
{ type: String,
    enum: ["user", "admin"],
    default: "user",
}
}, {
    timestamps: true
});

//Pre save middle ware for hashing and salting 
userSchema.pre('save', async function () {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
});

userSchema.methods.isCorrectPassword = function(password){
  return bcrypt.compare(password,this.password)
}
const User = new mongoose.model('User', userSchema);

module.exports = User; 