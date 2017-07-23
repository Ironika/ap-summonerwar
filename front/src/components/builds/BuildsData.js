import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import BuildHelper from 'helpers/BuildHelper'
import BuildResultHelper from 'helpers/BuildResultHelper'
import TeamResultHelper from 'helpers/TeamResultHelper'
import MonsterResultHelper from 'helpers/MonsterResultHelper'

import StatType from 'utils/constants/StatType'
import BuildState from 'utils/constants/BuildState'
import {BaseData}  from 'ap-react-bootstrap'


/* This class was auto-generated by the JavaScriptWriter */
class BuildsData extends BaseData {

	register(obj) {
		if(!AuthHelper.getEntityId()) {
            AppHelper.navigate("/")
        }
		super.register(obj)
		this.obj.onClickRefresh = this.onClickRefresh.bind(this)

	}

	onClickRefresh() {
        AppHelper.setBusy(true).
		then(function () {
			let promises = []
			promises.push(BuildResultHelper.getUserBuildresult(AuthHelper.getEntityId()))
			promises.push(TeamResultHelper.getUserTeamresult(AuthHelper.getEntityId()))
			promises.push(MonsterResultHelper.getUserMonsterresult(AuthHelper.getEntityId()))
			return Promise.all(promises)
		}).
		then(BuildHelper.getUserBuilds.bind(BuildHelper, AuthHelper.getEntityId())).
		then(AppHelper.setBusy.bind(AppHelper, false)).
		catch(function() {
			this.setState({error: "An error has occured !"})
			AppHelper.setBusy(false)
		}.bind(this))
    }

	unregister() {
	}


}
var BuildsObj = new BuildsData();
export default BuildsObj;
