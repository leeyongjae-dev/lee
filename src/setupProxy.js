const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/localAdress/', {
      target: 'http://localhost:18083',
      pathRewrite: {
        '^/localAdress': '',
      },
      changeOrigin: true,
    }),
    createProxyMiddleware('/devAdress', {
      target: ' https://dev.bigdata-tic.kr',
      pathRewrite: {
        '^/devAdress': '',
      },
      changeOrigin: true,
    }),
  );
};
