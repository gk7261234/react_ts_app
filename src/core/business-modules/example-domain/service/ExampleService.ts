import * as IExampleService from "./IExampleService";
import { MainService } from "../../main-service";

const ExampleServiceInjection: IExampleService.IExampleServiceInjection = {
  async getList() {
    return await MainService.request.get(MainService.api.ExampleApi.getList);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  injection: ExampleServiceInjection
}