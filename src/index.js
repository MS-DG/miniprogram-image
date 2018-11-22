/**
 * 全局配置
 */
export const config = {

  /**
  * onError event
  * @type Function
  */
  onError: console.error,

  /**
  * onLoad event
  * @type Function
  */
  onLoad: console.info,

  /**
  * @type number
  */
  retry: 1,
}

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
            })
          } else {
            this._updateAsync({
              imgSrc: newVal,
              imgThumb: this.dataset.thumb || '',
              imgLoaded: false
            })
          }
        }
      }
    },
    mode: {
      type: String,
      observer(newVal, oldVal) {
        if (oldVal !== newVal) {
          this._updateAsync({ imgMode: newVal })
        }
      }
    }
  },
  data: {
    imgThumb: '',
    imgSrc: '',
    imgMode: '',
    lazyLoad: false,
    imgLoaded: false,
  },

  lifetimes: {
    attached() {
      this.setData({
        imgThumb: this.dataset.thumb || '',
        lazyLoad: !!this.dataset.lazy
      })
      if (this.dataset.retry === undefined) {
        this.dataset.retry = config.retry
      }
    }
  },
  methods: {
    /**
     * 图片加载成功
     * @param {*} e
     */
    onImageLoad(e) {
      const type = e.currentTarget.dataset.type
      if (type === 'data') {
        this._updateAsync({ imgLoaded: true })
      }

      this.triggerEvent('update', {
        type: 'data',
        src: this.data.imgSrc
      })

      const url = type === 'data' ? this.data.imgSrc : this.data.imgThumb
      config.onLoad && config.onLoad(e, url)
    },

    /**
     * 图片加载出错
     * @param {*} e
     */
    onImageError(e) {
      if (e.currentTarget.dataset.type === 'thumb') {
        config.onError && config.onError(e, this.data.imgThumb)
      } else {
        const url = this.data.imgSrc
        config.onError && config.onError(e, url)
        if (this.dataset.retry > 0) {
          this.setData({ imgSrc: url + ' ' })
          --this.dataset.retry
        } else {
          this.triggerEvent('fail', this.data.imgSrc)
        }
      }
    },

    /**
    * 异步更新数据
    * @param {object} data
    */
    _updateAsync(data) {
      if (wx.nextTick) {
        wx.nextTick(() => this.setData(data))
      } else {
        setTimeout(() => this.setData(data), 0)
      }
    }
  },
})
