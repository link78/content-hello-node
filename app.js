const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!, This JENKINS PIPELINE WITH DOCKER'))

app.set('port', process.env.PORT || 9090)
app.listen(app.get('port'), () => console.log('Example app listening on port ' + app.get('port') + '!'))
