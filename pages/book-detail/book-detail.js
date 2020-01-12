// pages/book-detail/book-detail.js
import Book from "../../model/book";
import Like from "../../model/like";

const bookModel = new Book()
const likeModel = new Like()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    likeStatus: false,
    comments: [],
    likeCount: 0,
    postingVisible: false,
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
  onLike(event) {
    const isLike = event.detail.isLike
    likeModel.like(isLike, this.data.book.id, 400)
  },
  onFakePost(event) {
    this.setData({
      postingVisible: true,
    })
  },
  onCancel() {
    this.setData({
      postingVisible: false,
    })
  },
  async onPost(event) {
    const content = event.detail.text || event.detail.value
    if (content.length > 12) {
      wx.showToast({
        title: '短频最多12个字',
        icon: 'none',
      })
    }
    await bookModel.postComment(this.data.book.id, content)
    wx.showToast({
      title: '+1',
      icon: 'none',
    })
    this.data.comments.unshift({
      content,
      nums: 1,
    })
    this.setData({
      comments: this.data.comments,
      postingVisible: false,
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