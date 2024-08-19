const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        filename: {
            type: String,
            default: "default_filename"
        },
        url: {
            type: String,
            default: "default_url"
        }
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

// Middleware to ensure image fields have defaults if empty or missing
listingSchema.pre('save', function (next) {
    if (!this.image.url) {
        this.image.url = "default_url";
    }
    if (!this.image.filename) {
        this.image.filename = "default_filename";
    }
    next();
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
