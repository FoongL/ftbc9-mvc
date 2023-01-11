class BaseController{
    constructor(model){
        this.model = model
    }

    testRoute(req, res){
        return res.send ('yup, you got me!')
    }
}

module.exports = BaseController