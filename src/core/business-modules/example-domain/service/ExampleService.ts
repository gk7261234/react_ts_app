import * as IExampleService from "./IExampleService";
import { MainService } from "../../main-service";

const ExampleServiceInjection: IExampleService.IExampleServiceInjection = {
  async getList() {
    return await MainService.request.get(MainService.api.ExampleApi.getList);
  }
}

export default {
  injection: ExampleServiceInjection
}