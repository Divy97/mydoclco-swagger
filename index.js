const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const PORT = process.env.PORT || 4000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
  {
    id: "11",
    name: "Learn ReactJS",
    price: 299,
  },
  {
    id: "22",
    name: "Learn Angular",
    price: 399,
  },
  {
    id: "33",
    name: "Learn Django",
    price: 199,
  },
];

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.get("/api/v1/lco", (req, res) => {
  res.status(200).send("Hello from lCO");
});

app.get("/api/v1/lcoObject", (req, res) => {
  res.status(200).send({
    id: "55",
    name: "Learn backend",
    price: 999,
  });
});

app.get("/api/v1/courses", (req, res) => {
  res.status(200).send(courses);
});

app.get("/api/v1/myCourse/:courseId", (req, res) => {
  const myCourse = courses.find((course) => course.id === req.params.courseId);
  res.status(200).send(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
  console.log(req.body);
  courses.push(req.body);

  res.send(true);
});

app.get("/api/v1/courseQuery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({
    location,
    device,
  });
});

app.post("/api/v1/courseUpload", (req, res) => {
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";

  file.mv(path, (err) => {
    res.send(err);
  });
});

app.listen(PORT, () => {
  console.log(`App running at port - ${PORT}`);
});
