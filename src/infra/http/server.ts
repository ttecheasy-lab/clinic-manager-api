import '../open-telemetry'
import { app } from '../app'
import { env } from '../env'

const { server } = app.listen(env.PORT)

console.log(`Server running on http://localhost:${server?.port}`)
