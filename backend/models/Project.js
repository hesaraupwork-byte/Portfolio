const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    images: {
      type: [{ url: String, publicId: String }],
      default: [],
    },
    videoUrl: { type: String, trim: true },
    videoPublicId: { type: String, trim: true },
    projectUrl: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
