import { ActionBase } from 'ap-flux'
import { Utils, RestService } from 'ap-react-bootstrap'

let get_auth = new ActionBase({ name: 'GET_AUTH' })
let put_auth_password = new ActionBase({ name: 'PUT_AUTH_PASSWORD' })
let post_auth_register = new ActionBase({ name: 'POST_AUTH_REGISTER' })
let post_auth_recover = new ActionBase({ name: 'POST_AUTH_RECOVER' })
let post_auth_recover_check = new ActionBase({ name: 'POST_AUTH_RECOVER_CHECK' })
let put_auth_recover = new ActionBase({ name: 'PUT_AUTH_RECOVER' })
let post_auth_changemail = new ActionBase({ name: 'POST_AUTH_CHANGEMAIL' })
let post_auth_changemail_check = new ActionBase({ name: 'POST_AUTH_CHANGEMAIL_CHECK' })
let put_auth_changemail = new ActionBase({ name: 'PUT_AUTH_CHANGEMAIL' })
let post_auth_changemail_confirm = new ActionBase({ name: 'POST_AUTH_CHANGEMAIL_CONFIRM' })
let get_monstersconfig = new ActionBase({ name: 'GET_MONSTERSCONFIG' })
let post_monstersconfig = new ActionBase({ name: 'POST_MONSTERSCONFIG' })
let put_monstersconfig = new ActionBase({ name: 'PUT_MONSTERSCONFIG' })
let delete_monstersconfig = new ActionBase({ name: 'DELETE_MONSTERSCONFIG' })
let get_builds = new ActionBase({ name: 'GET_BUILDS' })
let post_build = new ActionBase({ name: 'POST_BUILD' })
let get_build = new ActionBase({ name: 'GET_BUILD' })
let put_build = new ActionBase({ name: 'PUT_BUILD' })
let delete_build = new ActionBase({ name: 'DELETE_BUILD' })
let get_build_monstersconfig = new ActionBase({ name: 'GET_BUILD_MONSTERSCONFIG' })
let get_runes = new ActionBase({ name: 'GET_RUNES' })
let post_rune = new ActionBase({ name: 'POST_RUNE' })
let get_rune = new ActionBase({ name: 'GET_RUNE' })
let put_rune = new ActionBase({ name: 'PUT_RUNE' })
let delete_rune = new ActionBase({ name: 'DELETE_RUNE' })
let get_monsters = new ActionBase({ name: 'GET_MONSTERS' })
let post_monster = new ActionBase({ name: 'POST_MONSTER' })
let get_monster = new ActionBase({ name: 'GET_MONSTER' })
let put_monster = new ActionBase({ name: 'PUT_MONSTER' })
let delete_monster = new ActionBase({ name: 'DELETE_MONSTER' })
let get_monster_runes = new ActionBase({ name: 'GET_MONSTER_RUNES' })
let get_user = new ActionBase({ name: 'GET_USER' })
let post_user = new ActionBase({ name: 'POST_USER' })
let delete_user = new ActionBase({ name: 'DELETE_USER' })
let put_user = new ActionBase({ name: 'PUT_USER' })
let get_user_builds = new ActionBase({ name: 'GET_USER_BUILDS' })
let delete_user_builds = new ActionBase({ name: 'DELETE_USER_BUILDS' })
let get_user_runes = new ActionBase({ name: 'GET_USER_RUNES' })
let delete_user_runes = new ActionBase({ name: 'DELETE_USER_RUNES' })
let get_user_monsters = new ActionBase({ name: 'GET_USER_MONSTERS' })
let delete_user_monster_runes = new ActionBase({ name: 'DELETE_USER_MONSTER_RUNES' })
let post_user_import = new ActionBase({ name: 'POST_USER_IMPORT' })

get_auth.do = function(args) {
	Utils.checkMembers(args, ['username', 'password']);
	var reqParam = {
		method: 'GET',
		url: '/auth',
		token : Utils.encode(args.username, args.password)
	};
	return RestService._request(reqParam);
}

put_auth_password.do = function(args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		method: 'PUT',
		url: '/auth/password',
		token : args.token,
		data: args.data
	};
	return RestService._request(reqParam);
}

post_auth_register.do = function(args) {
	Utils.checkMembers(args, ['data']);
	var reqParam = {
		method: 'POST',
		url: '/auth/register',
		token: Utils.encode('guest', 'guest'),
		data: args.data
	};
	return RestService._request(reqParam);
}

post_auth_recover.do = function(args) {
	Utils.checkMembers(args, ['data']);
	var reqParam = {
		method: 'POST',
		url: '/auth/recover',
		token: Utils.encode('guest', 'guest'),
		data: args.data
	};
	return RestService._request(reqParam);
}

post_auth_recover_check.do = function(args) {
	Utils.checkMembers(args, ['data']);
	var reqParam = {
		method: 'POST',
		url: '/auth/recover/check',
		token: Utils.encode('guest', 'guest'),
		data: args.data
	};
	return RestService._request(reqParam);
}

put_auth_recover.do = function(args) {
	Utils.checkMembers(args, ['data']);
	var reqParam = {
		method: 'PUT',
		url: '/auth/recover',
		token: Utils.encode('guest', 'guest'),
		data: args.data
	};
	return RestService._request(reqParam);
}

post_auth_changemail.do = function(args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		method: 'POST',
		url: '/auth/changemail',
		token : args.token
	};
	return RestService._request(reqParam);
}

post_auth_changemail_check.do = function(args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		method: 'POST',
		url: '/auth/changemail/check',
		token : args.token,
		data: args.data
	};
	return RestService._request(reqParam);
}

put_auth_changemail.do = function(args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		method: 'PUT',
		url: '/auth/changemail',
		token : args.token,
		data: args.data
	};
	return RestService._request(reqParam);
}

post_auth_changemail_confirm.do = function(args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		method: 'POST',
		url: '/auth/changemail/confirm',
		token : args.token,
		data: args.data
	};
	return RestService._request(reqParam);
}

get_monstersconfig.do = function(args) {
	Utils.checkMembers(args, ['token', 'monsterConfigId']);
	var reqParam = {
		method: 'GET',
		url: '/monstersconfig/' + args.monsterConfigId + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

post_monstersconfig.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/monstersconfig',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

put_monstersconfig.do = function(args) {
	Utils.checkMembers(args, ['token', 'monsterConfigId', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/monstersconfig/' + args.monsterConfigId + '',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

delete_monstersconfig.do = function(args) {
	Utils.checkMembers(args, ['token', 'monsterConfigId']);
	var reqParam = {
		method: 'DELETE',
		url: '/monstersconfig/' + args.monsterConfigId + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_builds.do = function(args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		method: 'GET',
		url: '/builds',
		token : args.token,
	};
	return RestService._request(reqParam);
}

post_build.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/builds',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_build.do = function(args) {
	Utils.checkMembers(args, ['token', 'buildId']);
	var reqParam = {
		method: 'GET',
		url: '/builds/' + args.buildId + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

put_build.do = function(args) {
	Utils.checkMembers(args, ['token', 'buildId', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/builds/' + args.buildId + '',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

delete_build.do = function(args) {
	Utils.checkMembers(args, ['token', 'buildId']);
	var reqParam = {
		method: 'DELETE',
		url: '/builds/' + args.buildId + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_build_monstersconfig.do = function(args) {
	Utils.checkMembers(args, ['token', 'buildId']);
	var reqParam = {
		method: 'GET',
		url: '/builds/' + args.buildId + '/monstersconfig',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_runes.do = function(args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		method: 'GET',
		url: '/runes',
		token : args.token,
	};
	return RestService._request(reqParam);
}

post_rune.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/runes',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_rune.do = function(args) {
	Utils.checkMembers(args, ['token', 'runeId']);
	var reqParam = {
		method: 'GET',
		url: '/runes/' + args.runeId + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

put_rune.do = function(args) {
	Utils.checkMembers(args, ['token', 'runeId', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/runes/' + args.runeId + '',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

delete_rune.do = function(args) {
	Utils.checkMembers(args, ['token', 'runeId']);
	var reqParam = {
		method: 'DELETE',
		url: '/runes/' + args.runeId + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_monsters.do = function(args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		method: 'GET',
		url: '/monsters',
		token : args.token,
	};
	return RestService._request(reqParam);
}

post_monster.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/monsters',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_monster.do = function(args) {
	Utils.checkMembers(args, ['token', 'monsterId']);
	var reqParam = {
		method: 'GET',
		url: '/monsters/' + args.monsterId + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

put_monster.do = function(args) {
	Utils.checkMembers(args, ['token', 'monsterId', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/monsters/' + args.monsterId + '',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

delete_monster.do = function(args) {
	Utils.checkMembers(args, ['token', 'monsterId']);
	var reqParam = {
		method: 'DELETE',
		url: '/monsters/' + args.monsterId + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_monster_runes.do = function(args) {
	Utils.checkMembers(args, ['token', 'monsterId']);
	var reqParam = {
		method: 'GET',
		url: '/monsters/' + args.monsterId + '/runes',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_user.do = function(args) {
	Utils.checkMembers(args, ['token', 'userId']);
	var reqParam = {
		method: 'GET',
		url: '/user/' + args.userId + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

post_user.do = function(args) {
	Utils.checkMembers(args, ['data']);
	var reqParam = {
		method: 'POST',
		url: '/user',
		data : args.data,
		token : Utils.encode('guest', 'guest'),
	};
	return RestService._request(reqParam);
}

delete_user.do = function(args) {
	Utils.checkMembers(args, ['token', 'userId']);
	var reqParam = {
		method: 'DELETE',
		url: '/user/' + args.userId + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

put_user.do = function(args) {
	Utils.checkMembers(args, ['token', 'userId', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/user/' + args.userId + '',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_user_builds.do = function(args) {
	Utils.checkMembers(args, ['token', 'userId']);
	var reqParam = {
		method: 'GET',
		url: '/user/' + args.userId + '/builds',
		token : args.token,
	};
	return RestService._request(reqParam);
}

delete_user_builds.do = function(args) {
	Utils.checkMembers(args, ['token', 'userId']);
	var reqParam = {
		method: 'DELETE',
		url: '/user/' + args.userId + '/builds',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_user_runes.do = function(args) {
	Utils.checkMembers(args, ['token', 'userId']);
	var reqParam = {
		method: 'GET',
		url: '/user/' + args.userId + '/runes',
		token : args.token,
	};
	return RestService._request(reqParam);
}

delete_user_runes.do = function(args) {
	Utils.checkMembers(args, ['token', 'userId']);
	var reqParam = {
		method: 'DELETE',
		url: '/user/' + args.userId + '/runes',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_user_monsters.do = function(args) {
	Utils.checkMembers(args, ['token', 'userId']);
	var reqParam = {
		method: 'GET',
		url: '/user/' + args.userId + '/monsters',
		token : args.token,
	};
	return RestService._request(reqParam);
}

delete_user_monster_runes.do = function(args) {
	Utils.checkMembers(args, ['token', 'userId', 'monsterId']);
	var reqParam = {
		method: 'DELETE',
		url: '/user/' + args.userId + '/monsters/' + args.monsterId + '/runes',
		token : args.token,
	};
	return RestService._request(reqParam);
}

post_user_import.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/user/import',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

