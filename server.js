const { response } = require("express");
const express = require("express");
const { request } = require("http");
const app = express();
const cors = require("cors");
const PORT = 8008;

// tell express to use cors
app.use(cors());

const food = {
  "shrimp dumplings": {
    hanyuPinyin: "xiā jiǎo",
    simplifiedName: "虾饺",
    traditionalName: "蝦餃",
    interestingFact:
      "Shrimp Dumpling is a famous traditional Cantonese dim sum. It originated in a small family-style tea house in Wufeng Township, Wucun, Guangzhou suburb, in the early 20th century. The appearance of Shrimp Dumpling should be crystal-clear, and crescent-shaped with at least 10 folds. It is bite-sized.",
    ingredients:
      "With one or two shrimps inside, fillings also have pork and bamboo shoots. So the Shrimp Dumpling features pliable flour wrappers and delicious and smooth fillings.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/11/03_Har_Gau_Shrimp_Dumplings_-_East_Harbor_Seafood_Palace.jpg",
  },
  "Barbecued Pork Buns": {
    hanyuPinyin: "chāshāo bāo",
    simplifiedName: "叉烧包",
    traditionalName: "叉燒包",
    interestingFact:
      "Practice an extreme form of emotional regulation that focuses on logic above all else, pioneered by a Vulcan named Surak",
    ingredients:
      "The ingredients are flour, Char Siu the Chinese barbecued pork, oyster oil and other seasonings. Owing to the appropriate fermentation of the dough, the Barbecued Pork Buns crack naturally when steaming, which look like flowers. Normally, the size of Barbecued Pork Buns are about five centimeters in diameter and 3 or 4 of them are served at a time.",
    image:
      "https://en.wikipedia.org/wiki/Cha_siu_bao#/media/File:Char_siu_bao.jpg",
  },
  Shumai: {
    hanyuPinyin: "shāo mài",
    simplifiedName: "烧卖",
    traditionalName: "燒賣",
    interestingFact:
      "They are beautiful and flower-like with thin flour wrappers and fabulous tastes. In addition to Cantonese tea houses, they are basically available at breakfast shops.",
    ingredients:
      "There are a variety of fillings including glutinous rice, mushrooms, water chestnut, pork, beef and shrimp.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/20/Shrimp_shaomais_by_Stewart_at_Din_Tai_Fung_in_Taipei.jpg",
  },
  "egg tart": {
    hanyuPinyin: "Daahn tāat",
    simplifiedName: "蛋挞",
    traditionalName: "蛋撻",
    interestingFact:
      "The egg tart started being sold in the early 20th century in Guangzhou (Canton), Guangdong province, inspired by some kinds of European custard tart. Guangzhou's status as the only port accessible to European foreign traders led to the development of Cantonese cuisine having many outside influences.",
    ingredients:
      "Egg tart is a kind of Western-style pie with egg pulp as filling. The method is to put the crust into a small bowl-shaped cake mold, then pour into the egg pulp mixed with sugar, and then bake in the oven. The baked egg tart has crisp outer layer and sweet yellow solidified egg pulp inner layer.",
    image:
      "https://www.dimsumcentral.com/wp-content/uploads/2018/06/egg-tarts-header-new.jpg",
  },
  "Lotus Leaf Rice": {
    hanyuPinyin: "nuòmǐjī",
    simplifiedName: "糯米鸡",
    traditionalName: "糯米雞",
    interestingFact: "Lo mai gai is mostly a southern Chinese food.",
    ingredients:
      "It contains glutinous rice filled with chicken, Chinese mushrooms, Chinese sausage, scallions, and sometimes dried shrimp or salted egg. The ball of rice is then wrapped in a dried lotus leaf and steamed.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/2016_0716_Lo_Mai_Gai.jpg/150px-2016_0716_Lo_Mai_Gai.jpg",
  },
  "Steamed meatball": {
    hanyuPinyin: "niúròu wán",
    simplifiedName: "牛肉丸",
    traditionalName: "牛肉丸",
    interestingFact:
      "The meatball originated from Muslims during the Tang Dynasty and Song Dynasty. Many Hui Muslims, the descendants of Arab traders, live in Guangzhou.",
    ingredients:
      "A layer of tofu skin, or sometimes peas, are used to raise the meatballs from the bottom of the dish and prevent them from sitting in the cooking juices. It is generally served with Worcestershire sauce.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/HK_Pacific_Plaza_SYP_%E5%BE%B7%E9%9F%BE%E8%8B%91_Tak_Hing_Yuen_Seafood_Restaurant_beef_meat_balls_Mar-2013_Bamboo_steamer.JPG/1280px-HK_Pacific_Plaza_SYP_%E5%BE%B7%E9%9F%BE%E8%8B%91_Tak_Hing_Yuen_Seafood_Restaurant_beef_meat_balls_Mar-2013_Bamboo_steamer.JPG",
  },
  trill: {
    hanyuPinyin: "xiánshuǐ jiǎo",
    simplifiedName: "鹹水角",
    traditionalName: "鹹水角",
    interestingFact: "It's amazing.",
    ingredients:
      "Deep fried dumpling with a slightly savory filling of pork and chopped vegetables in a sweet and sticky wrapping",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.r0eAyBRl5K0X1mXf09CbLAHaEK%26pid%3DApi&f=1",
  },
  rice: {
    hanyuPinyin: "bái fàn",
    simplifiedName: "白飯",
    traditionalName: "白飯",
    interestingFact: "It's amazing.",
    ingredients:
      "Deep fried dumpling with a slightly savory filling of pork and chopped vegetables in a sweet and sticky wrapping",
    image:
      "https://themom100.com/wp-content/uploads/2015/08/rice-in-bowl-horiz-with-spoon-copy-500x375.jpg",
  },
};

// handle read request for homepage
app.get("/", (req, res) => {
  res.sendFile(___dirname + "/index.html");
});

// when we want API data back
app.get("/api/:name", (req, res) => {
  const names = req.params.name.toLowerCase();
  if (food[names]) {
    res.json(food[names]);
  } else {
    response.json(food["rice"]);
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
