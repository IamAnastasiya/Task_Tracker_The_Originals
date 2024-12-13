<template>
    <div id="app">
        <header>
            <h1>Task Manager</h1>
            <div>
                <img src="./public/images/notification.svg" alt="notification_icon" />
                <img src="./public/images/time.svg" alt="time_icon" />
            </div>
        </header>
        <main>
            <Dashboard />
        </main>
    </div>
</template>

<script>
import Dashboard from '@/components/TaskBoard.vue'

export default {
    components: {
        Dashboard,
    },
}
</script>

<style>
* {
    margin: 0;
    box-sizing: border-box;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: rgba(0, 0, 0, 0.7);
    text-align: center;
    opacity: 0.8;
    background-image: url('./public/images/bg-img.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    height: 100vh;
    margin: 0;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
}

header {
    background: linear-gradient(
        90deg,
        rgba(201, 191, 183, 1) 33%,
        rgba(169, 157, 153, 1) 57%,
        rgba(169, 157, 153, 1) 98%
    );
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 155px 10px 155px;
    color: #fff;
}

header h1 {
    font-size: 22px;
    padding: 5px 7px;
    border: 1px solid #fff;
    border-radius: 4px;
}

header div {
    max-width: 70px;
    width: 100%;
    padding-top: 10px;
}

header div img {
    cursor: pointer;
}

header div img:first-of-type {
    margin-right: 10px;
}

@media (max-width: 1200px) {
    header {
        padding: 10px 20px;
    }
}

@media (max-width: 600px) {
    header h1 {
        font-size: 20px;
    }
}
</style>
