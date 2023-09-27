const fs = require('fs');
const DATA_PATH = './data/genreList.json'
const Genres = {
  all: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  },
};

module.exports=Genres