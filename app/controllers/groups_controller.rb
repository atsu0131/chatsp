class GroupsController < ApplicationController
  # before_action :set_group
  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
    @users = User.all
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  def edit
    @group = Group.find(params[:id])
    @users = User.all
  end

  private
  def group_params
    params.require(:group).permit(:name, { user_ids:  [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
