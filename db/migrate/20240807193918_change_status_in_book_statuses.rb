class ChangeStatusInBookStatuses < ActiveRecord::Migration[7.1]
  def change
    change_column :book_statuses, :status, :string, null: true
  end
end
