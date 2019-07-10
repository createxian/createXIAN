var app = getApp();
var name = '', uid;

Page({
  data:{
    location: '',
    startDate: '开始时间',
    endDate: '结束时间',
    host: '',
    description: '',
    imageList: [''],
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


  onShow: function () {
    // 页面显示
    var that = this;
    wx.request({
      url: 'localhost:8080/activity/new?activityId&activityTime=adf&activityTitle=adf&activityContent=adsf&publishTime=2019-09-03 00:00:00&beginningTime=2019-09-03 00:00:00&endingTime=2019-09-03 00:00:00&sponsor=asdf',
      method: 'POST',
      data: {
        'session_id': app.globalData.session_id,
      },
      success: function (res) {
        console.log(res);
        uid = res.data.uid;
        if (res.data.status == "error") {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            confirmText: "去设置",
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '../setting/mySetting?id=' + uid
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          that.setData({
            phone: res.data.phone
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
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
  },
  formSubmit: function (e) {
    var that = this;
    console.log(e);
    actName = e.detail.value.name;
    that.num(e.detail.value.name, this.data.location, this.data.startDate, this.data.endDate, this.data.host, this.data.description);
  },
  name: function (a, b, c, d, e, f) {
    var that = this;
    if (a != '') {
      that.date(a, b, c, d, e, f);
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写活动名称',
        showCancel: false,
      })
    }
  },
  location: function (a, b, c, d, e, f) {
    var that = this;
    if (b != '') {
      that.lat(a, b, c, d, e, f);
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写地点',
        showCancel: false,
      })
    }
  },
  startdate: function (a, b, c, d, e, f) {
    var that = this;
    if (c != '') {
      that.startDate(a, b, c, d, e, f);
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写开始时间',
        showCancel: false,
      })
    }
  },
  enddate: function (a, b, c, d, e, f) {
    var that = this;
    if (d != '') {
      that.endDate(a, b, c, d, e, f);
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写结束时间',
        showCancel: false,
      })
    }
  },
  host: function (a, b, c, d, e, f) {
    var that = this;
    if (e != '') {
      that.host(a, b, c, d, e, f);
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写主办方名称',
        showCancel: false,
      })
    }
  },
  description: function (a, b, c, d, e, f) {
    var that = this;
    if (f != '') {
      that.description(a, b, c, d, e, f);
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写活动描述',
        showCancel: false,
      })
    }
  },

  upload: function () {
    if (this.data.imageList[0] == '') {
      wx.request({
        url: 'localhost:8080/picture/upload?file&id=1',
        method: 'POST',
        data: {
          'activityId': app.globalData.activityId,
          'location': this.data.location,
          'startDate': this.data.startDate,
          'endDate': this.data.endDate
        },
        success: function (res) {
          console.log(res);
          if (res.data.status == "error") {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
              success: function (res) {
              }
            })
          } else {
            wx.navigateTo({
              url: '' + res.data.active_id,
            })
          }
        },
        fail: function (res) {
          console.log(res);
        }
      })
    } else {
      wx.uploadFile({
        url: '',
        filePath: this.data.imageList[0],
        name: 'file',
        formData: {
          'session_id': app.globalData.session_id,
          'location': this.data.location,
          'startDate': this.data.startDate,
          'endDate': this.data.endDate
        },
        success: function (res) {
          console.log(res);
          var data = JSON.parse(res.data);
          if (data.status == "error") {
            wx.showModal({
              title: '提示',
              content: data.msg,
              showCancel: false,
              success: function (res) {
              }
            })
          } else {
            wx.navigateTo({
              url: '' + data.active_id,
            })
          }

        },
        fail: function (res) {
          console.log(res);
        }
      })
    }

  }


})

/*"app.json": {
    "app.json是入口文件，换言之，我们从app.json这个文件开始看起":"",
    "pages":"[] 包含了本demo所有的页面路径，其中最上面的路径就是我们打开项目看到的欢迎页",
    "window中的navigationBarBackgroundColor":"是导航栏背景颜色，这个型号代表深蓝色，这里并不在首页显示，下面的tarBar是设置底部tab栏的属性",
    "小程序首先找到app.json，":"然后去找首页welcome, welcome页面的主体由以下4个文件组成",
    "wxml可以类比为html, ":"js主要用来捕捉事件做页面跳转，wxss类似css ，json主要用来做一些配置"
  */