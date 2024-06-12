document.addEventListener('DOMContentLoaded', () => {
    const guardarBtn = document.getElementById('guardar-btn');
    const editarBtn = document.getElementById('editar-btn');
    const estudiantes = document.querySelectorAll('estudiante-card');
    const modal = document.getElementById('infoModal');
    const totalAlumnosP = document.getElementById('total-alumnos');
    const alumnosPresentesP = document.getElementById('alumnos-presentes');
    const alumnosAusentesP = document.getElementById('alumnos-ausentes');
    const alumnosLicenciaP = document.getElementById('alumnos-licencia');

    const materia = document.querySelector('.maestro h2').textContent.split(': ')[1]; // Obtén el nombre de la materia

    function actualizarEstadoEdicion(desbloquear) {
        estudiantes.forEach(estudiante => {
            const estadoBtn = estudiante.shadowRoot.querySelector('.estado-btn');
            const justificacionInput = estudiante.shadowRoot.querySelector('.justificacion-input');
            const borrarJustificacionBtn = estudiante.shadowRoot.querySelector('.borrar-justificacion');

            // Deshabilitar o habilitar los botones de estado y el input de justificación
            estadoBtn.disabled = !desbloquear;
            justificacionInput.disabled = !desbloquear;

            // Mostrar u ocultar el botón de eliminar justificación si hay justificación guardada
            if (justificacionInput.value) {
                borrarJustificacionBtn.style.display = desbloquear ? 'inline' : 'none';
            }
        });

        // Ocultar el botón de editar y mostrar el de guardar
        editarBtn.style.display = desbloquear ? 'none' : 'inline-block';
        guardarBtn.style.display = desbloquear ? 'inline-block' : 'none';
    }

    guardarBtn.addEventListener('click', () => {
        let totalAlumnos = 0;
        let alumnosPresentes = 0;
        let alumnosAusentes = 0;
        let alumnosLicencia = 0;

        estudiantes.forEach(estudiante => {
            const nombre = estudiante.getAttribute('nombre');
            const estadoBtn = estudiante.shadowRoot.querySelector('.estado-btn');
            const justificacionInput = estudiante.shadowRoot.querySelector('.justificacion-input');
            const justificacionDisplay = estudiante.shadowRoot.querySelector('.justificacion-display');

            // Guardar el estado y justificación en el localStorage
            localStorage.setItem(`estado-${nombre}`, estadoBtn.textContent);
            localStorage.setItem(`justificacion-${nombre}`, justificacionInput.value);

            // Deshabilitar los botones de estado y el input de justificación
            estadoBtn.disabled = true;
            justificacionInput.disabled = true;
            justificacionDisplay.style.display = 'block';
            justificacionInput.style.display = 'none';

            // Contar los estados
            totalAlumnos++;
            if (estadoBtn.textContent === 'Presente') {
                alumnosPresentes++;
            } else if (estadoBtn.textContent === 'Ausente') {
                alumnosAusentes++;
            } else if (estadoBtn.textContent === 'Licencia') {
                alumnosLicencia++;
            }
        });

        // Guardar el estado de edición bloqueada
        localStorage.setItem(`edicion-bloqueada-${materia}`, 'true');

        // Mostrar el resumen en el modal
        totalAlumnosP.textContent = `Total de alumnos: ${totalAlumnos}`;
        alumnosPresentesP.textContent = `Alumnos presentes: ${alumnosPresentes}`;
        alumnosAusentesP.textContent = `Alumnos ausentes: ${alumnosAusentes}`;
        alumnosLicenciaP.textContent = `Alumnos con licencia: ${alumnosLicencia}`;

        // Mostrar el modal
        modal.style.display = 'block';

        // Ocultar el botón de guardar y mostrar el de editar
        guardarBtn.style.display = 'none';
        editarBtn.style.display = 'inline-block';
    });

    editarBtn.addEventListener('click', () => {
        // Habilitar los botones de estado y el input de justificación
        actualizarEstadoEdicion(true);

        // Quitar el estado de edición bloqueada
        localStorage.setItem(`edicion-bloqueada-${materia}`, 'false');
    });

    // Cargar el estado guardado al cargar la página
    estudiantes.forEach(estudiante => {
        const nombre = estudiante.getAttribute('nombre');
        const estadoGuardado = localStorage.getItem(`estado-${nombre}`);
        const justificacionGuardada = localStorage.getItem(`justificacion-${nombre}`);
        const estadoBtn = estudiante.shadowRoot.querySelector('.estado-btn');
        const justificacionInput = estudiante.shadowRoot.querySelector('.justificacion-input');
        const justificacionDisplay = estudiante.shadowRoot.querySelector('.justificacion-display');

        if (estadoGuardado) {
            estadoBtn.textContent = estadoGuardado;

            // Ajustar la clase del botón de estado según el estado guardado
            if (estadoGuardado === 'Presente') {
                estadoBtn.className = 'estado-btn presente';
            } else if (estadoGuardado === 'Ausente') {
                estadoBtn.className = 'estado-btn ausente';
            } else if (estadoGuardado === 'Licencia') {
                estadoBtn.className = 'estado-btn licencia';
            }
        }

        if (justificacionGuardada) {
            justificacionInput.value = justificacionGuardada;
            justificacionDisplay.textContent = justificacionGuardada;
            justificacionDisplay.style.display = 'block';
            justificacionInput.style.display = 'none';
        }
    });

    // Verificar el estado de edición bloqueada al cargar la página
    const edicionBloqueada = localStorage.getItem(`edicion-bloqueada-${materia}`) === 'true';
    if (edicionBloqueada) {
        actualizarEstadoEdicion(false);
    }
});