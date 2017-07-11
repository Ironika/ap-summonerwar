import React from 'react';
// import {RaterStar} from 'ap-react-bootstrap';
import MonsterStars from 'components-lib/monsterStars/MonsterStars'

import './Rune.scss';

/* This class was auto-generated by the JavaScriptWriter */
class Rune extends React.Component {

	constructor(props) {
		super(props);
	}

	buildMainStat(statType, stat) {
		if (statType) {
			if(statType == "AtkFlat" || statType == "DefFlat" || statType == "HpFlat") 
				return (<li key={statType} className="sm-rune-main-stat">{statType} <span>{stat}</span></li>)
			else 
				return (<li key={statType} className="sm-rune-main-stat">{statType} <span>{stat} %</span></li>)
		}
	}

	buildSubStat(statType, stat) {
		if (statType) {
			if(statType == "AtkFlat" || statType == "DefFlat" || statType == "HpFlat") 
				return (<li key={statType} className="sm-rune-sub-stat">{statType} <span>{stat}</span></li>)
			else 
				return (<li key={statType} className="sm-rune-sub-stat">{statType} <span>{stat} %</span></li>)
		}
	}

	buildStat(statType, stat) {
		if (statType) {
			if(statType == "AtkFlat" || statType == "DefFlat" || statType == "HpFlat") 
				return (<li key={statType}>{statType} <span>{stat}</span></li>)
			else 
				return (<li key={statType}>{statType} <span>{stat} %</span></li>)
		}
	}

	render() {
		return (
			<div className="sm-rune">
				<div className='sm-monster-stars'>
                    <MonsterStars stars={this.props.rune.star}/>
                </div>
				<div className="sm-rune-stats">
					<ul className="sm-rune-stat">
						{this.buildMainStat(this.props.rune.statMainType, this.props.rune.statMain)}
						{this.buildSubStat(this.props.rune.statSubType, this.props.rune.statSub)}
						{this.buildStat(this.props.rune.stat1Type, this.props.rune.stat1)}
						{this.buildStat(this.props.rune.stat2Type, this.props.rune.stat2)}
						{this.buildStat(this.props.rune.stat3Type, this.props.rune.stat3)}
						{this.buildStat(this.props.rune.stat4Type, this.props.rune.stat4)}
					</ul>
				</div>
				<span className="sm-rune-pos">{this.props.rune.pos}</span>
				<img className="sm-rune-set" src={"assets/images/runes/Rune-" + this.props.rune.set + ".png"}/>
				<span className="sm-rune-lvl">+{this.props.rune.lvl}</span>
			</div>
		);
	}

}
export default Rune;
