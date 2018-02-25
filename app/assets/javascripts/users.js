$(function(){
  function appenduser(user){
     var html = `
      <div class = search-result>
        <div class= id-result id=${user.id}</div>
        <div class= name-result >${user.name}</div>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
          </div>`;
      return html;
  };

$(document).delegate('a','click',function(){
      var user_id = $(this).data("user-id");
      var user_name = $(this).data("user-name");
      $(this).parent().remove();
      $(".chat-group-user-22").append(`<input name="group[user_ids][] "type="hidden" value=${user_id}></input><div class= name-display >${user_name}</div>`)
});


//   function removeuser(){
//     var html =
//       `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
//         <input name='group[user_ids][]' type='hidden' value=${user.id}>
//         <p class='chat-group-user__name'>${user.name}</p>
//         <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
//       </div>`
//       return html
// }

//   $(".chat-group-user").on("click", ".chat-group-user__btn--remove", function() {
//   var user_id = $(this).data("user-id");
//   $(this).parent().remove();
//     });

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $('.chat-group-form-box').empty();
     if (users.length !== 0) {
       users.forEach(function(user){
         var html = appenduser(user);
         $('.chat-group-form-box').append(html);
       });
      }else {
      $('.chat-group-form-box').empty();
    }
    })
    .fail(function() {
      alert('error');
    });
  });
});
