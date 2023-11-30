import DistributionReport from "../Models/Distribution.js";

// Get all distribution reports
export const getAllDistributionReports = async (req, res) => {
  try {
    const distributionReports = await DistributionReport.find();
    res.status(200).json(distributionReports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a distribution report by ID
export const getDistributionReportById = async (req, res) => {
  try {
    const distributionReport = await DistributionReport.findById(req.params.id);
    if (distributionReport == null) {
      return res
        .status(404)
        .json({ message: "Cannot find distribution report" });
    }
    res.status(200).json(distributionReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new distribution report
export const createDistributionReport = async (req, res) => {
  const distributionReport = new DistributionReport({
    transaction: req.body.transaction,
    shopAgent: req.body.shopAgent,
    customer: req.body.customer,
    confirmed: req.body.confirmed,
    dateTime: req.body.dateTime,
    notes: req.body.notes,
    status: req.body.status,
  });

  try {
    const newDistributionReport = await distributionReport.save();
    res.status(201).json(newDistributionReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a distribution report by ID
export const updateDistributionReport = async (req, res) => {
  try {
    const updatedDistributionReport =
      await DistributionReport.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
          new: true,
        }
      );
    if (updatedDistributionReport == null) {
      return res
        .status(404)
        .json({ message: "Cannot find distribution report" });
    }
    res.status(200).json(updatedDistributionReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a distribution report by ID
export const deleteDistributionReport = async (req, res) => {
  try {
    const deletedDistributionReport =
      await DistributionReport.findByIdAndRemove(req.params.id);
    if (deletedDistributionReport == null) {
      return res
        .status(404)
        .json({ message: "Cannot find distribution report" });
    }
    res.status(200).json({ message: "Deleted Distribution Report" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
