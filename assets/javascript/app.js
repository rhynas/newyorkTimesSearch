//We declare the variables that will hold the user input
    var searchKey = "";
    var records = "";
    var sYear = "";
    var eYear = "";

//We create a function with ajax which will display the articles using the search terms
    function displayTopics() {
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b878d19230834a629ac5664c8efc2ee7&q=" + searchKey + "&begin_date="+ sYear + "0101&end_date="+ eYear + "1230&page=0"

            $.ajax({
                 url: queryURL,
                 method: 'GET'
            }).done(function(data) {

                for (var i = 0; i < records ; i++) {
                    var record = $("<li>").addClass("record list-group-item");

                    var articles = $("#articles");
                    record.append("<a class='articleHeader' href=" + data.response.docs[i].web_url + ">" + (i+1) + ". " + data.response.docs[i].headline.main + "</a>");
                    record.append("<p class='articleAuthor'>" + data.response.docs[i].byline.original + "</p>");
                    articles.append(record);
                }
            });
    }

//We create a function to empty the values from text boxes
    function resetValues () {
        $("#searchTerm").val("");
        $("#sel1").val("");
        $("#startYear").val("");
        $("#endYear").val(""); 
    }

//We create an on click function on the search button
    $("#searchBtn").on("click", function(){


//We can access the value inputed by the user and put into variables
        searchKey = $("#searchTerm").val();
        records = $("#sel1").val();
        sYear = $("#startYear").val();
        eYear = $("#endYear").val(); 

//if the user does not type in a search term, they will be alerted
        if (searchKey == "") {
            alert("You must type in a search term");
        } 

//if the user does not input a start or end year
        if (sYear == "") {
            sYear = 1900;
        }
        if (eYear == "") {
            eYear = 2016;
        }

//We call the function which runs the ajax and displays the articles
        displayTopics();

//We call the function which resets all the values and clears our the text boxes
        resetValues();

//We return false so the page doesn't refresh and delete all our values
        return false;
    });


//We create an on click function on the clearn button
    $("#clearBtn").on("click", function() {
        resetValues();
        $("#articles").empty();
        return false;
    });