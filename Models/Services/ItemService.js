import { Op } from "sequelize";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
import dotenv from 'dotenv';
import sequelize from "sequelize";
dotenv.config()
import algoliasearch from "algoliasearch";
export const getItemByCategoryService = async ()=>{
    try {
        const categoryItem = await db.categoryItem.findAll({
            include : [
                {
                    model : db.item
                }
            ]
        })
        return categoryItem;
    } catch (error) {
        return error;
    }
}
export const createItemByCategoryService= async(data, CategoryItemId)=>{
    let items = []
    for(let i = 0; i < data.length; i++){
        const checkItem = await db.item.findOne({
            where : {
                name : data[i].value
            }
        })
        if(!checkItem){
            const item = await db.item.create({
                name : data[i].value,
                CategoryItemId
            })
            if(!item) return createError(400, 'Thêm không thành công!')
            items.push(item)
        }else return createError(400, `Bạn đã tạo ${data[i].value} trước đó rồi`)
    }
    return items;
}
export const deleteItemServices = async(id)=>{
    try {
        await db.item.destroy({
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
export const deleteCategoryItemServices = async(id)=>{
    try {
        await db.categoryItem.destroy({
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
export const createCategoryItemServices = async(name)=>{
    try {
        const checkCategory = await db.categoryItem.findOne({
            where : {
                name : name
            }
        })
        if(checkCategory) return createError(400, 'Bạn đã thêm thể loại này trước đó!');
        const categoryItem = await db.categoryItem.create({
            name : name
        })
        if(!categoryItem) return createError(400, 'Thêm không thành công!');
        return categoryItem;
    } catch (error) {
        return error;
    }
}