module Api
  class UsersController < ApplicationController
    def index
        @users = User.includes(:posts, :followers_list, :following_list).all
        render json: @users.to_json(include: [:posts, :followers_list, :following_list])
    end
  
    def show
        @user = User.includes(:posts, :followers_list, :following_list).find(params[:id])
        # render json: @user.to_json(include: [:posts, :followers_list, :following_list])
        render json: { 
                id: @user.id,
                name: @user.name,
                email: @user.email,
                awards: @user.awards,
                followers: @user.followers,
                following: @user.following,
                followers_list: @user.followers_list,
                following_list: @user.following_list,
                profile_pic: @user.profile_pic,
                posts: @user.posts
            }, status: :ok
    end

    def search
        if params[:name].present?
          @users = User.includes(:followers_list, :following_list).where("name ILIKE ?", "%#{params[:name]}%")
          render json: @users.map { |user|
            {
                id: user.id,
                name: user.name,
                email: user.email,
                awards: user.awards,
                followers: user.followers,
                following: user.following,
                followers_list: user.followers_list.as_json(only: [:id, :name, :email, :followers, :following, :followers_list, :following_list, :profile_pic]),  # Adjust to include relevant details
                following_list: user.following_list.as_json(only: [:id, :name, :email, :followers, :following, :followers_list, :following_list, :profile_pic]),  # Adjust to include relevant details
                profile_pic: user.profile_pic,
                posts: user.posts
            }
          }, status: :ok
        else
          render json: { error: "Name parameter is missing" }, status: :bad_request
        end
    end

    def followers
        @user = User.find(params[:id])
        @followers = @user.followers
        puts "***********"
        puts @followers
        puts "***********"
        render json: @followers
    end

    def following
        @user = User.find(params[:id])
        @following = @user.following
        puts "***********"
        puts @following
        puts "***********"
        render json: @following
    end

    def new
        @user = User.new
    end

    def create
      @user = User.new(user_params)
      if @user.save
        session[:user_id] = @user.id
        render json: @user, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    def update
      @user = User.find(params[:id])
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @user = User.find(params[:id])
      @user.destroy
      head :no_content
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation) #removed awards, followers and following
    end
  end
end