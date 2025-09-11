import { Helmet } from 'react-helmet-async';

import { SheetsView } from 'src/sections/sheets/view';

// ----------------------------------------------------------------------

export default function SheetsPage() {
  return (
    <>
      <Helmet>
        <title> Sheets | Google Sheets CRUD </title>
      </Helmet>

      <SheetsView />
    </>
  );
}