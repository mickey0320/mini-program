import Http from "../util/http";

class Book extends Http{
  getHotList(){
    return this.request({
      url: 'book/hot_list',
    })
  }
  getMyBookCount(){
    return this.request({
      url: 'book/favor/count'
    })
  }
  getDetail(id){
    return this.request({
      url: `book/${id}/detail`
    })
  }
  getLikeStatus(id){
    return this.request({
      url: `book/${id}/favor`
    })
  }
  getComments(id){
    return this.request({
      url: `book/${id}/short_comment`
    })
  }
  postComment(bookId, content){
    return this.request({
      url: `book/add/short_comment`,
      method: 'POST',
      data:{
        book_id: bookId,
        content,
      },
    })
  }
}

export default Book