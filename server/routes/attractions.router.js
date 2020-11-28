// attractions router file for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains routes for getting all of the attractions at the park the user chooses

const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for getting all of the attractions in the database
// at the chosen park
router.get('/:parkId', rejectUnauthenticated, (req, res) => {
    console.log('parkId', req.params.parkId);
    
    let queryText = `select * from attractions
    where attractions.park_id = ${req.params.parkId}
    order by name;`;

    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get attractions request', error);
        res.sendStatus(500);
    });
}); // end get route

module.exports = router;
