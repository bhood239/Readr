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
    resources :book_statuses, only: [:index, :create] do
        collection do
          get ':user_id/:book_id', to: 'book_statuses#show_by_user_and_book', as: :show_by_user_and_book
          put ':user_id/:book_id', to: 'book_statuses#update_by_user_and_book', as: :update_by_user_and_book
          delete ':user_id/:book_id', to: 'book_statuses#destroy_by_user_and_book', as: :destroy_by_user_and_book
          get 'user_books/:user_id/:status', to: 'book_statuses#user_books_by_status'
          get 'user_books/:user_id/fav_books', to: 'book_statuses#user_fav_books'
        end
    end
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
