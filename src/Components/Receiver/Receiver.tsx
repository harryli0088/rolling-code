import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

import getValueGenerator, { ValueGeneratorType } from "utils/getValueGenerator"
import "./receiver.scss"

interface Props {
  generator: "counter" | "rng",
  listSize: number,
  seed: number,
  reset: boolean,
  transmitterValue: number,
}

interface State {
  list: number[],
  locked: boolean,
}

export default class Receiver extends React.Component<Props,State> {
  valueGenerator: ValueGeneratorType

  constructor(props:Props) {
    super(props)

    this.valueGenerator = getValueGenerator(props.generator, props.seed)

    this.state = {
      list: this.generateList([]),
      locked: true,
    }
  }

  componentDidUpdate(prevProps:Props) {
    if(
      prevProps.generator !== this.props.generator
      || prevProps.reset !== this.props.reset
    ) {
      this.valueGenerator = getValueGenerator(this.props.generator, this.props.seed)

      this.setState({
        list: this.generateList([]),
        locked: true,
      })
    }
    else if(prevProps.transmitterValue !== this.props.transmitterValue) { //if the transmitter value changed
      setTimeout(
        () => this.verifyValue(this.props.transmitterValue),
        1000
      )
    }
  }

  generateList = (list:number[]):number[] => {
    //while the list is too short
    while(list.length < this.props.listSize) {
      list.push(this.valueGenerator()) //push a newly generated value
    }

    return list
  }

  verifyValue = (value:number) => {
    const {
      list,
      locked,
    } = this.state

    const index = list.indexOf(value) //check whether the value is in the list

    if(list[index]) { //if the value is in the list
      this.setState({
        list: this.generateList( // generate new values for the list
          list.slice(index + 1) //slice off the beginning of the list, including the value
        ),
      })

      this.setState({locked: !locked})
    }
  }

  render() {
    const {
      transmitterValue,
    } = this.props

    const {
      locked,
    } = this.state

    const status = locked ? "Locked" : "Unlocked"

    return (
      <div className="receiver">
        <div className={"status " + status}>{status} <FontAwesomeIcon icon={locked ? faLock : faLockOpen}/></div>
        <br/>

        <b>Generated List of Valid Numbers</b>
        <div>
          {this.state.list.map((value, valueIndex) =>
            <div key={valueIndex} className={"value" + (value===transmitterValue?" valid":"")}>{value}</div>
          )}
        </div>
      </div>
    )
  }
}
