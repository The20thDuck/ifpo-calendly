
let session = "VHZrWlFDV0ErZ09veC9EdmNuMHlBSFFiaUN4MnB3U0ZXVjg1STR3V215eU9OK09IWVZQQ2tHbmhZOHJVNkV3UDNjeTJnQm1MKzY1U0tzYmlQVUVFa1krQ1ZhY0xxUTQ0Y0hlMXd2a1BvYURnNkZ1VUFaWlRhT3JTUEFEcjZPTEhDSEU3RXp4OUFFdTc4NTVOb2ZEalVRVzdCcnY2UGo5aVFjZzdQbXZ1T3FyU0p6N3lhUU90M1NlOVpCc2ZrU1VZS1JKWFczcWVYQlpnUjBYV2Uxc3pYL3IzVlpKalF0SWk5cThzUUZrcHlQUmMvMjE4T21hM1ZGZWlpUUJWTmRRVUY3Z01YeDRYTVp6QWlUYUhxaSt3K05Qb2NKcERTNUlkbkhEc1FNa01oZ2JEN2lTSVhBT0w1d3FJaDhrOE9sSUlMS2d1SFJvMnhSSkY0ajV5UXZ6M083RDZTSHhwVFVuZ1dxeUZQcmx5dVMrRVl1a3VWODZYZms4WTJuRHZYbVRtNVU2ZERxdVQ5eFl6aDdpeFhuVnhEdmpMbUMwTWt2ajJFTENPSUsybTRTM1gxcCtGWWdMUFpJUjkySmExK0FHczZGNG91MWxUWS9MVUcyQnJhL0M5QVcvZG9MS1NlZXg5ZHdTWDk0WDBya2NTQ2lkMk9QVVRtMEtpVVRYejFwb3VXNHg3WllRU01XcGM4aDZLZXJWc0I1TWpVWkZtc2Zna0RhdERBUWdhaGNZN2tTYUprZVV3L3FzU2tzV2w0WGkvemJ5eHhySnBVRHEyd2xxeHc0di9BdUVkUDhXWmpJMTFBYnVXQmcvYjV1VkRtM1FpS013WjRXUGJaRDhab0pPeWFOZVBGSG84dFRRbEt5Nzd1dk5YQmMzamJ3aXBrdHJFYnpwVG9GRTY3ZG0zQU1aUkFJKzhVR2ZXV1hPTGJQMnh6YVY3bENRMG03OG1kTGp4eUtiRmE0S0piN3ZncGtrRDdmb1RlUlBPcXNnPS0tT2RJQVhpQUJDOFVsY1EySFlUNktHZz09--aeb54b63a2e248725b7f3dd06096fd1aea12e3eb";
let csrf = "8x4nRXNg2R3p2J/er0AJcqhNfpmCgB9onXmUSNkn7+EPFyq3sUr/aMmqOumkv+cuGdPQO7P2NRe1NsSYymejSA==";

const fetch = require('node-fetch');
body = {event_type_id: 36203197};

fetch("https://calendly.com/api/event_type_single_use_links", {
    body: JSON.stringify(body),
    headers: {
      "content-Length": 26,
      "content-Type": "application/json",
      "cookie": `_calendly_session=${session}`,
      "x-Csrf-Token": csrf
    },
    method: "POST"
  })
  .then(res => res.json())
  .then(json => console.log(json));

