import { PropsWithChildren } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

interface FadeTransitionProps {
  state: string;
  speed: number;
}

export function FadeTransition(props: PropsWithChildren<FadeTransitionProps>) {
  return (
    <>
      <style>{getStyleContent(props.speed)}</style>

      <SwitchTransition>
        <CSSTransition
          key={props.state}
          classNames={`fade-${props.speed} fade`}
          appear
          mountOnEnter
          unmountOnExit
          timeout={props.speed}
        >
          {props.children}
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

function getStyleContent(speed: number) {
  return `.fade-${speed} { --fade-speed: ${speed / 1000}s; }`;
}
