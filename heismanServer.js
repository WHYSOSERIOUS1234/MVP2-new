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
app.use(express.static('public'))

app.get('/watchlist', (req,res) => {
  client.query('SELECT * FROM watchList;')
  .then(results => res.status(200).send(results.rows))  
})

app.get('/watchlist/:player_name', (req, res) => {
   const id= req.params.player_name
  
    client.query("SELECT * FROM watchList WHERE player_name=$1", [id])
    .then(results => res.status(200).send(results.rows))
})

app.post('/watchlist', (req, res) => {
    const {player_name,team_name,player_position,touchdowns,interceptions,passing_yards,rushing_yards,TFL} = req.body
    client.query(`INSERT INTO watchList (player_name, team_name, player_position, touchdowns, interceptions, passing_yards, rushing_yards, TFL) VALUES ('${player_name}', '${team_name}', '${player_position}', '${touchdowns}', '${interceptions}', '${passing_yards}', '${rushing_yards}', '${TFL}')`)
    res.status(200).send('We will check to see if your player deserves a shot!')
})

app.delete('/watchlist/:player_name', (req, res) => {
  const id = req.params.player_name
  console.log(id)
  client.query('DELETE FROM watchList WHERE player_name=$1', [id])
  res.send('Deleted')
})

app.patch('/watchlist/:player_name', (req, res) => {
  const {player_name,team_name,player_position,touchdowns,interceptions,passing_yards,rushing_yards,TFL } = req.body
  let player =  req.params.player_name
  player_name ? client.query(`UPDATE watchList SET player_name='${player_name}' WHERE player_name='${player}'`) : ''
  player_position ? client.query(`UPDATE watchList player_position='${player_position}' WHERE player_name='${player}'`) : ''
  touchdowns ? client.query(`UPDATE watchList SET touchdowns='${touchdowns}' WHERE player_name='${player}'`) : ''
  interceptions ? client.query(`UPDATE watchList interceptions='${interceptions}' WHERE player_name='${player}'`) : ''
  passing_yards ? client.query(`UPDATE watchList SET passing_yards='${passing_yards}' WHERE player_name='${player}'`) : ''
  rushing_yards? client.query(`UPDATE watchList SET rushing_yards='${rushing_yards}' WHERE player_name='${player}'`) : ''
  TFL? client.query(`UPDATE watchList SET tfl='${TFL}' WHERE player_name='${player}'`) : ''
  team_name? client.query(`UPDATE watchList SET team_name='${team_name}' WHERE player_name='${player}'`) : ''
  res.send('Updated your team')

})

app.listen(PORT, () => {
    console.log(`It works ${PORT}`)
})
