export const generateUserError = (user) => {
    return `Hay una de las propiedades del usuario incompleta o no valida.
    listado de propiedades requeridos
    *first_name: necesita ser un string, pero se recibio ${user.first_name}
    *last_name: necesita ser un string, pero se recibio ${user.last_name}
    *email: necesita ser un string, pero se recibio ${user.email}
    *first_name: necesita ser un string, pero se recibio ${user.first_name}
    `
}
export const generateProductError = (product) => {
    return `Hay una de las propiedades del usuario incompleta o no valida.
    listado de propiedades requeridos
    *title: necesita ser un string, pero se recibio ${product.title}
    *description: necesita ser un string, pero se recibio ${product.description}
    *price: necesita ser un string, pero se recibio ${product.price}
    *status: necesita ser un string, pero se recibio ${product.status}
    *category: necesita ser un string, pero se recibio ${product.category}
    *thumbnail: necesita ser un string, pero se recibio ${product.thumbnail}
    *code: necesita ser un string, pero se recibio ${product.code}
    *stock: necesita ser un string, pero se recibio ${product.stock}
    `
}