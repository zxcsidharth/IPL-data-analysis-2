const fs = require('fs');
const {Pool, Client} = require('pg');
const filePath = '../output/'
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ipl_data',
    password: 'postgres',
    port: 5432,
});
client.connect();

function numberOfMatchesPerYear() {
return client.query('SELECT season, count(season) from matches group by season order by season')
  .then( res => {
      const matchesPlayed = res.rows.reduce((emptyObj, currObj) => {
        emptyObj[currObj.season] = parseInt(currObj.count);
        return emptyObj;
      }, {})
      return matchesPlayed;
  })
  .catch(err => {
    console.log(err);
  });
}

function matchesWonPerYear() {
    return client.query('select winner, season, count(season) from matches group by season, winner')
    .then( res => {

        const matchesWon = res.rows.reduce((emptyObj, currObj) => {
            if(emptyObj[currObj.winner]) {
                emptyObj[currObj.winner][currObj.season] = parseInt([currObj.count]);
            } else if(currObj.winner !== null) {
                emptyObj[currObj.winner] = {};
                for(let i = 2008; i < 2018; i++) {
                    emptyObj[currObj.winner][i] = 0;
                }
                emptyObj[currObj.winner][currObj.season] = parseInt([currObj.count]);
            }
            return emptyObj;
        }, {})
        return matchesWon;
    })
    .catch( err => { console.log(err)});
}

function findExtraRuns() {
    return client.query(`select bowling_team, sum(extra_runs) from deliveries where match_id in 
    (select id from matches where season = 2016) group by bowling_team`)
    .then( res => {
        const extraruns = res.rows.reduce((emptyObj, currObj) => {
            if(!emptyObj[currObj.bowling_team]) {
                emptyObj[currObj.bowling_team] = parseInt([currObj.sum]);
            }
            return emptyObj;
        }, {})
        return extraruns;
    })
    .catch( err => { console.log(err)});
}
function findEconomyBowler() {
    return client.query(`select bowler_name, sum(batsman_runs + wide_runs + noball_runs + penalty_runs), count(ball - (wide_runs + noball_runs)) 
    from deliveries where match_id in (select id from matches where season = 2015) group by bowler_name`)
    .then( res => {
        const ecoBowlerObject = res.rows.reduce((ecoBowlerArray, currObj) => {
            let emptyObj = {};
            if(!emptyObj[currObj.bowler_name]) {
                emptyObj[currObj.bowler_name] = parseFloat((currObj.sum / (currObj.count/6)).toFixed(2));
                ecoBowlerArray.push(emptyObj);
            }
            return ecoBowlerArray;
        }, [])
        return sortEconomyBowler(ecoBowlerObject);
    })
    .catch( err => { console.log(err)});
}
function sortEconomyBowler(ecoBowlerArray) {
    ecoBowlerArray.sort((a, b) => Object.values(a) - Object.values(b));
    ecoBowlerArray.splice(10, (ecoBowlerArray.length -10))
    return ecoBowlerArray;
}
const writeToFile = function(filePath, jsonObject) {
    let data = JSON.stringify(jsonObject);
    fs.writeFile("../output/" + filePath, data, 'utf-8', function(err){
        if (err) {
            console.log("error");
        } else {
            console.log("success");
        }
    });
}
const closeConnection = () => client.end();

module.exports = {
    numberOfMatchesPerYear,
    matchesWonPerYear,
    findExtraRuns,
    findEconomyBowler,
    closeConnection,
    writeToFile
};