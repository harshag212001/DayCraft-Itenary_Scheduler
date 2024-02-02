document.addEventListener('DOMContentLoaded', () => {
    // Check if the browser supports notifications
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
            }
        });
    }
});

function addTask() {
    const task = document.getElementById('task').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `<strong>${task}</strong> from ${startTime} to ${endTime}`;

    document.getElementById('schedule-list').appendChild(taskElement);

    scheduleNotification(task, startTime, 'start');
    scheduleNotification(task, endTime, 'end');
}

function scheduleNotification(task, time, type) {
    const timeComponents = time.split(':');
    const hours = parseInt(timeComponents[0], 10);
    const minutes = parseInt(timeComponents[1], 10);
    const seconds = parseInt(timeComponents[2] || '0', 10);

    const notificationTime = new Date();
    notificationTime.setHours(hours, minutes, seconds);

    const now = new Date();

    if (notificationTime > now) {
        const timeDiff = notificationTime - now;

        setTimeout(() => {
            showNotification(task, type);
            playNotificationSound(); // Play the notification sound
        }, timeDiff);
    }
}

function showNotification(task, type) {
    const notification = new Notification(`Task ${type}: ${task}`, {
        body: `It's time to ${type} your task!`,
    });

    // You can customize the notification further if needed
}

function playNotificationSound() {
    const audio = new Audio('notification_sound.mp3.wav'); // Replace with the path to your notification sound file
    audio.play();
}
