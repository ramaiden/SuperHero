$(document).ready(function () {
   /* Ajax Get para recopilar información para la tabla */
    $.ajax({
        type: "GET",
        url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json",
        success: function (data) {
            
            for (let i = 0; i < 731; i++) {
                document.getElementById('tabla').innerHTML += `
                    <tr>
                        <th scope="row">${data[i].id}</th>
                        <td><img src="${data[i].images.xs}"></td>
                        <td>${data[i].name}</td>
                    </tr>`
            }
        },
        dataType: "json",
    });


/* Función Boton y busqueda de información */
    $("form").submit(function (event) {
        event.preventDefault();

        let valueInput = $("#pokemonInput").val()
        if (valueInput > 0 && valueInput < 732) {


            $.ajax({
                url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/" + valueInput + ".json",

                success: function (data) {

                    let nombre = data.name;

                    let imagen = data.images.sm;
                    let peso = data.appearance.weight[1];
                    let coneccion = data.connections.groupAffiliation;
                    let trabajo = data.work.occupation;
                    let nacimiento = data.biography.placeOfBirth;

                    $("#pokeInfo").html(`
                    <div class="row justify-content-center">  
                        <div class="col-12 col-sm-4">  
                        <div class="card mx-auto" style="width: 10rem;">
                            <img src="${imagen}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${nombre}</h5>
                                <p class="card-text">${peso}</p>
                                
                            </div>
                        </div> 
                    </div>  
                    
                    <div class="col-12 col-sm-8">  
                        <div class="card" style="width: 30rem;">
                            <div class="card-body">
                                <h5 class="card-title">Trabajo: ${trabajo}</h5>
                                <p class="card-text">Grupo de Afiliación: ${coneccion}</p>
                                <p class="card-text">Fecha de Nacimiento: ${nacimiento}</p>
                                <p class="card-text">Genero: ${data.appearance.gender}</p>
                                <p class="card-text">Color de Piel: ${data.appearance.hairColor}</p>
                                <p class="card-text">Nombre completo: ${data.biography.fullName}</p>
                            </div>
                        </div> 
                    </div>
                   
                `);

                    let estadisticas = [];


                    sum_total = Object.values(data.powerstats).reduce(function (contador, deuda) {
                        return contador + deuda;
                    }, 0);


                    for (let i = 0; i < 6; i++) {
                        Object.values(estadisticas.push({
                            y: (Object.values(data.powerstats)[i] / sum_total)*100,
                            label: Object.keys(data.powerstats)[i]
                        }))
                    };

                    let config = {
                        animationEnabled: true,
                        title: {
                            text: "Estadisticas"
                        },
                        axisY: {
                            title: "valor"
                        },
                        data: [{
                            type: "pie",
                            startAngle: 240,
                            yValueFormatString: "##0.00\"%\"",
                            indexLabel: "{label} {y}",
                            dataPoints: estadisticas
                        }],
                    };
                    let chart = new CanvasJS.Chart("poketStats", config);
                    chart.render();
                }
            });
        } else {
            alert('Por favor introduzca un número válido')
            $("#pokeInfo").html(`<h2> Por favor introduzca un número válido</h2>`)
        }


    });
})
