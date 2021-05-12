import mongoose, { Document, Schema } from 'mongoose';

const gamersSchema = new Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  posts: [
    {
      name: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      writer: {
        type: Gamer,
        required: true,
      },
      game: {
        type: Game,
        required: true,
      },
      postTag: {
        type: PostTag
        required: true,
      },
    },
  ],
  
});
