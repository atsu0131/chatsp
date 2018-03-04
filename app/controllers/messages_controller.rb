class MessagesController < ApplicationController
    before_action :set_group


  def index
    # ajaxから送られてきたIDを受け取る
    # DBと見比べて最新（差分）のIDを取得してくる
    respond_to do |format|
      format.html
      format.json{ @new_messages = Message.where(group_id: params[:group_id]).where('id > ?', params[:id]) }
    end
  end

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
