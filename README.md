# qq-bot
一个基于 mirai-http-api 的 qq 机器人

## 使用
### 安装 mirai 和 mirai-api-http
### 克隆仓库
```shell
git clone https://github.com/litfa/qq-bot.git
```
### 安装依赖
推荐使用yarn
```shell
yarn
```
### 生成配置文件
首次启动会自动生成
```shell
yarn start
```
```shell
$ yarn start
[INFO] 加载配置文件 config.yml
[WARN] 未找到配置文件，将尝试自动创建
[INFO] 未找到配置文件，已自动创建，请修改 config.yml 配置并重新启动
```
### 修改配置文件
编辑 config.yml 配置相关功能

### 启动
```shell
yarn start
```

## 从旧版本升级
### 克隆仓库
新版本没有基于旧版本开发，需要重新克隆仓库
```shell
git clone https://github.com/litfa/qq-bot.git
```

### 安装依赖
```shell
yarn
```

### 更新配置文件
新版本配置文件格式与旧版不同，可使用脚本升级
```shell
yarn update:config
```

```shell
$ yarn update:config
? 配置文件位置(当前目录可直接填写config.yml 其他目录填写相对路径或绝对路径) ../qq-bot2/config.yml
```
建议检查配置文件内容是否正确

### 复制旧版本的模板到新版
发送消息等功能会使用 template 文件夹中的模板，若需要使用可复制到 template 文件夹，文件夹内的文件会被git忽略

### 更新数据库
若使用备份消息功能，需要修改数据库  
<font color="red">**修改后无法退回旧版！请确认已进行备份！**</font>
```shell
yarn update:sql
```
```shell
[INFO] 加载配置文件 config.yml
[INFO] 连接数据库 
? 即将修改数据库中的数据类型，升级后无法回退为旧版本，请确认已经备份！ Yes
执行第 1/2 个
null
OkPacket {
  fieldCount: 0,
  affectedRows: 0,
  insertId: 0,
  serverStatus: 2,
  warningCount: 1,
  message: '&Records: 0  Duplicates: 0  Warnings: 1',
  protocol41: true,
  changedRows: 0
}
执行第 2/2 个
null
OkPacket {
  fieldCount: 0,
  affectedRows: 0,
  insertId: 0,
  serverStatus: 2,
  warningCount: 1,
  message: '&Records: 0  Duplicates: 0  Warnings: 1',
  protocol41: true,
  changedRows: 0
}
升级成功
```

