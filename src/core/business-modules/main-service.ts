import ExampleService from "./example-domain/service/ExampleService";
import * as IExampleService from "./example-domain/service/IExampleService";
import api from "../business-config/ApiConfig";
import IApi from "../business-config/IApiConfig";
import request from "../../utils/request"

interface IRequest {
  get<P, R>(_url: string, _params?: P): Promise<R>;
  post<P, R>(_url: string, _params?: P): Promise<R>;
  delete<P, R>(_url: string, _params?: P): Promise<R>;
  put<P, R>(_url: string, _params?: P): Promise<R>;
}

export class MainService {
  static instance: MainService;
  static api: IApi;
  static request: IRequest;
  static Instance(): MainService {
    if(!MainService.instance) {
      MainService.instance = new MainService();
      MainService.request = request;
      MainService.api = api;
    }
    return this.instance;
  }

  // 示例服务注入
  ExampleService: IExampleService.IExampleServiceInjection = ExampleService.injection;
}