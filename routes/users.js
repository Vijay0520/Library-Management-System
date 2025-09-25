const express=require('express')
const {users}=require('../data/users.json')

const {getAllUsers, getSingleUserById,createUser, updateUserById,deleteUserById,getSubscriptionDetailsById}=require('../controllers/user-controller')

const router=express.Router();



/**
 * Route: /users
 * method: GET
 * discription: Get all the list of users in the system.
 * Access: public
 * Parameters: none 
 */

// router.get('/',(req,res)=>{
//    res.status(200).json({
//     success:true,
//     data:users
//    })

// })

router.get('/',getAllUsers);

/**
 * Route: /users/:id
 * method: GET
 * discription:  Get a user by their ID.
 * Access: public
 * Parameters:id
 */

// router.get('/:id',(req,res)=>{

//     const {id}=req.params
//     const user=users.find((each)=>each.id===id)

//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message:`user not found ${id}`
//         })
//     }

//     res.status(200).json({
//          success:true,
//         data: user

//     })
// })

router.get('/:id',getSingleUserById)

/**
 * Route: /users/
 * method: POSt
 * discription: Create/Register a new user.
 * Access: public
 * Parameters:None
 */
// router.post('/',(req,res)=>{
//     //req.body should have all the required information
//         const {id,name,age ,issuedBook,issuedDate,returnDate,subscriptionType,subscriptionDate,city}=req.body;

//         if(!id || !name || !age || !issuedBook || !issuedDate || !returnDate || !subscriptionType || !subscriptionDate || !city){
//             return res.status(400).json({
//                 success:false,
//                 message:"Please provide all the required fields"
//             })
//         }

//         //Check if the user with the same id already exists
//         const user=users.find((each)=>each.id===id);
//         if(user){
//             return res.status(409).json({
//                 success:false,
//                 message:`User Already Exist with id: ${id}`
//             })
//         }

//         //If all the data is valid, create a new user
//         //and push it to the users array
//         users.push({id,name,age ,issuedBook,issuedDate,returnDate,subscriptionType,subscriptionDate,city})

//         res.status(201).json({
//             success:true,
//             message:"User Created Successfully"
//         })
// })

router.post('/',createUser)

/**
 * Route: /users/:id
 * method: PUT
 * discription:  Updating a user by their ID.
 * Access: public
 * Parameters:id
 */
// router.put('/:id/',(req,res)=>{
//     const {id}=req.params;
//     const {data}=req.body;

//     const user=users.find((each)=>each.id===id);

//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message:`user id not found id: ${id}`
//         })
//     }
//     //Object.assign(user,data)
//     //with spread operator
//     const updateUser=users.map((each)=>{
//         if(each.id===id){
//             return{
//             ...each,
//             ...data,
//             }
//         }
//         return each
//     })

//     res.status(200).json({
//         success:true,
//         data:updateUser,
//         message:"user updated successfully"
//     })
// })

router.put('/:id/',updateUserById)


/**
 * Route: /users/:id
 * method: DELETE
 * discription:  Deleting a user by their ID.
 * Access: public
 * Parameters:id
 */

// router.delete('/:id/',(req,res)=>{
//     const {id}=req.params;
//     const user=users.find((each)=>each.id===id);
//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message:`user id not found for id:${id}`
//         })
//     }
//      const updateUser=users.filter((each)=>each.id!==id);
//     //second method
//     // const index=users.indexOf(user)
//     // users.splice(index,1);

//     res.status(200).json({
//         success:true,
//         data:updateUser,
//         message:"deleted successfully"
//     })
// });

router.delete('/:id/',deleteUserById);


/**
 * Route: /users/subscription-details/:id/
 * method: GET
 * discription:  Details of a user by their ID.
 * Access: public
 * Parameters:id
 */

// router.get('/subscription-details/:id',(req,res)=>{
//     const {id}=req.params;
//     const user=users.find((each)=>each.id===id);

//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message:`User not found with id: ${id}`
//         })
//     }
//     //Calculate the subscription expiry date
//     const getDateInDays=(givenDate='')=>{
//         let date;
//         if(givenDate){
//             date=new Date(givenDate);
//         }else{
//             date=new Date();
//         }
//         //from milliseconds to days
//         let days = Math.floor(date/(1000*60*60*24));
//         return days;
//     }
    
//     const subscriptionType=(days)=>{
//         if(user.subscriptionType==="Basic"){
//             days=days+90
//         }else if(user.subscriptionType==="Standard"){
//             days=days+180
//         }else if(user.subscriptionType==="Premium"){
//             days=days+365
//         }
//         return days;
//     }
//     //subscription exiration calculation
//     let returnDate=getDateInDays(user.returnDate)
//     let currentDate=getDateInDays()
//     let subscriptionDate=getDateInDays(user.subscriptionDate)
//     let subscriptionExpiration=subscriptionType(subscriptionDate)

//     const data={
//         ...user,
//         subscriptionExpired:subscriptionExpiration<currentDate,
//         subscriptionDaysLeft:subscriptionExpiration-currentDate,
//         daysLeftForExpiration:returnDate-currentDate,
//         returnDate:returnDate<currentDate?"Book is Overdue":returnDate,
//         fine:returnDate<currentDate?subscriptionExpiration<=currentDate?200:100:0
// }
// res.status(200).json({
//     success:true,
//     data:data,
// })
// })

router.get('/subscription-details/:id',getSubscriptionDetailsById)


module.exports=router;
