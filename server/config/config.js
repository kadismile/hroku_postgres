module.exports = {
  "development": {
    "username": "kadismile",
    "password": "111222333",
    "database": "pdp_reformers",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
/*  "development": {
    "use_env_variable": process.env.DATABASE_URL,
    dialect: 'postgres',
  },*/
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
;