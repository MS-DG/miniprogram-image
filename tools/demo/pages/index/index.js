Page({
    data: {
        src: "http://218.16.125.44/img/20180402/131671235513555480.jpg",
        // thumb:""
        thumb: "http://218.16.125.44/img/20180402/131671235513555480_224.jpg"
    },
    onPullDownRefresh() {
        const i = Math.ceil(Math.random() * 1000);
        this.setData({
            src: "https://picsum.photos/5000/5000/?image=" + i,
            thumb: "https://picsum.photos/50/50/?image=" + i
        })
    },
    onUpdate() {
        wx.stopPullDownRefresh();
    }
})
