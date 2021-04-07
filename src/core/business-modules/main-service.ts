import * as awilix from "awilix";

import api from "@core/business-config/ApiConfig";
import IApi from "@core/business-config/IApiConfig";
import request from "@/utils/request";

import ServiceRegister from "./service-register";

import * as IExampleService from "@core/business-modules/example-domain/service/IExampleService";

interface Request {
  get<P, R>(_url: string, _params?: P): Promise<R>;
  post<P, R>(_url: string, _params?: P): Promise<R>;
  delete<P, R>(_url: string, _params?: P): Promise<R>;
  put<P, R>(_url: string, _params?: P): Promise<R>;
}
export class MainService {
  static instance: MainService;
  static api: IApi;
  static request: Request;
  private container: awilix.AwilixContainer;
  constructor() {
    // 1. 创建容器
    this.container = awilix.createContainer();
    // 2. 依赖注册到容器
    this.container.register(ServiceRegister);
  }
  static Instance(): MainService {
    if (!MainService.instance) {
      MainService.instance = new MainService();
      MainService.request = request;
      MainService.api = api;
    }
    return this.instance;
  }

  // 3. 解析依赖
  get ExampleService(): IExampleService.IExampleServiceInjection {
    return this.container.resolve<IExampleService.IExampleServiceInjection>("ExampleService");
  }
}
