import React from 'react';
import {RaterStar} from 'ap-react-bootstrap';
import './MonsterInfos.scss';

/* This class was auto-generated by the JavaScriptWriter */
class MonsterInfos extends React.Component {

	constructor(props) {
		super(props);
	}

	_parseName(monster) {
		if(monster.name) {
			let element = "(" + monster.elemType + ")"
			let name = monster.name
			if(name.search(element) != -1) 
				name = name.slice(0 , name.search(element) - 2)
			return (name)
		}
	}

	render() {
		return (
			<div className="sm-monster-infos">
				<div className="sm-content sm-monster-content">
					<div className="sm-monster-info">
						<div className="row">
							<div className="col-xs-12 col-sm-8">
								<img className="sm-monster-element" src={"assets/images/elements/" + this.props.monster.elemType + ".png"}/>
								<span className="sm-monster-name">{this._parseName(this.props.monster)}</span>
							</div>
							<div className="col-xs-12 col-sm-4">
								<RaterStar className="sm-monster-star" value={this.props.monster.star} starMax={6}/>
							</div>
						</div>
					</div>
					<div className="sm-monster-info">
						<div className="row">
							<div className="col-xs-2">
								<div className="sm-monster-xp">XP</div>
							</div>
							<div className="col-xs-10">
								<div className="progress sm-monster-progressbar">
								  	<div className={"progress-bar sm-monster-" + this.props.monster.elemType} style={{width: '100%'}} role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
									    100%
								  	</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="sm-monster-stats">
					<div className="col-xs-5">
						<ul className="sm-monster-keys">
							<li>Level</li>
							<li>HP</li>
							<li>ATK</li>
							<li>DEF</li>
							<li>SPD</li>
							<li className="sm-monster-separator"></li>
							<li>CRIT Rate</li>
							<li>CRIT Dmg</li>
							<li>RES</li>
							<li>ACC</li>
						</ul>
					</div>
					<div className="col-xs-7">
						<ul className="sm-monster-values">
							<li>{this.props.monster.lvl}</li>
							<li>{this.props.monster.hp}</li>
							<li>{this.props.monster.atk}</li>
							<li>{this.props.monster.def}</li>
							<li>{this.props.monster.spd}</li>
							<li className="sm-monster-separator"></li>
							<li>{this.props.monster.crate}%</li>
							<li>{this.props.monster.cdmg}%</li>
							<li>{this.props.monster.res}</li>
							<li>{this.props.monster.acc}</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}

}
export default MonsterInfos;
