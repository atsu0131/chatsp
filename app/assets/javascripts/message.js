$(function(){

  function buildHTML(message){
   var insertImage = '';
   if (message.image.url) {
     insertImage = `<img src="${message.image.url}">`;
   };
   var html = `
     <div class= message-wide >
     <div class= upper-message id="${message.id}">
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
      $('.main').append(html)
      $('.textbox').val('')
      $('.main').animate({scrollTop: $('.main')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
  })
});
