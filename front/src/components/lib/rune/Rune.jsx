import React from 'react';
import {RaterStar} from 'ap-react-bootstrap';
import './Rune.scss';

/* This class was auto-generated by the JavaScriptWriter */
class Rune extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.setState({rune: this.props.rune})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({rune: nextProps.rune})
	}

	buildStat(statType, stat) {
		if (statType) {
			if(statType == "AtkFlat" || statType == "DefFlat" || statType == "HpFlat") 
				return (<li key={statType}>{statType} <span>{stat}</span></li>)
			else 
				return (<li key={statType}>{statType} <span>{stat}%</span></li>)
		}
	}

	render() {
		return (
			<div className="sm-rune">
				<RaterStar className="sm-rune-star" value={this.state.rune.star} starMax={6}/>
				<img className="sm-rune-set" src={"assets/images/runes/Rune-" + this.state.rune.set + ".png"}/>
				<span className="sm-rune-pos">{this.state.rune.pos}</span>
				<span className="sm-rune-lvl">+{this.state.rune.lvl}</span>
				<div className="sm-rune-stats">
					<ul className="sm-rune-stat">
						{this.buildStat(this.state.rune.statMainType, this.state.rune.statMain)}
						{this.buildStat(this.state.rune.stat1Type, this.state.rune.stat1)}
						{this.buildStat(this.state.rune.stat2Type, this.state.rune.stat2)}
					</ul>
					<ul className="sm-rune-stat sm-rune-stat2">
						{this.buildStat(this.state.rune.statSubType, this.state.rune.statSub)}
						{this.buildStat(this.state.rune.stat3Type, this.state.rune.stat3)}
						{this.buildStat(this.state.rune.stat4Type, this.state.rune.stat4)}
					</ul>
				</div>
			</div>
		);
	}

}
export default Rune;
