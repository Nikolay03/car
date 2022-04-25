import SvgIcon from './SvgIcon'

const Right = ({ color, ...props }) => {
  return (
    <SvgIcon fill={color} viewBox={'0 0 8 12'} xmlns={'http://www.w3.org/2000/svg'} {...props}>
      <path d={'M1.414 11.707L7.121 5.99997L1.414 0.292969L0 1.70697L4.293 5.99997L0 10.293L1.414 11.707Z'} />
    </SvgIcon>
  )
}
export default Right
