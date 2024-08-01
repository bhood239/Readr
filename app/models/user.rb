class User < ApplicationRecord
  has_secure_password
  has_many :posts
  has_many :book_statuses
  # Users who follow this user
  has_many :followed_friends, class_name: 'Friend', foreign_key: 'following_id', dependent: :destroy
  has_many :followers, through: :followed_friends, source: :follower

  # Users who this user follows
  has_many :following_friends, class_name: 'Friend', foreign_key: 'follower_id', dependent: :destroy
  has_many :followings, through: :following_friends, source: :following

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true

  after_save :update_followers_count, :update_following_count

  def update_followers_count
    update_column(:followers, followers.size)
  end
  
  def update_following_count
    update_column(:following, followings.size)
  end

  def self.update_all_counts
    User.find_each do |user|
      user.update_columns(followers: user.followers.size, following: user.followings.size)
    end
  end

  def self.authenticate_with_credentials(email, password)
      normalized_email = email.strip.downcase
      user = User.find_by(email: normalized_email)
      if user
          user
      else
          nil
      end
  end
end
