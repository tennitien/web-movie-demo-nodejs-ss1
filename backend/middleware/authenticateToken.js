const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const usersTokenList = JSON.parse(
  fs.readFileSync('./data/userToken.json', 'utf8')
);

exports.postToken = (req, res, next) => {
  const user = usersTokenList[1];
  const token = jwt.sign({ user }, process.env.SECRET_TOKEN);
  //// res.cookie('token', token, { httpOnly: true });
  // send token to client
  res.status(200).json({ token });
};

exports.authenticateToken = async (req, res, next) => {
  const headers = req.headers.authorization;
  const token = headers.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await jwt.verify(token, process.env.SECRET_TOKEN);

    const getUser = user.user;
    const foundUser = usersTokenList.find(
      u => u.userId === getUser.userId && u.token === getUser.token
    );

    if (!foundUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = getUser;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden' });
  }
};
