import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

import { GeneratorType } from "utils/getValueGenerator"
import Transmitter from "Components/Transmitter/Transmitter"
import Receiver from "Components/Receiver/Receiver"
import "./pair.scss"

interface PairProps {
  kioskMode: boolean,
  openSesame?: boolean,
}


export type TransmitterMessageType = {
  index: number,
  value: string,
}

interface PairState {
  autoPlay: boolean,
  generator: GeneratorType,
  inRange: boolean,
  reset: boolean, //use this field to induce resets in child components
  seed: number,
  transmitterMessage: TransmitterMessageType,
}

class Pair extends React.Component<PairProps,PairState> {
  observer?: IntersectionObserver
  ref: React.RefObject<HTMLDivElement>

  constructor(props:PairProps) {
    super(props)

    this.state = {
      autoPlay: false,
      generator: props.openSesame ? "openSesame" : "counter",
      inRange: true,
      reset: false,
      seed: new Date().getTime(),
      transmitterMessage: {
        index: -1,
        value: "",
      },
    }

    this.ref = React.createRef()
  }

  componentDidMount() {
    //if we should intersection observe this element to autoplay
    if(
      this.props.kioskMode //if this is in kiosk mode
      && this.ref.current //if our ref is ready
    ) {
      const options: IntersectionObserverInit = {
        root: document.querySelector("#app"),
        threshold: 0.5,
      }

      //create the observer
      this.observer = new IntersectionObserver(this.observerCallback, options)
      this.observer.observe(this.ref.current)
    }
  }

  componentWillUnmount() {
    //if we have an observer running
    if(this.observer) {
      this.observer.disconnect()
    }
  }

  observerCallback = (entries:IntersectionObserverEntry[], observer:IntersectionObserver) => {
    //if this is in kiosk mode
    if(this.props.kioskMode) {
      this.setState({autoPlay: entries[0].isIntersecting}) //set auto play to whether this element is visible
    }
  }

  changeGenerator = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if(value==="rng" || value==="counter") {
      this.setState({
        generator: value,
        transmitterMessage: {
          index: -1,
          value: "",
        },
      })
    }
  }

  clickTransmitterCallback = (value:string) => this.setState({
    transmitterMessage: {
      index: this.state.transmitterMessage.index + 1,
      value,
    },
  })

  reset = () => {
    this.setState({
      inRange: true,
      reset: !this.state.reset,
      transmitterMessage: {
        index: -1,
        value: "",
      },
    })
  }

  getSettings = () => {
    if(this.props.kioskMode === false) {
      const {
        generator,
        inRange,
      } = this.state

      return (
        <div className="controlBar">
          <div>
            <div>
              <b>Number Generator:</b>
              &nbsp; <select value={generator} onChange={this.changeGenerator}>
                <option value="counter">Simple Counter</option>
                <option value="rng">Psuedorandom</option>
              </select>
            </div>

            <div>
              <b>In Range: </b> <input type="checkbox" checked={inRange} onChange={e => this.setState({inRange: !inRange})}/>
            </div>
          </div>

          <div>
            <button onClick={e => this.reset()}><FontAwesomeIcon icon={faRedo}/></button>
          </div>
        </div>
      )
    }
  }


  render() {
    const {
      kioskMode,
      openSesame,
    } = this.props

    const {
      autoPlay,
      generator,
      inRange,
      reset,
      seed,
      transmitterMessage,
    } = this.state

    return (
      <div className={"pair" + (kioskMode?" kiosk":"")} ref={this.ref}>
        {this.getSettings()}

        <div className={"devices " + (inRange?"inRange":"outOfRange")}>
          <div>
            <Transmitter
              autoPlay={autoPlay}
              clickTransmitterCallback={this.clickTransmitterCallback}
              generator={generator}
              inRange={inRange}
              kioskMode={kioskMode}
              openSesame={openSesame}
              reset={reset}
              seed={seed}
            />
          </div>

          <div>
            <Receiver
              generator={generator}
              listSize={openSesame ? 1 : 5}
              openSesame={openSesame}
              reset={reset}
              seed={seed}
              transmitterMessage={transmitterMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Pair;
