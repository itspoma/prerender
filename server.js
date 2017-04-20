#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
    port: 3000,
    workers: process.env.PRERENDER_NUM_WORKERS || 1,
    iterations: process.env.PRERENDER_NUM_ITERATIONS || 40,
    logRequests: true,
    pageDoneCheckTimeout: 1000 // 1s
});

// server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
// server.use(prerender.blacklist());
server.use(prerender.logger());
// server.use(prerender.removeScriptTags());
// server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());
server.use(prerender.minify());
server.use(prerender.fsCaching());

server.start();
