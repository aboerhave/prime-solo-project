const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET route for getting all of the attractions that have been ridden 
// for the park visit inputted
router.get('/:parkVisitId', (req, res) => {
    
    console.log('get attractions quantity parkVisitId', req.params.parkVisitId);
    
    if (req.isAuthenticated() === false) { // unauthenticated
        console.log('forbidden/unauthenticated for get attractions');
        res.sendStatus(403);
    }
    else {  // authenticated

        let queryText = `select attractions.name, park_visit_id, attractions_id, times_ridden from attractions
        join parks 
        on parks.id = attractions.park_id
        join visits_attractions
        on visits_attractions.attractions_id = attractions.id
        where park_visit_id = $1
        order by attractions.name;`;

        pool.query(queryText, [req.params.parkVisitId]).then((result) => {
            console.log('get attractions quantity result.rows', result.rows);
        
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in get attractions request', error);
            res.sendStatus(500);
        });
    }// end authentication else
}); // end get route

// post to add a new attraction that hasn't been ridden yet to the database
// in visit_attractions table
router.post('/', (req, res) => {
    console.log('stuff sent to attractionsQuantity post', req.body);
    
    if (req.isAuthenticated() === false) { // unauthenticated
        console.log('forbidden/unauthenticated for posting new attraction visited');
        res.sendStatus(403);
    }
    else {  // authenticated
        let queryText = `insert into visits_attractions (park_visit_id, attractions_id)
        values ($1, $2) returning park_visit_id;`;

        pool.query(queryText,[req.body.parkVisitId, req.body.attraction]).then((result) => {
            console.log('successfully added attraction to park visit');
            console.log('result.rows', result.rows[0]);
        
            res.send(result.rows[0]);
        }).catch((error) => {
            console.log('error in post attractions to park visit quantity', error);
            res.sendStatus(500);
        });
    }   // end authentication
}); // end post route

// put route to increment the number of times the attraction has been ridden
router.put('/', (req, res) => {
    console.log('stuff send to attractionsQuantity put', req.body);
    
    if (req.isAuthenticated() === false) { // unauthenticated
        console.log('forbidden/unauthenticated for increment attraction');
        res.sendStatus(403);
    }
    else {  // authenticated
        let queryText = `update visits_attractions
        set times_ridden = times_ridden + 1
        where park_visit_id = $1
        and attractions_id = $2
        returning park_visit_id;`;

        pool.query(queryText, [req.body.parkVisitId, req.body.attraction]).then((result) => {
            console.log('successfully incremented attraction in park visit');
            res.send(result.rows[0])
        
        }).catch((error) => {
            console.log('error in attractionsQuantity put', error);
            res.sendStatus(500);
        });
    }   // end authentication
})  // end put route

module.exports = router;
