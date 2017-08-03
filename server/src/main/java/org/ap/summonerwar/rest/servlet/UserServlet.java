package org.ap.summonerwar.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.web.rest.servlet.APServletBase;
import org.ap.summonerwar.bean.UserBean;
import org.ap.summonerwar.storage.UserData;
import org.ap.summonerwar.storage.UserCollection;
import org.ap.web.internal.APWebException;
import java.util.List;
import java.util.ArrayList;
import javax.annotation.security.RolesAllowed;
import org.ap.summonerwar.storage.ApauthCollection;
import org.ap.summonerwar.storage.ApauthData;
import org.ap.web.internal.UUIDGenerator;
import com.mongodb.MongoWriteException;
import org.ap.summonerwar.internal.MailSender;
import org.ap.summonerwar.internal.ETokenType;
import org.ap.common.TimeHelper;
import org.ap.summonerwar.bean.BuildBean;
import org.ap.summonerwar.storage.BuildData;
import org.ap.summonerwar.storage.BuildCollection;
import static com.mongodb.client.model.Filters.*;
import org.ap.summonerwar.bean.RuneBean;
import org.ap.summonerwar.storage.RuneData;
import org.ap.summonerwar.storage.RuneCollection;
import org.ap.summonerwar.bean.MonsterBean;
import org.ap.summonerwar.storage.MonsterData;
import org.ap.summonerwar.storage.MonsterCollection;
import org.ap.summonerwar.bean.MonsterConfigBean;
import org.ap.summonerwar.storage.MonsterConfigData;
import org.ap.summonerwar.storage.MonsterConfigCollection;
import org.ap.summonerwar.bean.TeamResultBean;
import org.ap.summonerwar.storage.TeamResultData;
import org.ap.summonerwar.storage.TeamResultCollection;
import org.ap.summonerwar.bean.BuildResultBean;
import org.ap.summonerwar.storage.BuildResultData;
import org.ap.summonerwar.storage.BuildResultCollection;
import org.ap.summonerwar.bean.MonsterResultBean;
import org.ap.summonerwar.storage.MonsterResultData;
import org.ap.summonerwar.storage.MonsterResultCollection;
import org.ap.summonerwar.bean.ImportBean;
import org.ap.summonerwar.helpers.ImportHelper;

/* This class was auto-generated by the JavaWriter */
@Path("/user")
public class UserServlet extends APServletBase {

	public static final String PATH = "/user";

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getUsers(@Context SecurityContext sc) {
		try {
			List<UserData> datas = UserCollection.getAll();
			
			List<UserBean> beanList = new ArrayList<UserBean>();
			for (UserData data : datas) {
				ApauthData dataAuth = ApauthCollection.getById(data.getAuthId());
				if(dataAuth == null) {
					return Response.status(Status.NOT_FOUND).build();
				}
				
				UserBean bean = new UserBean();
				bean.lastImport = data.getLastImport();
				bean.profileImage = data.getProfileImage();
				bean.id = data.getId();
				bean.username = dataAuth.getUsername();
				bean.email = dataAuth.getEmail();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new UserBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	public Response postUser(@Context SecurityContext sc, UserBean userBean) {
		try {
			ApauthData dataAuth = ApauthCollection.getByUsername(userBean.username);
			UserData dataEntity;
			if(dataAuth != null) {
				if(dataAuth.getRegistered()) {
					throw APWebException.AP_AUTH_REG_001;
				} else {
					UserCollection.deleteByAuthId(dataAuth.id);
					ApauthCollection.delete(dataAuth);
				}
			}
			dataAuth = ApauthCollection.getByEmail(userBean.email);
			if(dataAuth != null) {
				if(dataAuth.getRegistered()) {
					throw APWebException.AP_AUTH_REG_002;
				} else {
					UserCollection.deleteByAuthId(dataAuth.id);
					ApauthCollection.delete(dataAuth);
				}
			}
			
			List<String> roles = new ArrayList<String>();
			roles.add("user");
			roles.add("apauth");
			
			dataAuth = new ApauthData();
			dataAuth.setId(UUIDGenerator.nextId());
			dataAuth.setEntityId(UUIDGenerator.nextId());
			dataAuth.setUsername(userBean.username);
			dataAuth.setPassword(userBean.password);
			dataAuth.setEmail(userBean.email);
			dataAuth.setType("user");
			dataAuth.setRoles(roles);
			dataAuth.setRegistered(Boolean.FALSE);
			dataAuth.setActive(Boolean.TRUE);
			dataAuth.setToken(UUIDGenerator.nextCode());
			dataAuth.setTokenType(ETokenType.REGISTER.name());
			dataAuth.setTokenDateTime(TimeHelper.nowDateTimeIntegers());
			ApauthCollection.create(dataAuth);
			
			dataEntity = new UserData();
			dataEntity.setId(dataAuth.getEntityId());
			dataEntity.setAuthId(dataAuth.getId());
			dataEntity.setLastImport(userBean.lastImport);
			dataEntity.setProfileImage(userBean.profileImage);
			UserCollection.create(dataEntity);
			
			MailSender.sendRegistrationMail(dataAuth);
			
			return Response.status(Status.CREATED).build();
			
		} catch (MongoWriteException e) {
			return Response.status(Status.FORBIDDEN).build();
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@RolesAllowed("user")
	public Response deleteUsers(@Context SecurityContext sc) {
		try {
			// Delete from database
			long deletedCount = UserCollection.drop();
			// Send response
			return Response.status(Status.OK).entity("{\"deletedCount\": " + deletedCount + "}").build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{userId}")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getUser(@Context SecurityContext sc, @PathParam("userId") final String userId) {
		try {
			UserData data = UserCollection.getById(userId);
			if(data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			ApauthData dataAuth = ApauthCollection.getById(data.getAuthId());
			if(dataAuth == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			
			UserBean bean = new UserBean();
			bean.lastImport = data.getLastImport();
			bean.profileImage = data.getProfileImage();
			bean.id = data.getId();
			bean.username = dataAuth.getUsername();
			bean.email = dataAuth.getEmail();
			
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{userId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response putUser(@Context SecurityContext sc, @PathParam("userId") final String userId, UserBean userBean) {
		try {
			// Get actual data object
			UserData data = UserCollection.getById(userId);
			// Check data exists
			if (data == null) {
				throw new APWebException("user not found", "AP_USER_NOTFOUND", Status.BAD_REQUEST);
			}
			// Update the data object
			data.setLastImport(userBean.lastImport);
			data.setProfileImage(userBean.profileImage);
			// Store the updated data object
			UserCollection.updateNull(data);
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{userId}")
	@RolesAllowed("user")
	public Response deleteUser(@Context SecurityContext sc, @PathParam("userId") final String userId) {
		try {
			// Try to delete the entity
			if (!UserCollection.deleteById(userId)) {
				throw new APWebException("user not found", "AP_USER_NOTFOUND", Status.BAD_REQUEST);
			}
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{userId}/builds")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getUserBuilds(@Context SecurityContext sc, @PathParam("userId") final String userId) {
		try {
			List<BuildData> datas = BuildCollection.get(and(eq("userId", userId)));
			
			List<BuildBean> beanList = new ArrayList<BuildBean>();
			for (BuildData data : datas) {
				BuildBean bean = new BuildBean();
				bean.userId = data.getUserId();
				bean.runesLvl = data.getRunesLvl();
				bean.name = data.getName();
				bean.state = data.getState();
				bean.id = data.getId();
				bean.runesStars = data.getRunesStars();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new BuildBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{userId}/builds")
	@RolesAllowed("user")
	public Response deleteUserBuilds(@Context SecurityContext sc, @PathParam("userId") final String userId) {
		try {
			// Delete from database
			long deletedCount = BuildCollection.deleteMany(and(eq("userId", userId)));
			// Send response
			return Response.status(Status.OK).entity("{\"deletedCount\": " + deletedCount + "}").build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{userId}/runes")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getUserRunes(@Context SecurityContext sc, @PathParam("userId") final String userId) {
		try {
			List<RuneData> datas = RuneCollection.get(and(eq("userId", userId)));
			
			List<RuneBean> beanList = new ArrayList<RuneBean>();
			for (RuneData data : datas) {
				RuneBean bean = new RuneBean();
				bean.monsterId = data.getMonsterId();
				bean.userId = data.getUserId();
				bean.lvl = data.getLvl();
				bean.set = data.getSet();
				bean.stat4Type = data.getStat4Type();
				bean.star = data.getStar();
				bean.stat2Type = data.getStat2Type();
				bean.statSub = data.getStatSub();
				bean.statMain = data.getStatMain();
				bean.stat4 = data.getStat4();
				bean.stat3Type = data.getStat3Type();
				bean.stat2 = data.getStat2();
				bean.pos = data.getPos();
				bean.stat3 = data.getStat3();
				bean.statSubType = data.getStatSubType();
				bean.stat1 = data.getStat1();
				bean.stat1Type = data.getStat1Type();
				bean.statMainType = data.getStatMainType();
				bean.id = data.getId();
				bean.uniqueId = data.getUniqueId();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new RuneBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{userId}/runes")
	@RolesAllowed("user")
	public Response deleteUserRunes(@Context SecurityContext sc, @PathParam("userId") final String userId) {
		try {
			// Delete from database
			long deletedCount = RuneCollection.deleteMany(and(eq("userId", userId)));
			// Send response
			return Response.status(Status.OK).entity("{\"deletedCount\": " + deletedCount + "}").build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{userId}/monsters")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getUserMonsters(@Context SecurityContext sc, @PathParam("userId") final String userId) {
		try {
			List<MonsterData> datas = MonsterCollection.get(and(eq("userId", userId)));
			
			List<MonsterBean> beanList = new ArrayList<MonsterBean>();
			for (MonsterData data : datas) {
				MonsterBean bean = new MonsterBean();
				bean.userId = data.getUserId();
				bean.acc = data.getAcc();
				bean.res = data.getRes();
				bean.lvl = data.getLvl();
				bean.role = data.getRole();
				bean.star = data.getStar();
				bean.isAwaked = data.getIsAwaked();
				bean.def = data.getDef();
				bean.spd = data.getSpd();
				bean.hp = data.getHp();
				bean.crate = data.getCrate();
				bean.elemType = data.getElemType();
				bean.isLock = data.getIsLock();
				bean.cdmg = data.getCdmg();
				bean.name = data.getName();
				bean.xp = data.getXp();
				bean.atk = data.getAtk();
				bean.unitId = data.getUnitId();
				bean.id = data.getId();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new MonsterBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{userId}/monsters/{monsterId}/runes")
	@RolesAllowed("user")
	public Response deleteUserMonsterRunes(@Context SecurityContext sc, @PathParam("userId") final String userId, @PathParam("monsterId") final String monsterId) {
		try {
			// Delete from database
			long deletedCount = RuneCollection.deleteMany(and(eq("userId", userId),eq("monsterId", monsterId)));
			// Send response
			return Response.status(Status.OK).entity("{\"deletedCount\": " + deletedCount + "}").build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{userId}/monstersconfig")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getUserMonstersconfigs(@Context SecurityContext sc, @PathParam("userId") final String userId) {
		try {
			List<MonsterConfigData> datas = MonsterConfigCollection.get(and(eq("userId", userId)));
			
			List<MonsterConfigBean> beanList = new ArrayList<MonsterConfigBean>();
			for (MonsterConfigData data : datas) {
				MonsterConfigBean bean = new MonsterConfigBean();
				bean.monsterId = data.getMonsterId();
				bean.buildId = data.getBuildId();
				bean.userId = data.getUserId();
				bean.requiredDef = data.getRequiredDef();
				bean.notationSpd = data.getNotationSpd();
				bean.requiredAcc = data.getRequiredAcc();
				bean.notationHp = data.getNotationHp();
				bean.runeStat2Type = data.getRuneStat2Type();
				bean.requiredCrate = data.getRequiredCrate();
				bean.runeStat4Type = data.getRuneStat4Type();
				bean.id = data.getId();
				bean.requiredAtk = data.getRequiredAtk();
				bean.requiredCdmg = data.getRequiredCdmg();
				bean.notationCdmg = data.getNotationCdmg();
				bean.notationAcc = data.getNotationAcc();
				bean.notationDef = data.getNotationDef();
				bean.set3 = data.getSet3();
				bean.requiredRes = data.getRequiredRes();
				bean.set2 = data.getSet2();
				bean.brokenSet = data.getBrokenSet();
				bean.requiredSpd = data.getRequiredSpd();
				bean.runeStat6Type = data.getRuneStat6Type();
				bean.requiredHp = data.getRequiredHp();
				bean.notationCrate = data.getNotationCrate();
				bean.notationAtk = data.getNotationAtk();
				bean.set1 = data.getSet1();
				bean.orderAtk = data.getOrderAtk();
				bean.notationRes = data.getNotationRes();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new MonsterConfigBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{userId}/teamresult")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getUserTeamresults(@Context SecurityContext sc, @PathParam("userId") final String userId) {
		try {
			List<TeamResultData> datas = TeamResultCollection.get(and(eq("userId", userId)));
			
			List<TeamResultBean> beanList = new ArrayList<TeamResultBean>();
			for (TeamResultData data : datas) {
				TeamResultBean bean = new TeamResultBean();
				bean.buildResultId = data.getBuildResultId();
				bean.userId = data.getUserId();
				bean.eval = data.getEval();
				bean.id = data.getId();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new TeamResultBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{userId}/buildresult")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getUserBuildresults(@Context SecurityContext sc, @PathParam("userId") final String userId) {
		try {
			List<BuildResultData> datas = BuildResultCollection.get(and(eq("userId", userId)));
			
			List<BuildResultBean> beanList = new ArrayList<BuildResultBean>();
			for (BuildResultData data : datas) {
				BuildResultBean bean = new BuildResultBean();
				bean.buildId = data.getBuildId();
				bean.userId = data.getUserId();
				bean.id = data.getId();
				bean.creationDate = data.getCreationDate();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new BuildResultBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{userId}/monsterresult")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getUserMonsterresults(@Context SecurityContext sc, @PathParam("userId") final String userId) {
		try {
			List<MonsterResultData> datas = MonsterResultCollection.get(and(eq("userId", userId)));
			
			List<MonsterResultBean> beanList = new ArrayList<MonsterResultBean>();
			for (MonsterResultData data : datas) {
				MonsterResultBean bean = new MonsterResultBean();
				bean.rune6 = data.getRune6();
				bean.teamResultId = data.getTeamResultId();
				bean.rune3 = data.getRune3();
				bean.rune2 = data.getRune2();
				bean.rune5 = data.getRune5();
				bean.rune4 = data.getRune4();
				bean.rune1 = data.getRune1();
				bean.userId = data.getUserId();
				bean.monsterConfigId = data.getMonsterConfigId();
				bean.acc = data.getAcc();
				bean.res = data.getRes();
				bean.def = data.getDef();
				bean.cdmg = data.getCdmg();
				bean.spd = data.getSpd();
				bean.hp = data.getHp();
				bean.atk = data.getAtk();
				bean.crate = data.getCrate();
				bean.id = data.getId();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new MonsterResultBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Path("/import")
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response postUserImport(@Context SecurityContext sc, ImportBean importBean) {
		try {
			Object bean = ImportHelper.postImport(sc, importBean);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
