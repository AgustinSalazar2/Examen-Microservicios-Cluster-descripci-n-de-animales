import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (_req, res) => {

    try {
        let formHtml = `
        <body>
            <h2>Elegir un animal</h2>
            <form">
                <label for="animal">Animal:</label>
                <input type="text" id="animal" name="animal" required>
                <input type="button" value="Descripcion" onclick="consultarAnimal()">
            </form>
            </br>
            <div id="descripcion"></div>

            <script>
            function consultarAnimal(){
                const animal = document.getElementById('animal').value;
                const divDescripcion = document.getElementById('descripcion');

                const url = 'http://localhost:3000/consulta'
                        const data = {
                            animal
                        };

                        const options = {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
                            },
                            body: JSON.stringify(data) // Convierte el objeto de datos en una cadena JSON
                        };

                        fetch(url, options)
                            .then(response => {
                                if (!response.ok) {
                                throw new Error('La solicitud no se completó correctamente.');
                                }
                                return response.json();
                            })
                            .then(responseData => {
                                // Aquí puedes trabajar con los datos de respuesta del servidor
                                console.log(responseData.parse.title);

                                divDescripcion.innerHTML = responseData.parse.title
                            })
                            .catch(error => {
                                // Maneja cualquier error que pueda ocurrir durante la solicitud
                                console.error('Hubo un error:', error);
                            });
            }
            </script>
        </body>`

        res.send(formHtml);
    } catch (error) {
        console.log("Mensage de error: "+ error)
        res.status(500).json({ error: 'Error al obtener el formulario' });
    }
})

app.post('/consulta', async (req, res)=>{
    const {animal} = req.body;

    // Usar la API de Wikipedia
    fetch(`https://es.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${animal}`)
    .then(response => response.json())
    .then(data => {
        const resultado = data.query.search[0]; // Tomar el primer resultado
        // console.log(resultado)
        const pageTitle = resultado.title;

        // Obtener la descripción completa del artículo
        return fetch(`https://es.wikipedia.org/w/api.php?action=parse&page=${pageTitle}&format=json`);
    })
    .then(response => response.json())
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        console.error('Hubo un error:', error);
        res.json({error: 'no se obtuvo la descripcion'})
    });
})

const port = 3000

app.listen(port, () => {
    console.log(`Server running on port "${port}" http://localhost:${port}`)
})