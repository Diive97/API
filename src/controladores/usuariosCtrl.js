import{conmysql} from '../db.js'
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';


//PROGRAMAR
export const getUsuarios=
    async (req,res) =>{
        try {
            const [result]= await conmysql.query(' select * from usuarios')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar Usuarios"})
        }
    }

    export const getUsuariosxid=
async(req, res)=>{
   try {
    const [result]=await conmysql.query('select * from usuarios where usr_id=?',[req.params.id])
    if(result.length<=0)return res.status(404).json({
        usr_id:0,
        message:"Usuario no encontrado"
    })
    res.json(result[0])
   } catch (error) {
    return res.status(500).json({message: 'Error en el servidor'})
    
   }

}

export const postUsuario = async (req, res) => {
  try {
    const {
      usr_usuario,
      usr_clave,
      usr_nombre,
      usr_telefono,
      usr_correo,
      usr_activo
    } = req.body;

    // Encriptar la clave antes de guardarla
    const salt = await bcrypt.genSalt(10); // Genera un salt con factor de costo 10
    const hashedPassword = await bcrypt.hash(usr_clave, salt); // Encripta la clave

    const [rows] = await conmysql.query(
      'INSERT INTO usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) VALUES (?, ?, ?, ?, ?, ?)',
      [usr_usuario, hashedPassword, usr_nombre, usr_telefono, usr_correo, usr_activo]
    );

    res.send({
      id: rows.insertId
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error del lado del servidor' });
  }
}
//PUT 
export const putUsuario = async(req, res) => {
  try {
      const { id } = req.params;
      const {usr_usuario,usr_clave,usr_nombre,usr_telefono,usr_correo,usr_activo
      } = req.body;

      
      const [existingUser] = await conmysql.query('select usr_clave from usuarios where usr_id = ?', [id]);
      if (!existingUser || existingUser.length === 0) {
          return res.status(400).json({ message: "Usuario no encontrado" });
      }

      let hashedPassword = existingUser[0].usr_clave; 

      if (usr_clave && usr_clave !== hashedPassword) {
          const salt = await bcrypt.genSalt(10);
          hashedPassword = await bcrypt.hash(usr_clave, salt);
      }

      const [result] = await conmysql.query(
          'update usuarios set usr_usuario=?, usr_clave=?, usr_nombre=?, usr_telefono=?, usr_correo=?, usr_activo=? where usr_id=?',
          [usr_usuario, hashedPassword, usr_nombre, usr_telefono, usr_correo, usr_activo, id]
      );

      if (result.affectedRows <= 0) {
          return res.status(400).json({ message: "Error al actualizar el usuario" });
      }

      const [rows] = await conmysql.query('select * from usuarios where usr_id=?', [id]);
      res.json({
          message: "Usuario actualizado correctamente",
          data: rows[0]
      });

  } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor' });
  }
};


export const patchUsuario=     //PATCH MODIFICAR
async(req, res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)           
    const{usr_usuario, hashedPassword, usr_nombre, usr_telefono, usr_correo, usr_activo}=req.body
    console.log(usr_nombre)
    const[result]=await conmysql.query('update usuario set usr_usuario=?, hashedPassword=?, usr_nombre=?, usr_telefono=?, usr_correo=?, usr_activo=?',
        [usr_usuario, hashedPassword, usr_nombre, usr_telefono, usr_correo, usr_activo,id]) 
        
        if(result.affectedRows<=0)return res.status(400).json({
            message:"usuario no encontrado"
        })

        const[rows]=await conmysql.query('select * from usuarios where usr_id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message:'Error en el servidor'})
    }
}
 

export const deleteUsuario=
async(req, res)=>{
   try {
       const [result]=await conmysql.query(' delete from usuarios where usr_id=?', [req.params.id])
       if (rows.affectedRows>=0) return res.status(404).json({
           id:0,
           message:"NO se pudo ELIMINAR AL usuario"
       })
       res.sendStatus(202)
   } catch (error) {
       return res.status(500).json({message:"Error del lado del servidor"})
       
   }
}


// Ruta para autenticar al usuario y generar un token
export const login =  async (req, res) => {
    const { usr_usuario, usr_clave } = req.body;

    try {
        // Busca al usuario en la base de datos
        const [user] = await conmysql.query('SELECT * FROM usuarios WHERE usr_usuario = ?', [usr_usuario]);

        if (user.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Verifica la contraseña
        const validPassword = await bcrypt.compare(usr_clave, user[0].usr_clave);
        if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // Crea un token JWT
        const token = jwt.sign({ id: user[0].id, usr_usuario: user[0].usr_usuario }, JWT_SECRET, {
            expiresIn: '1h' // El token expira en 1 hora
        });

        res.json({ message: 'Autenticación exitosa', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en la autenticación', error });
    }
};


