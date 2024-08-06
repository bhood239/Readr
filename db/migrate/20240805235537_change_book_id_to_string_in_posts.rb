class ChangeBookIdToStringInPosts < ActiveRecord::Migration[7.1]
    def up
        change_column :posts, :book_id, :string
    end
    
    def down
        change_column :posts, :book_id, :integer
    end
end
