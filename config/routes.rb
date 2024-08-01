Rails.application.routes.draw do
  namespace :api do
    # Define routes for the API namespace
    resources :users, only: [:index, :show, :create, :update, :destroy] do
        member do
            get :followers
            get :following
        end
    end
    resources :posts, only: [:index, :show, :create, :update, :destroy]
    resources :book_statuses, only: [:index, :show, :create, :update, :destroy]
    resources :friends, only: [:index, :show, :create, :update, :destroy]
    resources :sessions, only: [:create, :destroy]

    # Example of a custom route
    get '/data', to: 'tests#index'

    # login
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
  end

  # Catch-all route for React app
  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
