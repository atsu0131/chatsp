json.messages @messages.each do |message|
json.name  @message.user.name
json.content  @message.content
json.id @message.id
json.image @message.image
json.time @message.created_at.strftime("%Y/%m/%d %H:%M:%S")