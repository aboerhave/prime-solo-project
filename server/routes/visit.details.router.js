const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// GET route for getting all of the details for the chosen visit
router.get('/:parkVisitId', rejectUnauthenticated, (req, res) => {
    console.log('get visit details route parkVisitId', req.params.parkVisitId);
    
    let queryText = `select * from attractions
    join parks 
    on parks.id = attractions.park_id
    join visits_attractions
    on visits_attractions.attractions_id = attractions.id
    join park_visits
    on parks.id = park_visits.park_id
    where park_visit_id = $1
    and user_id = $2;`;

    pool.query(queryText, [req.params.parkVisitId, req.user.id]).then((result) => {
        console.log('result.rows', result.rows);
        
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get visitDetails request', error);
        res.sendStatus(500);
    });
}); // end get route



module.exports = router;
