/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

const axios = require('axios');

module.exports = async function countMajorVersionsAbove10() {
  const url = 'http://ambush-api.inyourarea.co.uk/ambush/intercept';
  const body = {
    url: 'https://api.npms.io/v2/search/suggestions?q=react',
    method: 'GET',
    return_payload: true,
  };

  let count = 0;

  try {
    const res = await axios.post(`${url}`, JSON.stringify(body), {
      headers: {
        'content-type': 'application/json',
      },
    });

    res.data.content.forEach(function (entry) {
      if (parseInt(entry.package.version) >= 10) count++;
    });

    return count;
  } catch (error) {
    console.log(error); // catches both errors
  }
};
