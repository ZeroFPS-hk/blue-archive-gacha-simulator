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

let simulationData = [];
let isFes = false;

function calculateStandardDeviation(numberOfPulls){

}

function generateDataSet(numberOfPulls){

}

function generateTenPulls(){

}