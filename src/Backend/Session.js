// https://velog.io/@smooth97/Node.js-Restful-API-wok2wqo7yu

const express = require("express");
const router = express.Router();

const list = [
  { id: 1, name: "BMW" },
  { id: 2, name: "AONE" },
  { id: 3, name: "IT" },
];

const log = [];

const users = [
  { id: "bmw", name: "BMW코리아", pw: "1234" },
  { id: "limyt0909", name: "임용택", pw: "1234" },
];

//post 예제
let id = 0;
router.use(express.json());
//name을 name 을 받으면 ID와 함께 추가되는 API
router.post("/", (req, res) => {
  const input = {
    sn: id++,
    id: req.body.id,
    pw: req.body.pw,
  };
  console.log(req.body.id, req.body.pw);
  console.log(
    users.filter((x) => x.id === req.body.id && x.pw === req.body.pw)
  );
  const output = {
    name: users.filter((x) => x.id === req.body.id && x.pw === req.body.pw)[0]
      .name,
  };
  console.log(output);
  res.json(output);
});

router.get("/", (req, res) => {
  res.send("로그인API");
});

//반환하는 API
router.get("/id", (req, res) => {
  res.send({
    name: "Aone",
    ID: "BMW",
  });
});

// router.get("/list", (req, res) => {
//   res.send(list);
// });

// 해당하는 ID를 찾아서 Respon
router.get("/list/:id", (req, res) => {
  const course = list.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send(`ID was not found`);
  res.send(course);
});

module.exports = router;
