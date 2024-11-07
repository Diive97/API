import{conmysql} from '../db.js'

//PROGRAMAR
export const getPedidos_detalle=
    async (req,res) =>{
        try {
            const [result]= await conmysql.query(' select * from pedidos_detalle')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar Pedidos_detalle"})
        }
    }

export const getPedidos_detallexid=
async(req, res)=>{
   try {
    const [result]=await conmysql.query('select * from pedidos_detalle where det_id=?',[req.params.id])
    if(result.length<=0)return res.status(404).json({
        prod_id:0,
        message:"Producto no encontrado"
    })
    res.json(result[0])
   } catch (error) {
    return res.status(500).json({message: 'Error en el servidor'})
    
   }

}

export const postPedidos_detalle= 
async(req, res)=>{
    try{
    //console.log(req.body)
    const{  prod_id, ped_id, det_cantidad, det_precio  }=req.body
    //console.log(cli_nombre)
    const[rows]=await conmysql.query('insert into pedidos_detalle (prod_id,ped_id,det_cantidad,det_precio) values(?,?,?,?)',
        [ prod_id, ped_id, det_cantidad, det_precio  ])
    res.send({
        id:rows.insertId
    })
    {}
    } catch (error){
        return res.status(500).json({message:'error del lado del servidor '})
    }
}

//PUT REEMPLAZAR
export const putPedidos_detalle=
async(req, res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)           
    const{prod_id, ped_id, det_cantidad, det_precio }=req.body
    console.log(prod_id)
    const[result]=await conmysql.query('update pedidos_detalle set prod_id=?, ped_id=?, det_cantidad=?, det_precio=? where det_id=?',
        [prod_id, ped_id, det_cantidad, det_precio ,id]) 
        
        if(result.affectedRows<=0)return res.status(400).json({
            message:"Pedidos no encontrado"
        })

        const[rows]=await conmysql.query('select * from pedidos_detalle where det_id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message:'Error en el servidor'})
    }
}

 //PUT REEMPLAZAR
 export const patchPedidos_detalle=
 async(req, res)=>{
     try {
         const {id}=req.params
         //console.log(req.body)           
     const{prod_id, ped_id, det_cantidad, det_precio }=req.body
     console.log(prod_id)
     const[result]=await conmysql.query('update pedidos_detalle set prod_id=IFNULL(?,prod_id), ped_id=IFNULL(?,ped_id), det_cantidad=IFNULL(?,det_cantidad), det_precio=IFNULL(?,det_precio) where det_id=?',
         [prod_id, ped_id, det_cantidad, det_precio ,id]) 
         
         if(result.affectedRows<=0)return res.status(400).json({
             message:"Pedidos no encontrado"
         })
 
         const[rows]=await conmysql.query('select * from pedidos_detalle where det_id=?',[id])
         res.json(rows[0])
     } catch (error) {
         return res.status(500).json({message:'Error en el servidor'})
     }
 }

export const deletePedidos_detalle=
async(req, res)=>{
    try {
        const [result]=await conmysql.query(' delete from pedidos_detalle where det_id=?', [req.params.id])
        if (rows.affectedRows>=0) return res.status(404).json({
            id:0,
            message:"NO se pudo ELIMINAR AL pedido"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
        
    }
}








