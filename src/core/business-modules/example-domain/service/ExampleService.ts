import * as IExampleService from "@core/business-modules/example-domain/service/IExampleService";
import { MainService } from "@core/business-modules/main-service";

class ExampleServiceInjection implements IExampleService.IExampleServiceInjection {
  getList(): any {
    return MainService.request.get(MainService.api.ExampleApi.getList);
  }
}

export default ExampleServiceInjection;
