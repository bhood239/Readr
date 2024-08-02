class BookStatus < ApplicationRecord
  belongs_to :user

  validates :status, presence: true, inclusion: { in: %w[to_read reading read], message: "%{value} is not a valid status" }
  validates :book_id, presence: true
  validates :user_id, presence: true
  validates :book_id, uniqueness: { scope: :user_id, message: "status for this book already exists for this user" }

end
