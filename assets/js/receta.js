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


                fetch(`./assets/videos/${receta.nombre}.mp4`)
                    .then(response => {
                        if (response.ok) {
                            videoContainer.innerHTML += `
                            <video controls="play" class="detalles__video" src="./assets/videos/${receta.nombre}.mp4"></video>
                            `
                        } else {
                            videoContainer.innerHTML += `<div>
                            <svg class="svg__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.65 6H12.8C13.9201 6 14.4802 6 14.908 6.21799C15.2843 6.40973 15.5903 6.71569 15.782 7.09202C16 7.51984 16 8.0799 16 9.2V10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 14.679 21 15.0462 20.9684 15.3184M3 3L6.00005 6.00005M21 21L15.9819 15.9819M6.00005 6.00005C5.01167 6.00082 4.49359 6.01337 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C15.9049 16.6668 15.9585 16.3837 15.9819 15.9819M6.00005 6.00005L15.9819 15.9819" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            
                            </div>`
                        }

                    })
                    .catch(error => {
                        console.log("Error")
                    })



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
