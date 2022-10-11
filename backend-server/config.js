module.exports = {
    dev: {
        connectionString: 'postgresql://postgres:cat@127.0.0.1:5432/heisman_stats',
        port: '3000'
    },
    production: {
        connectionString: process.env.POSTGRES_CONNECTION_STRING + "?ssl=true",
        port: process.env.PORT
    }
}