const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();




router.get('/', (req, res) => {
    
    console.log('favorites router request req.user.id', req.user.id);
    
    let queryText = `select * from favorites 
    where user_id = $1
    and favorite_status = true;`;
    
    pool.query(queryText, [req.user.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get favorites request');
        res.sendStatus(500);
    });
});

module.exports = router;