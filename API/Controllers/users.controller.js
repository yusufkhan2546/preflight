


exports.getUser = (req,res,next)=>{
   const id = req.params.id;
    res.status(200).json({message:'working in get users',
                            id:id});
}
exports.postUser = (req,res,next)=>{
    const body = req.body.message;
    res.status(200).json({message:body});
}