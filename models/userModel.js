const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname: { type: String, required: true }, // Ensuring fullname is required
  email: { type: String, required: true, }, // Ensuring email is required and unique
  password: { type: String, required: true },
  card: { 
    type: Array, 
    default: [] 
  },
  orders: { 
    type: Array, 
    default: [] 
  },
  isadmin: { 
    type: Boolean, 
    default: false 
  },
  contact: { 
    type: Number, 
    default: null // Changed default to null instead of a space
  },
  profile: { 
    type: String, 
    default: "" // Changed  default to an empty string
  }
});

module.exports = mongoose.model("User", userSchema);
