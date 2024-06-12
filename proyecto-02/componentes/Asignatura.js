class Materia extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const nombre = this.getAttribute('nombre');
        const docente = this.getAttribute('docente');
        const imagen = this.getAttribute('imagen');

        this.shadowRoot.innerHTML = `
            <style>
                .materia-card {
                    border: 1px solid black;
                    width: 200px;
                    height: 300px;
                    padding: 10px;
                    margin: 10px;
                    background-color: white;
                    border-radius: 5px;
                    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
                    transition: background-color 1.5s;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    cursor: pointer;
                }

                .materia-card:hover {
                    background-color: rgb(211, 157, 87);
                }

                .materia-card img {
                    width: 100%;
                    height: auto;
                    border-radius: 5px;
                    margin-bottom: 15px;
                }

                .materia-card .docente {
                    margin-top: 10px;
                    font-size: 16px;
                    font-weight: bold;
                }
            </style>

            <div class="materia-card">
                <img src="${imagen}" alt="${nombre}">
                <div class="nombre">Materia: ${nombre}</div>
                <div class="docente">Docente: ${docente}</div>
            </div>
        `;

        this.shadowRoot.querySelector('.materia-card').addEventListener('click', () => {
            let paginas = '';
            if (nombre === 'POO') {
                paginas = 'estudiantes_poo.html';
            } else if (nombre === 'Taller Web') {
                paginas = 'estudiantes_taller.html';
            } else if (nombre === 'Base de datos') {
                paginas = 'estudiantes_bd.html';
            }
            window.location.href = paginas;
        });
    }
}

customElements.define('materia-card', Materia);

