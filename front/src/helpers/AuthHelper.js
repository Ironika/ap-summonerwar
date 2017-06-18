import { Dispatcher, StoreRegistry } from 'ap-flux';
import { Utils } from 'ap-react-bootstrap';

/* This class was auto-generated by the JavaScriptWriter */
class AuthHelper {

	register(obj, callback) {
		StoreRegistry.register('AUTH_STORE', obj, callback);
	}

	unregister(obj) {
		StoreRegistry.unregister('AUTH_STORE', obj);
	}

	getData() {
		return StoreRegistry.getStore('AUTH_STORE').getData();
	}

	getToken() {
		return StoreRegistry.getStore('AUTH_STORE').getData('/token');
	}

	getType() {
		return StoreRegistry.getStore('AUTH_STORE').getData('/type');
	}

	getEntityId() {
		return StoreRegistry.getStore('AUTH_STORE').getData('/entityId');
	}

	getUsername() {
		return StoreRegistry.getStore('AUTH_STORE').getData('/username');
	}

	getAuth(data) {
		return Dispatcher.issue('GET_AUTH', data);
	}

	logout() {
		return Dispatcher.issue('LOGOUT');
	}

	putAuthPassword(data) {
		return Dispatcher.issue('PUT_AUTH_PASSWORD', { token: this.getToken(), data: data });
	}

}
var AuthHelperObj = new AuthHelper();
export default AuthHelperObj;
