import React from 'react';
import MonstersData from 'components/monsters/MonstersData';
import MonstersList from 'components-lib/monstersList/MonstersList';
import MonsterProfil from 'components-lib/monsterProfil/MonsterProfil';
import './Monsters.scss';

/* This class was auto-generated by the JavaScriptWriter */
class Monsters extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        MonstersData.register(this)
    }

    componentWillUnmount() {
        MonstersData.unregister()
    }

    render() { return (
        <div className='sm-monsters'>
            <div className="row sm-max-height-mobile">
                <div className="col-xs-12 col-sm-6 sm-max-height">
                    <MonstersList/>
                </div>
                <div className="col-xs-12 col-sm-6 sm-max-height">
                    <MonsterProfil/>                
                </div>
            </div>
        </div>
    )}
}
export default Monsters;