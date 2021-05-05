 // counter time 

    let countDate = new Date('Dec 14, 2021 00:00:00').getTime();
    let countInterval = setInterval(function() {
        
        let now = new Date().getTime();

        let shouldBe = countDate - now;

        let days = Math.floor(shouldBe / (1000 * 60 * 60 * 24));
        let hours = Math.floor((shouldBe % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((shouldBe % (1000 * 60 * 60)) / (1000 * 60));
        let second = Math.floor((shouldBe % (1000 * 60)) / 1000);

        let countDay = document.querySelector('.counter_day').textContent = days;
        let counthour = document.querySelector('.counter_hours').textContent = hours;
        let countMinutes = document.querySelector('.counter_minutes').textContent = minutes;
        let countSecond = document.querySelector('.counter_second').textContent = second;
    }, 1000);