// All function call will be here
const IPLfunc = require('./ipl.js');
async function matches() {
    try {
        let matchesPlayed = await IPLfunc.numberOfMatchesPerYear();
        IPLfunc.writeToFile('matchesPlayedPeryear.json', matchesPlayed);
        let matchesWon = await IPLfunc.matchesWonPerYear();
        IPLfunc.writeToFile('matchesPerYear.json', matchesWon);
        let extraRuns = await IPLfunc.findExtraRuns();
        IPLfunc.writeToFile('extraRunsperTeam.json', extraRuns);
        let ecoBowler = await IPLfunc.findEconomyBowler();
        IPLfunc.writeToFile('economicBowler.json', ecoBowler);
        IPLfunc.closeConnection();
        } catch (error) {
        console.log(error);
    }
}
matches();