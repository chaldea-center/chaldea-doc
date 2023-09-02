# Charles 抓包

本文详细介绍借助 Charles 实现 https 抓包的步骤。

::: tip
国服目前已恢复默认使用系统代理且iOS和Android号可互登，iOS 推荐使用原[Stream-iOS](./stream.md)教程，无需电脑操作，方便快捷。
:::

## 所需软件或工具

- Charles: 提供 Windows、macOS 以及 Linux 版，官方正版试用版存在单次使用 30 分钟的限制，但功能够用
  - 下载地址: <https://www.charlesproxy.com/download/>
- 全局 http 代理软件:
  - iOS: `Potatso Lite`, 免费应用; `shadowrocket`付费应用。均需非国区账号下载，其他可用软件欢迎补充~~有很多~~。
  - Android: `Drony v1.3.x`, 免费应用, [下载地址(密码:chaldea)](https://wws.lanzoui.com/b01uoc3qh)。百度下载 Drony 可以下载到各式各样文件体积的版本，有些是不能用的，建议直接从网盘下载。
- FGO客服端
  - 国服/台服官方安装包，支持 iOS 和 Android
  - 不支持日服/美服官方安装包，可以用账号文件模拟登陆代替抓包
  - 韩服没辙
- Android only: Android 版本大于 6 时不信任用户证书，可选以下解决方案
  1. 使用 Android 版本**小于等于 6**的手机或模拟器，可在`设置-关于`中查看 Android 版本
  2. root 状态下通过 adb 手动将证书塞进系统证书目录: <https://stackoverflow.com/a/46569793>
  3. 类似 2，通过 magisk 等框架自动复制用户证书至系统证书: magisk 需 Android8.1 及以上, <https://sekibetu.com/sniff01.html>
- iOS only:
  - 只有国服和台服可用

## 关于模拟器

本教程基于蓝 MuMu(Android 6)，至少经过多次多人使用验证是没问题的。

如果模拟器或手机的 Android 版本大于 6，需要将 CA 证书塞进系统证书，root 是前提，还需要 adb 操作，没有经验的请直接使用本教程的蓝 MuMu 模拟器。

模拟器种类太多，总有莫名其妙的问题，如蓝叠(BluStacks)根本没有 WiFi 和证书安全的设置项，夜神(Nox)未知原因抓不到等。抓包失败或不想折腾的请使用蓝 MuMu

## 配置 Charles

![Charles UI](/images/import_https/charles-1.webp)

<figcaption style="text-align:center">Charles界面</figcaption>

![Charles Configuration](/images/import_https/charles-2.webp)

<figcaption style="text-align:center">Charles配置</figcaption>

::: details
<https://zhile.io/2017/07/07/charles-proxy-usage-and-license.html>
::: 

0. 确保手机与电脑处于同一局域网，或模拟器与 Charles 在同一电脑，关闭电脑上其他一切 ⅤΡΝ 等代理软件
1. `Help-Local IP Address`, 记录显示的本机 IPv4 地址，例如`192.168.0.5`
2. `Proxy-Proxy Settings`, 记录或修改端口，默认`8888`
3. `Help-SSL Proxying-Install Charles Root Certificate on a Mobile device or Remote Browser`, 无操作，提示设置手机代理(`192.168.0.5:8888`)以及证书下载地址`chls.pro/ssl`，详见下一步
4. `Proxy-SSL Proxying Settings`，在左侧`include`中点击添加`Add`，分别在 host 和 port 中输入`*`，代表解密所有 https 流量
5. 点击 OK，Charles 设置完毕，确保 Charles 最右下角显示`Recording`小字
6. 在 iOS/Android 完成设置代理，第一次连接上 Charles 时，会提示有个远程连接`Connection from 1.2.3.4`，确保此处的 IP 是你手机/模拟器的 IP，选择接受`Allow`，否则可能为网络中其他木马爬虫，点击拒绝`Deny`

## 配置 iOS

仅国服/台服支持！！！

![iOS Configuration](/images/import_https/ios-1.webp)

<figcaption style="text-align:center">iOS配置</figcaption>

> 截图仅用于指示设置项所在位置，若与下面文字步骤不一致，以文字步骤为准。

### iOS 手机证书

以 iOS14 为例，不同 iOS 版本设置可能显示在不同地方，仔细找找。

1. 连接 wifi，确保与电脑处于同一个局域网(如同一路由器或连接电脑的热点等)
2. `设置-WiFi-已连接WiFi右侧的按钮-配置代理-手动`，填入配置 Charles 中第 3 步显示的代理主机 host`192.168.0.5`和端口 port`8888`(举例)，储存
3. 打开**Safari**！Safari！一定要是 Safari，不能使用其他浏览器。打开网址`chls.pro/ssl`，提示下载配置描述文件，选择允许
4. 打开`设置`，顶部应该显示`已下载描述文件`，若没有，可在`通用-描述文件-已下载描述文件`中寻找，一路安装`Charles Proxy CA ****`
5. 打开`设置-通用-关于本机-证书信任设置`，打开 Charles 的证书信任开关（iOS 10.2 及以下没有这一步）
6. 打开浏览器，进入`https://baidu.com`，检查 Charles 列表大部分 https 开头网址前面是蓝色的图标或闪电图标，如为白色的锁图标，说明未解密，请删除上述描述文件再重试
7. 证书安装完毕可关闭 WiFi 代理，后续使用全局代理即可

### iOS 设置全局 http 代理

1. 外区账号下载安装`Potatso Lite`
2. 点击右上角新建-手动输入: 类型-`HTTP`(注意不是 https), 服务器和端口填写同上一步。
3. 确保设置中的智能路由/Smart Routing 为关闭状态。其他代理软件可能需要设置为**代理**模式(shadowrocket)或**全局**模式。不能是**PAC**，否则国内流量都将不走代理。
4. 选中刚新建的代理，点击按钮连接，第一次使用会申请创建 ⅤΡΝ 的权限。在 Charles 中会弹出提示，并允许接收来自此设备的请求。

## 配置 Android

![Android Configuration](/images/import_https/android-1.webp)

<figcaption style="text-align:center">Android配置</figcaption>

> 截图仅用于指示设置项所在位置，若与下面文字步骤不一致，以文字步骤为准。

### Android 手机证书

以 MuMu 模拟器(Android 6.0.1)为例，不同模拟器/手机的设置布局可能存在差别

0. 使用 Android 6 及以下的手机或模拟器
1. 如使用手机则确保和电脑处于同一局域网(如同一路由器或连接电脑的热点等)
2. 打开`设置-WiFi-长按或其他方式查看已连接WiFi详情-修改网络`，代理选择`手动`，填入配置 Charles 中第 3 步显示的代理主机 host`192.168.0.5`和端口 port`8888`(举例)，储存
3. 浏览器打开`chls.pro/ssl`,下载 pem/crt 证书文件，安装证书有两种方法
   - 直接打开文件安装，有时可能会失败
   - 在`设置-安全-从SD卡安装证书`，选择刚下载的证书文件，取个名，默认凭据用途为 ⅤΡΝ 和应用
4. 你可以在`设置-安全-信任的凭据-用户`中找到`Charles Proxy CA ****`
5. 打开浏览器，进入`https://baidu.com`，检查 Charles 列表大部分(并非所有)https 开头网址前面是蓝色的图标或闪电图标，如均为白色的锁图标，说明未解密，请删除上述证书再重试
6. 按理说证书安装成功后只需使用后续全局代理即可，可关闭 WiFi 代理设置

> Android 这一步系统代理下载证书理应也可以用下面的全局代理替代

### Android 设置全局 http 代理

1. 下载安装 Drony，只有英文和繁体，根据系统语言显示，参考上图
2. 打开后显示日志页和设置页，左右滑动切换到设置页
3. 网络-无线网络-选择连接的 WiFi-网络细节设置
   - WiFi 名: `代理类型/Proxy type`选`手动/Manual`
   - WiFi 名-手动代理/Manual Proxy: `主机名`和`端口`同上一步，`代理类型/Proxy type`选`普通/Plain`
   - WiFi 名-过滤器/Filter: 过滤默认值选择`本地代理链全部/Local Proxy Chain All`
   - 返回
4. 过滤器-默认值: 选择`引导全部/Direct All`
5. 左滑回到日志页，点击底部开关，开启后在通知栏可以看到 ⅤΡΝ 连接提示，第一次使用会申请创建 ⅤΡΝ 的权限。在 Charles 中会弹出提示，并允许接收来自此设备的请求。

## 抓包与导入

![Save Response](/images/import_https/charles-3.webp)

<figcaption style="text-align:center">目标网址与保存内容</figcaption>

### FGO 抓包

> 2022.01.04 国服更新 2.36.0 支持 iOS/Android 互登，目标域名更改为`line3-s2-xxx-fate.bilibiligame.net`，但仍有可能依旧为`line1`，总之都找找试试。

1. 重新启动并登陆 FGO，直到看到地球仪或公告栏为止
2. 找到 Charles 的列表中以下 url，**如果找不到就关闭 FGO 重试，再不行检查前面步骤是否正确**
   - 国服: 其中`line3-s2-ios-fate`随账号所在服务器(iOS/b 服/渠道服)以及所在地理位置等有所不同，最重要的是`_key=toplogin`
   ```:no-line-numbers
   https://line3-s2-ios-fate.bilibiligame.net/rongame_beta//rgfate/60_1001/ac.php?_userId=xxxx&_key=toplogin
   ```
   - 台服: 与国服类似，域名格式`https://line3-s1-all.fate-go.com.tw`，由于无台服账号，待确认
   - 日服:
   ```:no-line-numbers
   https://game.fate-go.jp/login/top?_userId=xxxx
   ```
   - 美服:
   ```:no-line-numbers
   https://game.fate-go.us/login/top?_userId=xxxx
   ```
3. 选中上述 url 右键`Save Response`，(注意是`Response`，不要和 Request 搞混了)，另存为 fgo.txt(名字随意)
4. 检查: 任意文本编辑器打开保存的 txt 文件，对于国服和台服，内容为`ey`开头的一大串字母数字符号组成的 base64 编码；对于日服和美服，为`{`开头的可读性极高的 json 格式。默认应为 utf8 编码，打开后仅查看，请勿编辑保存导致编码格式改变。

### 导入到 Chaldea

1. 在`导入-HTTPS抓包`中，点击右上角导入刚才保存的 txt 文件，将自动解析数据
2. 所有数据被分为: 素材、从者、灵基保管室中的从者、礼装图鉴，根据自己需求勾选需要导入的部分
3. 筛选
   - **锁定**: 默认仅显示和导入锁定的从者
   - **允许 2 号机**: 同一从者可以存在多张卡，默认只选择主动技能练度最高的一个，存在重复的从者会显示其获取日期作为提示
   - 点击单个从者可单独隐藏该从者，不导入
4. 点击导入可更新当前账号信息
5. 点击**羁绊详情**可查看并排序每个从者的羁绊等级、羁绊累计值、下一级所需羁绊值，方便挖矿

注意: 导入的信息属于抓包那一时刻的数据，并非登陆凭据也无法自动更新，因此下次需要更新数据需要重新抓包

## 结束及下一次抓包

清理工作:

- 确保关闭全局代理，关闭 WiFi 设置中的手动代理。否则关闭 Charles 后无法联网
- 删除或关闭证书信任: 如果删除，则下一次抓包前需重新安装证书；也可以保留，如 iOS 关闭信任设置即可无需删除描述文件

下一次抓包:

- 打开 Potatso/Drony 的全局代理，其他设置不变，只需要打开代理软件的开关即可
  - Android: 如果更换了 WiFi，则 Drony 中的设置需要重新设置一遍
- 检查证书: 如果上次已删除或关闭信任证书，则重新安装或信任证书。
- 打开 Charles 和 FGO 抓包

## FAQ

- [FAQ](./README.md#常见问题-faq)
- 提问前请确保你已经仔细阅读了文档: [简介](./README.md)和本页内容
- 百度谷歌搜索欢迎您，请先动手尝试自己找答案
