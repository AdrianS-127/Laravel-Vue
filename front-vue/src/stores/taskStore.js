import { defineStore } from "pinia";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export const useTaskStore = defineStore("task", {
    state: () => ({
        tasks: [],
        newTask: "",
        loading: false,
        error: null,
    }),
    actions: {
        // Obtener tareas
        async getTasks() {
            try {
                const response = await axios.get(apiURL);
                console.log("Tareas recibidas:", response.data); // Verificar datos
        
                if (Array.isArray(response.data)) {
                    this.tasks = []; // Limpiar array antes de asignar
                    Object.assign(this.tasks, response.data); // Forzar reactividad
                } else {
                    console.error("Error: API no devuelve un array", response.data);
                }
            } catch (error) {
                console.error("Error obteniendo tareas:", error);
            }
        },

        // Agregar una tarea
        async addTask() {
            if (!this.newTask.trim()) {
                this.error = "La tarea no puede estar vacía.";
                return;
            }

            try {
                const response = await axios.post(apiURL, {
                    task: this.newTask,
                    completed: false,
                });
                this.tasks = [...this.tasks, response.data]; // Crear un nuevo array
                this.newTask = "";
                this.error = null;
            } catch (error) {
                console.error("Error adding task:", error);
                this.error = "Error al agregar la tarea.";
            }
        },

        // Eliminar tarea
        async deleteTask(id) {
            try {
                await axios.delete(`${apiURL}/${id}`);
                this.tasks = this.tasks.filter(task => task.id !== id);
            } catch (error) {
                console.error("Error deleting task:", error);
                this.error = "Error al eliminar la tarea.";
            }
        },

        // Actualizar tarea
        async updateTask(task) {
            try {
                const response = await axios.put(`${apiURL}/${task.id}`, task);
                this.tasks = this.tasks.map(t => (t.id === task.id ? response.data : t));
            } catch (error) {
                console.error("Error updating task:", error);
                this.error = "Error al actualizar la tarea.";
            }
        },
    },
});
