import styled from 'styled-components'

const CategoryBlock = styled.div`
  border-bottom: ${({ theme, isLast }) => isLast ? null : `1px solid ${theme.background.primary100}`};
  padding-bottom: 40px;
  margin-bottom: 18px;
`

export default CategoryBlock
