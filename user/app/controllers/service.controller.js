const Service = require('../models/service.model')
var moment = require('moment')


class serviceController{
    get_list(req,res,next){
        Service.find({})
               .then(services=>{
                services=services.map(service => service.toObject())
                res.json({services})
               })
               .catch(next)
    }

    detail(req, res,next){
        Service.findById(req.params.id)
            .then(services=>{
                res.json({services})
            })
            .catch(next)
    }

    add_service(req, res,next){
        const service = new Service(req.body)
        service
            .save()
            .then(()=>res.json(req.body))
            .catch((error)=>{})
    }

    remove_service(req,res,next){
        Service.deleteOne({_id: req.params.id })
            .then(services=>res.json({services}))
            .catch(next)
    }

    update_service(req, res,next){
        Service.updateOne({_id: req.params.id },req.body)
            .then(services=>{
                res.json({services})
            })
            .catch(next)
    }

    update_all_service(req, res,next){
        Service.updateMany(req.body)
            .then(services=>{
                res.json({services})
            })
            .catch(next)
    }

}

module.exports = new serviceController