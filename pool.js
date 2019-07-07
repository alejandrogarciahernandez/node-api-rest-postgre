
let pg = require('pg')
let PGUSER = 'alexgh94'
let PGDATABASE = 'postgres'
let PGPASS = 'zetagh94'
let config = {
    user: PGUSER,
    password: PGPASS,
    database: PGDATABASE,
    max: 10,
    idleTimeoutMillis: 30000
}

let pool = new pg.Pool(config);

module.exports = pool;