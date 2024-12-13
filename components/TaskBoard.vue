<template>
    <div class="dashboard">
        <ul class="task-lists">
            <TaskList status="TODO" />
            <TaskList status="In Progress" />
            <TaskList status="Done" />
        </ul>
        <Modal v-if="showModal" :show="showModal" @close="closeModal">
            <TaskDetails :task="newTask" @saveTask="addTask" />
        </Modal>
    </div>
</template>

<script>
import TaskList from './TaskList.vue'
import Modal from './Modal.vue'
import TaskDetails from './TaskDetails.vue'
import { useTaskStore } from '@/store/taskStore'

export default {
    components: {
        TaskList,
        Modal,
        TaskDetails,
    },
    data() {
        return {
            showModal: false,
            newTask: {
                id: null,
                title: '',
                description: '',
                assignee: '',
                priority: 'Low',
                status: 'TODO',
            },
        }
    },
    methods: {
        openModal() {
            this.newTask = {
                id: null,
                title: '',
                description: '',
                assignee: '',
                priority: 'Low',
                status: 'TODO',
            }
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
        },
        addTask(task) {
            const store = useTaskStore()
            store.addTask(task)
            this.closeModal()
        },
    },
}
</script>

<style scoped>
.dashboard {
    padding: 20px 150px;
}

.task-lists {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
}

@media (max-width: 1200px) {
    .dashboard {
        padding: 20px;
    }

    .task-lists {
        gap: 10px;
    }
}

@media (max-width: 500px) {
    .task-lists {
        flex-direction: column;
    }
}
</style>
