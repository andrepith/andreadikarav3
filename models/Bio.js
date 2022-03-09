const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BioSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthName: { type: String, required: true },
  birthDate: { type: Number, required: true },
  birthPlace: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  nationality: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resumeLink: { type: String, required: true },
  jobTitle: { type: [String], required: true },
  aboutMe: { type: String, required: true },
  github: { url: { type: String, required: true } },
  linkedin: { url: { type: String, required: true } },
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String, required: true },
      from: { type: Number, required: true },
      to: { type: Number },
      current: { type: Boolean, default: false },
      description: { type: [String], required: true },
      url: { type: String, required: true },
    },
  ],
  portofolio: [
    {
      url: { type: String, required: true },
      image: { type: String, required: true },
      alt: { type: String, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
  skillset: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Number,
        required: true,
      },
      to: {
        type: Number,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
});

module.exports = Bio = mongoose.model("bio", BioSchema);
