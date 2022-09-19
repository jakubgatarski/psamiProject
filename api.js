//node api.js ---------------------------------------------------------------------------------
const client = require('./connection.js')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(4000, ()=>{
    console.log("Sever is now listening at port 4000");
})

client.connect();




// users requests --------------------------------------------------------------------------------------------------
app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id, first_name, last_name) 
                       values(${user.id}, '${user.first_name}', '${user.last_name}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/users/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set first_name = '${user.first_name}',
                       last_name = '${user.last_name}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/users/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

// events requests --------------------------------------------------------------------------------------------------
app.get('/events', (req, res)=>{
    client.query(`Select * from events`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/events/:id', (req, res)=>{
    client.query(`Select * from events where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows );
        }
    });
    client.end;
})

app.post('/events', (req, res)=> {
    const event = req.body;
    let insertQuery = `insert into events(id, creator_id, second_user_id, place, date, climbing_level, training_length, is_active) 
                       values(${event.id}, '${event.creator_id}', '${event.second_user_id}', '${event.place}', '${event.date}'
                       , '${event.climbing_level}', '${event.training_length}', '${event.is_active}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/events/:id', (req, res)=> {
    let event = req.body;
    let updateQuery = `update events
                       set is_active = '${event.is_active}'
                       
                       where id = ${event.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/events/:id', (req, res)=> {
    let insertQuery = `delete from events where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})