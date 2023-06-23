const http = require("http");
const fs = require("fs");
const { URL } = require("url");

const hostname = "localhost";
const port = 8080;

const server = http.createServer((req, res) => {
	let fileName = "";
	const myUrl = new URL(req.url, `https://${hostname}:${port}/`);
	myUrl.pathname === "/"
		? (fileName = "/index.html")
		: (fileName = myUrl.pathname);

	fs.readFile(`.${fileName}`, "utf8", (err, data) => {
    if (err && fileName !== "/favicon.ico") {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      fs.readFile("./404.html", "utf8", (err2, data2) => {
        res.end(data2);
      })
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    }
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
