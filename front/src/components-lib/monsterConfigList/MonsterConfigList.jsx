import React from 'react'
import MonsterConfigListData from 'components-lib/monsterConfigList/MonsterConfigListData'
import MonsterConfig from 'components-lib/monsterConfig/MonsterConfig'

import {Utils}  from 'ap-react-bootstrap'

import './MonsterConfigList.scss';

/* This class was auto-generated by the JavaScriptWriter */
class MonsterConfigList extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		MonsterConfigListData.register(this)
	}

	componentWillUnmount() {
		MonsterConfigListData.unregister()
	}

	_buildMonstersConfig(monsterConfig) {
		return (<MonsterConfig key={monsterConfig.id} monsterConfigId={monsterConfig.id} onClick={this.onClickDeleteMonsterConfig}/>)
	}

	render() {
		return (
			<div className="sm-sheet sm-builds-monsters">
				{Utils.map(this.state.monstersConfig, this._buildMonstersConfig.bind(this))}
				<div className="sm-builds-monster-add1">
					<i className="glyphicon glyphicon-plus-sign sm-builds-monster-add" onClick={this.onClickAddMonsterConfig.bind(this)}></i>
				</div>
			</div>
		);
	}

}
export default MonsterConfigList;
