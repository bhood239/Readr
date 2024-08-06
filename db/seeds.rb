# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Clear existing records
BookStatus.delete_all
Post.delete_all
Friend.delete_all
User.delete_all

# Create users
user1 = User.create!(name: "Alice Johnson", email: "alice.johnson@example.com", password: "password", profile_pic: "https://img.freepik.com/free-vector/happy-woman-with-black-hair_1308-171592.jpg?ga=GA1.1.1593446154.1722974176&semt=ais_hybrid")
user2 = User.create!(name: "Bob Smith", email: "bob.smith@example.com", password: "password", profile_pic: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-171058.jpg?ga=GA1.1.1593446154.1722974176&semt=ais_hybrid")
user3 = User.create!(name: "Charlie Brown", email: "charlie.brown@example.com", password: "password", profile_pic: "https://img.freepik.com/free-vector/worried-young-man-illustration_1308-171118.jpg?ga=GA1.1.1593446154.1722974176&semt=ais_hybrid")
user4 = User.create!(name: "Diana Prince", email: "diana.prince@example.com", password: "password", profile_pic: "https://img.freepik.com/free-vector/surprised-girl-with-brown-hair_1308-171496.jpg?ga=GA1.1.1593446154.1722974176&semt=ais_hybrid")

# Create book statuses
BookStatus.create!(status: "read", fave_books: true, book_id: "OL8193465W", user_id: user1.id)
BookStatus.create!(status: "reading", fave_books: false, book_id: "OL40235949M", user_id: user2.id)
BookStatus.create!(status: "to_read", fave_books: false, book_id: "OL43304516M", user_id: user3.id)
BookStatus.create!(status: "read", fave_books: true, book_id: "OL27482W", user_id: user4.id)

# Create posts with in-depth reviews
Post.create!(rating: 5, review: "A timeless classic that provides a deep insight into the human condition. The themes of sacrifice and redemption are beautifully portrayed.", time_spent: 180, book_id: "OL8193465W", user_id: user1.id)
Post.create!(rating: 4, review: "A magical start to an epic series. The world-building is incredible and the characters are unforgettable.", time_spent: 120, book_id: "OL40235949M", user_id: user2.id)
Post.create!(rating: 5, review: "An unputdownable mystery that keeps you guessing till the end. Agatha Christie at her best.", time_spent: 150, book_id: "OL43304516M", user_id: user3.id)
Post.create!(rating: 5, review: "A delightful adventure story that has charmed readers for generations. The rich descriptions and engaging plot make it a must-read.", time_spent: 200, book_id: "OL27482W", user_id: user4.id)

Post.create!(rating: 5, review: "A whimsical journey into a fantastical world. The imaginative characters and playful narrative make it a joy to read.", time_spent: 130, book_id: "OL45637056M", user_id: user1.id)
Post.create!(rating: 5, review: "An enchanting tale of bravery and friendship. The allegorical elements add depth to the story, making it enjoyable for all ages.", time_spent: 140, book_id: "OL3676511M", user_id: user2.id)
Post.create!(rating: 4, review: "A gripping thriller with a blend of historical intrigue and fast-paced action. A real page-turner.", time_spent: 160, book_id: "OL50376999M", user_id: user3.id)
Post.create!(rating: 5, review: "A thought-provoking exploration of adolescent angst and identity. The narrative voice is unique and compelling.", time_spent: 110, book_id: "OL47773856M", user_id: user4.id)

Post.create!(rating: 4, review: "A strong follow-up to the first book, with more mysteries and magic. The plot thickens and keeps you hooked.", time_spent: 120, book_id: "OL48124905M", user_id: user1.id)
Post.create!(rating: 5, review: "A darker and more complex entry in the series. The characters mature and the stakes are higher.", time_spent: 130, book_id: "OL82536W", user_id: user2.id)
Post.create!(rating: 5, review: "An exhilarating installment with a thrilling tournament. The plot twists are unexpected and exciting.", time_spent: 140, book_id: "OL27330967M", user_id: user3.id)
Post.create!(rating: 4, review: "A powerful narrative with themes of loyalty and sacrifice. The characters face greater challenges than ever before.", time_spent: 160, book_id: "OL37768153M", user_id: user4.id)

Post.create!(rating: 5, review: "A profound and emotional story with intricate character development. The series continues to impress.", time_spent: 180, book_id: "OL82565W", user_id: user1.id)
Post.create!(rating: 5, review: "A fitting conclusion to an epic series. The resolution is satisfying and leaves a lasting impact.", time_spent: 200, book_id: "OL39794425M", user_id: user2.id)

Post.create!(rating: 4, review: "A touching and heartwarming story that highlights the bond between humans and animals. A beautiful read.", time_spent: 110, book_id: "OL15854658W", user_id: user3.id)
Post.create!(rating: 5, review: "A charming tale of friendship and loyalty. The simplicity of the story is its strength, making it a beloved classic.", time_spent: 90, book_id: "OL7885696M", user_id: user4.id)

# Create friends
Friend.create!(follower_id: user1.id, following_id: user2.id)
Friend.create!(follower_id: user2.id, following_id: user3.id)
Friend.create!(follower_id: user3.id, following_id: user4.id)
Friend.create!(follower_id: user4.id, following_id: user1.id)