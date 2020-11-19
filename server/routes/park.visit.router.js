const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



// GET route for getting one park that the visit is at
router.get('/:id', (req, res) => {
    console.log('get route for park visit req.params.id', req.params.id);
    

    let queryText = `select park_visits.id, park_id, name from park_visits
    join parks on parks.id = park_visits.park_id
    where park_visits.id = $1`;

    pool.query(queryText, [req.params.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get park visit request', error);
        res.sendStatus(500);
    })
});

module.exports = router;