
const addToCart = document.querySelector('#addToCart');

addToCart.addEventListener('submit', (e) => {
    e.preventDefault()
    const quantity = parseInt(addToCart.querySelector('#p_quantity').value)
    const pid = window.location.pathname.split('/')[2]
    const cid = document.querySelector('#userCart').textContent
    const data = {
        cid: cid,
        pid: pid,
        quantity
    }
    let url = `http://localhost:8080/api/carts/`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === 'error') {
            alert('Error al guardar carrito')
        }else{

            alert(`Se agregó ${quantity} ${document.querySelector('#prod-title').textContent} al carrito!`)
        }
        
        addToCart.reset()
    })
    .catch(err => logger.info(err))
})
