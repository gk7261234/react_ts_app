import ExampleService from "@core/business-modules/example-domain/service/ExampleService";
import * as IExampleService from "@core/business-modules/example-domain/service/IExampleService";
import api from "@core/business-config/ApiConfig";
import IApi from "@core/business-config/IApiConfig";
import request from "@/utils/request";

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
  static Instance(): MainService {
    if (!MainService.instance) {
      MainService.instance = new MainService();
      MainService.request = request;
      MainService.api = api;
    }
    return this.instance;
  }

  // 示例服务注入
  ExampleService: IExampleService.IExampleServiceInjection = ExampleService.injection;
}
