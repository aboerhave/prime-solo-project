const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET route for getting all of the parks in the database
router.get('/', (req, res) => {

    if (req.isAuthenticated() === false) { // unauthenticated
        console.log('forbidden/unauthenticated for getting parks');
        res.sendStatus(403);
    }
    else {  // authenticated
        let queryText = `select * from parks
        order by name;`;

        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in get parks request', error);
            res.sendStatus(500);
        });
    }   // end authentication
}); // end get route

// GET route for getting one park after chosen
router.get('/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    
    if (req.isAuthenticated() === false) { // unauthenticated
        console.log('forbidden/unauthenticated for getting park chosen');
        res.sendStatus(403);
    }
    else {  // authenticated
        let queryText = `select * from parks
        where id = ${req.params.id};`;

        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in get single park request', error);
            res.sendStatus(500);
        })
    }   // end authentication
}); // end get route

module.exports = router;
