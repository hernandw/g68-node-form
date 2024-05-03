import express from "express";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
const router = express.Router();

const users = [
  {
    rut: "123456789",
    nombre: "Pat",
    apellido: "Morita",
  },
];

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/formulario.html");
});

router.get("/usuarios", (req, res) => {
  const { rut } = req.query;

  const usuarioEncontrado = users.find((u) => u.rut == rut);
  console.log("usuarioEncontrado", usuarioEncontrado);
  // Paso 4
  if (usuarioEncontrado) {
    const { nombre, apellido } = usuarioEncontrado;
    res.send(`¡Usuario encontrado! Nombre: ${nombre} - Apellido: ${apellido}`);
  } else {
    res.send(`No se encontró ningún usuario con el rut ${rut}`);
  }
});

router.get("/crear", (req, res) => {
  const { nombre, contenido } = req.query;
  fs.writeFile(nombre, contenido, (err) => {
    if (err) {
      res.send("Error al crear el archivo");
    } else {
      res.send(`Archivo ${nombre} creado exitosamente`);
    }
  });
});

router.get("/leer", (req, res) => {
  const { nombre, apellido } = req.query;
  fs.readFile(nombre, "utf-8", (err, data) => {
    if (err) {
      res.send("Error al leer el archivo");
    } else {
      res.send(`Contenido del archivo ${nombre}: ${data}`);
    }
  });
});

export default router;
