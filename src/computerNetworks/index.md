##### 术语

DSL 数据用户线路

ISP 互联网服务提供商

IXP 互联网交换中心

RTT(Round-Trip Time)：往返时延。是指数据从网络一端传到另一端所需的时间

TTL （Time To Live）：指定 IP 包被路由器丢弃之前允许通过的最大网段数量

VLAN Virtual Local Area Network 虚拟局域网

SSL Secure Sockets Layer 安全套接字层

WEP Wired Equivalent Privacy 有线等效保密

##### 计算机网络概念

**互联网**包括 **网络边缘**、**接入网络**、**网络核心**；按范围可以分为广域网（WAN）、局域网（LAN）和城域网（MAN）

电路交换 独占 电话机 建⽴连接(占⽤通信资源)—>通话(⼀直占⽤通信资源)—>释放连接(归还通信资源)**报文交换** 整个报文交换 电报 存储转发 占用较大存储空间
分组交换 分和合 计算机网络

多路复用 复用和分用包括频分、波分、时分、码分

**TCP/IP 模型**

| 模型   | 数据单位   | 功能                                                                                 | 常见协议                      |
| ------ | ---------- | ------------------------------------------------------------------------------------ | ----------------------------- |
| 应用层 | **报文**   | **数据转化** 加密解密，压缩                                                          | FTP, SMTP 25, HTTP 80 DNS 53  |
| 传输层 | **段**     | 分段重组 逻辑连接控制 流量差错控制 **多路复用/ 分用**                                | TCP，UDP                      |
| 网络层 | **数据报** | 逻辑寻址 **路由 分组转发**                                                           | IP、ICMP、ARP、RARP、IGMP     |
| 链路层 | **帧**     | 加头加尾 **相邻结点间可靠交付**，物理寻址，组帧， 差错、流量、访问控制               | 以太网、802.11(wifi), ppp MAC |
| 物理层 | **比特**   | 比特同步，比特编码，传输模式(单，双工)，**为数据端设备提供传送数据通路**、传输数据。 |                               |

**寻址方式**

web 对象寻址 url ： **scheme:// host(主机) : port（端口）/ path**

![image-20220426111537580](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220426111537580.png)

##### **SMTP 协议**

**SMTP**是持久连接， 一个请求多个对象 传输协议

![image-20220426115213135](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220426115213135.png)

![image-20220426115634479](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220426115634479.png)

##### P2P 协议

通过 BitTorrent 实现通常叫 BT

![image-20220427153617359](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220427153617359.png)

![image-20220427153633050](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220427153633050.png)

![image-20220427154210538](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220427154210538.png)![image-20220427154221465](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220427154221465.png)

![image-20220427154244230](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220427154244230.png)

##### Socket

通信的中间抽象层，是一组接口。含义就是两个应用程序通过一个双向的通信连接实现数据的交换

连接通信至少需要两个套接字，一个运行在服务端（插孔），一个运行在客户端（插头）

![image-20220427155356714](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220427155356714.png)

![image-20220427155338123](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220427155338123.png)

![image-20220427160338873](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220427160338873.png)

![image-20220427161451190](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220427161451190.png)

##### 传输层

TCP 和 UPD

![image-20220506221051950](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220506221051950.png)

![image-20220506221143051](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220506221143051.png)

![image-20220506221159698](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220506221159698.png)

可靠数据传输 Rdt（reliable data transfer）

只考虑单向数据传输，控制信息双向，利用状态机刻画传输协议 FSM（finite state machine）

**Rdt1.0** 不发生错误

**Rdt2.0** 停等协议

![image-20220507084511207](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220507084511207.png)

**Rdt2.1**

**如果 ack/nak 错误，重传后重复分组问题**

发送方给每个分组增加序列号

接收方丢弃重复分组

**Rdt2.2**

**没有 nak 只使用 ack**

接收方通过 ACK 告知最后一个被正确接收的分组

在 ACK 消息中显式地加入被确认分组的序列号

**Rdt3.0**

如果信道既可能发生错误，也可能丢失分组，怎么办？

发送方等待“合理”时间

Rdt 3.0 能够正确工作，但性能很差

##### 流水线机制

![image-20220506231712953](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220506231712953.png)

**滑动窗口**

![image-20220507085708329](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220507085708329.png)

**Go-Back-N 协议**

GBN 协议的确认是累积确认

![image-20220507085849747](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220507085849747.png)

接收方

只需要记住唯一 expectedseqnum

![image-20220507090301747](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220507090301747.png)

**Selective Repeat 协议**

![image-20220507090408922](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220507090408922.png)

![image-20220507090449893](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220507090449893.png)

![image-20220507090601570](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220507090601570.png)

**TCP**

点对点，一个发送方一个接受方、可靠，按序、流水线机制、发送方和接收方缓存、全双工、面向连接、流量控制

![image-20220508163142945](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220508163142945.png)

三次握手

为了防止已经失效的连接请求报文段突然又传到服务端，因而产生错误

client host sends TCP SYN segment

server host receives SYN replies with SYNACK segment

client receives SYNACK replies with ACK segment

![image-20220508162349580](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220508162349580.png)

四次挥手

因为 TCP 是一个全双工协议，必须单独拆除每一条信道

client sends TCP FIN segment

server receives FIN replies ACK , 关闭连接, 发送 FIN.

收到 FIN, 回复 ACK.

server 收到 ACK. 连接关闭.

![image-20220508162413573](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220508162413573.png)

![image-20220508162946242](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220508162946242.png)

如果 sender 收到对同一数据的 3 个 ACK，则假定该数据之后 的段已经丢失

> 2 个 ack 有可能是乱序到达的原因

快速重传：在定时器超时之前即进行重传

**流量控制** 端到端

发送方不会传输的太多 、太快以至于淹没接收方 （buffer（缓存物）溢出）

Receiver 通过在 Segment 的头部字段将 RcvWindow 告诉 Sender

Sender 限制自己已经发 送的但还未收到 ACK 的 数据不超过接收方的空闲 RcvWindow 尺寸

**拥塞控制** 控制网络负载

![image-20220508164315904](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220508164315904.png)**ATM 中拥塞控制**

ABR 弹性服务可用带宽

RM cell 位 NI 不允许增长 CI 拥塞指示

**TCP 拥塞控制**

控制拥塞窗口 congWin

![image-20220508164928462](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220508164928462.png)

SS 当连接开始时，指数性增长

![image-20220508165300685](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220508165300685.png)

![image-20220508165323311](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220508165323311.png)

![image-20220508165520233](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220508165520233.png)

![image-20220508165735538](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220508165735538.png)

![image-20220508165915107](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220508165915107.png)

应用于虚电路网络的有 ATM、帧中继

![image-20220508170106128](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220508170106128.png)

大的 ip 分组向较小 MTU（Maximum Transfer Unit）链路转发时，可以被分片 fragmented

![image-20220509102034763](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509102034763.png)

![image-20220509102208990](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509102208990.png)

**IP 地址**

网络号 NetID 高位比特

主机号 HostID 低位比特

**IP 子网（subnet）**： IP 地址具有相同网络号设备接口、不跨越路由器，彼此物理联通的接口，路由与路由之间也算子网

**有类 ip 地址**

![image-20220509103555742](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509103555742.png)

![image-20220509103637043](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509103637043.png)

![image-20220509103653680](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509103653680.png)

**子网划分子网掩码**

网络号 NetID 高位比特

子网号 SubID 原主机号部分比特位

主机号 HostID 低位比特

255.0.0.0 A 类

255.255.0.0 B 类

255.255.255.0 C 类

![image-20220509103931241](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509103931241.png)

**CIDR（Classless InterDomain Routing）** 路由聚合 无类编码

格式 a.b.c.d/x，其中 x 为前缀长度

![image-20220509104234154](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509104234154.png)

![image-20220509104241338](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509104241338.png)

![image-20220509104256629](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509104256629.png)

**DHCP 协议**

获取 IP 地址

1. 静态配置

![image-20220509104445032](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509104445032.png)

![image-20220509104504709](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509104504709.png)

![image-20220509104554325](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509104554325.png)

![image-20220509104602455](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509104602455.png)

NAT

_LAN_：Local Area Network _WAN_：Wide Area Network

![image-20220522104750032](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220522104750032.png)

![image-20220509105042113](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509105042113.png)

![image-20220509105210510](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509105210510.png)

![image-20220509105231682](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509105231682.png)

![image-20220509105238554](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509105238554.png)

![image-20220509105337267](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509105337267.png)

**ICMP 协议** internet controlmessage protocol

ping 用来测试网络可达性，tracert 用来显示到达目的主机的路径。ping 和 tracert 都利用 ICMP 协议来实现网络功能，它们是把网络协议应用到日常网络管理的典型实例。

报文包含 type 和 code

![image-20220509114057079](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509114057079.png)

**IPv6**

128 位

![image-20220509114210680](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509114210680.png)

![image-20220509114247288](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220509114247288.png)

![image-20220522191406301](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220522191406301.png)

![image-20220702153046143](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220702153046143.png)

![image-20220615230857426](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220615230857426.png)

1. 初始化 u 的所有相邻结点，找最小路径
2. 找到 u 到 w 的最短路径，更新 w 相邻的不在 N‘中的 min(D(x), D(w) + c(w, x))
3. 重复 2 知道所有 N’长度等于结点数

![image-20220615230939859](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220615230939859.png)

![image-20220615231246175](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220615231246175.png)

![image-20220615231213629](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220615231213629.png)

![image-20220615231419610](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220615231419610.png)

坏消息传播慢 无穷计数

毒性逆转 如果一个结点 z 到达某目的 x 的最小费用路径是通过某个邻居 y 则通知给该邻居结点到达该目的的距离为为无穷大

定义最大跳数 16 跳表示距离无穷

![image-20220615231925535](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220615231925535.png)

自治系统内路由任务和自治系统间路由任务

![image-20220615232126565](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220615232126565.png)

![image-20220615232052027](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220615232052027.png)

数据链路层服务

负责通过一条链路从一个节点向另一个物理链路直接相连的相邻结点传送数据报

组帧、链路接入（帧首部的 MAC 地址用于标识源和目的）、相邻结点可靠交付、流量控制、差错检测、差错纠正、全双工和半双工通信控制

多路访问控制（MAC - multiple access control protocol）

点对点： 拨号，以太网交换机与主机间点对点链路

广播链路： 802.11 无线局域网

分类

信道划分（channel partitioning）MAC TDMA（时分）、FDMA（频分）、CDMA（码分）、WDMA（波分）

随机访问（random access）MAC 信道不划分，允许冲突；采用冲突“恢复“机制

轮转（taking turns）MAC 结点轮流试用信道

![image-20220703150406307](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703150406307.png)

![image-20220703150505916](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703150505916.png)

![image-20220703150725136](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703150725136.png)

ARP 协议 网络层

*RARP*一般指反向地址转换协议。 反向地址转换协议（_RARP_：Reverse Address Resolution Protocol） 允许局域网的物理机器从网关服务器的 ARP 表或者缓存上请求其 IP 地址

*IGMP*一般指 Internet 组管理协议。 Internet 组管理协议称为*IGMP*协议（Internet Group Management Protocol），是因特网协议家族中的一个组播协议。该协议运行在主机和组播路由器之间。*IGMP*协议共有三个版本，即*IGMP*v1、v2 和 v3。

arp 协议即地址解析协议,是根据 IP 地址获取物理地址的一个 TCP/IP 协议

再同一个 LAN 内如何再已知目的接口的 IP 地址前提下确定其 MAC 地址

![image-20220703151147037](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703151147037.png)

![image-20220703151315992](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703151315992.png)

![image-20220703151515620](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703151515620.png)

网络接口控制器（英语：network interface controller，_NIC_），又称网络接口控制器，网络适配器（network adapter），网卡（network interface card），或局域网接收器（LAN adapter）

![image-20220703151713150](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703151713150.png)

以太网（Ethernet）是为了实现局域网通信而设计的一种数据链路层技术，它规定了包括物理层的连线、电子信号和介质访问层协议的内容。以太网是目前应用最普遍的局域网技术，取代了其他局域网标准如令牌环、FDDI 和 ARCNET。网络的物理层面和数据链路层搞定，还不能进行通信，因为还需要 TCP/IP 这样的技术标准，而这些标准也是依托于上面的以太网技术等等才能使用。

![image-20220703212237457](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703212237457.png)

![image-20220703214019069](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703214019069.png)

![image-20220703214144593](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703214144593.png)

![image-20220703214515893](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703214515893.png)

![image-20220703214741278](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703214741278.png)

例如：发送接口添加随机参数

![image-20220703220759301](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703220759301.png)

![image-20220703220904766](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703220904766.png)

![image-20220703221010221](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220703221010221.png)

① 局域网 LAN（LocalAreaNetwork）：一般指覆盖范围在 10 公里以内，一座楼房或一个单位内部的网络。由于传输距离直接影响传输速度，因此，局域网内的通信，由于传输于距离短，传输的速率一般都比较高。目前，局域网的传输速率一般可达到 10MB/S 和 100MB/S,高速局域网传输速率可达到 1000MB/S。

② 广域网 WAN（WideAreaNetwork）:是指远距离的、大范围的计算机网络。跨地区、跨城市、跨国家的网络都是广域网。由于广域的覆盖范围广，联网的计算机多，因此广域网上的信息量非常大，共享的信息资源很丰富。INTERNET 是全球最大的广域网，它覆盖的范围遍布全世界。

③ 城域网 MAN（MetropolitanAreaNetwork）：其覆盖范围在局域网和广域网之间。一般指覆盖范围为一个城市的网络。

**网络安全**

营销活动设计

参与门槛 新老用户，活跃度 vip

兑换使用门槛 T+1 到账，是否可叠加

秒杀： 不同客户不同规则，发现异常取消 高并发锁

抽奖：次数，概率

领卷： 使用期限，库存，使用范围，单人领取，是否本人

红包：转增，到账时效，限额

1. 越权（逻辑漏洞）权限判断

   身份未验证

   参数可穷举/遍历

2. 敏感信息未处理（个人身份 个人活动）识别身份

   场景：前端展示、后台报文、行内传输行外、日志

   解决方法：脱敏（掩码）、敏感信息外发报备、删除、加密、编码

3. 逻辑漏洞

   登录-验证码建议-后台记录失败次数-验证码失效-返回登陆失败信息-验证码更新

4. 存储型 xss 间接攻击用户

   场景：自己的个人资料填入 js 代码，其他人正常访问页面时，代码被执行

   通过前端存储脚本代码到数据库，用户打开时获取到脚本代码

   再脚本中发送请求，盗用用户 cookie

   植入钓鱼页面，用户点击进入攻击者陷阱

5. SQL 注入 输入校验

   场景： 外部参数输入，程序执行了拼接 sql 语句

   预处理，白名单

XSS

反射型

通过再 url 上直接插入脚本，大部浏览器已有拦截

存储型

DOM 型

DOM 操作脚本

社工库 存储个人信息

脱库 撞库 洗库

密码生成规则比如电影书本等首字母缩写

app 防重放

重放攻击是指攻击者发送一个特定目的主机已经接送过的包，来达到欺骗系统的目的，主要引起的问题有：无限撞库/表，短信/邮件轰炸，短信/邮件轰炸，刷单、赞留言优惠劵重复交易，

会话劫持，配合其他安全漏洞获取大量数据

再前端带上 timestamp 并签名

1.验证权限

访问控制：

​ 登录态、功能限制、操作对象是否当前用户、对象状态是否允许被操作

​ 未授权访问，越权部分，逻辑漏洞

2.检查输入

输入校验：

​ 非预期字符过滤、基于业务逻辑输入校验（金额、跳转地址、禁止用户修改内容）、上传功能文件类型、路径、大小

​ XSS，sql 注入、任意地址跳转、任意文件上传

3.处理请求

参数化 sql

预编译参数化 SQL，对拼接内容设置白名单，对拼接内容进行编码

​ SQL 注入

应对高并发

​ 加锁限制资源竞争

防通知骚扰

​ 发送前加入图验，优先从后端获取发送目标（手机，邮箱，微信等），在服务端对发送间隔做限制，一定时间内对发送总次数做限制

​ 短信炸弹，通知骚扰

4.返回结果

输出编码

​ 根据场景对不可信内容进行转义，编码尤其是<>' "&，excel 拼接禁止开头为-+=@

​ XSS csv 文件注入

敏感信息处理

​ 对信息脱敏，对报错信息进行封装，不要使用前端隐藏接口功能屏蔽，密码加密，敏感信息不拼接 url 中发送

​ 敏感信息泄露

![image-20220702165600460](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220702165600460.png)

![image-20220702165640740](C:\Users\85165\AppData\Roaming\Typora\typora-user-images\image-20220702165640740.png)
