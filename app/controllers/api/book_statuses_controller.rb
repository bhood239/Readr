module Api
    class BookStatusesController < ApplicationController
      before_action :set_book_status_by_user_and_book, only: [:show_by_user_and_book, :update_by_user_and_book, :destroy_by_user_and_book]
  
      def index
        @book_statuses = BookStatus.all
        render json: @book_statuses
      end
  
      def show_by_user_and_book
        if @book_status
          render json: @book_status
        else
          render json: { error: 'Book status not found' }, status: :not_found
        end
      end
  
      def create
        @book_status = BookStatus.new(book_status_params)
        if @book_status.save
          render json: @book_status, status: :created
        else
          render json: @book_status.errors, status: :unprocessable_entity
        end
      end
  
      def update_by_user_and_book
        if @book_status.update(book_status_params)
          render json: @book_status
        else
          render json: @book_status.errors, status: :unprocessable_entity
        end
      end
  
      def destroy_by_user_and_book
        @book_status.destroy
        head :no_content
      end

      def user_books_by_status
        @book_statuses = BookStatus.where(user_id: params[:user_id], status: params[:status])

        # Extract book_ids from book_statuses
        book_ids = @book_statuses.pluck(:book_id)
        render json: book_ids
      end

      def user_fav_books
        @fav_book_statuses = BookStatus.where(user_id: params[:user_id], fave_books: true)
  
        book_ids = @fav_book_statuses.pluck(:book_id)
  
        render json: book_ids
      end
  
      private
  
      def set_book_status_by_user_and_book
        @book_status = BookStatus.find_by(user_id: params[:user_id], book_id: params[:book_id])
      end
  
      def book_status_params
        params.require(:book_status).permit(:status, :fave_books, :book_id, :user_id)
      end
    end
end
  