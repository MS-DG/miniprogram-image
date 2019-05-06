
const defaultConfig = {

  /**
  * onError event
  * @type Function
  */
  onError: console.error,

  /**
   * 重试
   */
  // eslint-disable-next-line no-unused-vars
  getRetryURL: (url, times) => url + ' ',

  /**
  * onLoad event
  * @type Function
  */
  onLoad: console.info,

  /**
  * @type number
  */
  retry: 1,
};

const app = getApp();

if (app && !app.__image_config) {
  app.__image_config = defaultConfig;
}

/**
 * 全局配置
 */
export const config = app ? app.__image_config : defaultConfig;

Component({
  properties: {
    src: {
      type: String,
      observer(newVal, oldVal) {
        if (oldVal !== newVal) {
          if (this.dataset.thumb === this.data.imgThumb) {
            this._updateAsync({
              imgSrc: newVal,
              imgLoaded: false
            });
          } else {
            this._updateAsync({
              imgSrc: newVal,
              imgLoaded: false,
              imgThumb: this.dataset.thumb || '',
              thumbLoaded: false
            });
          }
        }
      }
    },
    mode: String,
    height: String,
  },
  data: {
    imgThumb: '',
    imgSrc: '',
    lazyLoad: false,
    imgLoaded: false,
    thumbLoaded: false,
  },
  attached() {
    this.setData({
      imgThumb: this.dataset.thumb || '',
      lazyLoad: !!this.dataset.lazy
    });
    if (this.dataset.retry === undefined) {
      this.dataset.retry = config.retry;
    }
  },
  methods: {
    /**
     * 图片加载成功
     * @param {*} e
     */
    onImageLoad(e) {
      const type = e.currentTarget.dataset.type;
      if (type === 'data') {
        // 高清大图加载成功
        this._updateAsync({ imgLoaded: true });
      } else {
        // 缩略图加载成功
        this._updateAsync({ thumbLoaded: true });
      }

      const url = type === 'data' ? this.data.imgSrc : this.data.imgThumb;
      this.triggerEvent('update', {
        type,
        src: url
      });
      config.onLoad && config.onLoad(e, url);
    },

    /**
     * 图片加载出错
     * @param {*} e
     */
    onImageError(e) {
      if (e.currentTarget.dataset.type === 'thumb') {
        config.onError && config.onError(e, this.data.imgThumb);
      } else {
        const url = this.data.imgSrc;
        config.onError && config.onError(e, url);
        if (this.dataset.retry > 0) {
          this.setData({ imgSrc: config.getRetryURL(url, this.dataset.retry--) });
        } else {
          this.triggerEvent('fail', this.data.imgSrc);
        }
      }
    },

    /**
    * 异步更新数据
    * @param {object} data
    */
    _updateAsync(data) {
      if (wx.nextTick) {
        wx.nextTick(() => this.setData(data));
      } else {
        setTimeout(() => this.setData(data), 0);
      }
    }
  },
});
