# 迁移数据

无需来回引继，仅需第一次迁移即可实现类似 BGO 的多设备(iOS, Android, 模拟器)、多客户端(FGO,BetterFGO)登陆。支持在 iOS 和 Android 之间任意迁移。
仅适用于使用引继码方式的日服和美服。~~傻逼引继码~~。

::: warning
官方用户协议不允许一机多号、使用模拟器、修改安装包等行为。
:::

## 简要流程

拷贝/导出存档文件 - 修改引继文件文件名(仅跨平台) - 删除目标目录其余文件(子文件夹可保留) - 粘贴存档文件

- Android->Android: 仅复制粘贴存档目录下所有文件即可
- iOS->iOS: 两台设备均使用 iMazing 备份，导出 FGO 存档后还原至另一台设备
- iOS->Android(推荐): iMazing 备份并导出 iOS 存档，解压并重命名文件名，清空 Android 存档目录(files/data)，粘贴存档文件
- Android->iOS(不推荐): iMazing 备份导出并 iOS 存档，WinRAR 打开，Container/Documents 为存档目录，删除目录下的文件并用添加已重命名的 Android 存档文件，还原 iOS 存档

## 注意事项

- 引继码/引继文件是一次性的，一旦发行新的引继码，过往的引继码和引继文件全部作废，每个客户端都得重新拷贝新的引继文件
- 跨平台时推荐 iOS->Android 无损操作，因为 iOS 还原存档时存在一定风险，可能导致 iOS 在以后重启/更新系统时恢复至某一个还原点(本人:某一次更新系统后桌面设置恢复至备份时的布局,大量 app 需要重新下载(数据没有丢失,仅 app 重下))。目标设备 iOS 的话，可以选择还原后尽快更新一次系统以免除后患

## 导出存档

### 存档目录

- Android: `/storage/emulated/0/Android/data/<package>/files/data/` 或 `sdcard/Android/data/<package>/files/data/`
- iOS: `Fate_GO.imazingapp/Container/Documents/`

对于 Android-Android, iOS-iOS 迁移，只需上述文件夹中的文件(不包括子文件夹)全部复制到目标文件夹覆盖原文件即可。

在 Android 和 iOS 存档中，同一文件的文件名不同，需要更改为目标系统中的文件名后再覆盖。除下述已知的几个重要文件之外，建议删除其他文件避免验证冲突。

### 导出 Android 存档

Android 系统的 FGO**存档目录**下的 d713 等子文件夹为资源文件，可忽略。

不同安装包的`<package>`包名如下，需至少打开应用一次以生成该文件夹

- 日服: `com.aniplex.fategrandorder`
- 美服: `com.aniplex.fategrandorder.en`

### 导出 iOS 存档

iOS 采用备份还原的方式导出或还原存档，首先需要通过**iMazing**软件备份“整个 iPhone”至电脑（往往会有几到几十 GB），然后从备份中导出某个应用存档。
若存档已过期，则需重新备份整个手机再导出存档，若上次备份的存档仍有效，则可以从上次备份导出存到，后续导出选项有这一项。

iMazing 的使用图文教程网上很多，就不细说。备份较大，若希望删除备份，在 iMazing 对应设备中查看选项设置，会显示备份位置，可手动删除对应备份文件夹（默认路径可能为隐藏文件夹）。

0. 安装[iMazing](https://imazing.com/zh)软件（支持 Windows 和 macOS，试用版就够用）。数据线连接 iPhone 与电脑，若手机有弹窗点击信任此电脑，iMazing 将显示所连接的手机。
1. 在 iMazing 中选择`管理应用`，(可能需要登录苹果账号)，显示应用列表，有两个标签页(设备 Device 和资料库 Library)，在设备这一页找到 Fate/GO。
2. 右键`导出应用数据`，选择保存目录，下面有两选项：`备份并导出`和`尝试从上一次备份导出`。初次使用无差别，否则见此处第一部分描述。
3. 导出成功后，在目标文件夹下生成`Fate GO.imazingapp`(Windows)或`Fate/GO.imazingapp`(macOS)，注意字符`/`在 Windows 中是非法文件名，若需要从 mac 复制文件到 Windows，建议先修改文件名。
4. imazingapp 类型文件相当于 zip 压缩包，可使用 WinRAR 打开，若需替换文件，建议直接在 WinRAR 中替换。
5. 压缩包内`Container/Documents`即为存档目录。

::: tip
登录凭据的文件名在 iOS 和 Android 中并不相同，跨平台时时记得修改文件名。
务必确保粘贴前**已清空目标存档目录下其他文件**(不含子文件夹)，否则可能会失败，进入新手号。
:::

| iOS (\*.dat)          | Android              | 备注           |
| --------------------- | -------------------- | -------------- |
| authsave<br>authsave2 | 54cc\*\*<br>969b\*\* | 登陆凭据(必需) |
| friendcodesave        | e1a9\*\*             | 用户 id        |
| signupsave            | 644b\*\*             | 用户名？       |

- 在iOS中同时存在`authsave.dat`和`authsave2.dat`两个文件，内容一样，复制一份
- 在Android中`54cc`和`969b`也是同样的文件，选择54cc或同样复制一份
- Android完整文件名(**无后缀**)如下:
  - `54cc790bf952ea710ed7e8be08049531`
  - `969b46577f365fadeb79ef14cf5d6370`
  - `e1a9f8e0ff970cc15b1a1d1e31d146db`
  - `644b05165c512739dc5e70ad513548fe`

## 还原存档

### 还原至 Android 存档

删除 data 存档目录下所有其他文件，子目录可保留，然后复制上述`969b46`文件。万事大吉。

### 还原至 iOS 存档

iOS 需在设置中关闭**查找我的手机**功能才能使用还原功能。还原结束可重新开启。

1. WinRAR 打开 imazingapp 文件后，将重命名的`authsave2.dat`文件直接拖进去覆盖。(虽为 zip 压缩，但未尝试过先解压再重新压缩是否可行)
2. 回到 iMazing 的管理应用的应用列表，右键`还原应用存档`，手机将重启。
3. 重启后会需要 id 验证、安全隐私设置。【**有一项从何处恢复数据的选项，选择 不要恢复！！！**】 万事大吉。
