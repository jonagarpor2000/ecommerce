
const buyCart = document.querySelector('#buy');

buyCart.addEventListener('submit', (e) => {
    e.preventDefault()
    const cid = window.location.pathname.split('/')[2]
    let url = `http://localhost:8080/api/${cid}/purchase`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === 'error') {
            alert('Purchaease could not be processed')
        }else{

            alert(`Successfully received!`)
            url = `http://localhost:8080/api/carts/${cid}`
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
        }
        
        buyCart.reset()
    })
    .catch(err => console.log(err))
})
