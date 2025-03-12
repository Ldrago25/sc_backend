module.exports = {
    getByEmail: (con, email, callback) => {
        con.query(`select * from users where email='${email}'`, callback);
    },
    validate_identification: (con, identification, callback) => {
        con.query(`select * from users where identification='${identification}'`, callback);
    },
    update: (con, query, callback) => {
        con.query(query, callback);
    },
    insert: (con, data, callback) => {
        con.query(`INSERT INTO users (name_full,identification,email,uc,role,is_boss,id_carrera,password) values ('${data.name_full}','${data.identification}','${data.email}',${data.uc},'${data.role}',${data.is_boss},${data.id_carrera},'-1')`, callback)
    }

}

/*
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Carpeta donde se guardarán los archivos
2. Definición de los campos:

Debes crear un array de objetos, donde cada objeto representa un campo de archivo. Cada objeto debe tener:

name: El nombre del campo (el name del input en el frontend).
maxCount (opcional): El número máximo de archivos permitidos para ese campo.
Ejemplo:

Supongamos que tienes un formulario con tres campos de archivo: "imagenPerfil", "documentoCV" y "otrosArchivos". La configuración de Multer sería así:

JavaScript

const campos = [
  { name: 'imagenPerfil', maxCount: 1 },
  { name: 'documentoCV', maxCount: 1 },
  { name: 'otrosArchivos', maxCount: 5 } // Permite hasta 5 archivos en este campo
];
3. Uso de multer.fields():

JavaScript

app.post('/upload-varios-nombres', upload.fields(campos), (req, res) => {
  console.log(req.files); // Objeto con los archivos
  res.send('Archivos recibidos');
});
4. Frontend (HTML):

Asegúrate de que los nombres de los inputs coincidan con los name definidos en campos:

HTML

<input type="file" name="imagenPerfil">
<input type="file" name="documentoCV">
<input type="file" name="otrosArchivos" multiple>
Explicación:

multer.fields(campos) procesa los archivos según la configuración definida en el array campos.
req.files será un objeto donde las claves son los nombres de los campos ("imagenPerfil", "documentoCV", "otrosArchivos") y los valores son arrays de archivos correspondientes a cada campo.
Consideraciones adicionales:

Recuerda el enctype="multipart/form-data" en tu formulario HTML.
Implementa manejo de errores para posibles problemas con los archivos.
Valida los tipos y tamaños de los archivos por seguridad.
Con este enfoque, puedes manejar fácilmente múltiples archivos con diferentes nombres de campo en tu API de Node.js con Express y Multer.

**/