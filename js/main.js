function getCurrentTime() {
    const n = document.querySelector(".display-time"); 

    fetch("https://worldtimeapi.org/api/ip")
        .then((response) => response.json())
        .then((data) => {
            const t = new Date(data.utc_datetime);
            const formattedTime = t.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
            });
            n.textContent = formattedTime; 
        })
        .catch(() => {
            const currentTime = new Date();
            const formattedTime = currentTime.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
            });
            n.textContent = formattedTime; 
        });
}

getCurrentTime();
setInterval(getCurrentTime, 900);
