//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Temp } = require("./src/db.js");
const { apiData } = require("./src/routes/dog.js");
const axios = require("axios");

let allTemperamentsDb = async () => {
  const temperamentosDb = await axios.get(
    "https://api.thedogapi.com/v1/breeds"
  );
  temperamentosDbalone = temperamentosDb.data.map((e) => e.temperament);
  let temperament = [];
  for (let i = 0; i < temperamentosDbalone.length; i++) {
    if (temperamentosDbalone[i]) {
      temperament.push(temperamentosDbalone[i].split(","));
    } else continue;
  }
  temperament = temperament.flat(Infinity);

  temperament.forEach((el) => {
    Temp.findOrCreate({
      where: { name: el.trim() },
    });
  });
  console.log("temperamentos agregados a la base de datos");
};

// Syncing all the models at once.
conn.sync().then(() => {
  server.listen(5432, () => {
    console.log("%s listening at 5432"); // eslint-disable-line no-console
    allTemperamentsDb();
  });
});
