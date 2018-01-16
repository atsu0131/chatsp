class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :content
      t.string :image
      t.references :group, foreign_key: true, index: true
      t.references :user, foreign_key: true, index: true
      t.timestamps null: false
    end
  end
end
