# Book Library App
Come 'checkout' this simple library app! The list of books are the current NY Times Best Sellers.  
Features:
* Users: 
  * **You can only check out one book at a time!**
  * **Add a book to your favorites**
  * **There is an option to buy the book through a link to Amazon**
* Admin:
  * **The admin can add books to the database**

![](https://media.giphy.com/media/aN5kVBEd1YH5e/giphy.gif)

---
## Routes
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
* **/addbooks** - administrator will be able to add books to the database.


---
# Dependencies
NYTimes API
Faker
Moment
Bcrypt JS