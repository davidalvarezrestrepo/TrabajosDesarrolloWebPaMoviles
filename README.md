# Parcial 1 - Desarrollo de Software para Plataformas Móviles

Estudiante: David Álvarez Restrepo
Rama: parcial-1-david-alvarez-restrepo

Este repositorio contiene las dos aplicaciones del Parcial 1: una PWA en React para administración de pacientes, y una app móvil en Ionic React para consulta de visitas médicas.

## Estructura

- pwa-react: Ejercicio 1, PWA React para administración de pacientes.
- ionic-react: Ejercicio 2, Ionic React para consulta de visitas.
- capturas_parcial_con_ejercicio1_y_ejercicio2: capturas de ambas aplicaciones.
- README.md: este archivo.

Cada aplicación es un proyecto independiente, con su propio package.json, sus propias dependencias y su propio localStorage. No comparten datos entre sí.

## Ejercicio 1 - PWA React

Aplicación web progresiva para administración de pacientes.

Cómo correr:

cd pwa-react
npm install
npm run dev

Abrir http://localhost:5173.

Usuarios fijos definidos en src/useLogin.ts:

- admin / admin123 (Administrador)
- jperez / jperez123 (Dr. Juan Pérez)
- mrodriguez / mr123 (Enf. María R.)

Funcionalidades:

- Login con validación contra la lista de usuarios fijos. Sesión persistida en localStorage y restaurada al recargar. Botón para cerrar sesión.
- Administración de pacientes con campos nombre, apellido, CC y teléfono. Persistencia en localStorage.
- Buscador por nombre, apellido o CC. El estado del buscador vive en el componente padre (Pacientes en AppRoot.tsx) y la lista filtrada se pasa como prop al hijo ListaPacientes.

Validaciones definidas:

- Nombre y apellido: solo letras (incluye tildes y ñ) y espacios.
- CC: solo dígitos, sin límite de longitud.
- CC duplicada: rechazada con mensaje de error.
- Teléfono: sin validación (el enunciado no lo pide).

## Ejercicio 2 - Ionic React

Aplicación móvil en Ionic React con tabs para consulta de visitas médicas.

Cómo correr:

cd ionic-react
npm install
ionic serve

Abrir http://localhost:8100.

Requiere @ionic/cli instalado globalmente: npm install -g @ionic/cli.

Usuario fijo definido en src/hooks/useLogin.ts:

- doc / doc123 (Dr. Rodríguez)

Funcionalidades:

- Login con componentes de Ionic (IonInput, IonButton). IonToast rojo si las credenciales son incorrectas. Sesión persistida en localStorage.
- Navegación con IonTabs: Visitas, Pacientes, Perfil.
- Visitas del día: lista las visitas cuya fecha coincide con la del día actual (calculada dinámicamente). Cada visita muestra paciente, hora y estado.
- Detalle de visita: ruta dinámica /visita/:id capturada con useParams. Botón para avanzar el estado siguiendo el flujo pendiente, en_camino, finalizada. Cambios persistidos en localStorage.
- Pacientes: lista de los 5 pacientes precargados.
- Perfil: datos de sesión y botón de logout.

Datos precargados:

- 5 pacientes en src/data/pacientesIniciales.ts.
- 5 visitas en src/data/visitasIniciales.ts: 3 con fecha de hoy (una por cada estado del flujo) y 2 en otros días.

## Consideraciones técnicas

- Ambos proyectos usan TypeScript.
- La PWA React usa React 19 y Vite.
- El proyecto Ionic usa Ionic 8 y React Router v6. La sintaxis de rutas difiere de la vista en clase (v5), pero el patrón /visita/:id con useParams funciona igual.
- No se utiliza backend. Toda la persistencia se hace con localStorage.

## Capturas

Las capturas de ambas aplicaciones están en la carpeta capturas_parcial_con_ejercicio1_y_ejercicio2.