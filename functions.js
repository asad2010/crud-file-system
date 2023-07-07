const fs = require('fs')

const functions = {
    getInfo: async (req,res)=>{
        fs.readFile('./hello.json', 'utf-8', (err,data)=>{
            if(err)return res.status(400).json({message: error.message})
            data = JSON.parse(data)
            res.render('index', {data })
        })
    }, 
    addInfo: async (req,res)=>{ 
        fs.readFile('./hello.json', 'utf-8', (err,data)=>{
            if(err)return res.status(400).json({message: error.message})
            data = JSON.parse(data)
            const id = data.length + 1;
            const b = req.body;
            const body = {id,...b}
            data.push(body)
            console.log(body)
            fs.writeFile('./hello.json', JSON.stringify(data), (err)=>{
                if(err)return res.status(500).json({message: err.message})
                res.status(200).json({message: "dobavlen"})
            })
        

        })
    }, 
    getOneInfo: async (req,res)=>{
        const {id} = req.params
        fs.readFile('./hello.json', 'utf-8', (err,data)=>{
            if(err)return res.status(400).json({message: error.message})
            data = JSON.parse(data)
            const findedData = data.find(el=> el.id == id)
            res.status(200).send(findedData)
        })
    },
    updInfo: async (req,res)=>{
        const {id} = req.params;
        fs.readFile('./hello.json', 'utf-8', (err,data)=>{
            if(err)return res.status(400).json({message: error.message})
            data = JSON.parse(data)
            const updatedData = data.map((el)=>{
                if(el.id == id){
                    return {...el, ...req.body}
                } else {
                    return el;
                }
            })
            fs.writeFile('./hello.json', JSON.stringify(updatedData), (err)=>{
                if(err)return res.status(500).json({message: err.message})
                res.status(200).json({message: "obnavlen"})
            })
        

        })
    },
    deleteInfo: async (req,res)=>{
        const {id} = req.params
        fs.readFile('./hello.json', 'utf-8', (err,data)=>{
            if(err)return res.status(400).json({message: error.message})
            data = JSON.parse(data)
            const drugoy = data.filter(el=> el.id != id)

            fs.writeFile('./hello.json', JSON.stringify(drugoy), (err)=>{
                if(err) return res.status(500).json({message: error.message})
                res.status(200).send({message: "udalyon"})
            })
        })
    },
    delete: async (req,res)=>{
        const {id} = req.params
        fs.readFile('./hello.json', 'utf-8', (err,data)=>{
            if(err)return res.status(400).json({message: error.message})
            data = JSON.parse(data)
            const drugoy = data.filter(el=> el.id != id)
            fs.writeFile('./hello.json', JSON.stringify(drugoy), (err)=>{
                if(err) return res.status(500).json({message: error.message})
                res.render('index', {data: drugoy})
            })
        })
    },
    add: async (req,res)=>{ 
        fs.readFile('./hello.json', 'utf-8', (err,data)=>{
            if(err)return res.status(400).json({message: error.message})
            data = JSON.parse(data)
            const id = data.length + 1;
            const body = {id,...{
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }}
            data.push(body)
            res.redirect('/')
            fs.writeFile('./hello.json', JSON.stringify(data), (err)=>{
                if(err)return res.status(500).json({message: err.message})
                res.status(200).json({message: "dobavlen"})
            })
        

        })
    }, 
}
module.exports = functions
