$(document).ready(function() {

    $("#icon-button").on("click", function(event) {
        event.preventDefault();
        let cityInput = $("#input").val();
        let inputCities = [];

        
        inputCities = JSON.parse(localStorage.getItem("inputCities")) || [];
        inputCities.push(cityInput);
        localStorage.setItem("inputCities", JSON.stringify(inputCities));

        displayWeather(cityInput);
    });

  
    function displayWeather(cityInput) {

    
        $("#daily-weather").empty();
        $("#six-days").empty();
        $("#day-1").empty();
        $("#day-2").empty();
        $("#day-3").empty();
        $("#day-4").empty();
        $("#day-5").empty();
        $("#day-6").empty();

        
        let currentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput +
        "&appid=e33dba3bd5bd69def6f8a70c46e51064&units=imperial";
        console.log(currentDay)
       
        $.ajax({
            url: currentDay,
            method: "GET",
        }).then(function(weatherResponse) {
            
            
            let currentDate = moment().format("M/DD/YYYY");

            
            let weatherIcon = "http://openweathermap.org/img/w/" 
            + weatherResponse.weather[0].icon + ".png";

            
            $("#daily-weather").append(
                "<div class='col s12 m6'>" 
                + "<h2 class='daily'>" + weatherResponse.name + " ( " + currentDate + " )" + "&nbsp" 
                + "<img src='" + weatherIcon + "'>" + "</h2>"
                + "<ul class='daily'>" + "Temperature: " + weatherResponse.main.temp + " °F" + "</ul>" 
                + "<ul class='daily'>" + "Humidity: " + weatherResponse.main.humidity + " %" + "</ul>" 
                + "<ul class='daily'>" + "Wind Speed: " + weatherResponse.wind.speed +" mph" + "</ul>" 
                + "</div>"
            );

            
            let coordinateLat = weatherResponse.coord.lat;
           
            let coordinateLon = weatherResponse.coord.lon;
            
            
            let fiveDays = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordinateLat + 
            "&lon=" + coordinateLon + "&appid=e33dba3bd5bd69def6f8a70c46e51064&units=imperial";
            
            
            $.ajax({
                url: fiveDays,
                method: "GET",
            }).then(function(weatherResponse) {
                $("#daily-weather").append(
                    "<div class='col s12 m6'>" 
                    + "<button class='uvi-btn' id='uvIndex' class='daily'>" + "UV Index: " 
                    + weatherResponse.current.uvi + "</button>"
                    + "</div>"
                );

                
                if (weatherResponse.current.uvi <= 2.99) {
                    $("#uvIndex").addClass("low");
                }
                else if (weatherResponse.current.uvi <= 5.99) {
                    $("#uvIndex").addClass("moderate");
                }
                else if (weatherResponse.current.uvi <= 7.99) {
                    $("#uvIndex").addClass("high");
                }
                else if (weatherResponse.current.uvi <= 10.99) {
                    $("#uvIndex").addClass("very-high");
                }
                else if (weatherResponse.current.uvi > 11) {
                    $("#uvIndex").addClass("extreme");
                };

                
                let dayOne = moment().add(1, "days").format("M/DD/YYYY");
                let dayTwo = moment().add(2, "days").format("M/DD/YYYY");
                let dayThree = moment().add(3, "days").format("M/DD/YYYY");
                let dayFour = moment().add(4, "days").format("M/DD/YYYY");
                let dayFive = moment().add(5, "days").format("M/DD/YYYY");
                let daySix = moment().add(6, 'days').format('M/DD/YYYY');

                
                let weatherIcon1 = "http://openweathermap.org/img/w/" 
                + weatherResponse.daily[0].weather[0].icon + ".png";
                let weatherIcon2 = "http://openweathermap.org/img/w/" 
                + weatherResponse.daily[1].weather[0].icon + '.png';
                let weatherIcon3 = 'http://openweathermap.org/img/w/' 
                + weatherResponse.daily[2].weather[0].icon + '.png';
                let weatherIcon4 = 'http://openweathermap.org/img/w/' 
                + weatherResponse.daily[3].weather[0].icon + '.png';
                let weatherIcon5 = 'http://openweathermap.org/img/w/' 
                + weatherResponse.daily[4].weather[0].icon + '.png';
                let weatherIcon6 = 'http://openweathermap.org/img/w/' 
                + weatherResponse.daily[5].weather[0].icon + '.png';

                
                $('#six-days').append(
                    "<div class='col-md-12'>" + "<h2>" + "6-Day Forecast:" + "</h2>"
                );

                
                $('#day-1').append(
                    "<div class='card col-s12-m6'>" 
                    + "<div class='card-body'>" 
                    + "<div class='card-header'>" + dayOne + "</div" 
                    + "<div class='card-info'>" + "<img src='" + weatherIcon1 + "'>" + "</div>" 
                    + "<div class='card-info'>" + "Temp: " 
                    + weatherResponse.daily[0].temp.day + " °F" + "</div>" 
                    + "<div class='card-info'>" + "Humidity: " 
                    + weatherResponse.daily[0].humidity + " %" + "</div>" 
                    + "</div>"
                );

                
                $('#day-2').append(
                    "<div class='card col-s12-m6'>" 
                    + "<div class='card-body'>" 
                    + "<div class='card-header'>" + dayTwo + "</div" 
                    + "<div class='card-info'>" + "<img src='" + weatherIcon2 + "'>" + "</div>" 
                    + "<div class='card-info'>" + "Temp: " 
                    + weatherResponse.daily[0].temp.day + " °F" + "</div>" 
                    + "<div class='card-info'>" + "Humidity: " 
                    + weatherResponse.daily[0].humidity + " %" + "</div>" 
                    + "</div>"
                );

                
                $('#day-3').append(
                    "<div class='card col-s12-m6'>" 
                    + "<div class='card-body'>" 
                    + "<div class='card-header'>" + dayThree + "</div" 
                    + "<div class='card-info'>" + "<img src='" + weatherIcon3 + "'>" + "</div>" 
                    + "<div class='card-info'>" + "Temp: " 
                    + weatherResponse.daily[0].temp.day + " °F" + "</div>" 
                    + "<div class='card-info'>" + "Humidity: " 
                    + weatherResponse.daily[0].humidity + " %" + "</div>" 
                    + "</div>"
                );

                $('#day-4').append(
                    "<div class='card col-s12-m6'>" 
                    + "<div class='card-body'>" 
                    + "<div class='card-header'>" + dayFour + "</div" 
                    + "<div class='card-info'>" + "<img src='" + weatherIcon4 + "'>" + "</div>" 
                    + "<div class='card-info'>" + "Temp: " 
                    + weatherResponse.daily[0].temp.day + " °F" + "</div>" 
                    + "<div class='card-info'>" + "Humidity: " 
                    + weatherResponse.daily[0].humidity + " %" + "</div>" 
                    + "</div>"
                );
                
                
                $('#day-5').append(
                    "<div class='card col-s12-m6'>" 
                    + "<div class='card-body'>" 
                    + "<div class='card-header'>" + dayFive + "</div" 
                    + "<div class='card-info'>" + "<img src='" + weatherIcon5 + "'>" + "</div>" 
                    + "<div class='card-info'>" + "Temp: " 
                    + weatherResponse.daily[0].temp.day + " °F" + "</div>" 
                    + "<div class='card-info'>" + "Humidity: " 
                    + weatherResponse.daily[0].humidity + " %" + "</div>" 
                    + "</div>"
                );

            
                $('#day-6').append(
                    "<div class='card col-s12-m6'>" 
                    + "<div class='card-body'>" 
                    + "<div class='card-header'>" + daySix + "</div" 
                    + "<div class='card-info'>" + "<img src='" + weatherIcon6 + "'>" + "</div>" 
                    + "<div class='card-info'>" + "Temp: " 
                    + weatherResponse.daily[0].temp.day + " °F" + "</div>" 
                    + "<div class='card-info'>" + "Humidity: " 
                    + weatherResponse.daily[0].humidity + " %" + "</div>" 
                    + "</div>"
                );
                displayCities ();
            });
        });
    };
    
    
    function displayCities() {
        $('#searchedCities').empty();
        let arrayStorage = JSON.parse(localStorage.getItem('inputCities')) || [];
        let arrayLength = arrayStorage.length;

        
        for (let i = 0; i < arrayLength; i++) {
            let cityName = arrayStorage[i];
            $('#searchedCities').append (
                "<div class= 'list-group'>"
                + "<button class='list-group-item'>" + cityName + "</button>"
            );
        };
    };
    
    displayCities ();

   
    $('#searchedCities').on('click', '.list-group-item', function(event) {
        event.preventDefault();
        let savedCity = ($(this).text());
        displayWeather(savedCity);
    });

    $('#erase').click(function() {
        $("#searchedCities").html("");
        localStorage.clear();
        location.reload();
    });

});
