import mongoose from 'mongoose';

const formSubmissionSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    requirements: {
      type: String,
      required: [true, 'Requirements text is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);
export default FormSubmission;