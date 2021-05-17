var url
var API_KEY = "AIzaSyBxhAfAE7aGeXfCWNVgp7i3tcs9NeLRIqc"
var channelId = ""

// Populate database
$("#populate").on("click", function() {
    $(this).prop( "disabled", true);
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
                            }
                        },
                    })
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
                            }
                        },
                    })
                }
            } else if (response == "0") {
                console.log("No filter was found")
            }
            
        }
    })
    $(this).prop( "disabled", false);
})

// Get info
$("#get-info").on("click", function() {

    $.ajax({
        method: "POST",
        url: './assets/php/get_info.php',
        success: function (result) {
            console.log(result.data)
            document.getElementById('results').innerHTML = ""
            for(var i = 0; i < result.data.length; i++) {
                document.getElementById('results').innerHTML += JSON.stringify(result.data[i]) + "<br>"
            }
        }
    })
})

// Search by Id
$("#search-id").on("click", function() {

    $.ajax({
        method: "POST",
        url: './assets/php/get_id.php',
        data: {
            id: $('#search-id-txt').val()
        },
        success: function (result) {
            if(result){
                console.log(result.data)
                document.getElementById('results').innerHTML = ""
                document.getElementById('results').innerHTML += JSON.stringify(result.data)
            } 
        }
    })

})

// Delete by Id
$("#delete-id").on("click", function() {

    $.ajax({
        method: "POST",
        url: './assets/php/delete_id.php',
        data: {
            id: $('#delete-id-txt').val()
        },
        success: function (result) {
            if(result){
                console.log(result.data)
                document.getElementById('results').innerHTML = ""
                document.getElementById('results').innerHTML += JSON.stringify(result.data)
            } 
        }
    })

})

// Search by title
$("#search-title").on("click", function() {

    $.ajax({
        method: "POST",
        url: './assets/php/get_title.php',
        data: {
            title: $('#search-title-txt').val()
        },
        success: function (result) {
            if(result){
                console.log(result.data)
                document.getElementById('results').innerHTML = ""
                for(var i = 0; i < result.data.length; i++) {
                document.getElementById('results').innerHTML += JSON.stringify(result.data[i]) + "<br>"
                }
            } 
        }
    })

})