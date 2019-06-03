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
    * 重试URL策略
    */
  getRetryURL?: (url: string, times: number) => string;

  /**
   * onLoad event
   * @type Function
   */
  onLoad?: (event: object, url: string) => void;

  /**
   * 重试次数
   * @type number
   */
  retry?: number;
}

/**
 * 全局配置
 */
export const config: ImageConfig;
