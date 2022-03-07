const express = require("express");
const request = require("request");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Bio = require("../../models/Bio");

// @route     GET api/bio
// @desc      Get bio
// @access    Public
router.get("/", async (req, res) => {
  try {
    const bio = await Bio.findOne();
    res.json(bio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/profile
// @desc      Create or update user profile
// @access    Private
router.post("/", auth, async (req, res) => {
  const {
    firstName,
    lastName,
    birthName,
    birthDate,
    birthPlace,
    city,
    country,
    nationality,
    email,
    phone,
    resumeLink,
    jobTitle,
    aboutMe,
    github,
    linkedin,
  } = req.body;

  // Build profile object
  const bioFields = {};
  bioFields.github = {};
  bioFields.linkedin = {};
  if (firstName) bioFields.firstName = firstName;
  if (lastName) bioFields.lastName = lastName;
  if (birthName) bioFields.birthName = birthName;
  if (birthDate) bioFields.birthDate = birthDate;
  if (birthPlace) bioFields.birthPlace = birthPlace;
  if (city) bioFields.city = city;
  if (country) bioFields.country = country;
  if (nationality) bioFields.nationality = nationality;
  if (email) bioFields.email = email;
  if (phone) bioFields.phone = phone;
  if (resumeLink) bioFields.resumeLink = resumeLink;
  if (jobTitle) {
    bioFields.jobTitle = jobTitle.split(",").map((title) => title.trim());
  }
  if (aboutMe) bioFields.aboutMe = aboutMe;
  if (github) bioFields.github.url = github;
  if (linkedin) bioFields.linkedin.url = linkedin;

  try {
    let bio = await Bio.findOne();
    if (bio) {
      bio = await Bio.findOneAndUpdate(
        {},
        {
          $set: bioFields,
        },
        { new: true }
      );

      return res.json(bio);
    }
    // Create
    bio = new Bio(bioFields);
    await bio.save();
    res.json(bio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
