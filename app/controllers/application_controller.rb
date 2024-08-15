class ApplicationController < ActionController::API
    def current_user
        @current_user = User.find(session[:user_id])
        puts "***********user"
        puts @current_user.followers
        puts @current_user.following
        puts "***********"
    end

    def corstest
      render json:{message: 'cors is working'}
    end
end
