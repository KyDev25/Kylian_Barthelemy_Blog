// eslint-disable-next-line max-classes-per-file
import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"
import CommentModel from "@/db/models/CommentModel"

class PostModel extends BaseModel {
  static tableName = "posts"
  static get relationMappings() {
    return {
      user: {
        modelClass: UserModel,
        relation: BaseModel.HasOneRelation,
        join: {
          from: "users.id",
          to: "posts.userId",
        },
      },
      comments: {
        modelClass: CommentModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "posts.id",
          to: "comments.postId",
        },
      },
    }
  }
}

export default PostModel
