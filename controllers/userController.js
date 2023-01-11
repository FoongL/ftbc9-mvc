const BaseController = require("./baseController")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController extends BaseController {
    constructor(model){
        super(model)
    }

    async signUp(req, res){
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({success: false, msg:'you have some missing information'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const newUser = await this.model.create({
            name,
            email,
            password: hashedPassword
        })
        const payload = {id: newUser.id, name:newUser.name}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1hour'
        })

        return res.json({success: true, token})
    }


    async logIn(req, res){
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({success: false, msg:'you have some missing information'})
        }

        const user = await this.model.findOne({where: {email}})

        if (!user){
            return res.status(404).json({success: false, msg:'user does not exist'})
        }

        const compare = await bcrypt.compare(password, user.password)

        if(!compare){
            return res.status(403).json({success: false, msg:'incorrect password provided'})
        }
        const payload = {id: user.id, name:user.name}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1hour'
        })

        return res.json({success: true, token})
    }

}

module.exports = UserController