json.name  @message.user.name
json.content  @message.content
json.group_id  @message.group_id
json.image @message.image
json.time @message.created_at.strftime("%Y/%m/%d %H:%M:%S")