var cacheManager = require('cache-manager');
var fsStore = require('cache-manager-fs');

module.exports = {
    init: function() {
        this.cache = cacheManager.caching({
            store: fsStore,
            maxsize: 1000*1000*1000,
            ttl: process.env.CACHE_TTL || 60*60*12,/*seconds - 1 day caching*/
            preventfill: true
        });
    },

    beforePhantomRequest: function(req, res, next) {
        this.cache.get(req.prerender.url, function (err, result) {
            if (!err && result) {
                res.send(200, result);
            } else {
                next();
            }
        });
    },

    afterPhantomRequest: function(req, res, next) {
        this.cache.set(req.prerender.url, req.prerender.documentHTML);
        next();
    }
}
