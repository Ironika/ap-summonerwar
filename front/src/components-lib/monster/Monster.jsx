import React from 'react';
import MonsterStars from 'components-lib/monsterStars/MonsterStars'
import AppHelper from 'helpers/AppHelper'
import './Monster.scss'

class Monster extends React.Component {

	constructor(props) {
		super(props);
		this.state = {active: false}
	}

	componentWillMount() {
        AppHelper.register('/monster/' + this.props.monster.id, this, this.onMonsterChange.bind(this));
        AppHelper.register("/monster/isLock", this, this.onMonsterLockChange.bind(this));
    }

    componentWillUnmount() {
        AppHelper.unregister(this)
    }

    onMonsterLockChange() {
        this.setState({})
    }

	onMonsterChange() {
        this.setState({	active: AppHelper.getData('/monster/' + this.props.monster.id) })
    }

	onClick() {
		if(this.props.onClick) {
			this.props.onClick(this.props.monster)
		}
	}

	buildImg(monster){
		let storage = "(In Storage)"
		let element = "(" + monster.elemType + ")"

		let name = monster.name

		if(name.search("Unknow") != -1) {
			return (<img className="sm-monster-image" src={"assets/images/monsters/default-monster.jpg"}/>)
		}

		if(name.search(storage) != -1) {
			name = name.slice(0 , name.search(storage) - 2)
		}

		if(name.search(element) != -1) {
			name = name.slice(0 , name.search(element) - 2)
			name = name + "_" + monster.elemType
		}

		while(name.search(" ") != -1)
			name = name.replace(" ", "-")


		return (<img className="sm-monster-image" src={"assets/images/monsters/" + name + ".jpg"}/>)
	}

	render() {
		return (
			<div className={this.state.active ? "sm-monster sm-monster-active" : "sm-monster"} onClick={this.onClick.bind(this)}>
				{this.buildImg(this.props.monster)}
                <div className='sm-monster-stars'>
                    <MonsterStars stars={this.props.monster.star}/>
                </div>
				<div className="sm-monster-lvl">
					{(this.props.monster.lvl > 9) ? this.props.monster.lvl : "0" + this.props.monster.lvl}
				</div>
				<div className={"sm-monster-lock " + (this.props.monster.isLock ? "" : "sm-hide")}>
					<img src="assets/images/lock.png"/>
				</div>
			</div>
		);
	}

}
export default Monster;
