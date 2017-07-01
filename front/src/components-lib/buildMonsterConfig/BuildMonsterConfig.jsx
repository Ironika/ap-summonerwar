import React from 'react';
import BuildMonsterConfigData from 'components-lib/buildMonsterConfig/BuildMonsterConfigData';

import {Utils, FormSelect}  from 'ap-react-bootstrap'

import './BuildMonsterConfig.scss';

/* This class was auto-generated by the JavaScriptWriter */
class BuildMonsterConfig extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		BuildMonsterConfigData.register(this)
	}

	componentWillUnmount() {
		BuildMonsterConfigData.unregister()
	}

	render() {
		return (
			<div className="sm-buildBuildMonsterConfig sm-content">
				<div className="sm-builds-monster-name">
					<img alt="Summoners War" src="assets/images/monsters/Homunculus-Awakened_Fire.jpg"/>
					<input className="sm-input" type="text" value="Monster Name"/>
				</div>
				<hr/>
				<div className="sm-builds-monster-stats">
					<label className="sm-label" onClick={this.onClickShow.bind(this, 'requiredStat')}>Required Stats</label>
					<div className={"sm-builds-monster-stats-box " + (this.state.requiredStatIsOpen ? "" : "sm-hide")}>
						<FormSelect values={this.state.statTypeValues} className={'sm-input sm-builds-select'} onChange={this.onChange.bind(this)}/>
						<input type="text" className="sm-input" />
						<button className="sm-button">Ok</button>
						<div className="sm-stats-content">
							Hp > 15 000
						</div>
					</div>
				</div>
				<hr/>
				<div className="sm-builds-monster-stats">
					<label className="sm-label" onClick={this.onClickShow.bind(this, 'notationStat')}>Notations Stats</label>
					<div className={"sm-builds-monster-stats-box " + (this.state.notationStatIsOpen ? "" : "sm-hide")}>
						<FormSelect values={this.state.statTypeValues} className={'sm-input sm-builds-select'} onChange={this.onChange.bind(this)}/>
						<input type="text" className="sm-input" />
						<button className="sm-button">Ok</button>
						<div className="sm-stats-content">
							Hp > 15 000
						</div>
					</div>
				</div>
				<hr/>
				<div className="sm-builds-monster-stats">
					<label className="sm-label">Sets</label>
				</div>
				<hr/>
			</div>
		);
	}

}
export default BuildMonsterConfig;
