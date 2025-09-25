const express=require('express')
const {books}=require('../data/books.json')
const {users}=require('../data/users.json')

// const UserModel=require('../models/User-model')
// const BookModel=require('../models/book-model')

const {UserModel,BookModel}=require('../models');
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById, deleteBookById } = require('../controllers/book-controller');

const router=express.Router();

/**
 * Route: /books
 * method: GET
 * discription: Get all the list of books in the system.
 * Access: public
 * Parameters: none 
 */

// router.get('/',(req,res)=>{
//    res.status(200).json({
//     success:true,
//     data:books
//    })

// })

router.get('/',getAllBooks)




/**
 * Route: /books/:id
 * method: GET
 * discription:  Get a book by their ID.
 * Access: public
 * Parameters:id
 */

// router.get('/:id',(req,res)=>{

//     const {id}=req.params
//     const book=books.find((each)=>each.id===id)

//     if(!book){
//         return res.status(404).json({
//             success:false,
//             message:`book not found id:${id}`
//         })
//     }

//     res.status(200).json({
//          success:true,
//         data: book

//     })
// })

router.get('/:id',getSingleBookById)

router.get('/issued/for-users',getAllIssuedBooks)

/**
 * Route: /books/
 * method: POSt
 * discription: Create/Register a new book.
 * Access: public
 * Parameters:None
 */
// router.post('/',(req,res)=>{
//     const {data}=req.body;
//     // "id":"4",
//     //     "name": "To Kill a Mockingbird",
//     //     "author": "Harper Lee",
//     //     "genre": "Classic",
//     //     "available": true
//     const {id,name,author,genre,available}=req.body;
//     if(!id || !name || !author || !genre || !available){
//         return res.status(400).json({
//             success:false,
//             message:`Please fill all information the book`
//         }) 
//     }
//     const book=books.find((each)=>each.id===id);
//     if(book){
//        return res.status(409).json({
//             success:false,
//             message:`book is exist of id:${id}`
//         })
//     }

//     books.push({id,name,author,genre,available})

//     res.status(200).json({
//         success:true,
//         message:`Created/Registered new book successfully`,
//         data:{id,name,author,genre,available}
//     })
// })

router.post('/',addNewBook);

/**
 * Route: /users/:id
 * method: PUT
 * discription:  Updating a book by their ID.
 * Access: public
 * Parameters:id
 */
// router.put('/:id/',(req,res)=>{
//     const {id}=req.params;
//     const {data}=req.body;

//     const book=books.find((each)=>each.id===id);

//     if(!book){
//         return res.status(404).json({
//             success:false,
//             message:`book id not found id: ${id}`
//         })
//     }
//     //Object.assign(user,data)
//     //with spread operator
//     const updateBook=books.map((each)=>{
//        if(each.id===id){
//         return{
//             ...each,
//             ...data,
//         }
//        }
//         return each
//     })
//     res.status(200).json({
//         success:true,
//         message:`Updated successfully for id:${id}`,
//         data:updateBook
//     })
// })

router.put('/:id/',updateBookById)


/**
 * Route: /books/:id
 * method: DELETE
 * discription:  Deleting a book by their ID.
 * Access: public
 * Parameters:id
 */
// router.delete('/:id',(req,res)=>{
//     const {id}=req.params;
//     const book=books.find((each)=>each.id===id);
//     if(!book){
//         return res.status(404).json({
//             success:false,
//             message:`Not found a book of id:${id}`
//         })
//     }
//     const updateBooks=books.filter((each)=>each.id!==id);

//     res.status(200).json({
//         success:true,
//         data:updateBooks,
//         message:"List of books are updated successfully"
//     })


// })

router.delete('/:id',deleteBookById)





module.exports=router;