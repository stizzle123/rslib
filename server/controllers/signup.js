const User = require("../../models/User");
const Collection = require("../../models/Collection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isLength = require("validator/lib/isLength");
const isEmail = require("validator/lib/isEmail");
const authy = require("authy")(process.env.AUTHY_API);

exports.handleSignup = async (req, res) => {
  const { name, email, password, department, phone, code } = req.body;
  try {
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send("Name must be 3-10 characters long");
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send("Password must be at least 6 characters long");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid.");
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await new User({
      name,
      email,
      department,
      phone,
      countryCode: `+${code}`,
      password: hash
    });

    newUser.save((err, doc) => {
      if (err) throw err;
      authy.register_user(
        doc.email,
        doc.phone,
        doc.countryCode,
        (err, response) => {
          if (err) throw err;

          newUser.authyId = response.user.id;
          newUser.verified = true;

          newUser.save((err, doc) => {
            if (err) throw err;
            // authy.request_sms(doc.authyId, true, result => {
            //   res.status(200).json({ result, id: doc._id });
            // });

            new Collection({ user: newUser._id }).save();

            res.status(200).json({ id: doc._id });
          });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up user. Please try again later");
  }
};
