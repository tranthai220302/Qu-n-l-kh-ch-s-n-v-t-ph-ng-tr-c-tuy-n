import { Op } from "sequelize";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
import dotenv from 'dotenv';
import sequelize from "sequelize";
dotenv.config()
import algoliasearch from "algoliasearch";
export const getServiceServices = async ()=>{
    try {
        const service = await db.services.findAll({
            attributes : ['id','name']
        });
        return service;
    } catch (error) {
        return error;
    }
}

export const createServiceServices = async(data)=>{
    try {
        let services = []
        for(let i = 0 ; i < data.length ; i++){
            const checkService = await db.services.findOne({
                where : {
                    name : data[i].value
                }
            })
            if(!checkService){
                const service = await db.services.create({
                    name : data[i].value
                })
                if(!service) return createError(400, 'Thêm không thành công!')
                services.push(service)
            }else return createError(400, `Bạn đã tạo dịch vụ ${arr[i]} trước đó rồi`)
        }
        return services;
    } catch (error) {
        return error;
    }
}
export const deleteServiceServices = async(id)=>{
    try {
        await db.services.destroy({
            where : {
                id : {
                    [Op.in] : id
                }
            }
        });
        return {messgae : 'Xoá thành công!'};
    } catch (error) {
        return error;
    }
}