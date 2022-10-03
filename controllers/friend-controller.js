const { Friend, Thought } = require('../models');

const friendController = {
  // add friend
  addFriend({ params, body }, res) {
    console.log(body);
    Friend.create(body)
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { friends: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  
  addReation({ params, body }, res) {
    Friend.findOneAndUpdate(
      { _id: params.friendId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No friend found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // remove friend
  removeFriend({ params }, res) {
    Friend.findOneAndDelete({ _id: params.friendId })
      .then(deletedFriend => {
        if (!deletedFriend) {
          return res.status(404).json({ message: 'No friend with this id!' });
        }
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { friends: params.friendId } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  
     // remove reaction
removeReaction({ params }, res) {
  Friend.findOneAndUpdate(
    { _id: params.friendId },
    { $pull: { reactions: { reactionId: params.reactionId } } },
    { new: true }
  )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
}

};



module.exports = friendController;