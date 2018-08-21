import * as React from 'react';
import Controls from './controls';
import { getCookie } from '../../helpers/cookies';
import { 
  Consumer, 
  selectCurrentPlayingTrack, 
  selectSessionEnded,
  selectTrackDetails, 
  setTrackDetails 
} from '../../store';
import './style.css';

declare global {
  interface Window { Spotify: any, onSpotifyWebPlaybackSDKReady: any; }
}

const PlayerControls = (props) => {
  const { controls, handleTrackClick, trackDetails } = props;
  const { context, paused, track_window } = trackDetails;
  const { current_track, next_tracks, previous_tracks } = track_window;
  const { album, artists, name } = current_track;
  const { images: [albumImage] } = album;
  const { url } = albumImage;

  const { uri, metadata: { context_description} } = context;

  const playerContext = {
    context_description,
    next_tracks,
    previous_tracks,
    uri
  };

  return (
    <footer className="now-playing-container">
      <div className="now-playing-bar">
        <div className="now-playing-bar-section left">
          <div className="now-playing" onClick={handleTrackClick}>
            { !!url && <img src={url} /> }

            <div className="track-info">
              <span className="track-info__name">{name}</span>
              <span className="track-info__artist">{artists[0].name}</span>
            </div>

          </div>
        </div>

        <div className="now-playing-bar-section middle">
          <Controls
            context={playerContext}
            controls={controls}
            paused={paused}
          />
        </div>

        <div className="now-playing-bar-section right" />
      </div>
    </footer>
  )
}

interface Props {
  currentPlayingTrack: any;
  sessionEnded: any;
  trackDetails: any;
}

class PlayerContainer extends React.Component<Props, {}> {
  public static defaultProps = { trackDetails: {} };

  public player: any;
  public trackPinger: any;

  public componentDidUpdate(prevProps: any, prevState: any) {
    if (
      !prevProps.currentPlayingTrack
      || (prevProps.currentPlayingTrack.uri !== this.props.currentPlayingTrack.uri)
    ) {
      this.play(this.props.currentPlayingTrack);
    }

    if (this.props.sessionEnded) {
      this.disconnect();
    }
  }

  public componentDidMount() {
    const script = document.createElement("script");

    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (!getCookie('jwt')) {
        return;
      }

      this.init();
    }
    document.body.appendChild(script);
  }
  public render() {
    const { trackDetails } = this.props;

    const controls = {
      nextTrack: this.nextTrack,
      pause: this.pause,
      previousTrack: this.previousTrack,
      resume: this.resume
    };

    return (
      <div className="player">
        <PlayerControls 
          controls={controls}
          handleTrackClick={this.handleTrackClick}
          trackDetails={trackDetails} 
        />
      </div>
    );
  }
  private init() {
    this.player = new window.Spotify.Player({
      getOAuthToken: async (cb: (token: string) => {}) => {
        const user = await fetch('/token').then(res => res.json());
        cb(user.accessToken);
      },
      name: 'spotify-app-player',
      volume: 0.5
    });

    // Error handling
    this.player.addListener('initialization_error', ({ message }: any) => { console.error(message); });
    this.player.addListener('authentication_error', ({ message }: any) => { console.error(message); });
    this.player.addListener('account_error', ({ message }: any) => { console.error(message); });
    this.player.addListener('playback_error', ({ message }: any) => { console.error(message); });

    // Playback status updates
    this.player.addListener('player_state_changed', this.handlePlayerStateChange.bind(this));

    // Ready
    this.player.addListener('ready', ({ device_id }: any) => {
      console.log('device id', device_id);
      device_id = device_id;
    });

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }: any) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    this.player.connect();
  }
  private play(item) {
    let payload;
    const { uri = '' } = item;

    if (uri.indexOf('album') > -1) {
      payload = { context_uri: uri };
    } else {
      // TODO: other URI use cases?
      payload = { uris: [uri] };      
    }

    const { _options: { getOAuthToken, id } } = this.player;
    getOAuthToken((token: string) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        body: JSON.stringify(payload),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      });
    })  
  }
  private disconnect = () => {
    this.player.disconnect().then(() => {
      console.log('Player disconnected');
    });
  }
  private pause = () => {
    this.player.pause().then(() => {
      console.log('Paused!');
    });
  }
  private resume = () => {
    this.player.resume().then(() => {
      console.log('Resumed!');
    });
  }
  private previousTrack = () => {
    this.player.previousTrack().then(() => {
      console.log('Previous Track!');
    });
  }
  private nextTrack = () => {
    this.player.nextTrack().then(() => {
      console.log('Next Track!');
    });
  }
  private handlePlayerStateChange(state: any) {
    setTrackDetails(state);
  }
  private handleTrackClick = () => {
    return;
  }
}

const ContextContainer = () => {
  return (
    <Consumer select={[selectCurrentPlayingTrack, selectTrackDetails, selectSessionEnded]}>
      {(currentPlayingTrack: any, trackDetails: any, sessionEnded: any) => (
        <PlayerContainer 
          currentPlayingTrack={currentPlayingTrack}
          sessionEnded={sessionEnded}
          trackDetails={trackDetails} 
        />
      )}
    </Consumer>
  );
}

export default ContextContainer;