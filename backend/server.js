const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);
server.on("listening", onListening);
server.listen(port);
