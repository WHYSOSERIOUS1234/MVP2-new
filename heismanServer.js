const express = require('express')
const config = require('./config')[process.env.NODE_ENV || 'dev'] 
const app = express()
const {Client} = require('pg')
const cors = require('cors')

const connectionString = config.connectionString
const client = new Client({
    connectionString:connectionString
});
const PORT = config.port
app.use(cors())
app.use(express.json())
client.connect()
app.use(express.static('frontend-server/public'))

app.get('/watchlist', (req,res) => {
  client.query('SELECT * FROM watchList;')
  .then(results => res.status(200).send(results.rows))  
})

app.get('/watchlist/:player_name', (req, res) => {
   const player = req.params.player_name
   console.log(player)
    client.query('SELECT * FROM watchList WHERE player_name=$1', [player])
    .then(results => res.status(200).send(results.rows))
})

app.post('/watchlist', (req, res) => {
    const {player_name,team_name,player_position,touchdowns,interceptions,passing_yards,rushing_yards,TFL} = req.body
    client.query(`INSERT INTO watchList (player_name, team_name, player_position, touchdowns, interceptions, passing_yards, rushing_yards, TFL) VALUES ('${player_name}', '${team_name}', '${player_position}', '${touchdowns}', '${interceptions}', '${passing_yards}', '${rushing_yards}', '${TFL}')`)
    res.status(200).send('We will check to see if your player deserves a shot!')
})

app.delete('/watchlist/:player_name', (req,res) => {
const player_name = req.params.player_name
console.log(player_name)
client.query('DELETE FROM watchList WHERE player_name=$1', [player_name])
res.send('Deleted your garbage player')
})

app.patch('/watchlist/:id', (req, res) => {
    const query = 'UPDATE watchList SET player_name = ?, team_name = ?,  player_position = ?,  touchdowns = ?, interceptions = ?,  passing_yards = ?, rushing_yards = ?, TFL = ? WHERE player_id = ?';
    const params = [req.body.player_name, req.body.team_name, req.body.player_position, req.body.touchdowns, req.params.interceptions, req.params.passing_yards, req.params.rushing_yards, req.params.tfl, req.params.id ];
    client.query(query, params, (error, result) => {
      res.send({
        ok: true,
      });
    });
  });

app.listen(PORT, () => {
    console.log(`It works ${PORT}`)
})
