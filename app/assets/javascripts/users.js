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

  function removeuser (userid,username){
    var html =
      `
      <div class = search-result>
        <input name='group[user_ids][]' type='hidden' value=${userid}>
        <div class= name-display >${username}</div>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
        </div>`
      return html
}

$(document).delegate('.user-search-add','click',function(){
      var user_id = $(this).data("user-id");
      var user_name = $(this).data("user-name");
      console.log($(this).parent())
      $(this).parent().remove();
      $(".chat-group-user-22").append(removeuser(user_id,user_name));
});


$(document).delegate('.user-search-remove','click',function(){
  $(this).parent().remove();
});


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
     if (users.length !== 0) {
       users.forEach(function(user){
         var html = appenduser(user);
         $('.chat-group-form-box').append(html);
       });
      }else {
      $('.chat-group-form-box').remove();
    }
    })
    .fail(function() {
      alert('error');
    });
  });
});
