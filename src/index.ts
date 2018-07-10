import * as fs from 'fs'
import * as http from 'http'
import { resolve } from 'path'
import { promisify } from 'util'

function requestHandler(req: http.IncomingMessage, res: http.ServerResponse): void {
  const htmlStream: fs.ReadStream = fs.createReadStream(resolve(__dirname, '../index.html'))
  res.setHeader('Content-Type', 'text/html')
  htmlStream.pipe(res)
}

const server: http.Server = http.createServer(requestHandler)

server.listen(3000)
