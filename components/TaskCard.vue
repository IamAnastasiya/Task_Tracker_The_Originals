<template>
    <div class="task-card" draggable="true" @dragstart="startDrag" @dblclick="openEditModal">
        <p class="flex-grow">{{ task.title }}</p>
        <div>
            <button class="action-button" @click="openEditModal">
                <img src="../public/images/edit.svg" alt="edit" />
            </button>
            <button class="action-button" @click="deleteTask">
                <img src="../public/images/delete.svg" alt="delete" />
            </button>
        </div>

        <Modal v-if="showEditModal" :show="showEditModal" @close="closeEditModal">
            <TaskDetails :task="editingTask" :isEditing="true" @saveTask="updateTask" />
        </Modal>
    </div>
</template>

<script>
import { useTaskStore } from '@/store/taskStore'
import Modal from './Modal.vue'
import TaskDetails from './TaskDetails.vue'

export default {
    name: 'TaskCard',
    components: {
        Modal,
        TaskDetails,
    },
    props: {
        task: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            showEditModal: false,
            editingTask: { ...this.task },
        }
    },
    methods: {
        startDrag(event) {
            event.dataTransfer.setData('taskId', this.task.id.toString())
        },
        openEditModal() {
            this.editingTask = { ...this.task }
            this.showEditModal = true
        },
        closeEditModal() {
            this.showEditModal = false
        },
        updateTask(updatedTask) {
            const taskStore = useTaskStore()
            taskStore.updateTask(this.task.id, {
                ...updatedTask,
                id: this.task.id,
            })
            this.closeEditModal()
        },
        deleteTask() {
            const taskStore = useTaskStore()
            taskStore.deleteTask(this.task.id)
        },
    },
}
</script>

<style scoped>
.task-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 15px;
    border: 1px solid #b0abab;
    border-radius: 10px;
    background-color: rgba(249, 249, 252, 0.9);
    cursor: grab;
    font-size: 14px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: 100;
}
.task-card:active {
    cursor: grabbing;
}

.action-button {
    border: none;
    background-color: rgba(234, 232, 232, 0.1);
    cursor: pointer;
    padding: 2px 3px;
    cursor: pointer;
}

@media (max-width: 800px) {
    .task-card {
        padding: 3px 0 3px 8px;
        margin: 5px;
        font-size: 12px;
    }
}
</style>
