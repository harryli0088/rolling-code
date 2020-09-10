import React from 'react';

import Counter from "Classes/Counter"

interface Props {
  generator: "counter" | "rng",
  listSize: number,
  senderValue: number,
}

interface State {
  list: number[],
  locked: boolean,
}

export default class Listener extends React.Component<Props,State> {
  valueGenerator: () => number

  constructor(props:Props) {
    super(props)

    this.valueGenerator = new Counter().increment

    this.state = {
      list: this.generateList([]),
      locked: true,
    }
  }

  componentDidUpdate(prevProps:Props) {
    //if the sender value changed
    if(prevProps.senderValue !== this.props.senderValue) {
      this.verifyValue(this.props.senderValue)
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
    return (
      <div>
        {this.state.locked ? "Locked" : "Unlocked"}
      </div>
    )
  }
}
