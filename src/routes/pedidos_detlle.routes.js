import { Router } from 'express'
import {getPedidos_detalle, getPedidos_detallexid, postPedidos_detalle, putPedidos_detalle, patchPedidos_detalle, deletePedidos_detalle} from '../controladores/pedidos_detalleCtrl.js'
const router=Router()
// armar nuestras rutas

router.get('/pedidos_detalle', getPedidos_detalle) //select
router.get('/pedidos_detalle/:id', getPedidos_detallexid) //select x id
router.post('/pedidos_detalle', postPedidos_detalle) //insert
router.put('/pedidos_detalle/:id', putPedidos_detalle) //update
router.patch('/pedidos_detalle/:id', patchPedidos_detalle) //update
router.delete('/pedidos_detalle/:id', deletePedidos_detalle) //delete

export default router