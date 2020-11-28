// parks visit router file for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains routes for getting details about a park visit, getting all saved visits,
// deleting a visit and 'completing' a visit

const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for getting one park that the visit is at
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('get route for park visit req.params.id', req.params.id);
    
    let queryText = `select park_visits.id, park_id, name, date, city, state, visit_complete from park_visits
    join parks on parks.id = park_visits.park_id
    where park_visits.id = $1
    and user_id = $2`;

    pool.query(queryText, [req.params.id, req.user.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get park visit request', error);
        res.sendStatus(500);
    });
}); // end get route

// GET route to get all visits for current user
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in the route to get all previous visits for the current user', req.user.id);
    
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
}); // end get route

// delete route to delete a visit and the attractions that were logged for
// that visit for the logged in user
router.delete('/:visitId', rejectUnauthenticated, (req, res) => {
    console.log('in delete route for park visit', req.params.visitId);

    // this is the first query that will delete the entries in the 
    // visits_attractions table first, because they rely on the
    // park_visits, so they must be deleted first
    let queryText = `delete from visits_attractions
    where park_visit_id in (
    select id from park_visits
    where park_visits.id = $1
    and user_id = $2);`;

    pool.query(queryText, [req.params.visitId, req.user.id]).then((result) => {
        // next, the entries will be deleted from the park_visits table
        // after the visits_attractions delete is done

        console.log('parkVisitId', req.params.visitId);
        
        // this query will delete the park visit entry
        let secondQueryText = `delete from park_visits
        where id = $1
        and user_id = $2
        returning user_id;`;

        pool.query(secondQueryText, [req.params.visitId, req.user.id]).then((secondResult) => {
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
})  // end entire delete route

// route for user to declare visit complete to not allow any more
// editing
router.put('/:parkVisitId', rejectUnauthenticated, (req, res) => {
    console.log('in route for completing visit', req.params.parkVisitId);
    
    let queryText = `update park_visits
    set visit_complete = true
    where id = $1
    and user_id = $2;`;

    pool.query(queryText, [req.params.parkVisitId, req.user.id]).then((result) => {
        console.log('success completing visit');
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in complete visit route', error);
        res.sendStatus(500);
    });
}); // end put route

module.exports = router;