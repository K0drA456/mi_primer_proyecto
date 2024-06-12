class Estudiante extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const nombre = this.getAttribute('nombre');
        const edad = this.getAttribute('edad');
        const imagen = this.getAttribute('imagen');
        
        const guardarJustificacion = localStorage.getItem(`justificacion-${nombre}`) || '';

        this.shadowRoot.innerHTML = `
            <style>
            .estudiante-card {
                border: 3px solid black;
                width: 200px;
                height: 300px;
                padding: 10px;
                background-color: white;
                margin: 10px;
                border-radius: 5px;
                box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
            }

            .estudiante-card img {
                width: 60%;
                height: auto;
                border-radius: 5px;
            }

            .estudiante-card .nombre, .estudiante-card .edad {
                margin-top: 10px;
            }

            .estudiante-card .estado {
                margin-top: 10px;
            }

            .estudiante-card .estado button {
                padding: 10px 50px;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .estudiante-card .estado button.presente {
                background-color: #d4edda; /* Verde claro */
            }
            
            .estudiante-card .estado button.ausente {
                background-color: #f8d7da; /* Rojo claro */
            }
            
            .estudiante-card .estado button.licencia {
                background-color: #a6d8ec; /* Azul más fuerte */
            }
            
            .justificacion-input {
                margin-top: 10px;
                padding: 15px 10px;
            }

            .justificacion-display {
                margin-top: 10px;
                font-style: italic;
            }

            .borrar-justificacion {
                color: red;
                cursor: pointer;
            }
        </style>

            <div class="estudiante-card">
                <img src="${imagen}" alt="${nombre}">
                <div class="nombre">Nombre: ${nombre}</div>
                <div class="edad">Edad: ${edad}</div>

                <div class="estado">
                    <button class="estado-btn presente">Presente</button>
                </div>

                <input type="text" class="justificacion-input" placeholder="Justificación" style="display: none;">
                <div class="justificacion-display">${guardarJustificacion}</div>
                <span class="borrar-justificacion" style="display: ${guardarJustificacion ? 'inline' : 'none'}">(Eliminar justificación)</span>
            </div>
    `;

        const estadoBtn = this.shadowRoot.querySelector('.estado-btn');
        const justificacionInput = this.shadowRoot.querySelector('.justificacion-input');
        const justificacionDisplay = this.shadowRoot.querySelector('.justificacion-display');
        const borrarJustificacionBtn = this.shadowRoot.querySelector('.borrar-justificacion');

        
        estadoBtn.addEventListener('click', () => {
            const estados = ['Presente', 'Ausente', 'Licencia'];
            const currentState = estadoBtn.textContent;
            const nextState = estados[(estados.indexOf(currentState) + 1) % 3];
            estadoBtn.textContent = nextState;


            
            //funcion para que te muestre los colorsitos
            if (nextState === 'Licencia') {
                estadoBtn.className = 'estado-btn licencia';
                justificacionInput.style.display = 'block';
                justificacionDisplay.style.display = 'none';
            } else {
                justificacionInput.style.display = 'none';
                justificacionDisplay.style.display = 'none';
                if (nextState === 'Presente') {
                    estadoBtn.className = 'estado-btn presente';
                } else if (nextState === 'Ausente') {
                    estadoBtn.className = 'estado-btn ausente';
                }
            }
        });


        justificacionInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                const justificacion = justificacionInput.value;
                
                localStorage.setItem(`justificacion-${nombre}`, justificacion);
                justificacionDisplay.textContent = justificacion;
                
                justificacionInput.style.display = 'none';
                justificacionDisplay.style.display = 'block';

                borrarJustificacionBtn.style.display = 'inline';
            }
        });


        borrarJustificacionBtn.addEventListener('click', () => {
            localStorage.removeItem(`justificacion-${nombre}`);
            justificacionDisplay.textContent = '';

            justificacionInput.value = '';
            justificacionInput.style.display = 'block';
            borrarJustificacionBtn.style.display = 'none';
        });
    }
}

customElements.define('estudiante-card', Estudiante);