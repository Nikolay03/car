import React from 'react'
import styled from 'styled-components'
import { range } from 'ramda'

const SkeletCardBlock = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  flex-wrap: wrap;
  margin-bottom: 30px;
`
const SkeletCard = styled.div`
  background: #fff;
  height: 396px;
`
const SkeletImage = styled.div`
    display: flex;
    margin: 20px auto auto auto;
    background: #efefef linear-gradient(-45deg, #fff, #efefef);
    width: 150px;
    height: 150px;
    border-radius: 5px;
    background-size: 400% 400%;
    animation: gradientBG 1s ease infinite;
    @keyframes gradientBG {
        0% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }
`
const SkeletPriceBlock = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
`
const SkeletPrice = styled.div`
    height: 20px;
    width: 100px;
    border-radius: 5px;
    background: #efefef linear-gradient(-45deg, #fff, #efefef);
    background-size: 400% 400%;
    animation: gradientBG 1s ease infinite;
    @keyframes gradientBG {
        0% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }
`
const SkeletSalePrice = styled.div`
    height: 20px;
    width: 100px;
    border-radius: 5px;
    background: #efefef linear-gradient(-45deg, #fff, #efefef);
    background-size: 400% 400%;
    animation: gradientBG 1s ease infinite;
    @keyframes gradientBG {
        0% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }
`
const SkeletContent = styled.div`
    height: 80px;
    width: 80%;
    margin: 20px auto auto auto;
    border-radius: 5px;
    background: #efefef linear-gradient(-45deg, #fff, #efefef);
    background-size: 400% 400%;
    animation: gradientBG 1s ease infinite;
    @keyframes gradientBG {
        0% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }
`

const SkeletButton = styled.div`
    margin-top: 20px;
    height: 40px;
    width: 40%;
    margin-left: 28px;
    border-radius: 5px;
    background: #efefef linear-gradient(-45deg, #fff, #efefef);
    background-size: 400% 400%;
    animation: gradientBG 1s ease infinite;
    @keyframes gradientBG {
        0% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }
`
const Skelet = (props) => {
  const { count } = props
  const number = range(1, count)
  return (
    <SkeletCardBlock>
      {number.map((num, key) => (
        <SkeletCard key={key}>
          <SkeletImage />
          <SkeletPriceBlock>
            <SkeletPrice />
            <SkeletSalePrice />
          </SkeletPriceBlock>
          <SkeletContent />
          <SkeletButton />
        </SkeletCard>
      ))}
    </SkeletCardBlock>
  )
}

export default Skelet
