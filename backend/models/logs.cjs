const mongoose = require("mongoose")
const Types = mongoose.Schema.Types
const schema = new mongoose.Schema(
    {
        content: {
            type: Types.String,
            default: ""
        },
        updatedAt: {
            type: Types.Date,
            required: true
        },
        tags: {
            type: [Types.String],
            default: [],
        },
        title: {
            type: Types.String,
            required: [true, "Title is Required for saving a post"],
            unique: [true, "Same Title already exist"]
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
const model = mongoose.model("logs", schema)

module.exports = model