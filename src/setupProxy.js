
const { createProxyMiddleware } = require('http-proxy-middleware')


// module.exports = function(app) {
//     app.use(
//         '/api',
//         createProxyMiddleware({
//             target: 'http://localhost:3001',
//             changeOrigin: true,
//         })
//     )
// }

module.exports = function(app) {
    app.use(
        '/maps/api/mapsjs',
        createProxyMiddleware({
            target: 'https://maps.googleapis.com',
            changeOrigin: true,
        })
    )
}