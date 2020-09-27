const webSocketOutput = document.querySelector('.output');
const inputBtn = document.querySelector('.input-box');

inputBtn.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        const query = event.target.value;
        event.target.value = '';
        sendQuery(query);
    }
});

let ws;
try {
  // Local dev
  // Multiple values of hostname based on browsers possibly
  if (['localhost', '127.0.0.1', ''].includes(location.hostname)) {
    ws = new WebSocket(`ws://localhost:3000`);
  } else {
    // ws:// is for unsecured, wss:// is for secured conn over TLS
    ws = new WebSocket(`wss://ws.saa7-codes.xyz`);
  }
} catch(e) {
  console.log('Web socket init error', e);
}


function sendQuery(query) {
    ws.send(JSON.stringify({type: 'query', payload: query}))
}

ws.onmessage = function({data}) {
    const msg = document.createElement('div');

    try {
        data = JSON.parse(data);
        const {type, payload} = data;

        switch(type) {
            case 'ping':
                // console.log('ping');
                return;
            default:
                msg.innerHTML = payload;
                webSocketOutput.prepend(msg);
        }
    } catch(e) {
        console.log('Websocket error', e);
    }
}
