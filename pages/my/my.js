// pages/my/my.js
import Book from "../../model/book";
import Classic from "../../model/classic";

const bookModel = new Book()
const classicModel = new Classic()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookCount: 0,
    authorized: false,
    userInfo: {},
    classics: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.authorizeUser()
    this.getMyBookCount()
    this.getMyFavor()
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if(userInfo){
      this.setData({
        authorized: true,
        userInfo,
      })
    }
  },
  async getMyBookCount(){
    const res = await bookModel.getMyBookCount()
    this.setData({
      bookCount: res.count,
    })
  },
  async getMyFavor(){
    const classics = await classicModel.getMyFavor()
    this.setData({
      classics,
    })
  },
  authorizeUser() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                authorized: true,
                userInfo: res.userInfo,
              })
            }
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})