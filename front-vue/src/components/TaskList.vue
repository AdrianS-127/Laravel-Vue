<script setup>
import { useTaskStore } from "../stores/taskStore"; // Asegúrate de importar correctamente
import { onMounted } from "vue";

// Accede correctamente al store
const taskStore = useTaskStore();

onMounted(() => {
    console.log("onMounted ejecutado, obteniendo tareas...");
    taskStore.getTasks(); // Asegúrate de que se ejecute
});
</script>

<template>
    <div class="todo-container">
        <h1 class="title">Task List</h1>
        <form @submit.prevent="taskStore.addTask" class="task-form">
        <input 
            type="text" 
            v-model="taskStore.newTask" 
            placeholder="Add a task" 
            class="task-input"
        />
        </form>

        <ul class="task-list">
            <li v-for="task in taskStore.tasks" :key="task.id" class="task-item">
                <input 
                    type="checkbox" 
                    v-model="task.completed" 
                    @change="taskStore.updateTask(task)" 
                    class="task-checkbox"
                />
                <span :class="{ completed: task.completed }">
                    {{ task.task }}
                </span>
                <button @click="taskStore.deleteTask(task.id)" class="delete-button">X</button>
            </li>
        </ul>
    </div>
</template>
