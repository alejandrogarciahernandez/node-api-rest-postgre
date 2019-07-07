'use strict'

const db = require('../pool')

/**
 * Obtiene un empleado dada su id
 * @param {*} request parametro que identifica al usuario 
 * @param {*} response respuesta por parte de la api
 */
const getEmpleadoById = (request, response) => {

    const id = parseInt(request.params.id)
    console.log(id)
    db.connect(function(err, client, done){
        if(err){
            console.log("No se puede conectar a la base de datos: " + err)
            response.status(500)
        }
        client.query('SELECT * FROM "EMPLEADO" WHERE "EMPLEADO_ID" = $1', [id], function(err, result){
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
 * Obtiene todos los empleados
 * @param {*} request  
 * @param {*} response respuesta por parte de la api
 */
const getEmpleados = (request, response) => {

    db.connect(function(err, client, done){
        if(err){
            console.log("No se puede conectar a la base de datos: " + err)
            response.status(500)
        }
        client.query('SELECT * FROM "EMPLEADO"',  function(err, result){
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
 * Actualiza un empleado
 * @param {*} request se reciben los parametros en el body
 *   
 * @param {*} response respuesta por parte de la api
 */
const updateEmpleado = (request, response) => {

    const id_empleado = parseInt(request.params.id)
    const {nombre, apellidos, telefono, email, dni, horas_semanales} = request.body
    db.connect(function(err, client, done){
        if(err){
            console.log("No se puede conectar a la base de datos: " + err)
            response.status(500)
        }
        client.query('UPDATE "EMPLEADO" SET "NOMBRE" = $1, "APELLIDOS" = $2, "TELEFONO" = $3, "EMAIL" = $4, "DNI" = $5, "HORAS_SEMANALES" = $6 WHERE "EMPLEADO_ID" = $7', [nombre, apellidos, telefono, email, dni, horas_semanales, id_empleado], function(err, result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).send(`Empleado actualizado con ID: ${result.EMPLEADO_ID}`)
            console.log("Empleado modificado con exito")
        })
    })
  }

  /**
 * Crea un empleado
 * @param {*} request se reciben los parametros en el body
 *   
 * @param {*} response respuesta por parte de la api
 */
const createEmpleado = (request, response) => {

    const {nombre, apellidos, telefono, email, dni, horas_semanales} = request.body
    db.connect(function(err, client, done){
        if(err){
            console.log("No se puede conectar a la base de datos: " + err)
            response.status(500)
        }
        client.query('INSERT INTO "EMPLEADO" ("NOMBRE", "APELLIDOS", "TELEFONO", "EMAIL", "DNI", "HORAS_SEMANALES") VALUES ($1, $2, $3, $4, $5, $6)', [nombre, apellidos, telefono, email, dni, horas_semanales], function(err, result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(201).send("Empleado insertado")
            console.log("Usuario insertado con exito")
        })
    })
  }

  /**
 * Elimina un empleado
 * @param {*} request se reciben los parametros en el body
 *   
 * @param {*} response respuesta por parte de la api
 */
const deleteEmpleado = (request, response) => {

    const id_empleado = parseInt(request.params.id)
    
    db.connect(function(err, client, done){
        if(err){
            console.log("No se puede conectar a la base de datos: " + err)
            response.status(500)
        }
        client.query('DELETE FROM "EMPLEADO" WHERE "EMPLEADO_ID" = $1', [id_empleado], function(err, result){
            done();
            if(err){
                console.log(err);
                response.status(400).send(err);
            }
            response.status(200).send(`Empleado eliminado con ID: ${result.EMPLEADO_ID}`)
            console.log("Empresario eliminado con exito")
        })
    })
  }



  module.exports = {

    getEmpleadoById,
    getEmpleados,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
  
  }