import AppHelper from 'helpers/AppHelper';
import AuthHelper from 'helpers/AuthHelper';
import BuildHelper from 'helpers/BuildHelper';
import StatType from 'utils/constants/StatType'
import {Utils, BaseData}  from 'ap-react-bootstrap'


/* This class was auto-generated by the JavaScriptWriter */
class BuildsData extends BaseData {

	register(obj) {
		if(!AuthHelper.getEntityId()) {
            AppHelper.navigate("/")
        }
		super.register(obj)

		this.obj.onClickAddBuild = this.onClickAddBuild.bind(this)
		this.obj.onClickAddMonsterConfig = this.onClickAddMonsterConfig.bind(this)

		this.obj.state = {
            builds: []
        }

        this.buildDataBuilds()
	}

	onClickAddBuild() {
		console.log("ADD")
	}

	onClickAddMonsterConfig() {
		console.log("ADD")
	}

	unregister() {
	}

	buildDataBuilds() {
        let builds = Utils.map(BuildHelper.getData())
        this.setState({builds: builds})
    }

}
var BuildsObj = new BuildsData();
export default BuildsObj;
