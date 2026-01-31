import * as z from 'zod';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskState {
    todos: Todo[];
    length: number;
    completed: number;
    pending: number;
};

// payload es el valor o argumento que se pasa a la accion
export type TaskAction =
    | { type: 'ADD_TODO', payload: string }
    | { type: 'TOGGLE_TODO', payload: number }
    | { type: 'DELETE_TODO', payload: number };

const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean(),
});

const TaskStateSchema = z.object({
    todos: z.array(TodoSchema),
    length: z.number(),
    completed: z.number(),
    pending: z.number(),
});

export const getTaskInitialState = (): TaskState => {
    const localStorageState = localStorage.getItem('tasks-state');

    if (!localStorageState) {
        return {
            todos: [],
            length: 0,
            completed: 0,
            pending: 0,
        };
    }

    // validar el estado con zod
    const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));

    if (result.error) {
        console.log(result.error);

        return {
            todos: [],
            length: 0,
            completed: 0,
            pending: 0,
        };
    }

    //return JSON.parse(localStorageState) as TaskState;
    return result.data;
};

// un reducer es una funcion que siempre debe regresar un estado nuevo o siempre regresar un valor
export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {

    switch (action.type) {
        case 'ADD_TODO': {
            if (action.payload.trim().length === 0) return state;

            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload.trim(),
                completed: false,
            };

            return {
                ...state,
                // regresamos un nuevo arreglo de To-dos sobreescribiendo el anterior de ...state.todos todos: [...state.todos, newTodo],
                todos: [...state.todos, newTodo],
                length: state.todos.length + 1,
                pending: state.pending + 1,
                // el completed no cambia al agregar una nueva tarea, ya va en el spread ...state
                //completed: state.completed,
            };
        }

        case 'DELETE_TODO': {
            const currentTodos = state.todos.filter((todo) => todo.id !== action.payload);

            return {
                ...state,
                todos: currentTodos,
                length: currentTodos.length,
                completed: currentTodos.filter((todo) => todo.completed).length,
                pending: currentTodos.filter((todo) => !todo.completed).length,
            };
        }


        case 'TOGGLE_TODO':
            const updatedTodos = state.todos.map(todo => {
                if (todo.id === action.payload) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })

            return {
                ...state,
                todos: updatedTodos,
                completed: updatedTodos.filter(todo => todo.completed).length,
                pending: updatedTodos.filter(todo => !todo.completed).length,
            };


        default:
            return state;
    }

};