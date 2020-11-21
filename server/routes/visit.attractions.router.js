const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET route for getting all of the attractions in the database that
// are available at the park
router.get('/:parkVisitId', (req, res) => {
    console.log('parkVisitId', req.params.parkVisitId);
    
    if (req.isAuthenticated() === false) { // unauthenticated
        console.log('forbidden/unauthenticated for getting already ridden attractions');
        res.sendStatus(403);
    }
    else {  // authenticated
        let queryText = `select attractions.name, attractions.id from attractions
        join parks 
        on parks.id = attractions.park_id
        join park_visits
        on parks.id = park_visits.park_id
        where park_visits.id = $1
        and user_id = $2
        order by attractions.name;`;

        pool.query(queryText, [req.params.parkVisitId, req.user.id]).then((result) => {
            console.log('result.rows', result.rows);
        
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in get attractions request', error);
            res.sendStatus(500);
        });
    }   // end authentication
}); // end get route



module.exports = router;
