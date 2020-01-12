// pages/book-detail/book-detail.js
import Book from "../../model/book";

const bookModel = new Book()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    likeStatus: false,
    comments: [],
    likeCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const {id} = options
    const book = await bookModel.getDetail(id)
    const res = await bookModel.getLikeStatus(id)
    const {comments} = await bookModel.getComments(id)
    this.setData({
      book,
      likeStatus: res.like_status,
      likeCount: res.fav_nums,
      comments,
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