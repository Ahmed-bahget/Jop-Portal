import { Company } from "../models/company.model.js";

export const registerCompany = async (req,res)=>{
    try {
    const {companyName} = req.body;
    if (!companyName){
        return res.status(400).json({
            message:'you should inter company name',
            success:false
        })
    }
    
    let company = await Company.findOne({companyName});
    if(company){
        res.status(400).json({
            message:'you cannot add same company',
            success:false
        })
    }
     company = await Company.create({
        name:companyName,
        userId:req.id
     });

    return res.status(200).json({
        message:'company created successfully',
        company,
        success:true
    })
} catch (error) {
        console.log(error)
}
}

export const getCompany = async (req,res)=>{
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(400).json({
                message:"something err when get companies",
                success:false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({
                message:"something err when get company",
                success:false
            })}
            return res.status(200).json({
                company,
                success:true
            })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (req,res)=>{
    try {
        const {name,description,website,location} = req.body;
        const file = req.file;
        const companyId =req.params.id;
        const updatedData = {name,description,website,location};
        const company = await Company.findByIdAndUpdate(companyId,updatedData,{new:true});
        if(!company){
            return res.status(400).json({
                message:"something err when update company",
                success:false
            })}

            return res.status(200).json({
                message:"company information updated",
                success:true
            })    
        } catch (error) {
        console.log(error);
    }
}