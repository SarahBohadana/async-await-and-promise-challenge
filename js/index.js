var Promise = require("bluebird");

// function getCountryPopulation(country){
//     return new Promise((resolve,reject)=> {
//         const url = `https://countriesnow.space/api/v0.1/countries/population`;
//         const options = {
//           method: 'POST', 
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({country})
//         };
//         fetch(url,options)
//             .then(res => res.json())
//             .then(json => {
//                 if (json?.data?.populationCounts) resolve(json.data.populationCounts.at(-1).value);
//                 else reject(new Error(`My Error: no data for ${country}`)) //app logic error message
//             })
//             .catch(err => reject(err)) // network error - server is down for example...
//             // .catch(reject)  // same same, only shorter... 
//     })
// }
async function getCountryPopulation(country){
    try{
        const url = `https://countriesnow.space/api/v0.1/countries/population`;
        const options = {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({country})
        };
        const res = await fetch(url,options)
        const json = await res.json()
            if (json?.data?.populationCounts) return json.data.populationCounts.at(-1).value;
            else throw new Error(`My Error: no data for ${country}`)
    }catch(err){
        console.error(err) 
    }
}

//--------------------------------------------------------
//  Manual - call one by one...
//--------------------------------------------------------
// function manual() {
//     getCountryPopulation("France")
//         .then( population => {
//             console.log(`population of France is ${population}`);
//             return getCountryPopulation("Germany")
//         })
//         .then( population => console.log(`population of Germany is ${population}`))
//         .catch(err=> console.log('Error in manual: ',err.message));
// }
// manual()

async function manual() {
    try{
        let population = await getCountryPopulation("France")
        console.log(`population of France is ${population}`);
        population = await getCountryPopulation("Germany")
        console.log(`population of Germany is ${population}`)
    }catch(err){
        console.log('Error in manual: ',err.message)
    }
}
// manual()

//------------------------------
//   Sequential processing 
//------------------------------
const countries = ["France","Russia","Germany","United Kingdom","Portugal","Spain","Netherlands","Sweden","Greece","Czechia","Romania","Israel"];

// function sequence() {
//     Promise.each(countries, (country) => {
//         return getCountryPopulation(country)
//         .then(population => console.log(`population of ${country} is ${population}`))
//         .catch(err=> console.log('Error in sequence: ',err.message));
//     })
//     .then(log => console.log(`DONE`))
//     .catch(err => console.error(`${err.message}`))

// }
// sequence();

async function sequence() {
    try{
        for (let country of countries){
            let population = await getCountryPopulation(country)
                console.log(`population of ${country} is ${population}`)
        }
        console.log("DONE");
    }catch(err){
        console.error(`error in sequence: ${err.message}`);
    }
}
// sequence();

//--------------------------------------------------------
//  Parallel processing 
//--------------------------------------------------------
// function parallel() {
//   Promise.map(countries, (country) => {
//     return getCountryPopulation(country)
//     .catch(err => console.error(`error in parallel: ${err.message}`));
//   })
//   .then(populations =>{
//     console.log(`loading data`);
//     populations.forEach((population,i) => console.log(`the population of ${countries[i]} is ${population}`));
//   })
//   .catch(err => console.error(`error in population`))
// }
// // parallel();

async function parallel() {
    try{
        let arr = []
        console.log(`loading data`);
        for (let country of countries){
            let population = await getCountryPopulation(country)
            arr.push(`population for ${country} is ${population}`)
        }
        console.log(arr);

    }catch(err){
        console.error(`error in parallel: ${err.message}`)
    }
}
  
  parallel();