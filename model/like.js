import Http from "../util/http";

class Like extends Http {
  like(isLike, artId, category) {
    const url = isLike ? 'like' : 'like/cancel'
    return this.request({
      url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category,
      },
    })
  }
  getClassicLikeStatus(artId, category){
    return this.request({
      url: `classic/${category}/${artId}/favor`,
    })
  }
}

export default Like