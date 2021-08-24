const fetch = require('node-fetch') //llamamos a node fetch
const express = require('express') //llamamos a Express
const app = express()               
const api = 'https://api.mercadolibre.com';

const port = process.env.PORT || 8080  // establecemos nuestro puerto

app.get('/', function(req, res) {
  //res.json({ mensaje: '¡Hola Mundo!' })
  fetch('https://api.mercadolibre.com/sites/MLM/search?category=MLM1055&sort=price_asc&search_type=scan')
  .then((respuesta) => {
    return respuesta.json()
  }).then((resp) => {
    //console.log(resp)
    articulos = [];
    resp.results.forEach(obji);
    function obji(item) {
      let sellerid = item.seller.id;
      var response = fetch(api + '/users/' + sellerid);
      sellername = response;
      let marca = item.attributes[0].value_name;
      let envio = item.shipping.free_shipping;
      let logistica = item.shipping.logistic_type;
      let loperacion = item.address.state_name + item.address.city_name;
      let condicion = item.attributes[1].value_name;
      let rprecios = item.price;
      var respuestajson = {
        SellerID: sellerid,
        SellerName: sellername,
        Marca: marca,
        EnvioGratis: envio,
        TipoDeLogistica: logistica,
        LugarOperacionSeller: loperacion,
        CondicionArticulo: condicion,
        RangoPrecios: rprecios,
      }
      articulos.push(respuestajson);
    }
    res.json(articulos);
  })
})

app.post('/', function(req, res) {
  res.json({ mensaje: 'Método post' })   
})

// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)