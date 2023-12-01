$(document).ready(function () {

  //Rawg API info
  const rawgKey = "adb6065f61be4b12b88a52269ca3b025";
  const rawgURL = 'https://api.rawg.io/api/games';

  // Youtube API info
  const youtubeKey = 'AIzaSyAx_UP8qG_QtPF1uwSkEyFd2oYlk42qDw0'
  const youtubeURL = 'https://www.googleapis.com/youtube/v3/search';

  //variable holding youtube response data
  var ytData;
  
  $("#searchBTN").click(function(){
    var searchValue = $("#bar").val();
    
    // AJAX request to the YouTube Data API
    $.ajax({
        url: youtubeURL,
        type: 'GET',
        data: {
            q: searchValue + " game trailer",
            key: youtubeKey,
            part: 'snippet',
            type: 'video'
        },
        success: function(response) {
            // Handle the response, which contains the list of videos
            console.log(response);
            ytData =  "https://www.youtube.com/watch?v=" + response.items[0].id.videoId
        },
        error: function(error) {
            // Handle errors
            console.error('Error fetching YouTube data:', error);
        }
    });

    $.ajax({
      url: rawgURL,
      type: 'GET',
      data: {
          key: rawgKey,
          search: searchValue,
      },
      success: function (data) {
        console.log(data);
        const platforms = data.results[0].platforms;
        // const esrb = data.results[0].esrb_rating.name_en;
        
        const platformNames = [];
        
        $.each(platforms, function (index, value) {
          platformNames.push(" " + value.platform.name)
          // console.log(platformNames);
        });

        // Create the main card div
        var cardDiv = $("<div>");
        cardDiv.addClass(
          "each rounded-md mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative"
        );
        
        // Create the image div
        var imageDiv = $("<div>");
        imageDiv.append(
          `<img class="w-full rounded-md over" src="${data.results[0].background_image}" alt="" />`
        );
        cardDiv.append(imageDiv);
        
        // Create the badge div
        var badgeDiv = $("<div>");
        badgeDiv.addClass(
          "badge absolute top-0 right-0 bg-green-900 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded"
        );
        badgeDiv.text("In progress");
        cardDiv.append(badgeDiv);
        
        // Create the description div
        var descDiv = $("<div>");
        descDiv.addClass("desc p-4 text-gray-800");
        
        // Add content to the description div
        descDiv.append(
          `<h2 class="font-bold text-2xl ">${data.results[0].name}</h4>`
        );
        descDiv.append(
          `<h4 class="font-bold text-blue-400">Date Released: ${data.results[0].released} </h4>`
        );
        descDiv.append(
          `<p> <span class="font-bold text-blue-400">Platforms:</span> ${platformNames}</p>`
        );
        // descDiv.append(
        //   `<p> <span class="font-bold text-blue-400">ESRB Rating:</span> ${esrb} </p>`
        // );
        
        cardDiv.append(descDiv);
        
        // Create the button div
        var buttonDiv = $("<div>");
        buttonDiv.append(
          `<a href="${ytData}" target="_blank" class="bg-neutral-200 rounded-lg px-5 py-2 mb-5 ml-2 text-xl border-neutral-400 border-2 text-neutral-600 hover:text-white hover:shadow-[inset_13rem_0_0_0] hover:shadow-blue-400 duration-[400ms,700ms] transition-[color,box-shadow] ">Trailer</a>`
        );
        buttonDiv.append(
          '<button id="removeBtn" class="bg-neutral-200 rounded-lg px-5 py-2 mb-5 ml-2 text-xl border-neutral-400 border-2 text-neutral-600 hover:text-white hover:shadow-[inset_13rem_0_0_0] hover:shadow-blue-400 duration-[400ms,700ms] transition-[color,box-shadow]">Remove From List</button>'
        );
        
        cardDiv.append(buttonDiv);
        
        // Append the card to the parent element
        $("#parentCard").append(cardDiv);

      },
      error: function (error) {
        console.error('Error fetching data:', error);
      }
      
    });
   
});

//Handles the removal of the card selected
  $("#parentCard").on("click", "#removeBtn", function () {
    // Remove the parent card when the remove button is clicked
    $(this).closest(".each").remove();
  });
  
});
