class Shared {
  /**
   * 获取 Token
   */
  getToken() {
    return localStorage.getItem("token") || "";
  }

  /**
   * 设置 Token
   */
  setToken(token) {
    localStorage.setItem("token", token);
  }
}

class SharedModule {
  static shared = new Shared();

  /**
   * 重载 shared
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static overloadShared(shared) {
    SharedModule.shared = shared;
  }

  /**
   * 获取 shared 实例
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static getShared() {
    return SharedModule.shared;
  }
}

export default SharedModule;
