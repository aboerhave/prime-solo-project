const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET route for getting all of the attractions in the database
// at the chosen park
router.get('/:parkId', (req, res) => {
    console.log('hello1');
    
    console.log('parkId', req.params.parkId);
    

    let queryText = `select * from attractions
    where attractions.park_id = ${req.params.parkId}
    order by name;`;

    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get attractions request', error);
        res.sendStatus(500);
    });
});



module.exports = router;
