const router = require('express').Router();
const { User } = require('../../models');

// Sign up new user profile
router.post('/sign-up', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;

      res.json({ user: dbUserData, message: 'Successfully created account!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }


});

// Login page
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Email or password was not correct. Please re-enter this information' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Email or password was not correct. Please re-enter this information' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'Welcome!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout page
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;