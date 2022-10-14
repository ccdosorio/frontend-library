const PROXY_CONFIG = [
    {
        context: [
            '/users',
            '/classrooms',
            '/books',
            '/user-books',
            '/counting',
            '/students'
        ],
        target: 'https://library-galileo-project.herokuapp.com/v1/',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug'
    }
]

module.exports = PROXY_CONFIG;
