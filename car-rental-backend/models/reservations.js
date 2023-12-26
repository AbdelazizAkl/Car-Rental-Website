const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const reservations = {
    id: 0,
    customerId: 0,
    carId: 0,
    startDate: '',
    endDate: '',
    totalPrice: 0,
    status: '',
    paymentDetails: '',

    create(data) {
        return pool.query('INSERT INTO reservations SET ?', data);
    },


    findAll(options = {}) {
        return pool.query('SELECT * FROM reservations WHERE ?', options);
    },
    
    findById(id) {
        return pool.query('SELECT * FROM reservations WHERE id = ?', [id]);
    },
    
    
    update(data) {
        return pool.query('UPDATE reservations SET ? WHERE id = ?', [data, this.id]);
    },
    
  
};

module.exports = reservations;
