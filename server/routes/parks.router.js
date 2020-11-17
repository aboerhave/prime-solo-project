const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET route for getting all of the parks in the database
router.get('/', (req, res) => {

    let queryText = `select * from parks
    order by name;`;

    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get parks request', error);
        res.sendStatus(500);
    })
});


module.exports = router;
