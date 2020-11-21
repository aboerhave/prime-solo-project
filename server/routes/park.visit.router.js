const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



// GET route for getting one park that the visit is at
router.get('/:id', (req, res) => {
    console.log('get route for park visit req.params.id', req.params.id);
    
    if (req.isAuthenticated() === false) { // unauthenticated
        console.log('forbidden/unauthenticated for getting park visit');
        res.sendStatus(403);
    }
    else {  // authenticated
        let queryText = `select park_visits.id, park_id, name, date, city, state from park_visits
        join parks on parks.id = park_visits.park_id
        where park_visits.id = $1`;

        pool.query(queryText, [req.params.id]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in get park visit request', error);
            res.sendStatus(500);
        });
    }   // end authentication
}); // end get route

// GET route to get all visits for current user
router.get('/', (req, res) => {
    console.log('in the route to get all previous visits for the current user', req.user.id);
    
    if (req.isAuthenticated() === false) { // unauthenticated
        console.log('forbidden/unauthenticated for getting all visits for user');
        res.sendStatus(403);
    }
    else {  // authenticated
        let queryText = `select park_visits.id, park_id, name, date, city, state, visit_complete from park_visits
        join parks 
        on parks.id = park_visits.park_id
        where user_id = $1
        order by date desc;`;

        pool.query(queryText, [req.user.id]).then((result) => {
            res.send(result.rows)     
        }).catch((error) => {
            console.log('error in get all visits for user request', error);
            res.sendStatus(500);
        });
    }   // end authentication
}); // end get route

// delete route to delete a visit and the attractions that were logged for
// that visit for the logged in user
router.delete('/:visitId', (req, res) => {
    console.log('in delete route for park visit', req.params.visitId);

    if (req.isAuthenticated() === false) { // unauthenticated
        console.log('forbidden/unauthenticated for deleting visit');
        res.sendStatus(403);
    }
    else {  // authenticated
        // this is the first query that will delete the entries in the 
        // visits_attractions table first, because they rely on the
        // park_visits, so they must be deleted first
        let queryText = `delete from visits_attractions
        where park_visit_id = $1`;

        pool.query(queryText, [req.params.visitId]).then((result) => {
            // next, the entries will be deleted from the park_visits table
            // after the visits_attractions delete is done

            console.log('parkVisitId', req.params.visitId);
        
            let secondQueryText = `delete from park_visits
            where id = $1
            returning user_id;`;

            pool.query(secondQueryText, [req.params.visitId]).then((secondResult) => {
                // seccess for entire delete route
                res.send(secondResult.rows);
            }).catch((error) => {
                console.log('error deleting park_vists');
                res.sendStatus(500);
            }); // end second query catch

        }).catch((error) => {   // catch for first query
            console.log('error deleting park visit attractions', error);
            res.sendStatus(500);
        }); // end first query catch
    }   // end authentication
})  // end entire delete route

// route for user to declare visit complete to not allow any more
// editing
router.put('/:parkVisitId', (req, res) => {
    console.log('in route for completing visit', req.params.parkVisitId);
    
    if (req.isAuthenticated() === false) { // unauthenticated
        console.log('forbidden/unauthenticated for getting on favorites');
        res.sendStatus(403);
    }
    else {  // authenticated
        let queryText = `update park_visits
        set visit_complete = true
        where id = $1;`;

        pool.query(queryText, [req.params.parkVisitId]).then((result) => {
            console.log('success completing visit');
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error in complete visit route', error);
            res.sendStatus(500);
        });
    }   // end authentication
}); // end put route

module.exports = router;