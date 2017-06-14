import { Dispatcher, StoreRegistry } from 'ap-flux';
import AuthHelper from 'helpers/AuthHelper';

/* This class was auto-generated by the JavaScriptWriter */
class UserHelper {

	register(obj, callback) {
		StoreRegistry.register('REST_STORE/user', obj, callback);
	}

	unregister(obj) {
		StoreRegistry.unregister('REST_STORE', obj);
	}

	getUser(id) {
		return Dispatcher.issue('GET_USER', {token: AuthHelper.getToken(), id: id});
	}

	postUser(data) {
		return Dispatcher.issue('POST_USER', {token: AuthHelper.getToken(), data: data});
	}

	putUser(data) {
		return Dispatcher.issue('PUT_USER', {token: AuthHelper.getToken(), id: data.id, data: data});
	}

	deleteUser(id) {
		return Dispatcher.issue('DELETE_USER', {token: AuthHelper.getToken(), id: id});
	}

	getData(id) {
		return StoreRegistry.getStore('REST_STORE').getData('/user' + (id ? '/' + id : ''));
	}

}
var UserObj = new UserHelper();
export default UserObj;
