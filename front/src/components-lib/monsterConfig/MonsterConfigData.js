import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import MonsterHelper from 'helpers/MonsterHelper'
import MonsterConfigHelper from 'helpers/MonsterConfigHelper'

import StatType from 'utils/constants/StatType'
import SetType from 'utils/constants/SetType'
import {Utils, BaseData}  from 'ap-react-bootstrap'

/* This class was auto-generated by the JavaScriptWriter */
class MonsterConfigData extends BaseData {

	register(obj) {
		super.register(obj)

		let monstersConfig = AppHelper.getData('/currentMonstersConfig')

		let monsterConfig = monstersConfig[this.obj.props.monsterConfigId]

		let monsters = {}
		for(let key in MonsterHelper.getData())
			monsters[key] = MonsterHelper.getData()[key].name.split(" ")[0]

		let monster = ""
		let monsterImage = "default-monster"
		if(monsterConfig.monsterId) {
			monster = monsters[monsterConfig.monsterId]
			monsterImage = monsters[monsterConfig.monsterId]
		}

		let statTypeValues = []
        for(let i = 0; i < StatType.VALUES.length; i++)
            statTypeValues.push(StatType.VALUES[i].key)

        let setTypeValues = []
        for(let i = 0; i < SetType.VALUES.length; i++)
            setTypeValues.push(SetType.VALUES[i].key)
        
       	let requiredStats = []
        for(let key in StatType.VALUES)
        	if(monsterConfig['required'+ StatType.VALUES[key].key])
	        	requiredStats[StatType.VALUES[key].key] = monsterConfig['required'+ StatType.VALUES[key].key]

	    let notationStats = []
        for(let key in StatType.VALUES)
        	if(monsterConfig['notation'+ StatType.VALUES[key].key])
	        	notationStats[StatType.VALUES[key].key] = monsterConfig['notation'+ StatType.VALUES[key].key]

        let sets = []
        for(let i = 1; i < 4; i++)
        	if(monsterConfig['set'+i]) 
        		sets.push(monsterConfig['set'+i])

        this.obj.onClickShow = this.onClickShow.bind(this)
        this.obj.onClickSubmit = this.onClickSubmit.bind(this)
        this.obj.onChangeInput = this.onChangeInput.bind(this)
        this.obj.onChangeSelect = this.onChangeSelect.bind(this)
        this.obj.onClickDeleteStat = this.onClickDeleteStat.bind(this)
        this.obj.onChangeMonsterName = this.onChangeMonsterName.bind(this)

		this.obj.state = {
            statTypeValues: statTypeValues,
            setTypeValues: setTypeValues,

            requiredStatsIsOpen: false,
            notationStatsIsOpen: false,
            setsIsOpen: false,

            monsterConfig: monsterConfig,

            monsters: monsters,
            monsterName: monster,
            monsterImage: monsterImage,

            requiredStatsSelect: "",
            requiredStatsInput: "",
            requiredStats: requiredStats,

            notationStatsSelect: "",
            notationStatsInput: "",
            notationStats: notationStats,

            setsSelect: "",
            sets: sets
        }
	}

	onChangeMonsterName(event) {
		for(let key in this.getState('monsters')) {
			if(this.getState('monsters')[key].toUpperCase() == event.target.value.toUpperCase()) {
				let monsterConfig = this.getState('monsterConfig')
				monsterConfig.monsterId = key
				AppHelper.put("currentMonstersConfig/" + monsterConfig.id, monsterConfig)
				this.setState({
					monsterName: event.target.value, 
					monsterImage: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1),
					monsterConfig: monsterConfig
				})
				break
			} else 
				this.setState({monsterName: event.target.value, monsterImage: "default-monster"})
			
		}
	}

	onClickDeleteStat(id, stat) {
		delete(this.getState(id)[stat])
		this.obj.state[id] = this.getState(id)
		this.setState()
	}

	onChangeInput(id, event) {
		this.obj.state[id + "Input"] = event.target.value
		this.setState()
	}

	onChangeSelect(id, event) {
		this.obj.state[id + "Select"] = event.target.value
		this.setState()
	}

	onClickShow(id) {
		this.obj.state[id + "IsOpen"] = !this.getState(id + 'IsOpen')
		this.setState()
	}

	_fillMonsterConfig(id) {
		let monsterConfig = Utils.clone(this.getState('monsterConfig'))

		if(id == 'requiredStats') {
        	for(let key in StatType.VALUES)
        		if(this.getState('requiredStats')[StatType.VALUES[key].key])
        			monsterConfig['required'+ StatType.VALUES[key].key] = this.getState('requiredStats')[StatType.VALUES[key].key]
		} else if(id == 'notationStats') {
			for(let key in StatType.VALUES) 
				if(this.getState('notationStats')[StatType.VALUES[key].key])
        			monsterConfig['notation'+ StatType.VALUES[key].key] = this.getState('notationStats')[StatType.VALUES[key].key]
		} else {
			let count = 1
			for(let key in this.getState('sets')) {
				monsterConfig['set' + count] = this.getState('sets')[key]
				count++
			}
		}

		this.obj.state[id] = this.getState(id);
		AppHelper.put('/currentMonstersConfig/' + monsterConfig.id, monsterConfig)
		this.setState({monsterConfig: monsterConfig})
	}

	onClickSubmit(id) {
		if(id == 'sets')
			this.getState(id)[this.getState(id + 'Select')] = this.getState(id + 'Select')
		else
			this.getState(id)[this.getState(id + 'Select')] = this.getState(id + 'Input')

		this._fillMonsterConfig(id)
	}

	unregister() {
	}

}

export default MonsterConfigData;