

var generaciones = 0;
var generacionesParo = 20;
var GenerationRecord = [];
var Poblacion = [];
var Hijos = [];


//////////////////////Funcion Objetivo/////////////////////////
fobjetivo = function (x) {
    return (-1*(Math.pow(x, 4) + Math.pow(5 * x, 3) + Math.pow(x, 2) - (4 * x) + 1))+6;
}

/////////////////////Genetic Utilities/////////////////////////
genDecoder = function (genes) {
    /*ParseInt ya tiene el parametro de base sobrecargado*/
    var decodedGenome = parseInt(genes, 2);
    return decodedGenome;
}
decodedGentoArrRes = function (_decodedGenome) {
    switch (_decodedGenome) {
        case 0:
            return -4.0;
        case 1:
            return -3.8;
        case 2:
            return -3.6;
        case 3:
            return -3.4;
        case 4:
            return -3.2;
        case 5:
            return -3.0;
        case 6:
            return -2.8;
        case 7:
            return -2.6;
        case 8:
            return -2.4;
        case 9:
            return -2.2;
        case 10:
            return -2.0;
        case 11:
            return -1.8;
        case 12:
            return -1.6;
        case 13:
            return -1.4;
        case 14:
            return -1.2;
        case 15:
            return -1.0;
    }
}
genEncoder = function (dec) {
    var binario = (dec >>> 0).toString(2);
    var ceros = 4 - binario.length;
    var r = '';
    for (j = ceros; j !== 0; j--) {
        r += '0';
    }
    r += binario;
    return r;
}

function getRandomInt(min, max) {
    var array = new Uint8Array(1);
    window.crypto.getRandomValues(array);
    // console.log('Crypt rand = ' + array[0]);
    rand = Math.random() * (max - min + 1) + min;
    // console.log('basic rand = ' + Math.abs(Math.floor(rand)));
    return Math.abs(rand);
}

//////////////////////Clase individuo//////////////////////////
Individuo = function (_gens) {
    this.genes = _gens;
    this.dec_gen = genDecoder(this.genes);
    this.valEsquema = decodedGentoArrRes(this.dec_gen);
    this.getFitness = fobjetivo(decodedGentoArrRes(this.dec_gen));
    this.prob = 1.0;
}

ReproduceInd = function (Padre1, Padre2) {
    var random_boolean;
    var h1genes = "";
    var h2genes = "";

    for (var i = 0; i < 4; i++) {
        random_boolean = Math.random() >= 0.5;
        if (random_boolean === true) {
            h1genes += Padre1.genes[i];
            h2genes += Padre2.genes[i];
        } else {
            h1genes += Padre2.genes[i];
            h2genes += Padre1.genes[i];
        }
    }
    hijos = {h1: new Individuo(h1genes), h2: new Individuo(h2genes)};
    return hijos;
}
///////////////////////////////////////////////////////////////

var fitnessTotal = 0;
var PoblacionInicial = [];

/*Genera poblacion inicial aleatoriamente*/
for (i = 0; i < 20; i++) {
    randomInd = parseInt(getRandomInt(0, 14));
    genAleat = genEncoder(randomInd);
    PoblacionInicial.push(new Individuo(genAleat));
}



/**Rutina principal*/
 Poblacion = PoblacionInicial;
while (generaciones++ <= generacionesParo) {

    fitnessTotal = 0;
    for (var i in Poblacion) {
        fitnessTotal += Poblacion[i].getFitness;
    }
    for (var j in Poblacion) {
        Poblacion[j].prob = parseFloat(Poblacion[j].getFitness/fitnessTotal)*100.0;

    }
    var roulette = [];
    for (var k in Poblacion) {
        for(var l = 0 ; l < parseInt(Poblacion[k].prob);l++){
            roulette.push( { id: k , genData : Poblacion[k].genes } );
        }

    }

    Hijos = [];

    while (Hijos.length < Poblacion.length) {
        var p1Id = parseInt(getRandomInt(0, roulette.length-1));
        var p2Id = parseInt(getRandomInt(0, roulette.length-1));

        while (roulette[p1Id].id === roulette[p2Id].id) {
            p2Id = parseInt(getRandomInt(0, roulette.length-1));
        }

        var p1 = new Individuo(roulette[p1Id].genData);
        var p2 = new Individuo(roulette[p2Id].genData);

        var parHijos = ReproduceInd(p1, p2);

        Hijos.push( new Individuo(parHijos.h1.genes) );
        Hijos.push( new Individuo(parHijos.h2.genes) );
    }

    var chartResume =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for (var m in Poblacion){
        var o = Poblacion[m].dec_gen;
        chartResume[o]++;
    }

    GenerationRecord[generaciones-1] = {gen: generaciones, data: {pob : Poblacion.slice(),roul : roulette, resume : chartResume} };
    Poblacion = Hijos;
}


