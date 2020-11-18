import IApi from "./IApiConfig";

const Api: IApi = {
  ExampleApi: {
    getList: "/api/boiling/topologies?pageIndex=1&pageCount=8",
    getOther: "/other"
  }
}
export default Api;