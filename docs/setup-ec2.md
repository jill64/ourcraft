# Setup EC2

```sh
sudo yum install java-17-amazon-corretto-headless.x86_64 -y

wget https://piston-data.mojang.com/v1/objects/8dd1a28015f51b1803213892b50b7b4fc76e594d/server.jar
java -Xmx8G -Xms8G -jar server.jar nogui
sed -i 's/false/true/p' eula.txt
java -Xmx8G -Xms8G -jar server.jar nogui

curl -sL https://rpm.nodesource.com/setup_20.x | bash -
sudo yum install nodejs -y
touch api.js
nano api.js
```

```js
import { Buffer } from 'node:buffer'
import { crypto } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import http from 'node:http'

const server = http.createServer()

server.on('request', async (req, res) => {
  const b1 = Buffer.from(req.headers['x-secret'])
  const b2 = Buffer.from('my-secret')

  if (!crypto.timingSafeEqual(b1, b2)) {
    res.writeHead(403)
    res.end()
    return
  }

  const str = await readFile('/home/ec2-user/cron.log', 'ascii')
  res.writeHead(200, { 'Content-Type': 'text-plain' })
  res.write(str)
  res.end()
})

server.listen(8000)
```

```sh
sudo yum install cronie -y
crontab -e
```

```sh
@reboot sudo java -Xmx8G -Xms8G -jar /home/ec2-user/server.jar nogui > /home/ec2-user/cron.log 2>&1
@reboot sudo node /home/ec2-user/api.js
```

Quit vi with `:wq`
