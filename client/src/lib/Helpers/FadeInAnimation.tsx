import React, { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";

interface FadeInAnimationInterface {
  children?: any;
  wrapperElement: any;
  direction: any;
  delay: number;
  className?: string;
}

const defaultProps: FadeInAnimationInterface = {
  wrapperElement: "div",
  delay: 0,
  direction: null,
};

const FadeInAnimation = ({
  children,
  wrapperElement = "div",
  direction = null,
  delay = 0,
  ...props
}: FadeInAnimationInterface) => {
  const Component = wrapperElement;
  let compRef = useRef(null);
  const distance = 100;
  // @ts-ignore: Unreachable code error
  let fadeDirection;
  switch (direction) {
    case "left":
      fadeDirection = { x: -distance };
      break;
    case "right":
      fadeDirection = { x: distance };
      break;
    case "up":
      fadeDirection = { y: distance };
      break;
    case "down":
      fadeDirection = { y: -distance };
      break;
    default:
      fadeDirection = { x: 0 };
  }
  useEffect(() => {
    gsap.from(compRef.current, 1, {
      // @ts-ignore: Unreachable code error
      ...fadeDirection,
      opacity: 0,
      delay,
    });
  }, [compRef, fadeDirection, delay]);
  return (
    <Component ref={compRef} {...props}>
      {children}
    </Component>
  );
};

FadeInAnimation.defaultProps = defaultProps;

export default FadeInAnimation;
