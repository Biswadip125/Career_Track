import { JobApplication } from "../models/jobApplication.model.js";
import User from "../models/user.model.js";
export const createApplication = async (req, res) => {
  try {
    const {
      company,
      position,
      location,
      jobType,
      jobUrl,
      status,
      applicationDate,
      notes,
    } = req.body;

    if (!company?.trim() || !position?.trim() || !location?.trim()) {
      return res.status(400).json({
        success: false,
        message: "company, position, location and applicationDate are required",
      });
    }

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const newJobApplication = await JobApplication.create({
      userId: req.userId,
      company,
      position,
      location,
      jobType,
      jobUrl,
      status,
      applicationDate,
      notes,
    });

    return res.status(201).json({
      success: true,
      message: "Job Application created successfully",
      job: newJobApplication,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Job Application data",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await JobApplication.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Application ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = [
      "company",
      "position",
      "location",
      "jobType",
      "jobUrl",
      "status",
      "applicationDate",
      "notes",
    ];

    const updatedFields = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updatedFields[field] = req.body[field];
      }
    }
    console.log(updatedFields);
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const updatedJobApplication = await JobApplication.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { $set: updatedFields },
      { returnDocument: "after", runValidators: true },
    );
    console.log(updatedJobApplication);
    if (!updatedJobApplication) {
      return res.status(404).json({
        success: false,
        message: "Job Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job Application Updated Successfully",
      updatedJobApplication,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Application ID or field value",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJob = await JobApplication.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
