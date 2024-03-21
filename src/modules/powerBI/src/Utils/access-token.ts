import { Access } from '../Types/access';

/**
 * Singleton class for PowerBI Access object.
 * To retrieve its instance use `AccessToken.getInstance()`.
 * Use setter and getter methods on the instance to access the private `access` variable.
 */
export class AccessToken {
  private static instance: AccessToken;
  private access: Access | undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): AccessToken {
    if (!AccessToken.instance) {
      AccessToken.instance = new AccessToken();
    }
    return AccessToken.instance;
  }

  setAccess(v: Access): void {
    this.access = v;
  }

  getAccess(): Access | undefined {
    return this.access;
  }
}
