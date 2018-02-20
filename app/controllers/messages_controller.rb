class MessagesController < ApplicationController
    before_action :set_group

  def new
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
      format.html { redirect_to new_group_message_path }
      format.json
    end
    else
      flash.now[:alert] = 'メッセージを入力してください。'
      render :new
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
