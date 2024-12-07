import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  username: { 
    type: String, 
    required: false 
  },
  phoneNumber: { 
    type: String, 
    required: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: { 
    type: String, 
    required: function() { 
      return this.role === 'admin'; 
    }
  }
});

export const User = mongoose.model('User', UserSchema);