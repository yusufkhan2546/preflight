
const key = require('../../nodemon.json');
const https = require('https');

module.exports =(req,res,next) =>{
    const longitude = req.params.longitude;
    const latitude = req.params.latitude;
    try{
        https.get(`https://apis.mapmyindia.com/advancedmaps/v1/${key.env.MAP_MY_INDIA_API_KEY}/distance_matrix/driving/${key.env.longitude},${key.env.latitude};${longitude},${latitude}`, (resp) => {
            let data = '';
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
             result = JSON.parse(data).results;
             distancearray= result.distances[0];
            durationarray = result.durations[0];
             isServiceable = parseInt(distancearray[1]) <= 2001 && parseInt(durationarray[1]) <= 601; 
            if(isServiceable){
                next();
            } else {
                res.status(200).json([]);
            }
            });
          }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.status(400).json(err);
          });
    }
    catch(error){
        res.status(500).json(error);
    }
}