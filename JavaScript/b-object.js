'use strict';

const stream = require('node:stream');

const purchase = {
  Electronics: [
    { name: 'Laptop',  price: -1500 },
    { name: 'Mouse',  price: 25 },
    { name: 'Keyboard',  price: 100 },
    { name: 'HDMI cable',  price: 10 },
  ],
  Textile: [
    { name: 'Bag', price: 50 },
    { name: 'Mouse pad', price: 5 },
  ],
};

const subtotal = new stream.Transform({
  writableObjectMode: true,
  readableObjectMode: true,
  transform({ groupName, goods }, encoding, next) {
    let amount = 0;
    for (const item of goods) {
      if (item.price < 0) {
        return void next(new Error('Negative price'));
      }
      amount += item.price;
    }
    next(null, { groupName, count: goods.length, amount });
  },
});

subtotal.on('data', (data) => {
  console.log(data);
});

subtotal.on('error', (error) => {
  console.log(error.message);
});

for (const groupName in purchase) {
  const goods = purchase[groupName];
  subtotal.write({ groupName, goods });
}
