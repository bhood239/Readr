class Post < ApplicationRecord
  belongs_to :user

  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :book_id, presence: true
  validates :book_id, uniqueness: { scope: :user_id, message: "post for this book already exists for this user" }
end
