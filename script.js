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