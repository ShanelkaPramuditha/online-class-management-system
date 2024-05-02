const { response } = require('express');
const controller = require('/controller')

app.use(cors());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.get('/papers', (req, res) => {
    controller.getpapers((req, res, next) => {               
        res.send();     
    });
});

app.post('/createpapers', (req, res) => {
    controller.addpapers(req.body, (callack) => {
        res.send();
    });
});

app.post('/updatepapers', (req, res) => {
    controller.updatedpapers(req.body, (callack) => {
        res.send(callack);
    });
});

app.post('/deletepapers', (req, res) => {
    controller.deletepapers(req.body, (callack) => {
        res.send(callback);
    });
});

module.exports = app;