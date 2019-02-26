---
title: 一键安装最新内核并开启 BBR 脚本  
date: 2019-02-26 19:00
category:
- Code
tags:
- shell
- vps
---

最近，Google 开源了其 TCP BBR 拥塞控制算法，并提交到了 Linux 内核，从 4.9 开始，Linux 内核已经用上了该算法。根据以往的传统，Google 总是先在自家的生产环境上线运用后，才会将代码开源，此次也不例外。
根据实地测试，在部署了最新版内核并开启了 TCP BBR 的机器上，网速甚至可以提升好几个数量级。

# 使用方法
使用root用户登录，运行以下命令：

`wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh && chmod +x bbr.sh && ./bbr.sh`  
安装完成后，脚本会提示需要重启 VPS，输入 y 并回车后重启。
重启完成后，进入 VPS，验证一下是否成功安装最新内核并开启 TCP BBR，输入以下命令：

`uname -r`  
查看内核版本，显示为最新版就表示 OK 了

`sysctl net.ipv4.tcp_available_congestion_control`  
返回值一般为：
net.ipv4.tcp_available_congestion_control = bbr cubic reno
或者为：
net.ipv4.tcp_available_congestion_control = reno cubic bbr

`sysctl net.ipv4.tcp_congestion_control`  
返回值一般为：
net.ipv4.tcp_congestion_control = bbr

`sysctl net.core.default_qdisc`  
返回值一般为：
net.core.default_qdisc = fq

`lsmod | grep bbr`  
返回值有 tcp_bbr 模块即说明 bbr 已启动。
> 注意：并不是所有的 VPS 都会有此返回值，若没有也属正常。