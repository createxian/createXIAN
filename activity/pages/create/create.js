Page({
  data:{
    imageList: ['']
  },
    onTap: function (event) {
        // wx.navigateTo({
        //     url:"../posts/post"
        // });
        //通过bindTap组件触发onTab函数，再调用wx.switchTab跳转到post页面
        wx.switchTab({
            url: "../posts/post"
        });
      
    },

    onReachBottom:function(event){
      console.log('asfasdfa')
    },

    bindStartTimeChange: function (e) {
      this.setData({
        startDate: e.detail.value
      });
    },

    bindEndTimeChange: function (e) {
      this.setData({
        endDate: e.detail.value
      });
    },

    chooseImage: function () {
    //上传图片相关
      var that = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          that.setData({
            imageList: res.tempFilePaths
          })
        }
      });
    },

  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },

  onChangeAddress: function () {
    var _page = this;
    wx.chooseLocation({
      success: function (res) {
        _page.setData({
          chooseAddress: res.name
        });
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },

  postActivity: function () {
    wx.navigateTo({
      url: "../posts/post"
    })
  }


})

/*"app.json": {
    "app.json是入口文件，换言之，我们从app.json这个文件开始看起":"",
    "pages":"[] 包含了本demo所有的页面路径，其中最上面的路径就是我们打开项目看到的欢迎页",
    "window中的navigationBarBackgroundColor":"是导航栏背景颜色，这个型号代表深蓝色，这里并不在首页显示，下面的tarBar是设置底部tab栏的属性",
    "小程序首先找到app.json，":"然后去找首页welcome, welcome页面的主体由以下4个文件组成",
    "wxml可以类比为html, ":"js主要用来捕捉事件做页面跳转，wxss类似css ，json主要用来做一些配置"
  */