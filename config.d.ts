interface Event<T> {
  detail: T,
  currentTarget: {
    dataset: {
      type: "thumb" | "data"
    }
  },
  type: string,
}

/**
 * 加载失败
 */
export type ErrorEvent = Event<{ errMsg: string }>;
/**
 * 加载成功
 */
export type LoadEvent = Event<{
  width: number,
  height: number
}>
/**
 * miniprogram-image 全局配置
 */
interface ImageConfig {
  /**
    * onError event
    * @type Function
    */
  onError?: (event: ErrorEvent, url: string) => void;

  /**
    * 重试URL策略
    */
  getRetryURL?: (url: string, times: number) => string;

  /**
   * onLoad event
   * @type Function
   */
  onLoad?: (event: LoadEvent, url: string) => void;

  /**
   * Url预处理
   */
  prepareUrl?: (url: string) => PromiseLike<string> | string;

  /**
   * 重试次数
   * @type number
   */
  retry?: number;
}

/**
 * 全局配置
 */
declare const config: ImageConfig;

export default config;
