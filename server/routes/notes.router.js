const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get route for getting notes already stored
router.get('/:parkVisitId', (req, res) => {
    console.log('get notes route with parkVisitId', req.params.parkVisitId);
    
    let queryText = `select notes from park_visits
    where id = $1;`;

    pool.query(queryText, [req.params.parkVisitId]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get notes route', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/:parkVisitId', (req, res) => {
    console.log('req.body', req.body.notes);
    
    let queryText = `update park_visits
    set notes = $1
    where id=$2;`;

    pool.query(queryText, [req.body.notes, req.params.parkVisitId]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in updating notes', error);
        res.sendStatus(500);
    });
});

module.exports = router;
