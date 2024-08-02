namespace :users do
    desc "Update followers and following counts for all users"
    task update_all_counts: :environment do
      User.update_all_counts
    end
end
  