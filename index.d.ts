/**
 * miniprogram-image 全局配置
 */
interface ImageConfig {
  /**
    * onError event
    * @type Function
    */
  onError?: (event: object, url: string) => void;

  /**
    * 重试
    */
  getRetryURL?: (url: string, times: number) => string;

  /**
   * onLoad event
   * @type Function
   */
  onLoad?: (event: object, url: string) => void;

  /**
   * @type number
   */
  retry?: number;
}

// declare namespace App {
//   export interface AppInstance<T extends Record<string,any> = {}> {
//         /**
//          * miniprogram-image 全局配置
//          */
//         __image_config?: ImageConfig
//     }
// }
/**
 * 全局配置
 */
export const config: ImageConfig;
