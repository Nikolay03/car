import React from 'react'

import SvgIcon from '../SvgIcon'

const Telegram = ({ ...props }) => {
  return (
    <SvgIcon viewBox={'0 0 21 18'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} {...props}>
      <path
        // eslint-disable-next-line max-len
        d={'M18.6646 0.71682L0.934606 7.55382C-0.275394 8.03982 -0.268393 8.71482 0.712607 9.01582L5.26461 10.4358L15.7966 3.79082C16.2946 3.48782 16.7496 3.65082 16.3756 3.98282L7.84261 11.6838H7.84061L7.84261 11.6848L7.52861 16.3768C7.98861 16.3768 8.19161 16.1658 8.44961 15.9168L10.6606 13.7668L15.2596 17.1638C16.1076 17.6308 16.7166 17.3908 16.9276 16.3788L19.9466 2.15082C20.2556 0.91182 19.4736 0.35082 18.6646 0.71682Z'}
      />
    </SvgIcon>
  )
}
export default Telegram