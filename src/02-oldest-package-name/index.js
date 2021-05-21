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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */
const axios = require('axios');

module.exports = async function oldestPackageName() {
  const url = 'http://ambush-api.inyourarea.co.uk/ambush/intercept';
  const body = {
    url: 'https://api.npms.io/v2/search/suggestions?q=react',
    method: 'GET',
    return_payload: true,
  };

  try {
    const res = await axios.post(`${url}`, JSON.stringify(body), {
      headers: {
        'content-type': 'application/json',
      },
    });

    const oldest = res.data.content.reduce((c, n) =>
      Date.parse(n.package.date) < Date.parse(c.package.date) ? n : c,
    );

    return oldest.package.name;
  } catch (error) {
    console.log(error); // catches both errors
  }
};
