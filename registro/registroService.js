'use strict'

const db = require('../pool')

  /**
 * Crea un registro
 * @param {*} request se reciben los parametros en el body
 *   
 * @param {*} response respuesta por parte de la api
 */
const createRegistro = (request, response) => {

    const {empleado_id, fecha, localizacion} = request.body
    db.connect(function(err, client, done){
        if(err){
            console.log("No se puede conectar a la base de datos: " + err)
            response.status(500)
        }
        client.query('INSERT INTO "REGISTRO" ("EMPLEADO_ID", "FECHA", "LOCALIZACION") VALUES ($1, $2, $3)', [empleado_id, fecha, localizacion], function(err, result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(201).send(`Registro añadido al empleado con ID: ${result.EMPLEADO_ID}`)
            console.log("Registro insertado con exito")
        })
    })
  }

  
  /**
 * Elimina un registro
 * @param {*} request se reciben los parametros en el body
 *   
 * @param {*} response respuesta por parte de la api
 */
const deleteRegistro = (request, response) => {

    const id_registro = parseInt(request.params.id)
    
    db.connect(function(err, client, done){
        if(err){
            console.log("No se puede conectar a la base de datos: " + err)
            response.status(500)
        }
        client.query('DELETE FROM "REGISTRO" WHERE "REGISTRO_ID" = $1', [id_registro], function(err, result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).send(`Registro eliminado con ID: ${result.REGISTRO_ID}`)
            console.log("Registro eliminado con exito")
        })
    })
  }

  /**
 * Elimina todos los registros de un empleado
 * @param {*} request se reciben los parametros en el body
 *   
 * @param {*} response respuesta por parte de la api
 */
const deleteAllRegistrosFromEmpleado = (request, response) => {

    const id_empleado = parseInt(request.params.id)
    
    db.connect(function(err, client, done){
        if(err){
            console.log("No se puede conectar a la base de datos: " + err)
            response.status(500)
        }
        client.query('DELETE FROM "REGISTRO" WHERE "EMPLEADO_ID" = $1', [id_empleado], function(err, result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).send(`Todos los registros del empleado con ID: ${result.REGISTRO_ID} han sido eliminados`)
            console.log("Registros eliminados con exito")
        })
    })
  }

  /**
 * Obtiene todos los registros
 * @param {*} request  
 * @param {*} response respuesta por parte de la api
 */
const getRegistros = (request, response) => {

    db.connect(function(err, client, done){
        if(err){
            console.log("No se puede conectar a la base de datos: " + err)
            response.status(500)
        }
        client.query('SELECT * FROM "REGISTRO"',  function(err, result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).json(result.rows)
            console.log("Consulta realizada con exito")
        })
    })
  }

/**
 * Obtiene un registro dada su id
 * @param {*} request parametro que identifica al usuario 
 * @param {*} response respuesta por parte de la api
 */
const getRegistroById = (request, response) => {

    const id = parseInt(request.params.id)
    console.log(id)
    db.connect(function(err, client, done){
        if(err){
            console.log("No se puede conectar a la base de datos: " + err)
            response.status(500)
        }
        client.query('SELECT * FROM "REGISTRO" WHERE "REGISTRO_ID" = $1', [id], function(err, result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).json(result.rows)
            console.log("Consulta realizada con exito")
        })
    })
  }

  /**
 * Obtiene todos los registros dada la id del empleado
 * @param {*} request parametro que identifica al usuario 
 * @param {*} response respuesta por parte de la api
 */
const getRegistrosByEmpleadoId = (request, response) => {

    const id = parseInt(request.params.id)
    console.log(id)
    db.connect(function(err, client, done){
        if(err){
            console.log("No se puede conectar a la base de datos: " + err)
            response.status(500)
        }
        client.query('SELECT * FROM "REGISTRO" WHERE "EMPLEADO_ID" = $1', [id], function(err, result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).json(result.rows)
            console.log("Consulta realizada con exito")
        })
    })
  }

  module.exports = {

    createRegistro,
    deleteAllRegistrosFromEmpleado,
    deleteRegistro,
    getRegistroById,
    getRegistrosByEmpleadoId,
    getRegistros
  
  }