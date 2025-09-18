# Library-Management-System

 This is a library management API Backend for the management of users and the books.

 # Routes and the Endpoints

 ## /users
 GET: Get all the list of users in the system.
 POST: Create/Register a new user.

 ## /users{id}
 GET: Get a user by their ID.
 PUT: Updating s user by their ID.
 DELETE: Deleting a user by their ID.(Check if the user still has an issued book) && (is there any fine/penalty to be colleted)

 ## /user/subscription-details/{ID}
 GET: Get a user subscription details by their ID.
    >>Date of subscription
    >>Valid till ?
    >>Fine if any ?

## /books
GET: Get all the books in the system.
POST: Add a new book to the system.

## /books{ID}
GET: Get a book by its ID.
PUT:Update a book by its ID.
DELETE: Delete a book by its ID.

## /books/issued
GET: Get all the issued books.

## /books/issued/withfine
GET:Get all issued books with their fine amount.

### subscription Types
>>Basic (3 months)
>>Standard (6 months)
>>Premium (12 months)

>>if user missed the renewal date,then user should be collected with $100.
>>if a user missed his subscription,then user is expected to pay $100.
>>if a user missed both renewal and subscription , then the collected amount should be $200.

## commands:
npm init
npm i express
npm i nodemon --save-dev

npm run dev

to restore node_modules and package-lock.json->npm i /npm install.