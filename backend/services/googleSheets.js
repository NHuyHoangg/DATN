import { google } from 'googleapis';

export class GoogleSheetsService {
  constructor() {
    this.auth = null;
    this.sheets = null;
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
    this.sheetName = 'Sheet1'; // Default sheet name
  }

  async initialize() {
    try {
      // Create authentication using service account
      this.auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      // Create sheets instance
      this.sheets = google.sheets({ version: 'v4', auth: this.auth });

      // Ensure header row exists
      await this.ensureHeaderRow();
      
      console.log('✅ Google Sheets service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Google Sheets service:', error);
      throw error;
    }
  }

  async ensureHeaderRow() {
    try {
      // Check if header row exists
      const range = `${this.sheetName}!A1:E1`;
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const values = response.data.values;
      if (!values || values.length === 0 || values[0].length === 0) {
        // Create header row
        const headers = ['Name', 'Email', 'Age', 'Address', 'Phone'];
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `${this.sheetName}!A1:E1`,
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: [headers],
          },
        });
        console.log('✅ Header row created');
      }
    } catch (error) {
      console.error('❌ Error ensuring header row:', error);
      throw error;
    }
  }

  async createRecord(data) {
    try {
      const { name, email, age = '', address = '', phone = '' } = data;
      const values = [name, email, age, address, phone];

      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A:E`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [values],
        },
      });

      // Get the row number of the created record
      const updatedRange = response.data.updates.updatedRange;
      const rowNumber = parseInt(updatedRange.match(/:A(\d+)$/)[1]);

      return {
        id: rowNumber,
        name,
        email,
        age,
        address,
        phone,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Error creating record:', error);
      throw error;
    }
  }

  async getAllRecords() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A2:E`, // Skip header row
      });

      const rows = response.data.values || [];
      return rows.map((row, index) => ({
        id: index + 2, // Row 2 is the first data row (1-indexed + skip header)
        name: row[0] || '',
        email: row[1] || '',
        age: row[2] || '',
        address: row[3] || '',
        phone: row[4] || '',
      }));
    } catch (error) {
      console.error('❌ Error getting all records:', error);
      throw error;
    }
  }

  async getRecord(rowId) {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A${rowId}:E${rowId}`,
      });

      const row = response.data.values?.[0];
      if (!row) {
        throw new Error('Record not found');
      }

      return {
        id: rowId,
        name: row[0] || '',
        email: row[1] || '',
        age: row[2] || '',
        address: row[3] || '',
        phone: row[4] || '',
      };
    } catch (error) {
      console.error('❌ Error getting record:', error);
      throw error;
    }
  }

  async updateRecord(rowId, data) {
    try {
      // First check if record exists
      await this.getRecord(rowId);

      const { name, email, age, address, phone } = data;
      const values = [name, email, age || '', address || '', phone || ''];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A${rowId}:E${rowId}`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [values],
        },
      });

      return {
        id: rowId,
        name,
        email,
        age,
        address,
        phone,
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Error updating record:', error);
      throw error;
    }
  }

  async deleteRecord(rowId) {
    try {
      // First check if record exists
      const record = await this.getRecord(rowId);

      // Clear the row
      await this.sheets.spreadsheets.values.clear({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A${rowId}:E${rowId}`,
      });

      return {
        id: rowId,
        deleted: true,
        deletedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Error deleting record:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const sheetsService = new GoogleSheetsService();