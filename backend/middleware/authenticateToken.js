const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const usersToken = JSON.parse(fs.readFileSync('./data/userToken.json', 'utf8'));

exports.postToken = (req, res, next) => {
  const user = usersToken[1];
  const token = jwt.sign({ user }, process.env.SECRET_TOKEN);
  res.cookie('token', token, { httpOnly: true });
  next();
};

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token || '';
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const getUser = user.user;
    const foundUser = usersToken.find(
      u => u.userId === getUser.userId && u.token === getUser.token
    );
    if (!foundUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = getUser;
    next();
  });
};
