<template>
    <div
        class="task-list"
        :class="{ 'drag-over': isDragOver }"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @dragover.prevent
        @drop="handleDrop">
        <h2>{{ status }}</h2>
        <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" />
        <button class="add-task-btn" @click="showAddTaskModal = true">+ Add Task</button>

        <Modal :show="showAddTaskModal" @close="closeAddTaskModal">
            <TaskDetails :task="newTask" :isEditing="false" @saveTask="handleSaveTask" />
        </Modal>
    </div>
</template>

<script>
import { useTaskStore } from '../store/taskStore'
import TaskCard from './TaskCard.vue'
import Modal from './Modal.vue'
import TaskDetails from './TaskDetails.vue'

export default {
    name: 'TaskList',
    components: {
        TaskCard,
        Modal,
        TaskDetails,
    },
    props: {
        status: String,
    },
    data() {
        return {
            isDragOver: false,
            showAddTaskModal: false,
            newTask: {
                title: '',
                description: '',
                responsible: '',
                priority: 'Low',
                status: this.status,
            },
        }
    },
    computed: {
        tasks() {
            const taskStore = useTaskStore()
            return taskStore.tasks
        },
        filteredTasks() {
            return this.tasks.filter((task) => task.status === this.status)
        },
    },
    methods: {
        handleDragEnter() {
            this.isDragOver = true
        },
        handleDragLeave() {
            this.isDragOver = false
        },
        handleDrop(event) {
            this.isDragOver = false
            const taskId = event.dataTransfer.getData('taskId')
            if (!taskId) return

            const taskStore = useTaskStore()
            taskStore.updateTaskStatus(taskId, this.status)
        },
        closeAddTaskModal() {
            this.showAddTaskModal = false
            this.resetNewTask()
        },
        handleSaveTask(task) {
            const taskStore = useTaskStore()
            taskStore.addTask(task)
            this.closeAddTaskModal()
        },
        resetNewTask() {
            this.newTask = {
                title: '',
                description: '',
                responsible: '',
                priority: 'Low',
                status: this.status,
            }
        },
    },
}
</script>

<style scoped>
.task-list {
    min-height: 400px;
    max-width: 600px;
    width: 100%;
    padding: 10px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: rgba(171, 153, 148, 0.1);
    transition: background-color 0.3s, border-color 0.3s;
}

.task-list.drag-over {
    background-color: rgba(171, 153, 148, 0.3);
    border: 2px dotted #7383d4;
}

.task-list h2 {
    text-align: start;
    font-size: 16px;
    margin-bottom: 30px;
    padding-left: 20px;
}

.add-task-btn {
    padding: 5px 10px;
    background-color: transparent;
    color: rgba(16, 15, 15, 0.8);
    width: 100%;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.add-task-btn:hover,
.add-task-btn:focus {
    background-color: rgba(16, 15, 15, 0.1);
    color: #000000;
}
</style>
