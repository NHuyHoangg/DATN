import { Helmet } from 'react-helmet-async';

import { AdView } from 'src/sections/ad/view';

// ----------------------------------------------------------------------

export default function AdPage() {
  return (
    <>
      <Helmet>
        <title>Quản lý gói đẩy tin</title>
      </Helmet>

      <AdView />
    </>
  );
}
