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

// @route     POST api/bio
// @desc      Create or update bio
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
  // bioFields.github = {};
  // bioFields.linkedin = {};
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
  // if (github) bioFields.github.url = github;
  // if (linkedin) bioFields.linkedin.url = linkedin;

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

// @route     PUT api/bio/experience
// @desc      Add experience
// @access    Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("location", "Location is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("url", "URL is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description, url } =
      req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
      url,
    };

    try {
      const bio = await Bio.findOne();

      bio.experience.unshift(newExp);

      await bio.save();

      res.json(bio);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     POST api/bio/experience/:exp_id
// @desc      Update profile experience
// @access    Private
router.post("/experience/:exp_id", auth, async (req, res) => {
  try {
    const bio = await Bio.findOne();
    if (bio) {
      const experienceIndex = await bio.experience.findIndex(
        (obj) => obj.id === req.params.exp_id
      );

      if (experienceIndex === -1) {
        return res
          .status(400)
          .json({ msg: "There is no experience for this id" });
      }

      const { title, company, location, from, to, current, description, url } =
        req.body;

      if (title) bio.experience[experienceIndex].title = title;
      if (company) bio.experience[experienceIndex].company = company;
      if (location) bio.experience[experienceIndex].location = location;
      if (from) bio.experience[experienceIndex].from = from;
      if (to) {
        bio.experience[experienceIndex].current = false;
        bio.experience[experienceIndex].to = to;
      }
      if (current) {
        bio.experience[experienceIndex].current = current;
        bio.experience[experienceIndex].to = null;
      }
      if (description) {
        bio.experience[experienceIndex].description = description;
      }
      if (url) {
        bio.experience[experienceIndex].url = url;
      }

      await bio.save();
      res.json(bio);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/bio/experience/:exp_id
// @desc      Delete experience from bio
// @access    Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const bio = await Bio.findOne();

    // Get remove index
    const removeIndex = bio.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    bio.experience.splice(removeIndex, 1);

    await bio.save();

    res.json(bio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
