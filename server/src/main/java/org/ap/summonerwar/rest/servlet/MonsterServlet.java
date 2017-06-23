package org.ap.summonerwar.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.web.rest.servlet.APServletBase;
import org.ap.summonerwar.bean.MonsterBean;
import javax.annotation.security.RolesAllowed;
import org.ap.summonerwar.storage.MonsterData;
import org.ap.summonerwar.storage.MonsterCollection;
import org.ap.web.internal.APWebException;
import java.util.List;
import java.util.ArrayList;
import org.ap.web.internal.UUIDGenerator;
import com.mongodb.MongoWriteException;
import static com.mongodb.client.model.Filters.*;
import org.ap.summonerwar.bean.RuneBean;
import org.ap.summonerwar.storage.RuneData;
import org.ap.summonerwar.storage.RuneCollection;

/* This class was auto-generated by the JavaWriter */
@Path("/monsters")
public class MonsterServlet extends APServletBase {

	public static final String PATH = "/monsters";

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getMonsters(@Context SecurityContext sc) {
		try {
			List<MonsterData> datas = MonsterCollection.getAll();
			
			List<MonsterBean> beanList = new ArrayList<MonsterBean>();
			for (MonsterData data : datas) {
				MonsterBean bean = new MonsterBean();
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
				bean.userId = data.getUserId();
				bean.elemType = data.getElemType();
				bean.cdmg = data.getCdmg();
				bean.name = data.getName();
				bean.xp = data.getXp();
				bean.atk = data.getAtk();
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

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response postMonster(@Context SecurityContext sc, MonsterBean monsterBean) {
		try {
			MonsterData data = new MonsterData();
			data.id = UUIDGenerator.nextId();
			data.acc = monsterBean.acc;
			data.res = monsterBean.res;
			data.lvl = monsterBean.lvl;
			data.role = monsterBean.role;
			data.star = monsterBean.star;
			data.isAwaked = monsterBean.isAwaked;
			data.def = monsterBean.def;
			data.spd = monsterBean.spd;
			data.hp = monsterBean.hp;
			data.crate = monsterBean.crate;
			data.userId = monsterBean.userId;
			data.elemType = monsterBean.elemType;
			data.cdmg = monsterBean.cdmg;
			data.name = monsterBean.name;
			data.xp = monsterBean.xp;
			data.atk = monsterBean.atk;
			MonsterCollection.create(data);
			return Response.status(Status.CREATED).entity("{\"id\": \"" + data.id + "\"}").build();
			
		} catch (MongoWriteException e) {
			return Response.status(Status.FORBIDDEN).build();
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{monsterId}")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getMonster(@Context SecurityContext sc, @PathParam("monsterId") final String monsterId) {
		try {
			MonsterData data = MonsterCollection.getById(monsterId);
			if(data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			MonsterBean bean = new MonsterBean();
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
			bean.userId = data.getUserId();
			bean.elemType = data.getElemType();
			bean.cdmg = data.getCdmg();
			bean.name = data.getName();
			bean.xp = data.getXp();
			bean.atk = data.getAtk();
			bean.id = data.getId();
			
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{monsterId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response putMonster(@Context SecurityContext sc, @PathParam("monsterId") final String monsterId, MonsterBean monsterBean) {
		try {
			// Get actual data object
			MonsterData data = MonsterCollection.getById(monsterId);
			// Check data exists
			if (data == null) {
				throw new APWebException("monster not found", "AP_MONSTER_NOTFOUND", Status.BAD_REQUEST);
			}
			// Update the data object
			data.setAcc(monsterBean.acc);
			data.setRes(monsterBean.res);
			data.setLvl(monsterBean.lvl);
			data.setRole(monsterBean.role);
			data.setStar(monsterBean.star);
			data.setIsAwaked(monsterBean.isAwaked);
			data.setDef(monsterBean.def);
			data.setSpd(monsterBean.spd);
			data.setHp(monsterBean.hp);
			data.setCrate(monsterBean.crate);
			data.setUserId(monsterBean.userId);
			data.setElemType(monsterBean.elemType);
			data.setCdmg(monsterBean.cdmg);
			data.setName(monsterBean.name);
			data.setXp(monsterBean.xp);
			data.setAtk(monsterBean.atk);
			// Store the updated data object
			MonsterCollection.updateNull(data);
		
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{monsterId}")
	@RolesAllowed("user")
	public Response deleteMonster(@Context SecurityContext sc, @PathParam("monsterId") final String monsterId) {
		try {
			if (MonsterCollection.deleteById(monsterId)) {
				return Response.status(Status.OK).build();
			}
			return Response.status(Status.NOT_FOUND).build();
			
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{monsterId}/runes")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getMonsterRunes(@Context SecurityContext sc, @PathParam("monsterId") final String monsterId) {
		try {
			List<RuneData> datas = RuneCollection.get(and(eq("monsterId", monsterId)));
			
			List<RuneBean> beanList = new ArrayList<RuneBean>();
			for (RuneData data : datas) {
				RuneBean bean = new RuneBean();
				bean.lvl = data.getLvl();
				bean.set = data.getSet();
				bean.stat4Type = data.getStat4Type();
				bean.star = data.getStar();
				bean.stat2Type = data.getStat2Type();
				bean.statSub = data.getStatSub();
				bean.statMain = data.getStatMain();
				bean.stat4 = data.getStat4();
				bean.userId = data.getUserId();
				bean.stat3Type = data.getStat3Type();
				bean.stat2 = data.getStat2();
				bean.pos = data.getPos();
				bean.stat3 = data.getStat3();
				bean.statSubType = data.getStatSubType();
				bean.stat1 = data.getStat1();
				bean.monsterId = data.getMonsterId();
				bean.stat1Type = data.getStat1Type();
				bean.statMainType = data.getStatMainType();
				bean.id = data.getId();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new RuneBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
