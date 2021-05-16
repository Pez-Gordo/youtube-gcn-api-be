//var filter = ""
var url
var API_KEY = "AIzaSyBxhAfAE7aGeXfCWNVgp7i3tcs9NeLRIqc"
var channelId = ""
$("#populate").on("click", function() {
    // clear table videos
    $.ajax({
        async: false,
        method: "POST",
        url: './assets/php/clear_table.php',
        success: function () {
            console.log("Table cleared")
        }
    })

    // Populate table
    $.ajax({
        async: false,
        url: './assets/php/read_filter.php',
        method: 'post',
        dataType: 'json',
        success: function(response) {
            
            if(response) {

                for(var i = 0; i < response.length; i++) {
                    response[i] = response[i].replace(/(\r\n|\n|\r)/gm, "");
                    //filter += response[i] + " "
                }

                channelId = "UCuTaETsuCOkJ0H_GAztWt0Q"
                
                for(var i = 0; i < response.length; i++) {
                    url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${response[i]}&channelId=${channelId}&maxResults=5&type=video`;
                    $.ajax({
                        async: false,
                        method: "GET",
                        url: url,
                        success: function (data) {

                            for(var i = 0; i < data.items.length; i++){
                                $.ajax({
                                    async: false,
                                    method: "POST",
                                    url: './assets/php/insert_video.php',
                                    //dataType: 'json',
                                    data: {
                                        title: data.items[i].snippet.title,
                                        publishedAt: data.items[i].snippet.publishedAt
                                    },
                                    success: function (result) {
                                        console.log(result)
                                    },
                                    error: function(jqXHR, textStatus, errorThrown) {
                                        console.log(textStatus, errorThrown);
                                    }
                                })
                                //console.log("inserted")
                            }
                            //console.log("database populated")
                            //console.log(data.items);
                        },
                    })
                    //console.log(filter)
                }

                channelId = "UC_A--fhX5gea0i4UtpD99Gg"

                for(var i = 0; i < response.length; i++) {
                    url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${response[i]}&channelId=${channelId}&maxResults=5&type=video`;
                    $.ajax({
                        async: false,
                        method: "GET",
                        url: url,
                        success: function (data) {
                            for(var i = 0; i < data.items.length; i++){
                                $.ajax({
                                    async: false,
                                    method: "POST",
                                    url: './assets/php/insert_video.php',
                                    //dataType: 'json',
                                    data: {
                                        title: data.items[i].snippet.title,
                                        publishedAt: data.items[i].snippet.publishedAt
                                    },
                                    success: function (result) {
                                        console.log(result)
                                    },
                                    error: function(jqXHR, textStatus, errorThrown) {
                                        console.log(textStatus, errorThrown);
                                    }
                                })
                                //console.log("inserted")
                            }
                            //console.log("database populated")
                            //console.log(data.items);
                        },
                    })
                    //console.log(filter)
                }
            } else if (response == "0") {
                console.log("No filter was found")
            }
        }
    })
})

$("#get-info").on("click", function() {

    $.ajax({
        method: "POST",
        url: './assets/php/get_info.php',
        success: function (result) {
            console.log(result.data)
            document.getElementById('results').innerHTML = ""
            document.getElementById('results').innerHTML = JSON.stringify(result.data)
        }
    })


})