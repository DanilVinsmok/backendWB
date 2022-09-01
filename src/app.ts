import express from 'express'
import cors from 'cors'
import BrandRouter from './routes/brand.routes'
import ReportRouter from './routes/report.routes'
import OrderRouter from './routes/order.routes'
import WarehouseRouter from './routes/warehouse.router'
import addOrdersByOneDay from './library/Orders/addOdersByOneDay'


const PORT = 8080
const app = express()

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json())

app.use('/api', BrandRouter)
app.use('/api', ReportRouter)
app.use('/api', OrderRouter)
app.use('/api', WarehouseRouter)


function StartApp() {
    try {
        app.listen(PORT, () => console.log('Server started on port ' + PORT))
    } catch (error) {
        console.log(error)
    }
}


setInterval(addOrdersByOneDay, 300000)

StartApp()

