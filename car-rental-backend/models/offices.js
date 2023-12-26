const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const offices = {
    officeId: 0,
    name: '',
    city: '',
    address: '',
    phone: '',
    hoursOperation: '',

    create(data) {
        return pool.query('INSERT INTO offices SET ?', data);
    },

    findAll(options = {}) {
        return pool.query('SELECT * FROM offices WHERE ?', options);
    },
    
    findById(id) {
        return pool.query('SELECT * FROM offices WHERE office_id = ?', [id]);
    },
    
    
    update(data) {
        return pool.query('UPDATE offices SET ? WHERE office_id = ?', [data, this.officeId]);
    },
    
    delete() {
        return pool.query('DELETE FROM offices WHERE office_id = ?', [this.officeId]);
    }
  
};

module.exports = offices;
