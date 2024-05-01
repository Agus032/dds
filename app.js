const express = require("express");
// Importamos el modulo Sequelize y Datatypes del paquete Sequelize
const { Sequelize, DataTypes } = require('sequelize');
// Aca Importamos el modulo cors del paquete Cors que funciona como seguirdad para especificar quien puede acceder a los recursos en el servidor
const cors = require('cors');

//   ----------------------------------------------------------------
// Despues lo que hacemos es configutar express
const app = express();
// Este middleware de Express se utiliza para analizar el cuerpo de las solicitudes entrantes con formato JSON. Habilita a la aplicación para interpretar el cuerpo de las solicitudes HTTP con formato JSON.
app.use(express.json());
// Al usar app.use(cors()), estás permitiendo que el servidor permita solicitudes de recursos desde orígenes diferentes al dominio del servidor.
app.use(cors())

// crea una base de datos en memoria para poder realizar pruebas sin afectar base de datos locales y posteriormente poder borrarlas 
const sequelize = new Sequelize('sqlite::memory:');


//defino mi tabla con objetos, y el timestamps lo que hace es desactivar automaticamente los campos de "createdAt" y "updateAt" que trae por defecto sequelize
const superheroes = sequelize.define('hereo',{
    nombre: DataTypes.STRING,
    poder: DataTypes.STRING,
    equipo: DataTypes.STRING,
    edad: DataTypes.STRING
},{timestamps:false});

// inicializamos la base de datos e inserta los datos de muestra 
// La opción { force: true } indica a Sequelize que debe eliminar todas las tablas existentes y recrearlas. Esta practica es buena en un entorno de desarrollo de practica pero en una practica real no es buena practica ya que borramos todo jjaja
// bulkCreate para insertar múltiples registros en la tabla Museo de la base de datos

async function inicializarBaseDeDatos2(){
    await sequelize.sync({force:true});
    await superheroes.bulkCreate([
        {nombre: "Iron man", poder: "playboy,filantropo,genio,millonario",equipo:"avengers",edad:"40"},
        {nombre: "Spider-man", poder: "aracnido y superfuerza",equipo:"avengers",edad:"20"},
        {nombre: "Deadpool", poder: "regeneracion",equipo:"x-force",edad:"28"},
        {nombre: "Daredevil", poder: "ciego nashe",equipo:"defenders creo",edad:"26"},
        {nombre: "Hulk", poder: "superfuerza",equipo:"avengers",edad:"37"}, 
    ]);
}


// endpoint para tener los supermadafakinheroes

app.get("/heroes", async (req, res )=>{
    try{
        const superheroe = await superheroes.findAll();
        res.json(superheroe)
    }catch(error){
        res.status(500).send({message:"error wachin no tenemos los heroes"})
    }

});

// app.listen(3000, ()=>{
//     console.log("El server se esta corriendo correctamente", 3000);
// });

// iniciamos server de otra manera
inicializarBaseDeDatos2().then(()=>{
    app.listen(3000, () => console.log("servidor andando lokita en http://localhost:3000"))
})
