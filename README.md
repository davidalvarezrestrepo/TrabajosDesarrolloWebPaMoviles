# Parcial 1 — Desarrollo de Software para Plataformas Móviles

**Estudiante:** David Álvarez Restrepo
**Rama:** `parcial-1-david-alvarez-restrepo`

Este repositorio contiene las dos aplicaciones solicitadas en el Parcial 1: una PWA en React para administración de pacientes, y una app móvil en Ionic React para consulta de visitas médicas.

## Estructura del repositorio
├── pwa-react/ Ejercicio 1 — PWA React (administración de pacientes)
├── ionic-react/ Ejercicio 2 — Ionic React (visitas médicas)
├── capturas_parcial_con_ejercicio1_y_ejercicio2/ Capturas de pantalla de ambas apps
└── README.md Este archivo



Ambas aplicaciones son proyectos independientes: cada uno tiene su propio `package.json`, sus propias dependencias y su propio `localStorage`. **No comparten datos entre sí**, como indica el enunciado.

---

## Ejercicio 1 — PWA React

Aplicación web progresiva para administración de pacientes de la clínica MediClinic.

### Cómo correr

```bash
cd pwa-react
npm install
npm run dev
```

Abrir `http://localhost:5173/`.

### Credenciales de prueba

La app tiene tres usuarios fijos definidos en `src/useLogin.ts`:

| Usuario       | Contraseña   | Nombre           |
|---------------|--------------|------------------|
| `admin`       | `admin123`   | Administrador    |
| `jperez`      | `jperez123`  | Dr. Juan Pérez   |
| `mrodriguez`  | `mr123`      | Enf. María R.    |

### Funcionalidades

- **Login** con validación contra la lista de usuarios fijos. La sesión se guarda en `localStorage` y se restaura al recargar. Al cerrar sesión, se limpia la clave.
- **Administración de pacientes** con campos: nombre, apellido, CC y teléfono. Persistencia en `localStorage`.
- **Buscador** por nombre, apellido o CC. El estado del buscador vive en el componente padre (`Pacientes` dentro de `AppRoot.tsx`) y la lista filtrada se pasa como prop al hijo `ListaPacientes`, como indica el enunciado.

### Validaciones definidas

Donde el enunciado da libertad, se tomaron estas decisiones:

- **Nombre y apellido:** solo letras (incluye tildes y ñ) y espacios.
- **CC:** solo dígitos, sin límite de longitud.
- **CC duplicada:** rechazada con mensaje de error.
- **Teléfono:** sin validación (el enunciado no pide validarlo).

---

## Ejercicio 2 — Ionic React

Aplicación móvil en Ionic React con tabs para consulta de visitas médicas del día.

### Cómo correr

```bash
cd ionic-react
npm install
ionic serve
```

Abrir `http://localhost:8100/`.

Requiere tener `@ionic/cli` instalado globalmente:
```bash
npm install -g @ionic/cli
```

### Credenciales de prueba

Un solo usuario fijo definido en `src/hooks/useLogin.ts`:

| Usuario | Contraseña | Nombre         |
|---------|------------|----------------|
| `doc`   | `doc123`   | Dr. Rodríguez  |

### Funcionalidades

- **Login** con componentes de Ionic (`IonInput`, `IonButton`). Al ingresar credenciales incorrectas se muestra un `IonToast` rojo. Sesión persistida en `localStorage`.
- **Navegación con `IonTabs`**: Visitas, Pacientes, Perfil.
- **Visitas del día:** lista las visitas cuya fecha coincide con la del día actual (calculada dinámicamente). Cada visita muestra paciente, hora y estado con un `IonBadge` de color.
- **Detalle de visita:** ruta dinámica `/visita/:id` capturada con `useParams`. Muestra los datos completos y un botón para avanzar el estado siguiendo el flujo `pendiente → en_camino → finalizada`. Cambios persistidos en `localStorage`.
- **Pacientes:** lista de los 5 pacientes precargados (datos estáticos).
- **Perfil:** datos de sesión y botón de logout.

### Datos precargados

- **5 pacientes** en `src/data/pacientesIniciales.ts`.
- **5 visitas** en `src/data/visitasIniciales.ts`: 3 con fecha de hoy (una por cada estado del flujo para mostrar la variedad visual) y 2 en otros días (mañana y ayer) que existen en los datos pero no aparecen en el listado del día.

---

## Consideraciones técnicas

- Ambos proyectos usan **TypeScript**.
- La PWA React usa **React 19 + Vite**.
- El proyecto Ionic usa **Ionic 8 + React Router v6**. La sintaxis de rutas difiere ligeramente de la vista en clase (v5), pero el patrón `/visita/:id` + `useParams` funciona idéntico.
- No se utiliza backend. Toda la persistencia se hace con `localStorage`.

## Capturas

Las capturas de pantalla de ambas aplicaciones funcionando están en la carpeta `capturas_parcial_con_ejercicio1_y_ejercicio2/`.