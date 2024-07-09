const mysql = require('mysql2');

class SqlConnector{
    constructor(){
        this.connection = mysql.createConnection({
            host:process.env.DB_HOST,
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_NAME
        })
    }

    connect(){
        return new Promise((resolve,reject)=>{
            this.connection.connect((err)=>{
                if(err){
                    reject(err)
                }else{
                    console.log("Connected to database  ")
                    resolve('Connected to Database')
                }
            })
        })
    }

    execute_query(query,args){
        console.log(query)
        console.log(args)
        return new Promise((resolve,reject)=>{
            this.connection.execute(query,args,(err,results)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })
        })
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Connection closed');
                }
            });
        });
    }
}

module.exports = SqlConnector


