import FormSubmission from '../models/FormSubmission.js';

// @desc    Submit form data
// @route   POST /api/submissions
// @access  Public
export const submitForm = async (req, res) => {
  try {
    const { fullName, mobileNumber, email, address, requirements } = req.body;

    if (!fullName || !mobileNumber || !email || !address || !requirements) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const newSubmission = await FormSubmission.create({
      fullName,
      mobileNumber,
      email,
      address,
      requirements,
    });

    res.status(201).json({
      success: true,
      message: 'Form data logged and saved successfully!',
      data: newSubmission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error: unable to process your request at this time.',
      error: error.message,
    });
  }
};