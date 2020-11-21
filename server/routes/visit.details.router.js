const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET route for getting all of the attractions in the database
// at the chosen park
router.get('/:parkVisitId', (req, res) => {
    
    console.log('parkVisitId', req.params.parkVisitId);
    

    let queryText = `select * from attractions
    join parks 
    on parks.id = attractions.park_id
    join visits_attractions
    on visits_attractions.attractions_id = attractions.id
    join park_visits
    on parks.id = park_visits.park_id
    where park_visits.id = $1;`;

    pool.query(queryText, [req.params.parkVisitId]).then((result) => {
        console.log('result.rows', result.rows);
        
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get visitDetails request', error);
        res.sendStatus(500);
    });
});



module.exports = router;