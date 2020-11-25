const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get route for getting notes already stored
router.get('/:parkVisitId', rejectUnauthenticated, (req, res) => {
    console.log('get notes route with parkVisitId', req.params.parkVisitId);
    
    let queryText = `select notes from park_visits
    where id = $1
    and user_id = $2;`;

    pool.query(queryText, [req.params.parkVisitId, req.user.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get notes route', error);
        res.sendStatus(500);
    });
});

// pot route for posting new note(s) to park visit
router.post('/:parkVisitId', rejectUnauthenticated, (req, res) => {
    console.log('req.body', req.body.notes);
    
    let queryText = `update park_visits
    set notes = $1
    where id = $2
    and user_id = $3;`;

    pool.query(queryText, [req.body.notes, req.params.parkVisitId, req.user.id]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in updating notes', error);
        res.sendStatus(500);
    });
});

module.exports = router;
