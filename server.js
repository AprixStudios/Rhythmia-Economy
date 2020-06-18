const express = require('express');
const server = express();
server.all('/', (req, res) => {
  res.send(`FOTD Up!`);
});



function keepAlive() {
  server.listen(3000, () => {console.log(`Server Ready!`)});
}

module.exports = keepAlive;