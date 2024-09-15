
# Ecommerce

**Gestion de productos, usuarios, sesiones proceso de compra**

  
## Consigna
Conseguir una experiencia de compra completa
Cerrar detalles administrativos con los roles.

## Obligatorio entrega
Desde el router de /api/users, crear tres rutas:
GET  /  deberá obtener todos los usuarios, éste sólo debe devolver los datos principales como nombre, correo, tipo de cuenta (rol)

DELETE / deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días. (puedes hacer pruebas con los últimos 30 minutos, por ejemplo). Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad

Crear una vista para poder visualizar, modificar el rol y eliminar un usuario. Esta vista únicamente será accesible para el administrador del ecommerce

Modificar el endpoint que elimina productos, para que, en caso de que el producto pertenezca a un usuario premium, le envíe un correo indicándole que el producto fue eliminado.

Finalizar las vistas pendientes para la realización de flujo completo de compra. NO ES NECESARIO tener una estructura específica de vistas, sólo las que tú consideres necesarias para poder llevar a cabo el proceso de compra.

No es necesario desarrollar vistas para módulos que no influyan en el proceso de compra (Como vistas de usuarios premium para crear productos, o vistas de panel de admin para updates de productos, etc)


Realizar el despliegue de tu aplicativo en la plataforma de tu elección (Preferentemente Railway.app, pues es la abarcada en el curso) y corroborar que se puede llevar a cabo un proceso de compra completo.

## Aspectos a incluir
Realizar un sistema de recuperación de contraseña, la cual envíe por medio de un correo un botón que redireccione a una página para restablecer la contraseña (no recuperarla).
link del correo debe expirar después de 1 hora de enviado.
Si se trata de restablecer la contraseña con la misma contraseña del usuario, debe impedirlo e indicarle que no se puede colocar la misma contraseña
Si el link expiró, debe redirigir a una vista que le permita generar nuevamente el correo de restablecimiento, el cual contará con una nueva duración de 1 hora.
Establecer un nuevo rol para el schema del usuario llamado “premium” el cual estará habilitado también para crear productos
Modificar el schema de producto para contar con un campo “owner”, el cual haga referencia a la persona que creó el producto
Si un producto se crea sin owner, se debe colocar por defecto “admin”.
El campo owner deberá guardar sólo el correo electrónico (o _id, lo dejamos a tu conveniencia) del usuario que lo haya creado (Sólo podrá recibir usuarios premium)
Modificar los permisos de modificación y eliminación de productos para que:
Un usuario premium sólo pueda borrar los productos que le pertenecen.
El admin pueda borrar cualquier producto, aún si es de un owner.
Además, modificar la lógica de carrito para que un usuario premium NO pueda agregar a su carrito un producto que le pertenece
Implementar una nueva ruta en el router de api/users, la cual será /api/users/premium/:uid  la cual permitirá cambiar el rol de un usuario, de “user” a “premium” y viceversa.

Link al repositorio sin node_modules
Link del proyecto desplegado..

  


## Formato
Link al repositorio de GitHub con el proyecto completo (No incluir node_modules).

Además, archivo .env para poder correr el proyecto.

  

##  Sugerencias
Presta especial atención a las rúbricas de Proyecto final. ¡Es crucial para alcanzar la nota que esperas!
Debido a la complejidad de frontend requerida para poder aplicar una pasarela de pago, el PF no evalúa la pasarela de pago.

