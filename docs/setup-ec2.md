# Setup EC2

```sh
sudo yum install -y java-17-amazon-corretto-headless.x86_64

sudo wget https://piston-data.mojang.com/v1/objects/8dd1a28015f51b1803213892b50b7b4fc76e594d/server.jar
sudo java -Xmx4G -Xms4G -jar server.jar nogui
sudo sed -i 's/false/true/p' eula.txt
sudo java -Xmx4G -Xms4G -jar server.jar nogui

sudo yum install -y cronie
sudo crontab -e
```

```sh
@reboot sudo java -Xmx4G -Xms4G -jar /home/ec2-user/server.jar nogui
```

Quit vi with `:wq`
