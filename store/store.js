var idGenerator = require('./id-generator')

var store = {
  directories: [
    {
      id: idGenerator.getNext(),
      name: 'root'
    },
    {
      id: idGenerator.getNext(),
      name: 'newFolder'
    },
    {
      id: idGenerator.getNext(),
      name: 'newFolder2'
    }

  ],
  notices: []
};

module.exports = store;
