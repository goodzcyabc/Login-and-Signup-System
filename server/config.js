const mysql = require("mysql")
const client = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "zcyzcy",
    database: "web_signup_login"
})

/**
 * execute mysql sentences
 *     sql: mysql sentences
 *     arr: params
 *     callback: responsive function (error, result)
 */

module.exports = function sqlFn(sql, arr, callback) {
    client.query(sql, arr, (error, result) => {
        if (error) {
            console.log(error)
            return
        }
        callback(result)
    })
}