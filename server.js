var express = require("express")
  , consolidate = require("consolidate")
  , hogan = require("hogan.js")
  , _ = require("underscore")
  , configuration = require("node-yaml-config")
  , config = configuration.load("config.yaml", process.env.ENVIRONMENT)
  , packagejson = require("./package.json")
  , app = express()
  ;

app.configure(function() {
  app.use(express.compress());
  app.use(express.favicon(__dirname + "/public/misc/favicon.ico"));
  app.use(express.static(__dirname + "/public"));
  app.use(express.logger("dev"));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.cookieSession({ secret:config.session.secret, cookie:{ maxAge:24*60*60*1000 }, proxy:true }));
  app.engine("html", consolidate.hogan);
  app.set("views", __dirname + "/views");
  app.use(app.router);
});

app.get("/", function(req, res, next) {
  res.render("index.html", { description:packagejson.description, author:packagejson.author, version:packagejson.version });
});

app.listen(process.env.PORT || config.server.port, function() {
  console.log("⚡ app listening on port %s", process.env.PORT || config.server.port);
});
