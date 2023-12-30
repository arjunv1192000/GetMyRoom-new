import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const propertySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Userdata',
        require: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    locationName: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  // room: {
  //   type: Number,
  //   required: true,
  // },
  bathrooms: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  // buildYear: {
  //   type: Date,
  //   required: true,
  // },
  features: {
    interiorDetails: [
      {
        type: String,
      },
    ],
    otherFeatures: [
      {
        type: String,
      },
    ],
    outdoorDetails: [
      {
        type: String,
      },
    ],
    utilities: [
      {
        type: String,
      },
    ],
  },
  image: [{
    type: String,
 } ],
  // video: {
  //   type: String,
  //   required: true,
  // },

  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    require: true

  },
  approve: {
    type: Boolean
  },
  floorplans:{
    type: String,

  },
  sellertype:{
    type: String,


  }

});

const Property = model("Properties", propertySchema);
export default Property;
