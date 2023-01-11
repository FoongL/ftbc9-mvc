class BaseController {
    constructor(model){
        this.model = model
    }

    testRoute(req, res){
        return res.send("test")
    }

    authedTest(req, res){
        return res.json({success:true, users: req.user})
    }
}

module.exports = BaseController