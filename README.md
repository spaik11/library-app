# Book Library App
![](./public/images/books.gif)

Come 'checkout' this simple library app! The list of books are the current NY Times Best Sellers.  

Features:
* User: 
  * **You can only check out one book at a time!**
  * **The book will be due in 14 days of when you check it out**
  * **Add a book to your favorites**
  * **You can view all the books you previously checked out on your history page**
  * **There is an option to buy the book through a link to Amazon**
* Admin:
  * **Administrator can add/delete books to the database**
  * **Administrator can view all the books that are currently checked out**

---
### Dependencies
* NYTimes API - Used the NYTimes API to feed my database with the most recent best sellers.
* Faker - created random login images for users.
* Moment - used to date stamp whenever a user checked a book in and out. Also used the built in method to check if a book was turned in late.
* Bcrypt JS - encrypted user passwords for a secure database.

---
### Routes
***/*** - will render the home page where it will list a few features for the user.  

***/api/users***
* **/login** - the user will be able to login to the app. 

* **/register** -  the user will be able to register into the app. You will get an option to select if you're an admin to get access to more information.

* **/profile** -  this page will allow you to view the user profile.

* **/update-profile** -  You will be able to update some basic user info, including changing your password.  

***/api/books***
* **/favorites** -  this page will list all the books you clicked as a favorite.

* **/single-book** -  this page will provide more details on the book and you will have the option to check the book in and out based on availability.

* **/history** - this page will list all of the books you have checked out previously.

***/api/admin***
* **/addbook** - administrator will be able to add a book to the database.

* **/deletebook** - administrator will be able to delete a book from the database.

* **/viewcheckedbooks** - administrator will be able to view all the books that are currently checked out.
---