const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082, host: '0.0.0.0' });

console.log("🚀 Server running on ws://0.0.0.0:8082");

wss.on("connection", (ws, req) => {
  const clientIP = req.socket.remoteAddress;
  console.log(`✅ Client connected: ${clientIP}`);

  ws.on("message", (message) => {
    console.log(`📩 Received: ${message.toString()}`);

    // Broadcast to all other clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log(`❌ Client disconnected: ${clientIP}`);
  });
});
