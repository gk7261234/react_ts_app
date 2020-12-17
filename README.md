## 前端工程化概述

  ### 摘要

  前端工程化可以分为四个方面来说，分别为 `模块化` `组件化` `规范化` 和 `自动化`。

  ### 模块化

  *模块化* 是指将一个文件拆分成多个相互依赖的文件，最后进行统一的打包和加载，这样能够很好的保证高效的多人协作。 其中包含
  + JS 模块化： CommonJS AMD CMD 以及 ES6 Module
  + CSS 模块化： Sass Less Stylus BEN CSS Modules等。 其中预处理器和BEM都会有的一个问题就是样式覆盖。而CSS Modules则是通过JS来管理依赖，最大化的结合JS模块化和CSS生态，比如VUE中的style scoped。

  ### 组件化
  不同于模块化，*模块化* 是对文件、对代码和资源拆分，而组件化则是对UI层面的拆分。

  通常我们会对页面进行拆分， 将其拆分成一个一个的零件，然后分别实现这一个个零件，最后在进行组装。在我们实际开发中对于组件的拆分我们需要做不同程度的考量，其中主要包括 *细粒度* 和 *通用性* 这两块的考虑。对于业务组件，跟多需要考量的是针对你的负责业务的一个适用度，即设计的业务组件是否成为当前业务的“通用”组件

  ### 规范化
  正所谓无规矩不成方圆，一些好的规范能很好地帮助我们对象进行良好的开发管理。*规范化* 指的是我们在工程开发初期指定的系列规范，其中包含
  + 项目目录结构
  + 编码规范：对于编码这块的约束，一般我们都会采用一些强制措施，比如ESlint、StyleLint等
  + 联调规范
  + 文件命名规范
  + 样式管理规范： 目前流行的样式管理有 BEM Sass Less Stylus Css Modules
  + git flow 工作流： 其中包含分支命名规范、代码合并规范
  + 定期code review 。。。等等

  ### 自动化
  从最早的grunt、gulp等， 再到目前的webpack、parcel。这些自动化工具在自动化合并、构建、打包都能为我们节省很多工作。而这些知识前端能自动化其中的一部分，前端*自动化*还包含了持续继承、自动化测试等方方面面。


## 项目安装&运行

1. 执行 `npm install` 安装依赖包
2. 执行 `npm run start` 启动项目
3. 执行 `npm run build` 打包项目
4. 执行 `npm run lint:ts` ts 代码风格检查

## 概述

+ 配置tslint:  tslint tslint-config-prettier tslint-react 检测代码 is ok
+ 配置 eslint 代码检测
+ axios 二次封装 is ok
+ Api service 抽象管理IOC [vue 可以配置全局属性] is ok
+ pre-commit: 代码git commit 前，对代码校验及修复 is ok
+ 环境配置文件 is ok
+ 添加 微服务通用配置 is ok
+ 添加 微前端 通讯配置 is ok
+ docker 部署
+ 添加antd UI 库 is ok

## 优化补充

+ 添加 css 代码检测
+ 性能优化： 配置按需加载 组件懒加载（集成到微服务有问题） 预加载/预解析
+ 配置redux [阮一峰教你不要用redux, 哈哈](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
+ 设置文件别名 （tsconfig.json 项目运行自动生成修改后产生冲突） 已解决

## 注意

+ 每个文件只包含一个React组件  eslint: react/no-multi-comp
+ 业务组件需具名
+ 拓展名：React组件使用.tsx扩展名
+ 文件名：文件名使用帕斯卡命名：HomePage.jsx
+ 引用命名：React组件使用帕斯卡命名，引用实例采用驼峰式命名：eslint: react/jsx-pascal-case
  ```
  // good
  import ReservationCard from './ReservationCard';

  //good
  const reservationItem = <ReservationCard />

  ```
+ 引号： tsx 属性采用双引号（因为 tsx 属性 不能包含转义的引导，当输入“don't”这类缩写使用双引号更方便）
+ 属性： 
  ```
  1. 使用驼峰命名法

  // good
  <Foo userName="hello" />

  2. 当属性值等于true的时候，省略该属性的赋值。 eslint:react/jsx-boolean-value

  // bad
  <Foo hidden={true} />

  // good
  <Foo hidden />

  ```
+ 括号： 使用括号包裹多行tsx标签 react/wrap-multilines
+ TypeScript：
  ```
  1. 使用 TSLint 管理代码规范
  2. 尽量避免使用 any 定义数据类型 写好声明文件
  3. 类型名使用 PascalCase
  4. 函数名cameCase

  ```

+ 。。。

