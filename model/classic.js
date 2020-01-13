import Http from "../util/http";

class Classic extends Http{
  static KEY = 'latest'
  static PREFIX = 'classic'
  async getLatest(){
    const data = await this.request({
      url: 'classic/latest',
    })
    this._setLatestIndex(data.index)
    const key = this._getKey(data.index)
    wx.setStorageSync(key,data)

    return data
  }


  getPrevious(index){
    return this._getClassic(index, 'previous')
  }
  getNext(index){
    return this._getClassic(index, 'next')
  }
  isFirst(index){
    return index === 1
  }
  isLatest(index){
    return this._getLatestIndex() === index
  }
  getMyFavor(){
    return this.request({
      url: 'classic/favor',
    })
  }
  _setLatestIndex(index){
    wx.setStorageSync(Classic.KEY,index)
  }
  _getLatestIndex(){
    return wx.getStorageSync(Classic.KEY)
  }
  _getKey(index, nextOrPrevious){
    if(!nextOrPrevious) return `${Classic.PREFIX}-${index}`
    return `${Classic.PREFIX}-${nextOrPrevious === 'next' ? (index + 1) : (index - 1)}`
  }
  async _getClassic(index, nextOrPrevious){
    const key = this._getKey(index, nextOrPrevious)
    let data = wx.getStorageSync(key)
    if(!data){
      data = await this.request({
        url: `classic/${index}/${nextOrPrevious}`,
      })
      wx.setStorageSync(key, data)
    }

    return data
  }
}

export default Classic