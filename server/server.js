const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let pollState = {
    'Opsioni A': 0,
    'Opsioni B': 0,
    'Opsioni C': 0,
};

console.log("Serveri WebSocket po funksionon në portin 8080...");

function broadcastPollState() {
    const dataToSend = JSON.stringify(pollState);
    console.log("Transmetohen rezultatet e reja:", dataToSend);

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(dataToSend);
        }
    });
}

wss.on('connection', ws => {
    console.log('Klient i ri u lidh.');

    ws.send(JSON.stringify(pollState));

    ws.on('message', message => {
        try {
            const parsedMessage = JSON.parse(message);

            if (parsedMessage.vote && pollState.hasOwnProperty(parsedMessage.vote)) {
                pollState[parsedMessage.vote]++;
                console.log(`Votë e marrë për: ${parsedMessage.vote}. Gjendja e re:`, pollState);

                broadcastPollState();
            } else {
                console.log("Mesazh i pavlefshëm ose opsion i panjohur:", parsedMessage);
            }
        } catch (error) {
            console.error("Gabim gjatë analizimit të mesazhit:", error);
        }
    });

    ws.on('close', () => {
        console.log('Klienti u shkëput.');
    });

    ws.on('error', error => {
        console.error("Gabim në WebSocket:", error);
    });
});
