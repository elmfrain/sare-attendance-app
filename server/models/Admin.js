const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    maxLength: 128,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  sareID: {
    type: Number
  }
});

adminSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(this.password);
    if (!isValidPassword)
      throw new Error("Password must contains at least one uppercase, lowercase, and numerical character");

    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

adminSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;