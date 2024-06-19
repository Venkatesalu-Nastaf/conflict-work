const { createProxyMiddleware } = require('http-proxy-middleware');
import { APIURL } from './component/url';

module.exports = function (app) {
  app.use(
    '/signature_photos',
    createProxyMiddleware({
      // target: 'http://localhost:8081', // Your Express server's URL
      target: `${APIURL}`, // Your Express server's URL
      changeOrigin: true,
    })
  );
};
