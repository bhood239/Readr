class User < ApplicationRecord
  has_secure_password
  has_many :posts
  has_many :book_statuses
  # Users who follow this user
  has_many :followed_friends, class_name: 'Friend', foreign_key: 'following_id', dependent: :destroy
  has_many :followers_list, through: :followed_friends, source: :follower

  # Users who this user follows
  has_many :following_friends, class_name: 'Friend', foreign_key: 'follower_id', dependent: :destroy
  has_many :following_list, through: :following_friends, source: :following

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true

  after_save :update_followers_count, :update_following_count

  def update_followers_count
    update_column(:followers, followers_list.size)
  end
  
  def update_following_count
    update_column(:following, following_list.size)
  end

  def self.update_all_counts
    User.find_each do |user|
      user.update_columns(followers: user.followers_list.size, following: user.following_list.size)
    end
  end
end
