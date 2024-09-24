const mongoose = require("mongoose")
const Types = mongoose.Schema.Types
const schema = new mongoose.Schema(
    {
        content: {
            type: Types.String,
            default: ""
        },
        updatedAt: {
            type: Types.Date
        },
        tags: {
            type: [Types.String],
            default: [],
        },
        title: {
            type: Types.String,
            required: [true, "Title is Required for saving a post"]
        },
        public: {
            type: Types.Boolean,
            default: false
        },
        slug: {
            type: Types.String,
            required: [true, "Slug is Required"],
            unique: [true, "Same Slug already exist"]
        }
    }
)
schema.pre("save", (next)=>{
    const doc = this
    if(this.isNew){
        doc.slug = String(doc.title).toLowerCase().trim().replace(/ /g,'-')
    }
    doc.updated = new Date()
    next()
})
const model = mongoose.model("logs", schema)

module.exports = model