import { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'
import gsap from 'gsap' // animation lib

const Container = styled.div`
  ${tw`
    h-auto
    w-auto
    flex
    justify-center
    items-center
    cursor-pointer
`}
`
const SquareContainer = styled.div`
  width: calc((20px * 2) + 4px);
  height: calc((20px * 2) + 4px);
  ${tw`
    relative
  `}
`
const Square = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  will-change: top, left;
  background-color: #49b267;
  &:first-child(1) {
    top: 0;
    left: 0;
  }
  &:nth-child(2) {
    background-color: #102c6f;
    right: 0;
    top: 0;
  }
  &:nth-child(3) {
    background-color: #f6854e;
    bottom: 0;
    left: 0;
  }
  ${tw`
`}
`
const Logo = ({ onClick }) => {
  //pause useState
  const [isPause, setPause] = useState(true)
  const playAnim = () => setPause(false)
  const pauseAnim = () => setPause(true)

  // delay and pause
  let delay = '-=.1'
  let pause = '+=.2'
  // gsap timeline
  let loading = gsap.timeline({
    defaults: { duration: 0.4, ease: 'back' },
    repeat: isPause && 0,
    repeatDelay: 0.5,
    paused: true,
  })
  const container = useRef()
  const square1 = useRef()
  const square2 = useRef()
  const square3 = useRef()
  console.log('isPaused', isPause)
  useEffect(() => {
    if (!isPause) {
      gsap.to(container.current, { autoAlpha: 1, ease: 'linear' })
      loading.play()
      loading.to(square2.current, { top: 'calc(100% - 20px)' })
      loading.to(square1.current, { left: 'calc(100% - 20px)', top: 0 }, delay)
      loading.to(square3.current, { top: 0 }, delay)
      loading.to(
        square2.current,
        { top: 'calc(100% - 20px)', left: 0, right: 'unset' },
        pause
      )
      loading.to(square1.current, { top: 'calc(100% - 20px)' }, delay)
      loading.to(square3.current, { left: 'calc(100% - 20px)' }, delay)
      loading.to(square2.current, { top: 0 }, pause)
      loading.to(square1.current, { left: 0 }, delay)
      loading.to(square3.current, { top: 'calc(100% - 20px)' }, delay)
      loading.to(square2.current, { left: 'calc(100% - 20px)' }, pause)
      loading.to(square1.current, { top: 0 }, delay)
      loading.to(square3.current, { left: 0 }, delay)
    } else {
      gsap.to(container.current, { autoAlpha: 1, ease: 'linear' })
      loading.kill()
    }
  }, [square1, square2, square3, container, delay, pause, loading, isPause])
  return (
    <Container
      ref={container}
      onMouseOver={playAnim}
      onMouseLeave={pauseAnim}
      onClick={onClick}
    >
      <SquareContainer>
        <Square ref={square1} />
        <Square ref={square2} />
        <Square ref={square3} />
      </SquareContainer>
    </Container>
  )
}

Logo.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Logo
