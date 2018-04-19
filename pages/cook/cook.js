// pages/cook.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodData:[],
    searchValue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfoodData();
  },
  /**
   * 生命周期函数--监听输入框的值
   */
  foodtap:function(event){
    this.setData({
     searchValue: event.detail.value
    })
    this.getfoodData();
  },
  getfoodData:function(){
    var that = this;
    wx.request({
      url: app.globalData.juhefoodBase,
      data: {
        menu: this.data.searchValue,
        key: app.globalData.juhefoodKey
      },
      success: function (res) {
       
        if (res.data.error_code == 0) {
         
          for (var i = 0; i < res.data.result.data.length;i++){
            res.data.result.data[i].tags=res.data.result.data[i].tags.substring(0, 50);
          }
          that.setData({
            foodData: res.data.result.data
          })
        } else {
          console.log("获取失败！");
        }
      },
      fail:function(res){
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
