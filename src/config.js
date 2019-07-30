module.exports.default = module.exports = {

  /**
     * onError event
     * @type Function
     */
  onError: console.error,

  prepareUrl: undefined,

  /**
     * 重试
     */
  // eslint-disable-next-line no-unused-vars
  getRetryURL: (url, times) => url + ' ',

  /**
     * onLoad event
     * @type Function
     */
  onLoad: console.debug,

  /**
        * @type number
        */
  retry: 1,
};
