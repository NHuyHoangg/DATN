import { sheetsService } from '../services/googleSheets.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const createRecord = asyncHandler(async (req, res) => {
  const record = await sheetsService.createRecord(req.body);
  res.status(201).json({
    success: true,
    message: 'Record created successfully',
    data: record,
  });
});

export const getAllRecords = asyncHandler(async (req, res) => {
  const records = await sheetsService.getAllRecords();
  res.status(200).json({
    success: true,
    message: 'Records retrieved successfully',
    data: records,
    count: records.length,
  });
});

export const getRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const record = await sheetsService.getRecord(parseInt(id));
  res.status(200).json({
    success: true,
    message: 'Record retrieved successfully',
    data: record,
  });
});

export const updateRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const record = await sheetsService.updateRecord(parseInt(id), req.body);
  res.status(200).json({
    success: true,
    message: 'Record updated successfully',
    data: record,
  });
});

export const deleteRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await sheetsService.deleteRecord(parseInt(id));
  res.status(200).json({
    success: true,
    message: 'Record deleted successfully',
    data: result,
  });
});