# sec9-hooks-app

Proyecto de práctica de la **Sección 9** del curso *React: De cero a experto*. Cada carpeta dentro de `src/` corresponde a un ejercicio dedicado a un hook o patrón específico de React.

## Tecnologías

| Herramienta | Versión |
|---|---|
| React | 19 |
| TypeScript | 5.9 |
| Vite | 7 |
| Tailwind CSS | 4 |
| React Router | 7 |
| shadcn/ui (Radix UI) | — |
| Zod | 4 |
| Sonner | 2 |

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## Estructura del proyecto

```
src/
├── 01-useState/          # useState – Semáforo interactivo
├── 02-userEffect/        # useEffect + custom hook useTrafficLight
├── 03-examples/          # Custom hooks: useCounter, usePokemon (PokeAPI)
├── 04-useRef/            # useRef – Foco automático en input
├── 05-useReducer/        # useReducer – App de tareas con persistencia en localStorage
├── 06-memos/             # useMemo / memo – Optimización de renders
├── 07-useOptimistic/     # useOptimistic + useTransition – App estilo Instagram
├── 08-use-suspense/      # use + Suspense – Carga asíncrona de datos
├── 09-useContext/        # useContext – Autenticación y rutas protegidas
└── components/ui/        # Componentes reutilizables (shadcn/ui)
```

## Ejemplos incluidos

### 01 · `useState`
Semáforo que cicla entre rojo, amarillo y verde controlado con estado local.

### 02 · `useEffect`
Semáforo que cambia de color automáticamente usando `useEffect`. Versión adicional extrae la lógica a un custom hook `useTrafficLight`.

### 03 · Custom Hooks
- **`useCounter`** – Contador genérico con incremento, decremento y reinicio.
- **`usePokemon`** – Consulta la [PokéAPI](https://pokeapi.co/) para obtener datos de un Pokémon por ID.

### 04 · `useRef`
Pantalla con un botón que enfoca un campo de texto utilizando una referencia directa al DOM.

### 05 · `useReducer`
Aplicación de lista de tareas (To-Do) con acciones `ADD_TODO`, `TOGGLE_TODO` y `DELETE_TODO`. El estado se persiste en `localStorage` a través de `useEffect`.

### 06 · `useMemo` / `memo`
Comparación de renders con y sin memoización usando `useMemo` y `React.memo`.

### 07 · `useOptimistic`
Simulación de una app de comentarios estilo Instagram. Los comentarios se muestran de forma optimista antes de confirmarse en el servidor; en caso de error se revierten con una notificación via **Sonner**.

### 08 · `use` + Suspense
Componente `ClientInformation` que consume una promesa directamente con el hook `use` de React, combinado con `<Suspense>` para mostrar un estado de carga.

### 09 · `useContext`
App profesional con:
- Contexto global de autenticación (`UseContextProvider`).
- Navegación con **React Router v7**.
- Rutas protegidas mediante `PrivateRoute`.
- Páginas: `LoginPage`, `ProfilePage`, `AboutPage`.
