// pages/classic.js

import Classic from "../../model/classic";
import Like from "../../model/like";

const classicModel = new Classic()
const likeModel = new Like()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeStatus: false,
    count: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const classic = await classicModel.getLatest()
    this.setData({
      classic,
      likeStatus: classic.like_status,
      count: classic.fav_nums,
    })
  },
  async onLike(event) {
    const isLike = event.detail.isLike
    const {id: artId, type} = this.data.classic
    await likeModel.like(isLike, artId, type)
  },

  async onNext() {
    const {index} = this.data.classic
    const classic = await classicModel.getNext(index)

    this._bindClassicData(classic)
    this._bindLikeData(classic.id, classic.type)
  },
  async onPrevious() {
    const {index} = this.data.classic
    const classic = await classicModel.getPrevious(index)

    this._bindClassicData(classic)
    this._bindLikeData(classic.id, classic.type)
  },
  _bindClassicData(classic){
    this.setData({
      classic,
      latest: classicModel.isLatest(classic.index),
      first: classicModel.isFirst(classic.index),
    })
  },
  async _bindLikeData(artId, category){
    const favor = await likeModel.getClassicLikeStatus(artId, category)
    this.setData({
      likeStatus: favor.like_status,
      count: favor.fav_nums,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})