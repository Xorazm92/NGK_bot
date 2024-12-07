import { Router } from 'express'
import userRouter  from './users.routes.js'
import authRouter  from './auth.routes.js'
import  inquiryRouter  from './inquires.routes.js'
import  literatureRouter  from './literature.routes.js'


const routers = new Router()

routers.use('/auth', authRouter)
routers.use('/users', userRouter)
routers.use('/inquiry', inquiryRouter)
routers.use('/literature', literatureRouter)

export default routers
