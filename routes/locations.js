const express = require('express');
const router = express.Router();

const opencage = require('opencage-api-client');

router.post('/', async (req, res) => {
    const { loc } = req.body;
    // console.log(loc);
    // note that the library takes care of URI encoding
    opencage
        .geocode({ q: loc })
        .then((data) => {
            // console.log(JSON.stringify(data));
            if (data.status.code === 200 && data.results.length > 0) {
                const place = data.results[0];
                res.status(200).send(place.geometry);
            } else {
                console.log('Status', data.status.message);
                console.log('total_results', data.total_results);
            }
        })
        .catch((error) => {
            // console.log(JSON.stringify(error));
            console.log('Error', error.message);
            // other possible response codes:
            // https://opencagedata.com/api#codes
            if (error.status.code === 402) {
                console.log('hit free trial daily limit');
                console.log('become a customer: https://opencagedata.com/pricing');
            }
        });
});

module.exports = router;


