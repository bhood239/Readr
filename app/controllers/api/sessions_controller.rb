class Api::SessionsController < ApplicationController
    def create
      user = User.find_by(email: params[:email])
    
      if user
        session[:user_id] = user.id
        render json: { 
            notice: 'Logged in successfully', 
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                awards: user.awards,
                followers: user.followers,
                following: user.following,
                followers_list: user.followers_list, 
                following_list: user.following_list 
            }
            }, status: :ok
      else
        render json: { alert: 'Invalid email or password' }, status: :unauthorized
      end
    end
  
    def destroy
      session[:user_id] = nil
      render json: { notice: 'Logged out successfully' }, status: :ok
    end
end
