import * as awilix from "awilix";
import ExampleService from "@core/business-modules/example-domain/service/ExampleService";

const Lifetime = awilix.Lifetime;

export default {
  ExampleService: awilix.asClass(ExampleService, { lifetime: Lifetime.SINGLETON }),
};
