const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const sqlQuery = `SELECT * FROM genres ORDER BY "id" ASC;`;
  pool.query(sqlQuery)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error in get genres`, error);
      res.sendStatus(500)
    })
});


module.exports = router;