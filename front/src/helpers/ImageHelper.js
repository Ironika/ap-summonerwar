import Dispatcher from 'core/Dispatcher.js'
import StoreRegistry from 'core/StoreRegistry'
import AuthHelper from 'helpers/AuthHelper'

/* This class was auto-generated by the JavaScriptWriter */
class ImageHelper {

	register(obj, callback) {
		StoreRegistry.register('IMAGE_STORE', obj, callback);
	}

	unregister(obj) {
		StoreRegistry.unregister('IMAGE_STORE', obj);
	}

	getImage(id) {
		return Dispatcher.issue('GET_IMAGE', {token: AuthHelper.getToken(), id: id});
	}

	postImage(data) {
		return Dispatcher.issue('POST_IMAGE', {token: AuthHelper.getToken(), data: data});
	}

	getData(id) {
		return StoreRegistry.getStore('IMAGE_STORE').getData((id ? '/' + id : ''));
	}

}
var ImageHelperObj = new ImageHelper()
export default ImageHelperObj