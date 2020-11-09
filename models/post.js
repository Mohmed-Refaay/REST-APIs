const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const postScheme = new Scheme(
  {
    title: {
      required: true,
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    creator: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postScheme);
