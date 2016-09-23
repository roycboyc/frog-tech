var entries;

$.get( "assets/dummy.csv", function( data ) {
  entries = $.csv.toObjects(data);
});

var current = 0;
var max = 10;

function transcriptEntry(time, avatar, quest, text){
  return  '<tr>\
                  <td class="fit">'+time+'</td>\
                  <td class="fit dotty"><span class="circle"></span></td>\
                  <td class="fit" ><img src="assets/images/gabriel_ruttner.jpg" class="img-circle avatar"></td>\
                  <td class="speach">\
                    <div class="question">'+quest+'</div>\
                    <div class="bubble normal">'+text+'</div>\
                    <div class="comments"></div>\
                    <div class ="buttons">\
                      <i class="fa fa-play-circle" aria-hidden="true"></i>\
                      <i class="fa fa-bolt" aria-hidden="true"></i>\
                      <i class="fa fa-commenting-o" aria-hidden="true"></i>\
                    </div>\
                  </td>\
                </tr>';
}

var even=0;
var last;

$(function(){
  // activate sliders...
  $("#ex1").slider({min  : 0, max  : 10, value: 10, tooltip_position:'bottom'});
  $("#ex2").slider({min  : 0, max  : 10, value: 3, tooltip_position:'bottom'});
  $("#ex3").slider({min  : 0, max  : 10, value: 7, tooltip_position:'bottom'});

  //live populating
  for (i = 0; i < max; i++) {
    $(transcriptEntry("1:0"+i+" pm", "assets/images/gabriel_ruttner.jpg", entries[i].q, entries[i].a))
      .appendTo($("#liveTimePrepop"));
  }

  $(document).keypress(function(e) {
    if(e.which == 32) {
        $("#ready").hide();
        $("#liveTimePrepop").removeClass("hidden");
        $("#liveTime").addClass("hidden");
        $("html, body").scrollTop($(document).height());

    }

    if(e.which == 13) {
        $("#ready").hide();

        if(current<max){
            if(even == 0){
                last = transcriptEntry("1:00 pm", "assets/images/gabriel_ruttner.jpg", "", "<h1>...</h1>");
                last = $(last).appendTo($("#liveTimeline"));
                even = 1;
            }else{
                even = 0;
            $("#liveTimeline tr:last").remove();

            $(transcriptEntry("1:00 pm", "assets/images/gabriel_ruttner.jpg", entries[current].q, entries[current].a))
                .appendTo($("#liveTimeline"));
                current++;
            }
        }
      $("html, body").scrollTop($(document).height());
    }

  });

  $('.onlyInsights').click(function(){
       $(".normal").closest("tr").slideToggle();
  });


  $('.speach').hover(
    function(){//over
      $(this).children(".buttons").addClass("over");
    },
    function(){//out
        $(this).children(".buttons").removeClass("over");
    }
    );


    $('.bubble').click(function(){//over
          $(this).toggleClass("insight");
          $(this).toggleClass("normal");

        });


});
