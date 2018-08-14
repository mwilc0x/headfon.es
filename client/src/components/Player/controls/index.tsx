import * as React from 'react';
import { PauseButton, PlayButton } from 'react-player-controls';
import './style.css';

interface Props {
  controls: any,
  paused: boolean
}

class Controls extends React.Component<Props, {}> {
  public render() {
    const { controls, paused } = this.props;
    return paused 
      ? <PlayButton isEnabled={true} onClick={controls.resume} /> 
      : <PauseButton onClick={controls.pause} />;
  }
}

export default Controls;
