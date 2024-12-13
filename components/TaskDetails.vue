<template>
    <div class="task-details">
        <form @submit.prevent="saveTask">
            <label>
                <input v-model="editableTask.title" placeholder="Title" type="text" required />
            </label>
            <label>
                <textarea v-model="editableTask.description" placeholder="Description"></textarea>
            </label>
            <label>
                <input v-model="editableTask.responsible" type="text" placeholder="Assignee" />
            </label>
            <label>
                Priority:
                <select v-model="editableTask.priority">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </label>
            <label v-if="isEditing">
                Status:
                <select v-model="editableTask.status">
                    <option>TODO</option>
                    <option>In Progress</option>
                    <option>Done</option>
                </select>
            </label>
            <button type="submit">OK</button>
        </form>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
    name: 'TaskDetails',
    props: {
        isEditing: {
            type: Boolean,
            default: false,
        },
        task: {
            type: Object,
            default: () => ({
                id: null,
                title: '',
                description: '',
                responsible: '',
                priority: 'Low',
                status: 'TODO',
            }),
        },
    },
    data() {
        return {
            editableTask: { ...this.task },
        }
    },
    emits: ['saveTask'],
    methods: {
        saveTask() {
            const taskToSave = this.isEditing ? { ...this.editableTask } : { ...this.editableTask, id: uuidv4() }

            this.$emit('saveTask', taskToSave)
        },
    },
    watch: {
        task(newTask) {
            this.editableTask = { ...newTask }
        },
    },
}
</script>

<style scoped>
form {
    padding-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: Arial, Helvetica, sans-serif;
}

input,
textarea,
select {
    width: 100%;
    max-width: 400px;
    min-height: 30px;
    border: 1px solid #808080;
    border-radius: 5px;
    padding: 3px 5px;
    color: #808080;
    font-family: inherit;
}

textarea {
    min-height: 140px;
}

input::placeholder,
textarea::placeholder {
    font-size: 12px;
}

label {
    font-size: 14px;
    text-align: start;
    color: #000000;
}

select {
    font-size: 12px;
}

button {
    align-self: flex-end;
    padding: 5px 0;
    min-width: 100px;
    background-color: #fff;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    font-size: 10px;
    font-weight: 400;
    color: #000000;
    transition: background-color 0.3s;
}

button:hover,
button:active {
    background-color: #ccc;
}
</style>
