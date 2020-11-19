const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();




router.post('/', (req, res) => {
    console.log(' in date router post request req.body', req.body);
    
    let queryText = `insert into park_visits (user_id, date)
        values ( $1, $2) returning id;`

    pool.query(queryText, [req.user.id, req.body.date]).then((result) => {
        console.log('date added');
        // res.send(result.rows)
        console.log('result.rows', result.rows[0].id);
        res.send(result.rows);
        // res.sendStatus(201);
    }).catch((error) => {
        console.log('error in adding new date', error);
        res.sendStatus(500);        
    });
})

module.exports = router;