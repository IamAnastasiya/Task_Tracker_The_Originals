import { defineStore } from 'pinia'

export interface Task {
    id: string
    title: string
    description: string
    responsible: string
    assignees: string[]
    status: 'TODO' | 'In Progress' | 'Done'
    priority: 'Low' | 'Medium' | 'High'
}

export const useTaskStore = defineStore('taskStore', {
    state: (): { tasks: Task[] } => ({
        tasks: [
            {
                id: '1',
                title: 'Create Vue App',
                description: 'Complete Task Manager app similar to Trello',
                responsible: 'Alex',
                assignees: ['Kate', 'Leo'],
                status: 'TODO',
                priority: 'Medium',
            },
            {
                id: '2',
                title: 'Create Figma mockup',
                description: 'Create Figma mockup for Task Management App',
                responsible: 'John',
                assignees: ['Jane'],
                status: 'In Progress',
                priority: 'Low',
            },
            {
                id: '3',
                title: 'Issue Invoices',
                description: 'Issue Invoices to Bellabit',
                responsible: 'Sarah',
                assignees: ['Emy', 'Steve'],
                status: 'Done',
                priority: 'Low',
            },
        ],
    }),
    actions: {
        addTask(task: Task) {
            this.tasks.push(task)
        },
        updateTask(id: string, updatedTask: Task) {
            const index = this.tasks.findIndex((task) => task.id === id)
            if (index !== -1) {
                this.tasks[index] = { ...updatedTask }
            }
        },
        deleteTask(id: string) {
            this.tasks = this.tasks.filter((task) => task.id !== id)
        },
        updateTaskStatus(id: string, newStatus: 'TODO' | 'In Progress' | 'Done') {
            const task = this.tasks.find((task) => task.id === id)
            if (task) task.status = newStatus
        },
    },
})
