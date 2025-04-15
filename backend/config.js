const dotenv = require('dotenv');

dotenv.config()

const config = {
        dbConnectionUrl:process.env.URL || "",
        port:process.env.PORT || 4000

}

module.exports = config;