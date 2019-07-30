/**
 * 全局配置
 */
const config = require('./config');

Component({
  properties: {
    src: {
      type: String,
      observer(newVal, oldVal) {
        if (oldVal !== newVal) {
          if (this.dataset.thumb === this.data.imgThumb) {
            this._updateAsync({
              imgLoaded: false
            });
          } else {
            this._updateAsync({
              imgLoaded: false,
              imgThumb: this.dataset.thumb || '',
              thumbLoaded: false
            });
          }
          const img = config.prepareUrl ? config.prepareUrl(newVal) : newVal;
          if (typeof img === 'string') {
            this._updateAsync({ imgSrc: img });
          } else {
            // 图片预处理
            img
              .then(imgSrc => this.setData({ imgSrc }))
              .catch((err) => {
                console.error(err);
                this.setData({ imgSrc: newVal });
              });
          }
        }
      }
    },
    mode: String,
    height: String,
    /**
     * 开启长按图片显示识别小程序码菜单
     */
    showMenuByLongpress: Boolean,
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
