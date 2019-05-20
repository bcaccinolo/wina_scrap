import React from 'react';

export default class Base extends React.Component {

  classNameFor = (odd) => {
    return ((odd >= 1.10) && (odd < 1.20)) ? 'highlight' : ''
  }

  DeltaclassName = () => {
    const delta = this.deltaOdds();
    return (delta >= 2) ? 'highlight' : ''
  }

  deltaOdds = () => {
    const data = this.props.data;
    return Math.abs(data.odd1 - data.odd2).toFixed(2);
  }

  buildSearchQuery = () => {
    const data = this.props.data;
    const q = `${data.player1.toLowerCase()} ${data.player2.toLowerCase()} ${data.sport} sofascore`
    const qq = encodeURI(q);
    console.log(qq)
    return qq
  }

  buildGoogleLink = () => {
    const address = "https://www.google.com/search?q="
    return `${address}${this.buildSearchQuery()}`
  }

  render = () => {

    this.buildSearchQuery();

    const data = this.props.data;

    return (
      <tr>
        <td>{data.dateStr}</td>
        <td>
          <a href={data.link} target="_blank">WinaLink</a>
          <br/>
          <a href={this.buildGoogleLink()} target="_blank">Google</a>
        </td>
        <td>{data.location}</td>
        <td className={ this.classNameFor(data.odd1) } >{data.odd1}</td>
        <td className={ this.classNameFor(data.odd2) } >{data.odd2}</td>
        <td className={ this.DeltaclassName() } >{this.deltaOdds()}</td>
        <td>{data.player1}</td>
        <td>{data.player2}</td>
        <td>{data.sport}</td>
      </tr>
    );
  }
}


