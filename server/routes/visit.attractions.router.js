const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET route for getting all of the attractions in the database
// at the chosen park
router.get('/:parkVisitId', (req, res) => {
    
    console.log('parkVisitId', req.params.parkVisitId);
    

    let queryText = `select attractions.name, attractions.id from attractions
        join parks 
        on parks.id = attractions.park_id
        join park_visits
        on parks.id = park_visits.park_id
        where park_visits.id = 59;`;

    pool.query(queryText).then((result) => {
        console.log('result.rows', result.rows);
        
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get attractions request', error);
        res.sendStatus(500);
    });
});



module.exports = router;
