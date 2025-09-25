const {BookModel,UserModel}=require('../models')

const IssuedBook=require('../DTOS/BookDto');
const bookModel = require('../models/book-model');

// const getAllBooks=()=>{

// }

// const getSingleBookById=()=>{

// }

// module.exports={
//     getAllBooks,
//     getSingleBookById
// }

exports.getAllBooks=async(req,res)=>{
    const books=await BookModel.find();

    if(books.length===0){
        return res.status(404).json({
            success:false,
            message:"No Books found"
    })
    }

    res.status(200).json({
        success:true,
        data:books
    })
}

//router.get('/:id',(req,res)=>{

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

 exports.getSingleBookById=async(req,res)=>{
        const {id}=req.params
    const book=await BookModel.findById(id)

    if(!book){
        return res.status(404).json({
            success:false,
            message:`book not found id:${id}`
        })
    }

    res.status(200).json({
         success:true,
        data: book

    })
 }

//  router.get('/issued/for-users',(req,res)=>{
//     const userWithIssuedBooks=users.filter((each)=>{
//     if(each.issuedBook){
//         return each;
//     }
// })
// const issuedBooks=[];
// userWithIssuedBooks.forEach((each)=>{
//     const book = books.find((book)=>book.id===each.issuedBook);
//     book.issuedBy=each.name
//     book.issuedDate=each.issuedDate;
//     book.returndate=each.returnDate;

//     issuedBooks.push(book)
// })

// if(issuedBooks.length===0){
//     return res.status(404).json({
//         success:false,
//         message:"No Books issued yet"
//     })
// }

// res.status(200).json({
//     success:true,
//     data:issuedBooks
// })
// })
 

 exports.getAllIssuedBooks=async(req,res)=>{
    const users=await UserModel.find({
        issuedBook:{$exists:true},
}).populate("issuedBook")

const issuedBooks=users.map((each)=>{
    return new IssuedBook(each);
})
if(issuedBooks.length===0){
    return res.status(404).json({
        success:false,
        message:"No Books issued yet"
    })
}

res.status(200).json({
    success:true,
    data:issuedBooks
})
}

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

exports.addNewBook=async(req,res)=>{
    const {data}=req.body;

    if(!data||Object.keys(data).length===0){
        return res.staus(400).json({
            success:false,
            message:"Please provide the book details"
        })
    }
    await BookModel.create(data);
    // res.status(201).json({
    //     success:true,
    //     message:"New Book added successfully",
    //     data:data
    // })

    const allBooks=await BookModel.find();
    res.status(200).json({
        success:true,
        message:"New Book added successfully",
        data:allBooks
    })

}

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

exports.updateBookById=async(req,res)=>{
    const {data}=req.body;
    const {id}=req.params;

    if(!data||Object.keys(data).length===0){
        return res.status(400).json({
            success:false,
            message:"Please provide the data to update"
        })
    }

    // const book=await BookModel.findById(id);

    // if(!book){
    //     return res.status(404).json({
    //         success:false,
    //         message:`book id not found id: ${id}`
    //     })
    // }
    // Object.assign(book,data);
    // await book.save();

    // res.status(200).json({
    //     success:true,
    //     message:"Book updated successfully",
    //     data:book
    // })

    const updateBook=await bookModel.findOneAndUpdate(
        {_id:id},
        data,
        {new:true}
    )

    if(!updateBook){
        return res.status(404).json({
            success:false,
            message:`Book Not Found of id:${id}`
        })
    }

    res.status(200).json({
        success:true,
        message:"Book Updated Successfully",
        data:updateBook
    })

    
}

exports.deleteBookById=async(req,res)=>{
    const {id}=req.params;

    const book=await bookModel.findById(id);

    if(!book){
        return res.status(404).json({
            success:false,
            message:`Book not found of id:${id}`
        })
    }
    await bookModel.findByIdAndDelete(id)

    res.status(200).json({
        success:true,
        message:"Book Deleted Successfully"
    })

}