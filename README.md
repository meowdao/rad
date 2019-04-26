# rad

make sure you have nodejs npm mongodb and redis installed

```bash
sudo port install nodejs10 npm6 redis mongodb
```

In first terminal window
```sh
cd orders_app
npm i

npm start
```


In first terminal window
```sh
cd payments_app
npm i

npm start
```

then navigate to http://localhost:8080/v1/orders

all configs are in
~/orders_app/.env.development
~/payments_app/.env.development
