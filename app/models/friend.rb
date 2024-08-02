class Friend < ApplicationRecord
  belongs_to :follower, class_name: 'User'
  belongs_to :following, class_name: 'User'

  validates :follower_id, presence: true
  validates :following_id, presence: true
  validate :not_self
  validate :not_duplicate

  after_create :update_counts
  after_destroy :update_counts

  def update_counts
    follower.update_following_count
    following.update_followers_count
  end

  def self.followers(user_id)
    User.joins("INNER JOIN friends ON friends.follower_id = users.id").where(friends: { following_id: user_id })
  end

  def self.following(user_id)
    User.joins("INNER JOIN friends ON friends.following_id = users.id").where(friends: { follower_id: user_id })
  end

  private

  def not_self
    errors.add(:base, "Cannot follow oneself") if follower_id == following_id
  end

  def not_duplicate
    if Friend.exists?(follower_id: follower_id, following_id: following_id)
      errors.add(:base, "Friendship already exists")
    end
  end
end
