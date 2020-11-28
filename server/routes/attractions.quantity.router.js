// attractions quantity router file for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains routes for getting count of attractions experienced, adding
// a new attraction completed and incrementing any attraction already experienced
// at least once

const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for getting all of the attractions that have been ridden 
// for the park visit inputted
router.get('/:parkVisitId', rejectUnauthenticated, (req, res) => {
    
    console.log('get attractions quantity parkVisitId', req.params.parkVisitId);

    let queryText = `select attractions.name, park_visit_id, attractions_id, times_ridden from attractions
    join parks 
    on parks.id = attractions.park_id
    join visits_attractions
    on visits_attractions.attractions_id = attractions.id
    join park_visits
    on visits_attractions.park_visit_id = park_visits.id
    where park_visit_id = $1 and user_id = $2
    order by attractions.name;`;

    pool.query(queryText, [req.params.parkVisitId, req.user.id]).then((result) => {
        console.log('get attractions quantity result.rows', result.rows);
        
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get attractions request', error);
        res.sendStatus(500);
    });
}); // end get route

// post to add a new attraction that hasn't been ridden yet to the database
// in visit_attractions table.  It send back the park visit id if the visit id
// and the user id match, and then the id is sent inside the post.  If a matching id
// doesn't come back from the first query, the second query fails
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('stuff sent to attractionsQuantity post', req.body);
    
    let authorizationCheckText = `select id from park_visits
    where id = $1
    and user_id = $2;`;
    pool.query(authorizationCheckText, [req.body.parkVisitId, req.user.id]).then((authResult) => {
        const checkedParkVisitId = authResult.rows[0].id;
        console.log('post new attraction result.rows[0]', authResult.rows[0].id);
            
        let queryText = `insert into visits_attractions (park_visit_id, attractions_id)
        values ($1, $2) returning park_visit_id;`;
            
        pool.query(queryText,[checkedParkVisitId, req.body.attraction]).then((result) => {
        console.log('successfully added attraction to park visit');
        console.log('second post new attraction result.rows', result.rows[0]);
                
            res.send(result.rows[0]);
        }).catch((error) => {   // catch for second query
            console.log('error in post attractions to park visit quantity', error);
            res.sendStatus(500);
        });
    }).catch((error) => {   // catch for first query
        console.log('error in post attractions to park visit quantity', error);
        res.sendStatus(500);
    });
}); // end post route
    
// put route to increment the number of times the attraction has been ridden
// The first query will check to make sure the park visit id is one for the correct user
// and if it is, the attraction times_ridden will increase, otherwise it will fail.
router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('stuff send to attractionsQuantity put', req.body);
    
    let authorizationCheckText = `select id from park_visits
    where id = $1
    and user_id = $2;`;

    pool.query(authorizationCheckText, [req.body.parkVisitId, req.user.id]).then((authResult) => {
        const checkedParkVisitId = authResult.rows[0].id;
        console.log('increment attraction checkedParkVisitId', checkedParkVisitId);
    
        let queryText = `update visits_attractions
        set times_ridden = times_ridden + 1
        where park_visit_id = $1
        and attractions_id = $2
        returning park_visit_id;`;
            
        pool.query(queryText, [checkedParkVisitId, req.body.attraction]).then((result) => {
            console.log('successfully incremented attraction in park visit');
            res.send(result.rows[0])
                
        }).catch((error) => {   // catch for second query
            console.log('error in attractionsQuantity put', error);
            res.sendStatus(500);
        });
    }).catch((error) => {   // catch for first query
        console.log('error in attractionsQuantity put', error);
        res.sendStatus(500);
    });
});  // end put route

module.exports = router;
