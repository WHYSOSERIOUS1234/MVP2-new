
let cardLink;
let newDiv;
// let url = 'http://localhost:3000/watchlist'
let url = 'https://statistics-kn6b.onrender.com/watchlist'
function firtFetch() {
fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }
},).then(results=> results.json()).then((data) => { 
   console.log(data)
    for(let i = 0; i < data.length; i++) {
        player = data[i]
       
         newDiv = document.createElement('div')
        newDiv.classList.add('Parent')
        let playerP = document.createElement('p')
        let touchP = document.createElement('p')
        let rushP = document.createElement('p')
        let int = document.createElement('p')
        let tfl = document.createElement('p')
        playerP.textContent = `${player.player_name} ${player.team_name} ${player.player_position}`
        playerP.classList.add('playerName')
        touchP.classList.add('touchdown')
        touchP.textContent = `Touchdowns: ${player.touchdowns}`
        rushP.textContent = `Rushing Yards ${player.rushing_yards}`
        int.textContent = `Interceptions: ${player.interceptions}`
        tfl.textContent = `Tackle For Loss: ${player.tfl}`
        newDiv.append(playerP,touchP,rushP,int,tfl)
        document.body.append(newDiv)
    }
} )

}
firtFetch()

let input = document.getElementsByClassName('searchBar')[0]
let button = document.getElementById('search')

//home button
let homebutton = document.createElement('button')
homebutton.textContent = "home"
homebutton.classList.add('homeButton')
let searchContainer = document.getElementById('searchContainer')
searchContainer.append(homebutton)
homebutton.addEventListener('click',firtFetch)

//


button.addEventListener('click',fetchCall)


//Search By name
function fetchCall() {
    let value = input.value
    console.log(value)
    let valueArr = value.split(' ')
   
    valueArr[1] = '%20' + valueArr[1]
    
  
   
    let inputString = valueArr[0] + valueArr[1];
     fetch(url+'/'+inputString, {
        mehod: 'GET',
        mode: 'cors',
         headers: {
            'Content-type': 'application/json'
         },
    }).then(response=>
        response.json()
    ).then(data => {
        
     let div = document.getElementsByClassName('Parent')
    for (let i = 0; i < div.length; i++) {
        div[i].textContent=''
    }
     
            for(let i = 0; i < data.length; i++) {
           let player = data[i]
            let newDiv2 = document.createElement('div')
            let playerP = document.createElement('p')
            let touchP = document.createElement('p')
            let rushP = document.createElement('p')
            let int = document.createElement('p')
            let tfl = document.createElement('p')
          
            
            playerP.textContent = `${player.player_name} ${player.team_name} ${player.player_position}`
            playerP.classList.add('playerName')
            touchP.classList.add('touchdown')
            touchP.textContent = `Touchdowns: ${player.touchdowns}`
            rushP.textContent = `Rushing Yards ${player.rushing_yards}`
            int.textContent = `Interceptions: ${player.interceptions}`
            tfl.textContent = `Tackle For Loss: ${player.tfl}`
            newDiv2.append(playerP,touchP,rushP,int,tfl)
            document.body.append(newDiv2) }
            
            
           
        }
    )
    

}





//Create a player
let playerName = document.getElementById('playerName')
let team = document.getElementById('teamName')
let position = document.getElementById('playerPosition')
let touchdowns = document.getElementById('touchdowns')
let interceptions = document.getElementById('interceptions')
let passing_yards = document.getElementById('passingYards')
let rushing_yards = document.getElementById('rushingYards')
let tfl = document.getElementById('tfl')
let createButton = document.getElementsByClassName('inputPlayer')[0]
createButton.addEventListener('click', createPlayer)


function createPlayer() {
 
    let player = {
              "player_name": playerName.value,
              "team_name":  team.value,
              "player_position": position.value,
              "touchdowns": touchdowns.value,
              "interceptions": interceptions.value,
              "passing_yards": passing_yards.value,
              "rushing_yards": rushing_yards.value,
              "TFL": tfl.value
            }
            console.log(player)
const response = fetch(url, {
    method:'POST',
    mode: 'cors',
    headers: {
       'Content-Type': 'application/json'
       },
       body: JSON.stringify(player)
    })
    
    
}



//DELETE A Player
let deleteButton = document.getElementById('deletePlayers')
deleteButton.addEventListener('click', deletePlayer)
let deletePlayerInp = document.getElementById('deletePlayer')
function deletePlayer() {
    let inputString;
let deletePlayerInp = document.getElementById('deletePlayer')
console.log(deletePlayerInp.value)
let deletePlayer = deletePlayerInp.value
    let urlArr = deletePlayer.split(' ')
    console.log(urlArr)
    if(urlArr.length === 1){
        inputString = urlArr[0]
    } else {
   urlArr[1] = '%20'+urlArr[1]
   inputString = urlArr[0] + urlArr[1]}
fetch( url+ '/' + inputString, {
    method: 'DELETE',
    mode: 'cors',
     headers: {
        'Content-type': 'application/json'
     }
    })
}






