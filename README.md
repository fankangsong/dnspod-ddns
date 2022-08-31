# 腾讯云域名解析到电信宽带的动态域名

## 前置工作：

1. 把域名解析托管到腾讯 DNSPOD
2. 定时执行 nodejs 脚本

## 使用

`npm i` 完成安装执行，执行 `node index.js`。

使用 `crontab` 定时执行：`0 * * * * /home/root/ddns/ddns.sh`

``` shell
#!/sh

/usr/local/bin/node /home/root/ddns/index.js >> /var/log/ddns.log 2>&1
```