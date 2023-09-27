const fs = require('fs');
const DATA_PATH = './data/videoList.json'
const Videos = {
  all: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  },
};

module.exports=Videos