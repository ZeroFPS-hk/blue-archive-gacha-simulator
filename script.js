const ONE_STAR_RATE = 0.785;
const TWO_STAR_RATE = 0.185;
const THREE_STAR_RATE = 0.03;
const FES_RATE_MODIFIER = 0.03;

const ONE_STAR_ELEPHS = 1;
const TWO_STAR_ELEPHS = 10;
const THREE_STAR_ELEPHS = 50;

const meanElephsTenPull = (ONE_STAR_ELEPHS * ONE_STAR_RATE + TWO_STAR_ELEPHS * TWO_STAR_RATE + THREE_STAR_ELEPHS * THREE_STAR_RATE) * 9
    + TWO_STAR_ELEPHS * (1 - THREE_STAR_RATE) + THREE_STAR_ELEPHS * THREE_STAR_RATE;
const meanElephsTenPullFes = (ONE_STAR_ELEPHS * (ONE_STAR_RATE - FES_RATE_MODIFIER) + TWO_STAR_ELEPHS * TWO_STAR_RATE + THREE_STAR_ELEPHS * (THREE_STAR_RATE + FES_RATE_MODIFIER)) * 9
+ TWO_STAR_ELEPHS * (1 - THREE_STAR_RATE - FES_RATE_MODIFIER) + THREE_STAR_ELEPHS * (THREE_STAR_RATE + FES_RATE_MODIFIER);

let simulationDataElephs = [];
let isFes = false;

const explanationOneStar = document.querySelector("#oneStar");
const explanationTwoStar = document.querySelector("#twoStar");
const explanationThreeStar = document.querySelector("#threeStar");
const explanationMisc = document.querySelector("#misc");
const gachaInput = document.querySelector("#gachaInput");
const fesToggleButton = document.querySelector("#fesToggle");
const simulationButton = document.querySelector("#simulate");
const message = document.querySelector("#message");

window.onload = ()=> loadExplanation();
fesToggleButton.addEventListener("click", toggleFes);
simulationButton.addEventListener("click", displayMessage);



function calculateStandardDeviation(numberOfPulls){
    generateDataSet(numberOfPulls);
    const meanElephs = isFes? meanElephsTenPullFes : meanElephsTenPull;
    const sumMeanDistanceSquared = simulationDataElephs.reduce((sum, current) => sum + (current - meanElephs)**2, 0);
    return Math.sqrt(sumMeanDistanceSquared / (numberOfPulls/10));
}

function generateDataSet(numberOfPulls){
    simulationDataElephs = [];
    const numberOfTenPulls = Math.floor(numberOfPulls / 10);
    for(let i=0; i<numberOfTenPulls; i++){
        simulationDataElephs.push(generateTenPullElephs());
    }
}

function generateTenPullElephs(){
    let sumElephs = 0;
    const fesModifier = isFes? FES_RATE_MODIFIER : 0;
    for(let i=1; i<10; i++){
        let gachaResult = Math.random();
        sumElephs += gachaResult <= THREE_STAR_RATE + fesModifier? THREE_STAR_ELEPHS:
            gachaResult <= THREE_STAR_RATE + fesModifier+ TWO_STAR_RATE? TWO_STAR_ELEPHS:
            ONE_STAR_ELEPHS;
    }

    sumElephs += Math.random() <= THREE_STAR_RATE + fesModifier? THREE_STAR_ELEPHS : TWO_STAR_ELEPHS;
    return sumElephs;
}

function toggleFes(){
    isFes = !isFes;
    fesToggleButton.textContent = isFes? "Fes on" : "Fes off";
}

function displayMessage(){
    const gachaStandadDeviation = calculateStandardDeviation(gachaInput.value);
    message.textContent = `Simulated ${gachaInput.value} rolls, standard deviation is ${gachaStandadDeviation}.`
}

function loadExplanation(){
    explanationOneStar.textContent = `For each Blue Archive gacha roll, one star rate is ${ONE_STAR_RATE} and it gives ${ONE_STAR_ELEPHS} eleph.`
    explanationTwoStar.textContent = `Two star rate is ${TWO_STAR_RATE} and it gives ${TWO_STAR_ELEPHS} elephs.`;
    explanationThreeStar.textContent = `Three star rate is ${THREE_STAR_RATE} and it gives ${THREE_STAR_ELEPHS} elephs. 
    During fes banners, the three star rate is ${THREE_STAR_RATE + FES_RATE_MODIFIER}. The fes difference is subtracted from one star rate.`
    explanationMisc.textContent = `When you do 10 rolls, the 10th roll must be two stars or higher rarity. Enter the number of rolls you would like to simulate (recommend it to be a multiple of 10, individual rolls are ignored).`
}