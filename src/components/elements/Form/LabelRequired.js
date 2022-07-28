import styled from 'styled-components'

const LabelRequired = styled('div')`
  color: ${({ error }) => error ? '#FF2E63' : null} !important;
  :after{
    display: ${({ required }) => required ? 'inline-block' : 'none'};
    content: '\u00A0*';
    color: ${({ theme }) => theme.palette.red};
  }
`

export default LabelRequired
