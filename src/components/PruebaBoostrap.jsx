import React from 'react'

const pruebaBoostrap = () => {
    return (
      <body>
        <header class="navbar navbar-dark sticky-top  flex-md-nowrap p-0 border">
          <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href={() => false}>Doña Pepa</a>
          <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars text-dark"></i>
          </button>
          <div class="w-100"></div>
          <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
              <a class="nav-link text-dark"  href={() => false}>Sign out</a>
            </li>
          </ul>
        </header>
        <div class="container-fluid">
          <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
              <div class="position-sticky pt-3">
                <div class="accordion" id="accordionExample">

                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        DASHBOARD
                      </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <ul>
                          <li>sdasd</li>
                          <li>sdasd</li>
                          <li>sdasd</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        REPORTES ADMIN
                      </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                      <ul class="list-group">
                        <button class="list-group-item text-start">VENTAS</button>
                        <button class="list-group-item text-start">LIQUIDACIÓN MAESTRO</button>
                      </ul>                     
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        VENDEDORA
                      </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <ul>
                            <li>sdasd</li>
                            <li>sdasd</li>
                            <li>sdasd</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFor">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFor" aria-expanded="false" aria-controls="collapseFor">
                        MANTENIMIENTO
                      </button>
                    </h2>
                    <div id="collapseFor" class="accordion-collapse collapse" aria-labelledby="headingFor" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <ul>
                            <li>sdasd</li>
                            <li>sdasd</li>
                            <li>sdasd</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFive">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        CONFIGURACIÓN
                      </button>
                    </h2>
                    <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <ul>
                            <li>sdasd</li>
                            <li>sdasd</li>
                            <li>sdasd</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </nav>
        
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Dashboard</h1>
                
              </div>
            </main>
          </div>
        </div>
      </body>
    )
}

export default pruebaBoostrap

