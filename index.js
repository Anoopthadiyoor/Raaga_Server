const jsonServer=require('json-server')
const rbserver=jsonServer.create()
const router=jsonServer.router('db.json')
const middleware=jsonServer.defaults()

const PORT=process.env.PORT || 5000
rbserver.use(middleware)
rbserver.use(router)

rbserver.listen(PORT,()=>{
    console.log(`rb server started running at port ${PORT} successfully`)
})