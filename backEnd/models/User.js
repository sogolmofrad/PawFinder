import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function() { return !this.googleId; },
  },
  fullName: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['individual', 'company'],
    required: true,
  },
  companyName: {
    type: String,
    required: function() { return this.userType === 'company'; },
  },
  registrationNumber: {
    type: String,
    required: function() { return this.userType === 'company'; },
  },
  contactPerson: {
    type: String,
    required: function() { return this.userType === 'company'; },
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { 
  collection: 'Users',
  versionKey: false
}); 

export default mongoose.model('User', userSchema, 'Users');