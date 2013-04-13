#!/usr/bin/env coffee

express = require "express"
consolidate = require "consolidate"
hogan = require "hogan.js"
assets = require "connect-assets"
_ = require "underscore"
configuration = require "node-yaml-config"
{version} = require "./package.json"

config = configuration.load "config.yaml", process.env.ENVIRONMENT

app = express()

app.get "/", (req, res, next) ->
  res.render "index.html", css:app.get("css"), js:app.get("js"), version:version
  return

app.configure(() ->
  app.use express.compress()
  app.use assets src:"assets", build:false
  app.set "css", /href="(.*)"/.exec(css("application")).pop()
  app.set "js", /src="(.*)"/.exec(js("application")).pop()
  app.use app.router
  app.use express.static "#{__dirname}/public"
  app.use express.favicon "#{__dirname}/public/misc/favicon.ico"
  app.use express.logger format:"dev"
  app.use express.cookieParser()
  app.use express.bodyParser()
  app.use express.cookieSession(
    secret: config.session.secret
    cookie: maxAge: 24 * 60 * 60 * 1000
    proxy: true
  )
  app.engine "html", consolidate.hogan
  app.set "views", "#{__dirname}/views"
)

app.listen process.env.PORT or config.server.port, ->
  console.log "⚡ app listening on port %s", process.env.PORT or config.server.port
