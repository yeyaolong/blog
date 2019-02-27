let mongoose = require('../config');
let Schema = mongoose.Schema;

let AuthorSchema = new Schema({
   authorId: { type: String},
   authorName: { type: String},
   authorPassword: { type: String }
});

module.exports = mongoose.model("Author", AuthorSchema);