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

router.put('/:attractionId', (req, res) => {
    console.log('favorite toggle request attraction id', req.params.attractionId);
    
    let queryText = `update favorites 
    set favorite_status = not favorite_status
    where user_id = $1
    and attraction_id = $2;`

    pool.query(queryText, [req.user.id, req.params.attractionId]).then((result) => {
        res.sendStatus(200);
        console.log('favorite status toggled');        
    }).catch((error) => {
        console.log('error in favorite toggle', error);
        res.sendStatus(500);
    });
})

module.exports = router;