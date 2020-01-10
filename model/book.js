import Http from "../util/http";

class Book extends Http{
  getHotList(){
    return this.request({
      url: 'book/hot_list',
    })
  }
}

export default Book