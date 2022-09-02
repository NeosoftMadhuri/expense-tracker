const model=require('../models/model')

//POST CATEGORIOES
async function create_Categories(req,res){
  const Create=new model.Categories({
    type:"Investment",
    color:'#FDBE44'
  }) 

 await Create.save(function(err){
    if(!err)return res.json(Create)
    return res.status(400).json({message:`Error while creating categories ${err}`})
  })
}

//get categories
async function get_Categories(req,res){
    let data=await model.Categories.find({})

    let filter=await data.map(v=>Object.assign({},{type:v.type,color:v.color}))
    return res.json(filter)
}

//post:Transaction
 async function create_Transaction(req,res){
    if(!req.body)return res.status(400).json("Post HTTP data not provided");
    let {name,type,amount}=req.body;
     console.log(req.body)
    const create=await new model.Transaction(
        {
            name:name,
            type:type,
            amount:amount,
            date:new Date()
        }
    )
    create.save(function(err){
        if(!err) return res.json(create)
        return res.status(400).json({message:`Error while creating transaction:${err}`})
    })
 }

 //get:Transaction

 async function get_Transction(req,res){
    let data=await model.Transaction.find({});
    return res.json(data)
 }

 //delete:Transaction

 async function delete_Transaction(req,res){
    if(!req.body)return res.status(400).json({message:'request body not found'});
    await model.Transaction.deleteOne(req.body,(err)=>{
        if(!err)return res.json("Record deleted")
    }).clone().catch((err)=>res.json("Error while deleting transaction"))

 }

 //get:http://localhost:5000/api/labes
   async function get_Labels(req,res){
    model.Transaction.aggregate([
      {
        $lookup : {
            from: "categories",
            localField: 'type',
            foreignField: "type",
            as: "categories_info"
        }
    },
    {
        $unwind: "$categories_info"
    }
  ]).then(result => {
    let data=result.map(v=>Object.assign({},{_id:v._id,name:v.name,type:v.type,amount:v.amount,color:v.categories_info['color']}))
    res.json(data);
}).catch(error => {
    res.status(400).json("Looup Collection Error");
})
   }
module.exports={create_Categories,get_Categories,create_Transaction,get_Transction,delete_Transaction,get_Labels}