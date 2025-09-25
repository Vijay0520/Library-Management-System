//Data Transfer Object

class IssuedBook{
    _id;
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;

    constructor(user){
        this._id=user.issuedBook._id;
        this.name=user.issuedBook.name;
        this.genre=user.issuedBook.genre;
        this.price=user.issuedBook.price;
        this.available=user.issuedBook.available;
        this.issuedBy=user.issuedBy;
        this.issuedDate=user.issuedDate;
        this.returnDate=user.returnDate;
    }
}