$(function(){
  function buildHTML(message){
   var insertImage = '';
   if (message.image.url) {
     insertImage = `<img src="${message.image.url}">`;
   };
   var html = `
     <div class=“upper-message”>
       <p class=“upper-message__user-name”>${message.name}</p>
       <p class=“upper-message__date”>${message.time}</p>
       <span class=“lower-message__content”>${message.content}</span>${insertImage}
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
      $('.messages').append(html)
      $('.textbox').val('')
    })
      var num = 0;
      $('span class=“lower-message__content”').on('click', function() {
      $('span class=“lower-message__content”').append('<p>' + (num++) + '</p>');
      $('span class=“lower-message__content”').animate({scrollDown: $('span class=“lower-message__content”')[0].scrollHeight}, 'fast');
  });

    .fail(function(){
      alert('error');
    })
  })
});
