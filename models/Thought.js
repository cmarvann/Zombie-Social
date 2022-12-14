const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [ReactionSchema]
    // friends: [friendsSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
     // prevents virtuals from creating duplicate of _id as `id`
     id: false
  }
);
// get total count of reactions and replies on retrieval
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions. reduce( (total, reaction) => total + reaction.replies.length + 1, 0);

});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

