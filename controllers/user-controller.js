const {UserModel,BookModel}=require("../models")

// router.get('/',(req,res)=>{
//    res.status(200).json({
//     success:true,
//     data:users
//    })

// })

exports.getAllUsers=async(req,res)=>{
    const users=await UserModel.find()

    if(!users||users.length===0){
        return res.status(404).json({
            success:false,
            message:"no users found"
        })
    }

    res.status(200).json({
        success:true,
        data:users
    })
}

exports.getSingleUserById=async(req,res)=>{
    const {id}=req.params

    const user= await UserModel.findById(id);

    if(!user||user.length===0){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }

    res.status(200).json({
        success:true,
        data:user
    })
}

exports.createUser=async(req,res)=>{
    const {data}=req.body;
   
    if(!data||Object.keys(data).length===0){
        return res.status(400).json({
            success:false,
            message:"user data is required"
        })
    }
    await UserModel.create(data);

    res.status(201).json({
        success:true,
        message:"user created successfully",
        data:data
    })

}

exports.updateUserById=async (req,res)=>{
    const {id}=req.params
    const {data}=req.body

    const user= await UserModel.findById(id);

    if(!user||user.length===0){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }
    const updatedUser= await UserModel.findByIdAndUpdate(id,data,{new:true})
    res.status(200).json({
        success:true,
        message:"user updated successfully",
        data:updatedUser
    })
}

exports.deleteUserById=async (req,res)=>{
    const {id}=req.params;

    const user=await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({
        success:true,
        message:"user deleted successfully"
    })
}

exports.getSubscriptionDetailsById=async(req,res)=>{
    const {id}=req.params
    const user=await UserModel.findById(id)

    if(!user){
        return res.status(404).json({
            success:false,
            message:`User not found with id: ${id}`
        })
    }
    //Calculate the subscription expiry date
    const getDateInDays=(givenDate='')=>{
        let date;
        if(givenDate){
            date=new Date(givenDate);
        }else{
            date=new Date();
        }
        //from milliseconds to days
        let days = Math.floor(date/(1000*60*60*24));
        return days;
    }
    
    const subscriptionType=(days)=>{
        if(user.subscriptionType==="Basic"){
            days=days+90
        }else if(user.subscriptionType==="Standard"){
            days=days+180
        }else if(user.subscriptionType==="Premium"){
            days=days+365
        }
        return days;
    }
    //subscription exiration calculation
    let returnDate=getDateInDays(user.returnDate)
    let currentDate=getDateInDays()
    let subscriptionDate=getDateInDays(user.subscriptionDate)
    let subscriptionExpiration=subscriptionType(subscriptionDate)

    const data={
        ...user,
        subscriptionExpired:subscriptionExpiration<currentDate,
        subscriptionDaysLeft:subscriptionExpiration-currentDate,
        daysLeftForExpiration:returnDate-currentDate,
        returnDate:returnDate<currentDate?"Book is Overdue":returnDate,
        fine:returnDate<currentDate?subscriptionExpiration<=currentDate?200:100:0
}
res.status(200).json({
    success:true,
    content:data,
})

}