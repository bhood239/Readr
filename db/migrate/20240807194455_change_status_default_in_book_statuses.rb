class ChangeStatusDefaultInBookStatuses < ActiveRecord::Migration[7.1]
  def change
    change_column :book_statuses, :status, :string, default: nil, null: true
  end
end
