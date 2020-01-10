Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc:'./images/triangle@left.png',
    leftDisSrc:'./images/triangle.dis@left.png',
    rightSrc:'./images/triangle@right.png',
    rightDisSrc:'./images/triangle.dis@right.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(event){
      if(this.properties.latest) return
      this.triggerEvent('left', {
      })
    },
    onRight(event){
      if(this.properties.first) return
      this.triggerEvent('right', {
      })
    },
  }
})
