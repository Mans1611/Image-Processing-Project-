import express from 'express'


 const validateQuery = (req:express.Request,res:express.Response,next:Function):void=>{
    
    let { width, height } = req.query;

    let checkValidateWidth:string[] | null = ((width as unknown) as string).match(/[^0-9]/ig);
    let checkValidateHeight:string[] | null = ((height as unknown) as string).match(/[^0-9]/ig);
    try{
        if(checkValidateWidth || checkValidateHeight)
            throw new Error("write just numbers to the query please");
        next();
    }catch(err){
        res.status(401).send("The dimensions is not valid");
    }

    
}
export default validateQuery;