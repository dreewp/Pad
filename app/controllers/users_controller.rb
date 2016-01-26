class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    if @user.save
      sign_in(@user)
      redirect_to('/')
    else
      render :new
      flash.now[:errors] = @user.errors.full_messages
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end

end
