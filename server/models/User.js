const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
{
email: {
type: String,
required: true,
unique: true,
trim: true,
},


password: {
  type: String,
  required: true,
},

family: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Family",
  default: null,
},


},
{
timestamps: true,
}
);

/* =========================
HASH PASSWORD
========================= */
userSchema.pre(
"save",
async function (next) {
if (
!this.isModified(
"password"
)
) {
return next();
}


try {
  const salt =
    await bcrypt.genSalt(
      10
    );

  this.password =
    await bcrypt.hash(
      this.password,
      salt
    );

  next();
} catch (error) {
  next(error);
}

}
);

/* =========================
MATCH PASSWORD
========================= */
userSchema.methods.matchPassword =
async function (
enteredPassword
) {
return await bcrypt.compare(
enteredPassword,
this.password
);
};

const User =
mongoose.model(
"User",
userSchema
);

module.exports = User;
