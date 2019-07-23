// pages/postDetails/postDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImgSrc: '',
    title: '',
    addr: '',
    startTime: '',
    endTime: '',
    host: '',
    details: '',

    isEditing: false,
  },

  handleSubmitPost: function() {
    let self = this;
    let data = this.data;
    let date = this.getCurrTime();
    let session = wx.getStorageSync('session');
    wx.request({
      url: 'https://cxa.wizzstudio.com/activity/new?activityId&activityTime=' + data.addr + '&activityTitle=' + data.title + '&activityContent=' + data.details + '&publishTime=' + date + '&beginningTime=' + data.startTime + '&endingTime=' + data.endTime + '&sponsor=' + data.host+'&session_key=' + session,
      method: 'POST',
      header: {
        "cookie": session
      },
      success: res => {
        console.log(res);
        if(res.data.errCode===0){
          let id = res.data.data;
          wx.uploadFile({
            url: 'https://cxa.wizzstudio.com/picture/upload?file&id=' + id+'&session_key='+session,
            filePath: self.data.headImgSrc,
            name: 'file',
            header: {
              cookie: session
            },
            success: res => {
              console.log(res)
              if(res.data.errCode===0){
                wx.navigateTo({
                  url: '../posts/posts',
                })
              }else{
                wx.showModal({
                  title: '提示',
                  content: '活动图片上传失败！',
                })
              }
            }
          }); 
        }else{
          wx.showModal({
            title: '提示',
            content: '活动上传失败！',
          })
        }
      }
    })
  },

  getCurrTime: function() {
    var now = new Date();

    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日

    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分
    var ss = now.getSeconds(); //秒

    var currTime = year + "-";

    if (month < 10)
      currTime += "0";

    currTime += month + "-";

    if (day < 10)
      currTime += "0";

    currTime += day + " ";

    if (hh < 10)
      currTime += "0";

    currTime += hh + ":";
    if (mm < 10) currTime += '0';
    currTime += mm + ":";

    if (ss < 10) currTime += '0';
    currTime += ss;
    return (currTime);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    if (options.isEditing) {
      console.log(options.info);
      let info = JSON.parse(options.info);
      this.setData({
        title: info.pname,
        addr: info.paddr,
        startTime: info.startTime,
        endTime: info.endTime,
        host: info.phost,
        details: info.pdesc,
        headImgSrc: info.imgPath,
        isEditing: true
      });
    } else {
      let id = options.id;
      if(id){
        wx.request({
          url: 'https://cxa.wizzstudio.com/activity/detail/'+id,
          method: 'GET',
          success: res => {
            console.log(res);
            if(res.data){
              let data = res.data;
              let id = res.data.activityId;
              self.setData({
                title: data.activityTitle,
                addr: data.activityTime,
                host: data.sponsor,
                startTime: data.beginningTime,
                endTime: data.endingTime,
                details: data.activityContent
              });
              //获取活动图片
              wx.request({
                url: 'https://cxa.wizzstudio.com/picture/show/'+id,
                method: 'GET',
                success: res => {
                  console.log(res);
                  if(res.data.data){
                    self.setData({
                      headImgSrc: res.data.data[0]
                    })
                  } 
                }
              });
            }
          }
        });
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let session = wx.getStorageSync('session');
    let self = this;
    if(session){
      wx.request({
        url: 'https://cxa.wizzstudio.com/login/check/'+session,
        method: 'GET',
        success: res => {
          console.log(res);
          if (res.data.msg !== "Unexpired") {
            wx.switchTab({
              url: '../login/login',
            });
          }
        }
      })
    }else{
      wx.switchTab({
        url: '../home/home',
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})