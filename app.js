const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!, This JENKINS PIPELINE WITH Kubernetes and Docker'))
app.get('/infos',(reg,res)=> res.send("This is Kade Derk, deploying nodejs app on k8s and jenkins pipeline"))
app.get('/blog',(reg,res)=> res.send("This is my blog fasocloud.blogspot.com/"))

app.set('port', process.env.PORT || 9090)
app.listen(app.get('port'), () => console.log('Example app listening on port ' + app.get('port') + '!'))
