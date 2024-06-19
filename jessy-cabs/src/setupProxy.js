const { createProxyMiddleware } = require('http-proxy-middleware');
const APIURL=require("./component/url")

module.exports = function (app) {
  app.use(
    '/signature_photos',
    createProxyMiddleware({
      target: APIURL, // Your Express server's URL
      changeOrigin: true,
    })
  );
};
