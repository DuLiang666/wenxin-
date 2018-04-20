App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that=this;
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    wx.login({
      success:function(res){
          if(res.code){
            wx.getUserInfo({
              success:function(res){
                var objuser = {};
                objuser.avatarUrl = res.userInfo.avatarUrl;
                objuser.nickname = res.userInfo.nickName;
                wx.setStorageSync("userInfo", objuser);
                wx.setNavigationBarTitle({
                  title: res.userInfo.nickName
                })
              },
              fail:function(res){
                that.globalData.loginStatus=false;
                that.getpermisson();
              }
            });
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxa7262eb9ec1889fe&secret=5b1a1da49c7dc770ffd7605344d49ce6&js_code='+res.code+'&grant_type=authorization_code',
              data: res.code,
              success:function(res){
                var obj={};
                obj.openid = res.data.openid;
                obj.session_key = res.data.session_key;
                wx.setStorageSync("user", obj);
              }
            })
          }else{
            console.log('登录失败！' + res.errMsg);
          }
      }
    })    
  },

  globalData: {
    defaultCity: '',
    defaultCounty: '',
    selectlat:'',
    selectlng:'',
    weatherData: '',
    loginStatus:true,
    air: '',
    day: '',
    g_isPlayingMusic: false,
    g_currentMusicPostId: null,
    doubanBase: "https://api.douban.com",
    heWeatherBase: "https://free-api.heweather.com",
    juhetoutiaoBase:"https://v.juhe.cn/toutiao/index",
    juhefoodBase:"https://apis.juhe.cn/cook/query.php",
    tencentMapKey: "4HYBZ-EB23D-SLC42-HQ5R3-LP3LQ-OZFU5",
    heWeatherKey: "4a817b4338e04cc59bdb92da7771411e",
    juhetoutiaoKey:"a9f703a0200d68926f707f3f13629078",
    juhefoodKey:"adf0c6d2c7808ef52193a4b3c5b39e85",
    curBook: ""
  },
  getpermisson:function(){
    var that=this
    if (!this.globalData.loginStatus){
      wx.openSetting({
        success:function(res){
            console.log(res);
            if (res.authSetting.scope.userInfo == true){
               that.globalData.loginStatus = true;
               wx.getUserInfo({
                 success:function(res){
                   var objuser={};
                   objuser.avatarUrl = res.userInfo.avatarUrl;
                   objuser.nickname = res.userInfo.nickName;
                   wx.setStorageSync("userInfo", objuser);
                  wx.setNavigationBarTitle({
                    title: res.userInfo.nickName
                  })
                 }
               })
            }
        }
      })
    }
  }

})
