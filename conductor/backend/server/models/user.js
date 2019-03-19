import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },

//   email: {
//       type: String,
//       unique: true,
//   },
//   usertype: {
//       type: String,
//       unique: false,
//   }
});

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
      username: login,
    });
  
    if (!user) {
      user = await this.findOne({ email: login });
    }
  
    return user;
  };

const User = mongoose.model('User', userSchema);

// cascading function for deleting all tickets related to this user

// userSchema.pre('remove', function(next) {
//     this.model('Message').deleteMany({ user: this._id }, next);
//   });

export default User;