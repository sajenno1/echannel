// pages/index/index.js
import { trim, checkPhone, toast } from '../../utils/util.js'
import WXBizDataCrypt from '../../utils/WXBizDataCrypt.js'
import api from '../../http/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: app.globalData.imgSrc,
    btnps:'bottom: 55%;' ,
    username: '',
    phoneNumber: '',
    count: '',
    category: '',
    hnpFlag: true,
    array: ['请选择行业类目', '服装', '鞋子', '箱包', '母婴', '食品', '3C', '美妆', '百货', '儿童', '其他'],
    index: 0,
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.imgSrc == "18_9"){
      this.setData({
        btnps: 'bottom: 52%'
      })
    }

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

  },
  /**
   * 选择类目
   */
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 提交表单
   */
  onsubmit(e) {
    
    let that = this
    that.setData({
      username: e.detail.value.username,
      count: e.detail.value.count,
      category: e.detail.value.category
    })

    if(that.data.hnpFlag) {
      that.setData({
        phoneNumber: e.detail.value.phoneNumber
      })
    }

    if(trim(that.data.username) == ""){
      toast('请填写公司名称/个人姓名')
      return
    }
    

    if (!checkPhone(that.data.phoneNumber)) {
      toast('请填写正确手机号码')  
      return
    }

    if (that.data.count == "") {
      toast('请填写多渠道平均日单量')
      return
    }

    if (that.data.category == "请选择行业类目" || trim(that.data.category) == "") {
      toast('请选择所经营的行业类目')
      return
    }

    //提交操作
    let url = "OfficialAccounts/admin/UpdateWeixinMPSumit"
    let params = {
      'CompanyName': that.data.username,
      'OpenId': wx.getStorageSync('openId'),
      'SaleNumInDay': that.data.count,
      'BusinessClass': that.data.category,
      'Mobile': that.data.phoneNumber
    }
    
    api.post(url,params).then(res => {
      
      //成功后清空页面input的值
      if(res.Flag){
        toast('提交成功','success')
        that.setData({
          username: '',
          phoneNumber: '',
          count: '',
          hnpFlag: true,
          index: 0
        })
      }
    }).catch(err =>{
      console.log(err)
    })
  },
  /**
   * 
   */
  getPhoneNumber(e) {
    let that = this
    console.log(e)
    var pc = new WXBizDataCrypt(app.globalData.appid, wx.getStorageSync('session_key'))
    var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
    if(checkPhone(data.phoneNumber)) {
      that.setData({
        hnpFlag: false,
        phoneNumber: data.phoneNumber
      })
      let url = "OfficialAccounts/admin/GetWeixinMPUserInfo"
      let params = { 
        'OpenId': wx.getStorageSync('openId'), 
        'Mobile': data.phoneNumber 
      }
      
      api.post(url, params).then(res => {
        console.log(res)
      }).catch(err => {console.log(err)})
      that.setData({
        current: 2
      })
    }
  }
})