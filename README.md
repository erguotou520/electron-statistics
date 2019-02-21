# Electron应用统计平台
鉴于目前市面上并没有一个特别好用的可用于`Electron`的数据统计平台（百度，友盟什么的都不行，神策太贵，诸葛统计数据不准），因此建立一个简单的应用统计平台。

项目分3个子项目`admin`web ui，`sdk`可直接在`Electron`项目中使用的SDK，`server`后台web服务。

## 运行
项目依赖`mongodb`，请先安装之。启动3个terminal，分别执行

```bash
yarn serve
yarn server
yarn admin
```

打开`serve`服务提供的地址，进入`test`目录，即可创建测试数据。
然后打开`admin`服务提供的地址，即可进入后台页面。
初次运行会自动创建`admin/admin`的账号。

## 部署
项目提供`docker-compose.yml`文件，所以可以直接使用`docker-compose up --build`部署。目前线上地址为[](http://admin.yan4.cn/)
