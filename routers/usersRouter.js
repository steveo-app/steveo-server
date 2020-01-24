const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../helpers/usersModel.js');
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    })
})

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  /// adds user to the database
  Users.add(user)
    .then(saved => {

      /// creates token for the user
      const token = generateToken(saved);

      res.status(201).json({
        user: saved,
        token
      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: error });
    });
});

router.post('/login', (req, res) => {
  let { email, password } = req.body;

  Users.findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          user: user,
          message: `Welcome ${user.firstname}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.email
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router;