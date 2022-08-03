const express = require('express')
const morgan = require('morgan')
const mongoClient = require('mongoose')
const Cors = require('cors')
require('@babel/polyfill')

// connect mongodb
mongoClient.connect('mongodb://127.0.0.1:27017/datn',{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> console.log('Connected database from mongodb.'))
.catch((error)=>console.log(`Connect database is failed with error which is ${error}`))

const app = express()

const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const adminRouter = require('./routes/admin')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const paymentRouter = require('./routes/payment')
const orderStatusRouter = require('./routes/orderStatus')
const orderRouter = require('./routes/order')
const commentRouter = require('./routes/comment')


const { options } = require('@hapi/joi')

//Middleware
app.use('/', express.static('public/images'))
app.use(Cors())
app.use(express.json())
app.use(morgan('dev'))

//Routes
app.use('/admin', adminRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/users', userRouter)
app.use('/cart', cartRouter)
app.use('/payment', paymentRouter)
app.use('/order', orderRouter)
app.use('/orderstatus', orderStatusRouter)
app.use('/comment', commentRouter)


//Routes
app.get('/', (req, res, next) => {
  // return res.status(200).json({
  //   message: 'Server is OK!' 
  // })
  res.render('../src/views/view.hjs', {order: [{id:'1233'},{id:'321'}]})
})

//Catch 404
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

//Error handler function
app.use((err,req,res,next) => {
  const error = app.get('env') === 'development' ? err : {}
  const status = err.status || 500

  //response to client
  return res.status(status).json({
    error:{
      message: error.message
    }
  })
})

//Start server
const port = app.get('port') || 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
