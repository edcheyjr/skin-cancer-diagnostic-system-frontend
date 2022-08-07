import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import gsap from 'gsap' // animation lib

const Container = styled.div`
  ${tw`
    w-full
    h-screen
    flex
    justify-center
    items-center
`}
`
const SquareContainer = styled.div`
  width: calc((var(--square-size) * 2) + var(--gap));
  height: calc((var(--square-size) * 2) + var(--gap));
  ${tw`
     relative
  `}
`
const Square = styled.div`
  position: absolute;
  height: var(--square-size);
  width: var(--square-size);
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
const Loading = () => {
  // delay and pause
  let delay = '-=.1'
  let pause = '+=.2'
  // gsap timeline
  let loading = gsap.timeline({
    defaults: { duration: 0.4, ease: 'back(2)' },
    repeat: -1,
    repeatDelay: 0.25,
    paused: true,
  })
  const container = useRef()
  const square1 = useRef()
  const square2 = useRef()
  const square3 = useRef()
  useEffect(() => {
    // const handleLoadingAnimation = () => {
    gsap.to(container.current, { autoAlpha: 1, ease: 'linear' })
    loading.play()
    loading.to(square2.current, { top: 'calc(100% - 60px)' })
    loading.to(square1.current, { left: 'calc(100% - 60px)', top: 0 }, delay)
    loading.to(square3.current, { top: 0 }, delay)
    loading.to(
      square2.current,
      { top: 'calc(100% - 60px)', left: 0, right: 'unset' },
      pause
    )
    loading.to(square1.current, { top: 'calc(100% - 60px)' }, delay)
    loading.to(square3.current, { left: 'calc(100% - 60px)' }, delay)
    loading.to(square2.current, { top: 0 }, pause)
    loading.to(square1.current, { left: 0 }, delay)
    loading.to(square3.current, { top: 'calc(100% - 60px)' }, delay)
    loading.to(square2.current, { left: 'calc(100% - 60px)' }, pause)
    loading.to(square1.current, { top: 0 }, delay)
    loading.to(square3.current, { left: 0 }, delay)
  }, [square1, square2, square3, container, delay, pause, loading])
  return (
    <Container ref={container}>
      <SquareContainer>
        <Square ref={square1} />
        <Square ref={square2} />
        <Square ref={square3} />
      </SquareContainer>
    </Container>
  )
}

export default Loading
