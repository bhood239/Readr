class User < ApplicationRecord
  has_secure_password
  has_many :posts
  has_many :book_statuses
  has_many :followed_friends, class_name: 'Friend', foreign_key: 'follower_id'
  has_many :following_friends, class_name: 'Friend', foreign_key: 'following_id'

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
end
