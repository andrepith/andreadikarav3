const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
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
router.post(
  "/",
  [
    auth,
    [
      check("firstName", "First Name is required").not().isEmpty(),
      check("lastName", "Last Name is required").not().isEmpty(),
      check("birthName", "Birth Name is required").not().isEmpty(),
      check("birthDate", "Birth Date is required").not().isEmpty(),
      check("birthPlace", "Birth Place is required").not().isEmpty(),
      check("city", "City is required").not().isEmpty(),
      check("country", "Country is required").not().isEmpty(),
      check("nationality", "Nationality is required").not().isEmpty(),
      check("email", "Email is required").not().isEmpty(),
      check("phone", "Phone is required").not().isEmpty(),
      check("resumeLink", "Resume Link is required").not().isEmpty(),
      check("jobTitle", "Job Title is required").not().isEmpty(),
      check("aboutMe", "About Me is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
    } = req.body;

    // Build profile object
    const bioFields = {};
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
  }
);

// @route     PUT api/bio/social
// @desc      Add social
// @access    Private
router.put(
  "/social",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("url", "URL is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, url } = req.body;

    const newSocial = {
      name,
      url,
    };

    try {
      const bio = await Bio.findOne();

      bio.social.unshift(newSocial);

      await bio.save();

      res.json(bio);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     POST api/bio/social/:social_id
// @desc      Update bio social
// @access    Private
router.post("/social/:social_id", auth, async (req, res) => {
  try {
    const bio = await Bio.findOne();
    if (bio) {
      const socialIndex = await bio.social.findIndex(
        (obj) => obj.id === req.params.social_id
      );

      if (socialIndex === -1) {
        return res.status(400).json({ msg: "There is no social for this id" });
      }

      const { name, url } = req.body;

      if (name) bio.social[socialIndex].name = name;
      if (url) bio.social[socialIndex].url = url;

      await bio.save();
      res.json(bio);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/bio/social/:social_id
// @desc      Delete social from bio
// @access    Private
router.delete("/social/:social_id", auth, async (req, res) => {
  try {
    const bio = await Bio.findOne();

    // Get remove index
    const removeIndex = bio.social
      .map((item) => item.id)
      .indexOf(req.params.social_id);

    bio.social.splice(removeIndex, 1);

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
// @desc      Update bio experience
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

// @route     PUT api/bio/portofolio
// @desc      Add portofolio
// @access    Private
router.put(
  "/portofolio",
  [
    auth,
    [
      check("url", "URL is required").not().isEmpty(),
      check("image", "Image Link is required").not().isEmpty(),
      check("name", "Name is required").not().isEmpty(),
      check("type", "Website Type is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { url, image, alt, name, type } = req.body;

    const newPortofolio = {
      url,
      image,
      alt,
      name,
      type,
    };

    try {
      const bio = await Bio.findOne();

      bio.portofolio.unshift(newPortofolio);

      await bio.save();

      res.json(bio);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     POST api/bio/portofolio/:portofolio_id
// @desc      Update bio portofolio
// @access    Private
router.post("/portofolio/:portofolio_id", auth, async (req, res) => {
  try {
    const bio = await Bio.findOne();
    if (bio) {
      const portofolioIndex = await bio.portofolio.findIndex(
        (obj) => obj.id === req.params.portofolio_id
      );

      if (portofolioIndex === -1) {
        return res
          .status(400)
          .json({ msg: "There is no portofolio for this id" });
      }

      const { url, image, alt, name, type } = req.body;

      if (url) bio.portofolio[portofolioIndex].url = url;
      if (image) bio.portofolio[portofolioIndex].image = image;
      if (alt) bio.portofolio[portofolioIndex].alt = alt;
      if (name) bio.portofolio[portofolioIndex].name = name;
      if (type) bio.portofolio[portofolioIndex].type = type;

      await bio.save();
      res.json(bio);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/bio/portofolio/:portofolio_id
// @desc      Delete portofolio from bio
// @access    Private
router.delete("/portofolio/:portofolio_id", auth, async (req, res) => {
  try {
    const bio = await Bio.findOne();

    // Get remove index
    const removeIndex = bio.portofolio
      .map((item) => item.id)
      .indexOf(req.params.portofolio_id);

    bio.portofolio.splice(removeIndex, 1);

    await bio.save();

    res.json(bio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/bio/skillset
// @desc      Add skillset
// @access    Private
router.put(
  "/skillset",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("image", "Image is required").not().isEmpty(),
      check("link", "Link is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, image, link } = req.body;

    const newSkillset = {
      name,
      image,
      link,
    };

    try {
      const bio = await Bio.findOne();

      bio.skillset.unshift(newSkillset);

      await bio.save();

      res.json(bio);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     POST api/bio/skillset/:skillset_id
// @desc      Update bio skillset
// @access    Private
router.post("/skillset/:skillset_id", auth, async (req, res) => {
  try {
    const bio = await Bio.findOne();
    if (bio) {
      const skillsetIndex = await bio.skillset.findIndex(
        (obj) => obj.id === req.params.skillset_id
      );

      if (skillsetIndex === -1) {
        return res
          .status(400)
          .json({ msg: "There is no skillset for this id" });
      }

      const { name, image, link } = req.body;

      if (name) bio.skillset[skillsetIndex].name = name;
      if (image) bio.skillset[skillsetIndex].image = image;
      if (link) bio.skillset[skillsetIndex].link = link;

      await bio.save();
      res.json(bio);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/bio/skillset/:skillset_id
// @desc      Delete skillset from bio
// @access    Private
router.delete("/skillset/:skillset_id", auth, async (req, res) => {
  try {
    const bio = await Bio.findOne();

    // Get remove index
    const removeIndex = bio.skillset
      .map((item) => item.id)
      .indexOf(req.params.skillset_id);

    bio.skillset.splice(removeIndex, 1);

    await bio.save();

    res.json(bio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/bio/education
// @desc      Add education
// @access    Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of Study is required").not().isEmpty(),
      check("from", "start date is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const bio = await Bio.findOne();

      bio.education.unshift(newEducation);

      await bio.save();

      res.json(bio);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     POST api/bio/education/:education_id
// @desc      Update bio education
// @access    Private
router.post("/education/:education_id", auth, async (req, res) => {
  try {
    const bio = await Bio.findOne();
    if (bio) {
      const educationIndex = await bio.education.findIndex(
        (obj) => obj.id === req.params.education_id
      );

      if (educationIndex === -1) {
        return res
          .status(400)
          .json({ msg: "There is no education for this id" });
      }

      const { school, degree, fieldofstudy, from, to, current, description } =
        req.body;

      if (school) bio.education[educationIndex].school = school;
      if (degree) bio.education[educationIndex].degree = degree;
      if (fieldofstudy)
        bio.education[educationIndex].fieldofstudy = fieldofstudy;
      if (description) bio.education[educationIndex].description = description;
      if (from) bio.education[educationIndex].from = from;
      if (to) {
        bio.education[educationIndex].current = false;
        bio.education[educationIndex].to = to;
      }
      if (current) {
        bio.education[educationIndex].current = current;
        bio.education[educationIndex].to = null;
      }

      await bio.save();
      res.json(bio);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/bio/education/:education_id
// @desc      Delete education from bio
// @access    Private
router.delete("/education/:education_id", auth, async (req, res) => {
  try {
    const bio = await Bio.findOne();

    // Get remove index
    const removeIndex = bio.education
      .map((item) => item.id)
      .indexOf(req.params.education_id);

    bio.education.splice(removeIndex, 1);

    await bio.save();

    res.json(bio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
