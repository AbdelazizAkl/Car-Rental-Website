const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const Admin = {
    id: 0,
    email: '',
    password: '',



    create(data) {
        return pool.query('INSERT INTO admins SET ?', data);
    },
    
    update(data) {
        return pool.query('UPDATE admins SET ? WHERE id = ?', [data, this.id]);
    },
    
    delete() {
        return pool.query('DELETE FROM admins WHERE id = ?', [this.id]);
    }
  
}