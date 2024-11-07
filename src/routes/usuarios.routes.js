import { Router } from 'express'
import {getUsuarios,getUsuariosxid,postUsuario,putUsuario, patchUsuario, deleteUsuario, login} from '../controladores/usuariosCtrl.js'
import { verifyToken } from '../autorizacion/autorizacion.js';
const router=Router()
// armar nuestras rutas

router.get('/usuarios',verifyToken, getUsuarios) //select
router.get('/usuarios/:id', verifyToken,getUsuariosxid) //select x id
router.post('/usuarios', verifyToken ,postUsuario) //insert
router.put('/usuarios/:id', verifyToken, putUsuario) //update
router.patch('/usuarios/:id', verifyToken, patchUsuario) //update
router.delete('/usuarios/:id', verifyToken, deleteUsuario) //update


router.post('/login', login);



export default router