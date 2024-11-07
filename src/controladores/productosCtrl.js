import { json } from 'express'
import{conmysql} from '../db.js'

export const getProductos=
async (req,res) =>{
    try {
        const [result]= await conmysql.query('select * from productos')
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:"Error al consultar Productos"})
    }
}
export const getProductosxid=
async(req, res)=>{
   try {
    const [result]=await conmysql.query('select * from productos where prod_id=?',[req.params.id])
    if(result.length<=0)return res.status(404).json({
        prod_id:0,
        message:"Producto no encontrado"
    })
    res.json(result[0])
   } catch (error) {
    return res.status(500).json({message: 'Error en el servidor'})
    
   }

}


export const postProducto= 
async(req, res)=>{
    try{
    //console.log(req.body)
    const{prod_codigo,prod_nombre, prod_stock, prod_precio, prod_activo }=req.body
    const prod_imagen=req.file ? `/uploads/${req.file.filename}`:null;
    console.log("Datos de producto:",req.body);//verificar
    console.log("Archivo de imagen:",req.file);
    //console.log(cli_nombre)
    const[rows]=await conmysql.query('insert into productos (prod_codigo,prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen )values(?,?,?,?,?,?)',
        [prod_codigo,prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen ]
    )
    res.send({
        id:rows.insertId
    })
    {}
} catch (error){
    return res.status(500).json({message:'error del lado del servidor '})
}
}
//PUT REEMPLAZAR
export const putProducto=
async(req, res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)           
    const{prod_codigo,prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen}=req.body
   // console.log(prod_nombre)
    const[result]=await conmysql.query('update productos set prod_codigo=?,prod_nombre=?, prod_stock=?, prod_precio=?, prod_activo=?, prod_imagen=?',
        [prod_codigo,prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen,id]) 
        
        if(result.affectedRows<=0)return res.status(400).json({
            message:"Producto no encontrado"
        })

        const[rows]=await conmysql.query('select * from productos where prod_id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message:'Error en el servidor'})
    }
}

 //PATCH MODIFICAR

export const patchProducto=     //PATCH MODIFICAR
async(req, res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)           
    const{prod_codigo,prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen}=req.body
    console.log(prod_nombre)
    const[result]=await conmysql.query('update productos set prod_codigo=?,prod_nombre=?, prod_stock=?, prod_precio=?, prod_activo=?, prod_imagen=?',
        [prod_codigo,prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen,id]) 
        
        if(result.affectedRows<=0)return res.status(400).json({
            message:"producto no encontrado"
        })

        const[rows]=await conmysql.query('select * from productos where prod_id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message:'Error en el servidor'})
    }
}

export const deleteProducto= //DELETE ELIMINAR
async(req, res)=>{
    try {
        const [result]=await conmysql.query(' delete from productos where prod_id=?', [req.params.id])
        if (rows.affectedRows>=0) return res.status(404).json({
            id:0,
            message:"NO PUDO ELIMINAR AL PRODUCTO"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
        
    }
}