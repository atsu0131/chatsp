$(function(){

  function buildHTML(message){
   var insertImage = '';
   if (message.image.url) {
     insertImage = `<img src="${message.image.url}">`;
   };
   var html = `
     <div class= message-wide data-id="${message.id}">
     <div class= upper-message >
       <div class= upper-message__user-name >${message.name}</div>
       <div class= upper-message__date >${message.time}</div>
     </div>
     <div class= lower-message__content >${message.content}${insertImage}</div>
     </div>`;
   return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main').append(html);
      $('.textbox').val('');
      $('.main').animate({scrollTop: $('.main')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
  })

  function reload() {
  var message_id = $(".message-wide").last().data('id');
  // 画面に表示されている最新のIDを取得する

  $.ajax({
    // IDをcontrollerに送る
    data: { id: message_id },
    url: location.href.replace(/\/new/,""),
    type: 'GET',
    dataType: 'json',
  })

    .done(function(data){
      data.messages.forEach(function(message){
      var html = buildHTML(message);
      $('.main').append(html);
      $('.textbox').val('');
      $('.main').animate({scrollTop: $('.main')[0].scrollHeight}, 'fast');
      });
    })
  };
  setInterval(reload, 5000);
});




