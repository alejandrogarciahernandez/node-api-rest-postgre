const Pool = require('pg').Pool

const pool = new Pool({

  user: 'alexgh94',

  host: 'localhost',

  database: 'postgres',

  password: 'zetagh94',

  port: 5432,

})


const getUsers = (request, response) => {
    pool.connect
    pool.query('SELECT * FROM EMPLEADO ORDER BY ID_EMPLEADO ASC', (error, results) => {
  
      if (error) {
        console.log("Error al mostrar empleados");
        throw error
  
      }
  
      response.status(200).json(results.rows)
  
    })
  
  }

  
const getUserById = (request, response) => {

    const id = parseInt(request.params.id)
  
  
  
    pool.query('SELECT * FROM EMPLEADO WHERE ID_EMPLEADO = $1', [id], (error, results) => {
  
      if (error) {
  
        throw error
  
      }
  
      response.status(200).json(results.rows)
  
    })
  
  }

  const createUser = (request, response) => {

    const { nombre, email } = request.body
  
  
  
    pool.query('INSERT INTO EMPLEADO (NOMBRE, EMAIL) VALUES ($1, $2)', [nombre, email], (error, results) => {
  
      if (error) {
  
        throw error
  
      }
  
      response.status(201).send(`User added with ID: ${result.insertId}`)
  
    })
  
  }

  
const updateUser = (request, response) => {

    const id_empleado = parseInt(request.params.id)
  
    const { nombre, email } = request.body
  
  
  
    pool.query(
  
      'UPDATE EMPLEADO SET NOMBRE = $1, EMAIL = $2 WHERE ID_EMPLEADO = $3',
  
      [nombre, email, id_empleado],
  
      (error, results) => {
  
        if (error) {
  
          throw error
  
        }
  
        response.status(200).send(`Empleado modified with ID: ${id}`)
  
      }
  
    )
  
  }

  
const deleteUser = (request, response) => {

    const id_empleado = parseInt(request.params.id)
  
  
  
    pool.query('DELETE FROM EMPLEADO WHERE ID_EMPLEADO = $1', [id_empleado], (error, results) => {
  
      if (error) {
  
        throw error
  
      }
  
      response.status(200).send(`User deleted with ID: ${id}`)
  
    })
  
  }

  
module.exports = {

    getUsers,
  
    getUserById,
  
    createUser,
  
    updateUser,
  
    deleteUser,
  
  }