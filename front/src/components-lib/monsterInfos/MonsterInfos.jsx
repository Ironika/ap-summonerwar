import React from 'react';
import MonsterStars from 'components-lib/monsterStars/MonsterStars'
import MonsterHelper from 'helpers/MonsterHelper'
import AppHelper from 'helpers/AppHelper'
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

	onClickLock() {
		if (this.props.monster.isLock) {
			this.props.monster.isLock = false;
		}
		else {
			this.props.monster.isLock = true;
		}
		MonsterHelper.putMonster(this.props.monster).
		then(function(){
			AppHelper.put("/monster/isLock", this.props.monster.isLock)
			this.forceUpdate()
		}.bind(this))
	}

	render() {
		return (
			<div className="sm-monster-infos">
				<div className="sm-monster-content">
					<div className='sm-monster-stars'>
                    	<MonsterStars stars={this.props.monster.star}/>
               		</div>
					<div className="sm-monster-info">
						<img className="sm-monster-element" src={"assets/images/elements/" + this.props.monster.elemType + ".png"}/>
						<span className="sm-monster-name">{this._parseName(this.props.monster)}</span>
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
					<div className="row">
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
								<li>{this.props.monster.hp + " + " + this.props.bonus.hp + " = " + (this.props.monster.hp + this.props.bonus.hp)}</li>
								<li>{this.props.monster.atk + " + " + this.props.bonus.atk + " = " + (this.props.monster.atk + this.props.bonus.atk)}</li>
								<li>{this.props.monster.def + " + " + this.props.bonus.def + " = " + (this.props.monster.def + this.props.bonus.def)}</li>
								<li>{this.props.monster.spd + " + " + this.props.bonus.spd + " = " + (this.props.monster.spd + this.props.bonus.spd)}</li>
								<li className="sm-monster-separator"></li>
								<li>{this.props.monster.crate + " + " + this.props.bonus.crate + " = " + (this.props.monster.crate + this.props.bonus.crate)}</li>
								<li>{this.props.monster.cdmg + " + " + this.props.bonus.cdmg + " = " + (this.props.monster.cdmg + this.props.bonus.cdmg)}</li>
								<li>{this.props.monster.res + " + " + this.props.bonus.res + " = " + (this.props.monster.res + this.props.bonus.res)}</li>
								<li>{this.props.monster.acc + " + " + this.props.bonus.acc + " = " + (this.props.monster.acc + this.props.bonus.acc)}</li>
							</ul>
						</div>
					</div>
					<div className="sm-monster-infos-button">
						<button className="sm-button" onClick={this.onClickLock.bind(this)}>{this.props.monster.isLock ? "Unlock" : "Lock"}</button>
						<i className="glyphicon glyphicon-question-sign"></i>
						<div className="sm-monster-lock-infos">
							Lock runes monster for your Builds<br/>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
export default MonsterInfos;
