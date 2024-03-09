const ingredientesList = document.querySelector("#ingredientes-list");
const pasosList = document.querySelector("#pasos-list");
const videoContainer = document.querySelector(".detalles__video-container");
const urlParams = new URLSearchParams(window.location.search);
detallesTitulo = document.querySelector(".detalles__titulo");
const recetaNombre = urlParams.get("receta")


fetch('assets/js/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        data.forEach((receta, index) => {

            console.log(index, receta.nombre)
            console.log(index, recetaNombre)


            if (receta.nombre == recetaNombre) {

                detallesTitulo.innerText = receta.nombre;

                videoContainer.innerHTML += `
                <video controls="play" class="detalles__video" src="./assets/videos/${receta.nombre}.mp4"></video>
                `

                receta.ingrediente.forEach(ingrediente => {
                    ingredientesList.innerHTML += `
                            <div class="ingrediente">
                                ${ingrediente.nombre}
                                ${ingrediente.cantidad}
                            </div>`
                });

                receta.paso.forEach((paso, index) => {
                    pasosList.innerHTML += `
                    <div class="paso">
                    ${index + 1}.
                    ${paso.descripcion}
                </div>`
                });

            }

        })


    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
