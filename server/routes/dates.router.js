const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



// this post route adds a new date to the database with user id, 
// and park id for park visited into park_visits table
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(' in date router post request req.body', req.body);
    
    let queryText = `insert into park_visits (user_id, date, park_id)
    values ( $1, $2, $3) returning id;`

    pool.query(queryText, [req.user.id, req.body.date, req.body.park]).then((result) => {
        console.log('date added');
        console.log('result.rows', result.rows[0].id);
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in adding new date', error);
        res.sendStatus(500);        
    });
}); // end post route

module.exports = router;