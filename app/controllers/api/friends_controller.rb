module Api
  class FriendsController < ApplicationController
    def index
      @friends = Friend.all
      render json: @friends
    end

    def show
        @friend = Friend.find(params[:id])
        render json: @friend
    end

    def create
      @friend = Friend.new(friend_params)
      if @friend.save
        puts "***********"
        puts current_user
        puts "***********"
        render json: @friend, status: :created
      else
        render json: @friend.errors, status: :unprocessable_entity
      end
    end

    def update
      @friend = Friend.find(params[:id])
      if @friend.update(friend_params)
        render json: @friend
      else
        render json: @friend.errors, status: :unprocessable_entity
      end
    end

    def destroy
        # Find the friend relationship using follower_id and following_id
        @friend = Friend.find_by(follower_id: params[:follower_id], following_id: params[:following_id])
        
        if @friend
          @friend.destroy
          puts "***********"
          puts current_user
          puts "***********"
          head :no_content
        else
          render json: { error: 'Friendship not found' }, status: :not_found
        end
    end

    private

    def friend_params
      params.require(:friend).permit(:follower_id, :following_id)
    end
  end
end