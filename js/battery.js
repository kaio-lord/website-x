const batterylevel = document.querySelector('.battery-level');

navigator.getBattery().then(function(battery){
    const level = battery.level;
    const status = level * 100 +"%";
    document.getElementById('battery-percentage').innerHTML = ' '+status+' ';
    console.log(status);
}); 