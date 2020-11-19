import * as IExampleService from "@core/business-modules/example-domain/service/IExampleService";
import { MainService } from "@core/business-modules/main-service";

const ExampleServiceInjection: IExampleService.IExampleServiceInjection = {
  async getList() {
    return await MainService.request.get(MainService.api.ExampleApi.getList);
  },
};

export default {
  injection: ExampleServiceInjection,
};
