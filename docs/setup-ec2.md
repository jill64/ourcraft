# Setup EC2

```sh
sudo yum install -y java-17-amazon-corretto-headless.x86_64
wget https://piston-data.mojang.com/v1/objects/8dd1a28015f51b1803213892b50b7b4fc76e594d/server.jar
java -Xmx8G -Xms8G -jar server.jar nogui
sed -i 's/false/true/p' eula.txt
java -Xmx8G -Xms8G -jar server.jar nogui
sudo yum install -y cronie
crontab -e
```

```sh
@reboot java -Xmx8G -Xms8G -jar /home/ec2-user/server.jar nogui
```

Quit vi with `:wq`
