# Book Library App
![](./public/images/books.gif)

Come 'checkout' this simple library app! The list of books are the current NY Times Best Sellers.  
Features:
* User: 
  * **You can only check out one book at a time!**
  * **The book will be due in 14 days of when you check it out**
  * **Add a book to your favorites**
  * **There is an option to buy the book through a link to Amazon**
* Admin:
  * **Administrator can add/delete books to the database**
  * **Administrator can view all the books that are currently checked out**

---
### Routes
***/*** - will render the home page where it will list a few features for the user.  

***/api/users***
* **/api/login** - the user will be able to login to the app. 

* **/api/register** -  the user will be able to register into the app. You will get an option to select if you're an admin to get access to more information.

* **/api/profile** -  this page will allow you to view the user profile.

* **/api/update-profile** -  You will be able to update some basic user info, including changing your password.  
  
***/api/books***
* **/favorites** -  this page will list all the books you clicked as a favorite.

* **/checkedout && /checkedin** -  this route will allow a user to check a book out and in. The homepage will show the current book that is checked out.

***/api/admin***
* **/addbook** - administrator will be able to add a book to the database.

* **/deletebook** - administrator will be able to delete a book from the database.

* **/viewcheckedbooks** - administrator will be able to view all the books that are currently checked out.

---
### Dependencies
* NYTimes API  
* Faker
* Moment  
* Bcrypt JS