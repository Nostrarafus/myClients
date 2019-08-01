import React from "react";
import posed from "react-pose";
import { tween } from "popmotion";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const MyDiv = posed.div({
  idle: {
    scale: 1,
    opacity: 0.5,
    transition: props => tween({ ...props, duration: 2000 })
  },
  hovered: {
    scale: 2,
    opacity: 1,
    transition: props => tween({ ...props, duration: 1000 })
  }
});

class MyContainer extends React.Component {
  state = { hovering: false };

  render() {
    return (
      <Container>
        <MyDiv
          pose={this.state.hovering ? "hovered" : "idle"}
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}
        >{this.props.children}</MyDiv>
      </Container>
    );
  }
}

export default MyContainer;