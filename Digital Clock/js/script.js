
function clock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format and with 0 if it is less 10
    hours = (hours % 12 || 12).toString().padStart(2, '0');

    // Get date components
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = monthNames[month];
    // Format the time string
    const time = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.querySelector('#clock').textContent = time;

    // Format the date string
    const date = `${monthName} ${day}, ${year}`;
    document.querySelector('#date').textContent = date
}

// Update the clock immediately and then every second
clock();
setInterval(clock, 1000);
