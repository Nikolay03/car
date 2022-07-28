import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputError = styled.div`
  background-color: rgb(255, 226, 233);
  border-radius: 8px;
  color: rgb(255, 46, 99);
  font-size: 13px;
  margin-top: 8px;
  padding: 8px 20px;
`

InputError.propTypes = {
  children: PropTypes.string
}

export default InputError
