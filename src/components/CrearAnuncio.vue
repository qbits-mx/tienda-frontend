<template>
    <div>

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
        <meta name="generator" content="Hugo 0.88.1">
        <title>Checkout example · Bootstrap v5.1</title>

        <link rel="canonical" href="https://getbootstrap.com/docs/5.1/examples/checkout/">
        <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/estilos.css">
    

        <!-- Bootstrap core CSS -->
        <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet">
        
    
        <!-- Custom styles for this template -->
        <link href="form-validation.css" rel="stylesheet">
    </head>

    <body class="bg-light">
        <div class="container">
            <main>
                <div class="py-5 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-file-earmark-post" viewBox="0 0 16 16">
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                    <path d="M4 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7zm0-3a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H4.5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    <p class="lead">¡Vamos a crear un anuncio!</p>

                </div>
                
                <div class="row g-5">
                    <div class="col-md-7 col-lg-8">
                        <h4 class="mb-3">Completa el siguiente formulario: </h4>
                        <form class="needs-validation" novalidate action="" id="formulario">
                            <div class="row g-3">


                                <div class="col-md-12"> 
                                    <label for="categoria" class="form-label">Selecciona la categoria de tu producto:</label>
                                    <select class="form-select" id="categoria" required>
                                        <option value=""> Selecciona una opcion</option>
                                        <option value="01">Mascotas                  	</option>
                                        <option value="02">Línea blanca								</option>
                                        <option value="03">Electrónica								</option>
                                        <option value="04">Deportes										</option>
                                        <option value="05">Música											</option>
                                        <option value="06">Belleza										</option>
                                        <option value="07">Salud /Cuidado personal		</option>
                                        <option value="08">Productos del Hogar				</option>
                                        <option value="09">Alimentos									</option>
                                        <option value="10">Ropa												</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Selecciona una categoria valida.
                                    </div>
                                </div>
                                

                                <div class="col-md-12"> 
                                    <label for="zona" class="form-label">Selecciona la zona de entrega de tu conveniencia:</label>
                                    <select class="form-select" id="zona" required>
                                        <option value=""> Selecciona una opcion</option>
                                        <option value="01">Alvaro Obregon </option>
                                        <option value="02">Azcapotzalco </option>
                                        <option value="03">Benito Juarez</option>
                                        <option value="04">Coyoacan </option>
                                        <option value="05">Cuajimalpa de Morelos </option>
                                        <option value="06">Cuauhtemoc </option>
                                        <option value="07">Gustavo A. Madero </option>
                                        <option value="08">Iztacalco </option>
                                        <option value="09">Iztapalapa </option>
                                        <option value="10">Magdalena Contreras </option>
                                        <option value="11">Miguel Hidalgo </option>
                                        <option value="12">Milpa Alta </option>
                                        <option value="13">Tlalpan </option>
                                        <option value="14">Tlahuac </option>
                                        <option value="15">Venustiano Carranza </option>
                                        <option value="16">Xochimilco </option>

                                    </select>
                                    <div class="invalid-feedback">
                                        Por favor, elige una zona valida.
                                    </div>
                                </div>
                                
                            
                                <div class="my-3">
                                    <div class="col-md-12"> 
                                        <label for="pago" class="form-label">Selecciona la forma de pago  para tus compradores:</label>
                                        <select class="form-select" id="pago" required>
                                            <option value=""> Selecciona una opcion</option>
                                            <option value="01">Efectivo  			</option>
                                            <option value="02">Tarjeta de Debito   			</option>
                                        </select>
                                        <div class="invalid-feedback">
                                            Por favor, elige una zona valida.
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-12">
                                    <label for="descripcion" class="form-label">Descrpcion de su producto.</label>
                                    <textarea type="text" class="form-control" rows="5" id="descripcion" placeholder="" value="" required></textarea>
                                    <div class="invalid-feedback">
                                        No se puede crear un anuncio sin la descripcion de su producto.
                                    </div>
                                </div>
                                
                             
                                
                                <div class="col-md-12">
                                    <label for="country" class="form-label">Condicion en la que esta el producto:</label>
                                    <select class="form-select" id="country" required>
                                        <option value=""> Selecciona una opcion</option>
                                        <option value="01">Nuevo  			</option>
                                        <option value="02">Usado   			</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Por favor, elige una opcion de condicion para el articulo.
                                    </div>
                                </div>
                                
                                <div class="col-12">
                                    <label for="email" class="form-label">Email <span class="text-muted">(Opcional)</span></label>
                                    <input type="email" class="form-control" id="email" placeholder="you@example.com">
                                    <div class="invalid-feedback">
                                        Por favor, ingresa un correo valido.
                                    </div>
                                </div>
                                
                                <div class="col-12">
                                    <label for="vigencia" class="form-label">Vigencia <span class="text-muted">(Opcional)</span></label>
                                    <input type = "date" name = "day" min="2021-12-14" max="2022-01-04"/>
                                    <div class="invalid-feedback">
                                        Por favor, elige una fecha de vigencia valida.
                                    </div>
                                </div>

                                <div class="col-12">
                                    <label for="imagenes" class="form-label">Imagenes <span class="text-muted">(Opcional)</span></label>
                                    <input type="file" id="imagenes" name="imagenes" accept="image/png, image/jpeg">
                                    <div class="invalid-feedback">
                                        Por favor, elige imagenes en el formato correcto (png, jpeg).
                                    </div>
                                </div>

                                 <div class="col-12">
                                    <label for="videos" class="form-label">Videos <span class="text-muted">(Opcional)</span></label>
                                    <input type="file" id="videos" name="videos" accept="video/mp4">
                                    <div class="invalid-feedback">
                                        Por favor, elige videos en el formato correcto (mp4).
                                    </div>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                    
                    <hr class="my-4">
                    <button class="w-100 btn btn-primary btn-lg" type="submit">Finalizar</button>
                </div>
            </main>
        </div>
        
        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">&copy; 2017-2021 Company Name</p>
            <ul class="list-inline">
                <li class="list-inline-item"><a href="#">Privacy</a></li>
                <li class="list-inline-item"><a href="#">Terms</a></li>
                <li class="list-inline-item"><a href="#">Support</a></li>
            </ul>
        </footer>
    </body>

    </div>
</template>

<script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
    <script src="form-validation.js"></script>

<script>
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()




</script>


<style>
    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }
    @media (min-width: 768px) {
        .bd-placeholder-img-lg {
            font-size: 3.5rem;
        }
    }
    .container {
        max-width: 960px;
    }
</style>