import express from 'express';
import {
  createRecord,
  getAllRecords,
  getRecord,
  updateRecord,
  deleteRecord,
} from '../controllers/sheetsController.js';
import {
  validateCreateRecord,
  validateUpdateRecord,
  validateDeleteRecord,
  validateGetRecord,
} from '../middleware/validation.js';

const router = express.Router();

// CREATE - Add a new record
router.post('/', validateCreateRecord, createRecord);

// READ - Get all records
router.get('/', getAllRecords);

// READ - Get a specific record by ID
router.get('/:id', validateGetRecord, getRecord);

// UPDATE - Update a specific record
router.put('/:id', validateUpdateRecord, updateRecord);

// DELETE - Delete a specific record
router.delete('/:id', validateDeleteRecord, deleteRecord);

export default router;