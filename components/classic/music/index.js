import { classicHeh } from '../classic-beh'

const audioManager = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicHeh],
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    src: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playSrc:'./images/player@playing.png',
    pauseSrc:'./images/player@waitting.png',
    playing: false,
  },
  lifetimes:{
    attached() {
      this._recoverStatus()
      this._watchStatus()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(){
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        audioManager.title = this.properties.title
        audioManager.src = this.properties.src
      }else{
        this.setData({
          playing: false
        })
        audioManager.pause()
      }
    },
    _recoverStatus(){
      if (audioManager.paused){
        this.setData({
          playing: false,
        })
        return
      }
      if(audioManager.src === this.properties.src){
       this.setData({
         playing: true,
       })
      }else{
        this.setData({
          playing: false,
        })
      }
    },
    _watchStatus(){
      audioManager.onPlay(()=>{
        this._recoverStatus()
      })
      audioManager.onPause(()=>{
        this._recoverStatus()
      })
      audioManager.onStop(()=>{
        this._recoverStatus()
      })
      audioManager.onEnded(()=>{
        this._recoverStatus()
      })
    },
  }
})
