const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
var cors = require('cors')

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(express.static("."));
app.use(cors())

app.listen(3000, () => {
  console.log("server is running at port 3000!!");
});

app.get('/cartData', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err,data) => {
        res.send(data)
    })
})

app.get("/catalogData", (req, res) => {
    fs.readFile("catalogData.json", "utf-8", (err, data) => {
      res.send(data);
  });
});

app.post("/addToCart", (req, res) => {
  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      let cartItem = getGoodById(cart, item.id);
      if (cartItem) {
        cartItem.quantity++
      } else {
        cart.push(item);
      }

      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });

      if (cartItem) updateStats(cartItem.title, 'Добавлено');
    }
  });
});

app.post("/removeFromCart", (req, res) => {
  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      let cartItem = getGoodById(cart, item.id);
      if (cartItem.quantity > 1) {
        cartItem.quantity--
      } else if (cartItem.quantity === 1){
        cart.splice(cart.indexOf(cartItem), 1);
      }

      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });

      if (cartItem) updateStats(cartItem.title, 'Удалено');
    }
  });
});

const getGoodById = (searchArr, id) => {
  let res;
  searchArr.forEach(item => {
    if (item.id == id) {
      res = item;
    }
  });
  return res;
}

const updateStats = (title, action) => {
  fs.readFile("stats.json" , "utf-8", (err, data) => {
    if (!err) {
      const stats = JSON.parse(data);
      const currentDate = new Date;
      const item = `${title} - ${action} ${currentDate}`;
      stats.push(item);    
      fs.writeFile("stats.json", JSON.stringify(stats), (err) => {});
    }
  })
}