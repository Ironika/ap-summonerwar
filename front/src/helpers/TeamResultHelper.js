import { Dispatcher, StoreRegistry } from 'ap-flux'
import AuthHelper from 'helpers/AuthHelper'

/* This class was auto-generated by the JavaScriptWriter */
class TeamResultHelper {

	register(obj, callback) {
		StoreRegistry.register('REST_STORE/teamResult', obj, callback);
	}

	unregister(obj) {
		StoreRegistry.unregister('REST_STORE', obj);
	}

	getTeamresult(teamResultId) {
		return Dispatcher.issue('GET_TEAMRESULT', {token: AuthHelper.getToken(), teamResultId: teamResultId});
	}

	postTeamresult(data) {
		return Dispatcher.issue('POST_TEAMRESULT', {token: AuthHelper.getToken(), data: data});
	}

	putTeamresult(data) {
		return Dispatcher.issue('PUT_TEAMRESULT', {token: AuthHelper.getToken(), teamResultId: data.id, data: data});
	}

	deleteTeamresult(teamResultId) {
		return Dispatcher.issue('DELETE_TEAMRESULT', {token: AuthHelper.getToken(), teamResultId: teamResultId});
	}

	getUserTeamresult(userId) {
		return Dispatcher.issue('GET_USER_TEAMRESULT', {token: AuthHelper.getToken(), userId: userId});
	}

	getData(id) {
		return StoreRegistry.getStore('REST_STORE').getData('/teamResult' + (id ? '/' + id : ''));
	}

}
var TeamResultObj = new TeamResultHelper()
export default TeamResultObj
