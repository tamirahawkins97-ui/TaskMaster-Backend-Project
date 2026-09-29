//DEPENDANCIES 
const mongoose = require('mongoose');

//HASHING AND SALTING OPERATIONS.
const userSchema = mongoose.Schema({
username:
{
 type: mongoose.Schema.Types.ObjectId,
  ref: "User", 
 required: true,
 trim:true, 
 unique: true
},

email: 
{
 type: String, 
 match: [/.+@.+\..+/, "Please provide a valid email addres."],
 unique: true, 
 required: true
},

password: 
{
type: String, 
 required: [true, "Password is required"],
 minlength: [8, "Password must be at least 8 characters long!"],
 trim: true
},

role: 
{ enum: ["user", "admin"],
    default: "user"
}
}, {
    timestamps: true
});

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