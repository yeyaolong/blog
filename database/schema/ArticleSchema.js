let mongoose = required("../config");
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    articleId: { type: Number},
    articleTitle: { type: String },
    articleAuthor: { type: String},
    articleContent: { type: String },
    articleTime: { type: Date},
    articleClick: { type: Number }
});

export.modules = mongoose.model("Article", ArticleSchema);
