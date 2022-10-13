const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const FriendSchema = new Schema({
  writtenBy: {
    type: String,
    required: true
  },
  friendBody: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
   
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// FriendSchema.virtual('reactionCount').get(function() {
//   return this.replies.length;
// });


const Friend = model('Friend', FriendSchema);

module.exports = Friend;