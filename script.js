$(document).ready(function () {

  const apiKey = 'adb6065f61be4b12b88a52269ca3b025';
  const apiUrl = 'https://api.rawg.io/api/games';
  const gameName = 'God of War';

  $.ajax({
      url: apiUrl,
      type: 'GET',
      data: {
          key: apiKey,
          // Add any other parameters as needed
      },
      success: function (data) {
          // Handle the API response data here
          console.log(data);
      },
      error: function (error) {
          console.error('Error fetching data:', error);
      }
  });






// Note To self: Template literals are used using backtics and on JQuery they start with $. For example ${example}



$("#addButton").click(function () {
  
  
  $.ajax({
    url: apiUrl,
    type: 'GET',
    data: {
        key: apiKey,
        search: gameName,
    },
    success: function (data) {
        console.log(data);

        
        // Create the main card div
        var cardDiv = $("<div>");
        cardDiv.addClass(
          "each rounded-md mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative"
        );
      
        // Create the image div
        var imageDiv = $("<div>");
        imageDiv.append(
          '<img class="w-full rounded-md over" src="https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/aqZdSwWyy9JcQ66BxHDKrky6.jpg" alt="" />'
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
          `<h2 class="font-bold text-2xl ">${data.results[4].name}</h4>`
        );
        descDiv.append(
          '<h4 class="font-bold text-blue-400">Date Released: 11/9/22 </h4>'
        );
        descDiv.append(
          '<p> <span class="font-bold text-blue-400">Platforms:</span> PS5</p>'
        );
        descDiv.append(
          '<p> <span class="font-bold text-blue-400">Publisher:</span> Sony Interactive</p>'
        );
        descDiv.append(
          '<p class=""> <span class="font-bold text-blue-400">About:</span> Kratos and Atreus must journey to each of the Nine Realms in search of answers as they prepare for the prophesied battle that will end the world.</p>'
        );
      
        cardDiv.append(descDiv);
      
        // Create the button div
        var buttonDiv = $("<div>");
        buttonDiv.append(
          '<button class="bg-neutral-200 rounded-lg px-5 py-2 mb-5 ml-2 text-xl border-neutral-400 border-2 text-neutral-600 hover:text-white hover:shadow-[inset_13rem_0_0_0] hover:shadow-blue-400 duration-[400ms,700ms] transition-[color,box-shadow]">Trailer</button>'
        );
        buttonDiv.append(
          '<button id="removeBtn" class="bg-neutral-200 rounded-lg px-5 py-2 mb-5 ml-2 text-xl border-neutral-400 border-2 text-neutral-600 hover:text-white hover:shadow-[inset_13rem_0_0_0] hover:shadow-blue-400 duration-[400ms,700ms] transition-[color,box-shadow]">Remove From List</button>'
        );
      
        cardDiv.append(buttonDiv);
      
        // Append the card to the parent element
        $("#parentCard").append(cardDiv);
      
        // Log the structure to the console
        // console.log($("#parentCard").html());
        
    },
    error: function (error) {
        console.error('Error fetching data:', error);
    }
    
    
    
  });


  });

  $("#parentCard").on("click", "#removeBtn", function () {
    // Remove the parent card when the remove button is clicked
    $(this).closest(".each").remove();
  });
  


addGame()

});
