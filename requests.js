

const fetch = require('node-fetch');

async function getEvents(session, csrf) {
  // console.log(`session ${session}`);
  // console.log(`csrf ${csrf}`);
  return await fetch("https://calendly.com/api/users/me/event_types", {
    headers: {
      "content-Type": "application/json",
      "cookie": `_calendly_session=${session}`,
      "x-Csrf-Token": csrf
    },
    method: "GET"
  })
  .then(res => {
    // console.log(res);
    return res.json();
  })
  .then(json => json.results[0].event_types);
}


// let session = "dkNrMnlhZlRsT25NcGlQZHVkRDBDVEpjbzJ0Z2s0NTd2ZHFxdVVRV01ob1RFZWFoWXZyc0RndnM1NW56VW9TZUJHbVpwVGpPbWRub1B1L0xzNFlSYUU2WVhWRFRKZ2tFTHdONC9YRVdiRVBmdXc2dUtwYVRlcDk0UFFMSnhjV3IvOXYyY3RZZitpTTVBU2srZzVNRlozQjN2b2NMcmdRZlpwQjFQR1ZLeTM3SjNWTDFiOWJwR1dEdlNRWjBtNndCNElrMEJNSHNseGczVmVYdXVKMFJLMUMxODk5SUpzZ0tZcTJjS09UL2s0K094L0cvT0R3TlhRcEM4QXdvNzF1MHl0THpFMi9CV0RJTXdYU0tJa3dCeUdwOGd6ZWFEdExjNXRIc3JmWFR1UWJ0eWVtR0VpQVhJZWY4OGxvZE42U1g0Q0FtS1NBUmVIRWhqNUtpb0xaWTZBNGNqVVZTLzBUVVJsOHFlTlFoMGxNT0xqVkxKcFBudEpDWlRsdGRhSGh4YUxSbi9adVZyWXlzeVVTMjE0Q3NveEdIRUZwOEFna0pyVlFDbDdDTWtiQkg0SHhON1FxYjVhSHFvUkRKYnpuN1FHYkdWQjdpWTNROVVSNWJxMWVyTlNmdytVOVFMQi9qdSt6M3E1WWlLM1p2bDdVSklzdDV0RlBMeFpSOEVUZzBCMjAzaTl4RHlSRGlxVXowd2N5OWIxdjRxSTVEc3pVZHVibHdMelNNcWUva25OYlg0SWRBVDlObEtJN2l5S29QdThVcDVZZ3FUTnorSGZ2N1JWTTR0eHNaUEhLU05NUy9mZzhJOWlGakplUk5kQWFKOGU3WW9Vb00xbkcxYVMrMjdETC80UjRGcXJYaTB2eEJhSHRsTFZzVTJXL3BCeG5GSmFIZDVmVU1IRmRqWTN1d1QxYUZPd2Jjc3dvK0RqRjA0RnVRMkc5TzVwTjZvUXFYa21EakNESXBNVlhqM0xRL3JUSC91VXBjVUswPS0tS2hjUmZWYmhVeDZEMjJJcjliSkhDQT09--612007ff8222fe241441ef006b28d281c9066d69";
// let csrf = "1Enhj4PdDjgjQil62bwdl2sYzFR5KW4Zx+TScF2J8ntwmqq4lyCM6RqTafLNy98pbYewoFIL/9NlQnqvO8jooA==";
// let events = getEvents(session, csrf);
// console.log(events);

// body = {event_type_id: 36203197};

async function genLink(session, csrf, event_type_id) {
  body = {event_type_id: event_type_id};
  return await fetch("https://calendly.com/api/event_type_single_use_links", {
      body: JSON.stringify(body),
      headers: {
        "content-Length": 26,
        "content-Type": "application/json",
        "cookie": `_calendly_session=${session}`,
        "x-Csrf-Token": csrf
      },
      method: "POST"
    })
    .then(res => res.json());
}

module.exports.getEvents = getEvents;
module.exports.genLink = genLink;

