$(document).ready(function(){

  var topics = ['surprised patrick', 'like a boss', 'rickroll'];
  // console.log(topics);


  // for every topic in topics array
  // a button is created and appended
  // to the buttons row
  for (var i = 0; i < topics.length; i++) {
    var buttonTopic = topics[i];
    var button = $('<button>');
    button.addClass('gifButton btn btn-default');
    button.attr('buttonTopic', buttonTopic);
    button.html(buttonTopic);
    $('#buttonsRow').append(button);
  }

  $(document).on('click','.gifButton',function(){
    // clear the gifsRow
    $('#gifsRow').html("");


    // log the html of the button
    console.log($(this).html());
    // console.log(url);

    // get api data based on the value of the
    // button
    var url = 'https://api.giphy.com/v1/gifs/search?';
    // need to make q string
    // url query ready
    var q = $(this).html();

    // get rid of white spaces in q for the url
      if(q.indexOf(' ')<=0){
        url += "q="+q+"&"+"rating=pg-13\&limit=10&api_key=dc6zaTOxFJmzC";
        console.log(url);
        console.log(q.indexOf(' '));
      }else{
        q = q.split(" ");
        q = q.join("+");
        url += "q="+q+"&"+"rating=pg-13\&limit=10&api_key=dc6zaTOxFJmzC";
        console.log(url);
      }
      // run ajax
      $.ajax({
        type: "GET",
        url : url,
        Access-Control-Allow-Origin: *
      })
      .done(function(res){
        // everything will happen inside of here when the data is returned
        console.log(res.data.length);

        // loop through each gif object
        for (var i = 0; i < res.data.length; i++) {
          // console.log(res.data[i]);
          var gifObject = res.data[i];
          var stillImage = gifObject.images.original_still.url;
          var animatedImage = gifObject.images.original.url;
          var el = $('<img>');
          el.addClass("img-responsive gifs");
          el.attr({
            data_still : stillImage,
            data_animate : animatedImage,
            animated : "nope",
            src : stillImage
          });
          var col = $('<div>');
          var p = $('<p>');
          p.attr({
            class : "rating",
          });
          p.html("Rating: "+gifObject.rating);
          col.addClass('col-md-4');
          col.html(el);
          col.prepend(p);
          $('#gifsRow').append(col);
        }


      });

  });





});
