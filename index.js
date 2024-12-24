import { createServer } from 'node:http';
import fs from 'node:fs'
import { changeStatus, createTask, getData, initCounter } from './storage.js';

const pages = './pages'
const hostname = '127.0.0.1';
const port = 3000;
function init() {
  initCounter()
}
const server = createServer((req, res) => {
  const url = req.url
  const method = req.method
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow_Origin', 'http;//127.0.0.1:3000');
  //res.setHeader('Access-Control-Allow_Method', 'GET, POST, PUT, DELETE, OPTIONS');


  if (url === '/tasks' && method === 'POST') {
    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString(); //способ обработки поступающих данных (объедин и декодир)
      const item = JSON.parse(body)
      const result = createTask(item)
      console.log(result);
      res.end(result)
    });
  }


  if (url === '/tasks/edit' && method === 'POST') {
    console.log('TEST')

    let body = []
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const requestData = JSON.parse(body)
      const changeData = changeStatus(requestData.id)
      res.end(changeData)
    });
  }


  if (url === '/tasks' && method === 'DELETE') { } //delete task

  if (url === '/tasks' && method === 'GET') {
    const result = getData()
    res.end(result)
  }

});

server.listen(port, hostname, () => {
  init()
  console.log(`Server running at http://${hostname}:${port}/`);
});
