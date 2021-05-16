var filter = ""
$("#populate").on("click", function() {
    $.ajax({
        async: false,
        url: './assets/php/read_filter.php',
        method: 'post',
        dataType: 'json',
        success: function(response) {
            if(response) {
                for(var i = 0; i < response.length; i++) {
                    response[i] = response[i].replace(/(\r\n|\n|\r)/gm, "");
                    filter += response[i] + " "
                }
                console.log(filter)
            } else if (response == "0") {
                console.log("No filter was found")
            }
        }
    })


})