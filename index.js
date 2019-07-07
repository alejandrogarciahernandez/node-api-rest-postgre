const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 3000

const emp = require ('./empleado/empleadoService')
const reg = require('./registro/registroService')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API'})
})

//Empleados
app.get('/empleados/:id', emp.getEmpleadoById)

app.get('/empleados', emp.getEmpleados)

app.post('/empleados', emp.createEmpleado)

app.put('/empleados/:id', emp.updateEmpleado)

app.delete('/empleados/:id', emp.deleteEmpleado)

//Registros
app.post('/registros', reg.createRegistro)

app.get('/registros', reg.getRegistros)

app.get('/registros/:id', reg.getRegistroById)

app.get('/registrosEmpleado/:id', reg.getRegistrosByEmpleadoId)

app.delete('/registros/:id', reg.deleteRegistro)

app.delete('/registrosEmpleado/:id', reg.deleteAllRegistrosFromEmpleado)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


