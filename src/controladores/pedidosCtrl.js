import { json } from 'express'
import{conmysql} from '../db.js'

//PROGRAMAR
export const getPedidos=
    async (req,res) =>{
        try {
            const [result]= await conmysql.query(' select * from pedidos')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar Pedidos"})
        }
    }

export const getPedidosxid=
async(req, res)=>{
   try {
    const [result]=await conmysql.query('select * from pedidos where ped_id=?',[req.params.id])
    if(result.length<=0)return res.status(404).json({
        prod_id:0,
        message:"Pedido no encontrado"
    })
    res.json(result[0])
   } catch (error) {
    return res.status(500).json({message: 'Error en el servidor'})
    
   }

}


export const postPedido= 
async(req, res)=>{
    try{
    //console.log(req.body)
    const{  cli_id, ped_fecha, usr_id, ped_estado }=req.body
    //console.log(cli_nombre)
    const[rows]=await conmysql.query('insert into pedidos ( cli_id, ped_fecha, usr_id, ped_estado )values(?,?,?,?)',
        [ cli_id, ped_fecha, usr_id, ped_estado ]
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
export const putPedido=
async(req, res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)           
    const{cli_id, ped_fecha, usr_id, ped_estado}=req.body
    console.log(usr_id)
    const[result]=await conmysql.query('update pedidos set cli_id=?, ped_fecha=?, usr_id=?, ped_estado=?',
        [cli_id, ped_fecha, usr_id, ped_estado,id]) 
        
        if(result.affectedRows<=0)return res.status(400).json({
            message:"Pedido no encontrado"
        })

        const[rows]=await conmysql.query('select * from pedidos where ped_id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message:'Error en el servidor'})
    }
}

 //PUT REEMPLAZAR

 export const patchPedido=     //PATCH MODIFICAR
 async(req, res)=>{
     try {
         const {id}=req.params
         //console.log(req.body)           
     const{cli_id, ped_fecha, usr_id, ped_estado}=req.body
     console.log(prod_nombre)
     const[result]=await conmysql.query('update pedidos set cli_id=?, ped_fecha=?, usr_id=?, ped_estado=?',
         [cli_id, ped_fecha, usr_id, ped_estado,id]) 
         
         if(result.affectedRows<=0)return res.status(400).json({
             message:"pedido no encontrado"
         })
 
         const[rows]=await conmysql.query('select * from pedidos where ped_id=?',[id])
         res.json(rows[0])
     } catch (error) {
         return res.status(500).json({message:'Error en el servidor'})
     }
 }
  

export const deletePedido=
async(req, res)=>{
    try {
        const [result]=await conmysql.query(' delete from pedidos where ped_id=?', [req.params.id])
        if (rows.affectedRows>=0) return res.status(404).json({
            id:0,
            message:"NO se pudo eliminar al pedido"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
        
    }
}



