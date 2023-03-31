const app = require("express")()
// const cors = require("cors")
// const nodemailer = require("nodemailer")

app.use(cors())

const JsSearch = require("js-search")

const breeds = require("./breeds.json")

const search = new JsSearch.Search("name") // remember the name key from breeds.json
// search.addIndex("name")
search.addDocuments(breeds)
search.addIndex("name")

app.get("/api/breeds", (req, res) => {
  const { query } = req

  try {
    const breed = query.search

    if (breed) {
      //   res.send(breeds.find((b) => b.name === breed)) . //old impleentation
      res.send(search.search(breed))
    }
    res.send(breeds.map((b) => ({ name: b })))
  } catch (error) {
    console.log("error", error)
  }
})

app.get("/api/breeds/:id", (req, res) => {
  const { id } = req.params
  res.send(breeds[id])
})

app.get("/api/test", (req, res) => {
  let name = 'jeremias houyashd'
  // const { name } = req.body
  // console.log(req.body)
  // console.log({ name })
  res.json({ name })
})


module.exports = app
