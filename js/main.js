// New time subsystem for 3kh0 and Hagia. 
const displayTime1 = document.querySelector(".display-time");


function showTime1(format) {
  let time = new Date();

  displayTime1.innerText = time.toLocaleTimeString("en-US", {
    hour12: format,
    hour: '2-digit',
    minute: '2-digit'
  });

}

showTime1(false);