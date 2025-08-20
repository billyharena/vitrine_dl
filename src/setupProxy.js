// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://127.0.0.1:8000',
//       changeOrigin: true,
//     })
//   );
//   app.use(
//     '/media',
//     createProxyMiddleware({
//       target: 'http://127.0.0.1:8000',
//       changeOrigin: true,
//     })
//   );
// };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://192.168.88.34:8000', // Replace with your PC 1's IP
      changeOrigin: true,
    })
  );
  app.use(
    '/media',
    createProxyMiddleware({
      target: 'http://192.168.88.34:8000', // Replace with your PC 1's IP
      changeOrigin: true,
    })
  );
};