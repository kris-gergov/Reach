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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */
const axios = require('axios');

function compare(a, b) {
  a.packageNames.sort();
  if (a.username < b.username) {
    return -1;
  }
  if (a.username > b.username) {
    return 1;
  }

  return 0;
}

module.exports = async function organiseMaintainers() {
  const url = 'http://ambush-api.inyourarea.co.uk/ambush/intercept';
  const body = {
    url: 'https://api.npms.io/v2/search/suggestions?q=react',
    method: 'GET',
    return_payload: true,
  };

  let arr = [];

  try {
    const res = await axios.post(`${url}`, JSON.stringify(body), {
      headers: {
        'content-type': 'application/json',
      },
    });

    // Ugly I know
    res.data.content.forEach(function (entry) {
      for (let maintainer of entry.package.maintainers) {
        let found = false;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].username === maintainer.username) {
            found = true;
            arr[i].packageNames.push(entry.package.name);
            break;
          }
        }
        if (found === false) {
          arr.push({
            username: maintainer.username,
            packageNames: [entry.package.name],
          });
        }
      }
    });
  } catch (error) {
    console.log(error); // catches both errors
  }

  let maintainers = arr.sort(compare);
  return maintainers;
};
