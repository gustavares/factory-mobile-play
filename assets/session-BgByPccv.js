import{t as e}from"./strings-OtQ7y1mR.js";function t(e,t,n){return e+(t-e)*n}function n(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function r(...e){return n(e.map(String).join(` `))}var i={ARCH:1,TEAM:2,STATE:4,FLAGS:8,POS:16,YAW:32,HP:64,MAX_HP:128};new TextEncoder,new TextDecoder;var a=new Uint8Array(256);for(let e=0;e<256;e++){let t=5;e&i.ARCH&&(t+=1),e&i.TEAM&&(t+=1),e&i.STATE&&(t+=1),e&i.FLAGS&&(t+=1),e&i.POS&&(t+=4),e&i.YAW&&(t+=2),e&i.HP&&(t+=2),e&i.MAX_HP&&(t+=2),a[e]=t}var o={DEAD:1,TELEPORTED:2,IMMOVABLE:4,NO_SEPARATE:8,SOLID:16,PROJECTILE:32,HIDDEN:64},s=class{capacity;count=0;id;arch;team;state;flags;x;z;px;pz;vx;vz;yaw;radius;hp;maxHp;cold;slotOf=new Map;constructor(e=1024){this.capacity=e,this.id=new Uint32Array(e),this.arch=new Uint8Array(e),this.team=new Uint8Array(e),this.state=new Uint8Array(e),this.flags=new Uint8Array(e),this.x=new Float32Array(e),this.z=new Float32Array(e),this.px=new Float32Array(e),this.pz=new Float32Array(e),this.vx=new Float32Array(e),this.vz=new Float32Array(e),this.yaw=new Float32Array(e),this.radius=new Float32Array(e),this.hp=new Float32Array(e),this.maxHp=new Float32Array(e),this.cold=Array(e)}spawn(e,t,n,r,i,a={}){if(this.count>=this.capacity)throw Error(`EntityStore full (${this.capacity})`);let s=this.count++;this.id[s]=e,this.arch[s]=t,this.team[s]=a.team??0,this.state[s]=a.state??0,this.flags[s]=(a.flags??0)|o.TELEPORTED,this.x[s]=this.px[s]=n,this.z[s]=this.pz[s]=r,this.vx[s]=0,this.vz[s]=0,this.yaw[s]=a.yaw??0,this.radius[s]=a.radius??.5;let c=a.maxHp??a.hp??1;return this.maxHp[s]=c,this.hp[s]=a.hp??c,i.slot=s,this.cold[s]=i,this.slotOf.set(e,s),s}despawn(e){let t=this.slotOf.get(e);if(t===void 0)return!1;let n=this.count-1;if(t!==n){this.id[t]=this.id[n],this.arch[t]=this.arch[n],this.team[t]=this.team[n],this.state[t]=this.state[n],this.flags[t]=this.flags[n],this.x[t]=this.x[n],this.z[t]=this.z[n],this.px[t]=this.px[n],this.pz[t]=this.pz[n],this.vx[t]=this.vx[n],this.vz[t]=this.vz[n],this.yaw[t]=this.yaw[n],this.radius[t]=this.radius[n],this.hp[t]=this.hp[n],this.maxHp[t]=this.maxHp[n];let e=this.cold[n];e.slot=t,this.cold[t]=e,this.slotOf.set(e.id,t)}return this.cold[n]=void 0,this.count=n,this.slotOf.delete(e),!0}slot(e){let t=this.slotOf.get(e);return t===void 0?-1:t}has(e){return this.slotOf.has(e)}get(e){let t=this.slotOf.get(e);return t===void 0?void 0:this.cold[t]}hasFlag(e,t){return(this.flags[e]&t)!==0}setFlag(e,t,n=!0){n?this.flags[e]|=t:this.flags[e]&=~t}beginTick(){let e=this.count;this.px.set(this.x.subarray(0,e)),this.pz.set(this.z.subarray(0,e));for(let t=0;t<e;t++)this.flags[t]&=~o.TELEPORTED}teleport(e,t,n){this.x[e]=this.px[e]=t,this.z[e]=this.pz[e]=n,this.flags[e]|=o.TELEPORTED}hash(){let e=2166136261,t=t=>{e^=t&255,e=Math.imul(e,16777619),e^=t>>>8&255,e=Math.imul(e,16777619)},n=new Float32Array(1),r=new Uint32Array(n.buffer),i=e=>{n[0]=e,t(r[0]&65535),t(r[0]>>>16)};for(let e=0;e<this.count;e++)t(this.id[e]),t(this.arch[e]|this.team[e]<<8),t(this.state[e]|this.flags[e]<<8),i(this.x[e]),i(this.z[e]),i(this.yaw[e]),i(this.hp[e]);return e>>>0}},c=class{dt;maxFrameDt;maxSteps;accumulator=0;constructor(e={}){this.dt=e.dt??1/60,this.maxFrameDt=e.maxFrameDt??.1,this.maxSteps=e.maxSteps??6}advance(e,t){let n=e<0?0:e>this.maxFrameDt?this.maxFrameDt:e;this.accumulator+=n;let r=0;for(;this.accumulator>=this.dt&&r<this.maxSteps;)t(this.dt),this.accumulator-=this.dt,r++;let i=0;return this.accumulator>=this.dt&&(i=this.accumulator-this.accumulator%this.dt,this.accumulator%=this.dt),{alpha:this.accumulator/this.dt,steps:r,dropped:i}}reset(){this.accumulator=0}};function l(e){return{tick:0,count:0,id:new Uint32Array(e),arch:new Uint8Array(e),team:new Uint8Array(e),state:new Uint8Array(e),flags:new Uint8Array(e),x:new Float32Array(e),z:new Float32Array(e),yaw:new Float32Array(e),hp:new Float32Array(e),maxHp:new Float32Array(e)}}var u=class{cellSize;cells=new Map;used=[];constructor(e=2){this.cellSize=e}key(e,t){return(e&65535)<<16|t&65535}clear(){for(let e of this.used)e.length=0;this.used.length=0,this.cells.clear()}insert(e,t,n){let r=this.key(Math.floor(t/this.cellSize),Math.floor(n/this.cellSize)),i=this.cells.get(r);i||(i=[],this.cells.set(r,i),this.used.push(i)),i.push(e)}build(e,t){this.clear();for(let n=0;n<e.count;n++)(!t||t(n))&&this.insert(n,e.x[n],e.z[n])}forEachNear(e,t,n,r){let i=this.cellSize,a=Math.floor((e-n)/i),o=Math.floor((e+n)/i),s=Math.floor((t-n)/i),c=Math.floor((t+n)/i);for(let e=a;e<=o;e++)for(let t=s;t<=c;t++){let n=this.cells.get(this.key(e,t));if(n)for(let e=0;e<n.length;e++)r(n[e])}}queryNear(e,t,n,r=[]){return r.length=0,this.forEachNear(e,t,n,e=>r.push(e)),r}},d=class e{seed;version;entries=[];constructor(e,t=`0`){this.seed=e,this.version=t}record(e,t,n){this.entries.push({tick:e,playerId:t,cmd:n})}toJSON(){return{seed:this.seed,version:this.version,entries:this.entries}}static fromJSON(t){let n=new e(t.seed,t.version);for(let e of t.entries)n.record(e.tick,e.playerId,e.cmd);return n}replay(e,t,n){let r=e(this.seed),i=0;for(;r.tick<n;){for(;i<this.entries.length&&this.entries[i].tick===r.tick;){let e=this.entries[i++];r.commands.push(e.playerId,e.cmd,r.tick)}r.step(t)}return r}},f=class e{s;constructor(e){this.s=e>>>0}nextU32(){let e=this.s=this.s+1831565813>>>0;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),(e^e>>>14)>>>0}float(){return this.nextU32()/4294967296}range(e,t){return e+(t-e)*this.float()}int(e){return Math.floor(this.float()*e)}intRange(e,t){return e+this.int(t-e+1)}chance(e){return this.float()<e}pick(e){return e[this.int(e.length)]}weighted(e,t){let n=0;for(let e of t)n+=e;let r=this.float()*n;for(let n=0;n<e.length;n++)if(r-=t[n],r<0)return e[n];return e[e.length-1]}shuffle(e){for(let t=e.length-1;t>0;t--){let n=this.int(t+1),r=e[t];e[t]=e[n],e[n]=r}return e}fork(){return new e(this.nextU32())}get state(){return this.s}set state(e){this.s=e>>>0}},p=class{nextId=1;next(){return this.nextId++}get current(){return this.nextId-1}restore(e){this.nextId=e+1}},m=class{queue=[];lastSeqByPlayer=new Map;push(e,t,n){let r=this.lastSeqByPlayer.get(e)??0;return t.seq<=r?!1:(this.lastSeqByPlayer.set(e,t.seq),this.queue.push({playerId:e,cmd:t,tick:n}),!0)}drain(){let e=this.queue;return this.queue=[],e}get pending(){return this.queue.length}lastSeq(e){return this.lastSeqByPlayer.get(e)??0}forget(e){this.lastSeqByPlayer.delete(e),this.queue=this.queue.filter(t=>t.playerId!==e)}},h=class{seed;rng;ids=new p;store;archetypes;dt;events=[];commands=new m;state;tick=0;time=0;published=void 0;archIndex=new Map;pendingDespawn=[];constructor(e){if(e.archetypes.length>255)throw Error(`At most 255 archetypes (u8 on the wire)`);this.seed=e.seed>>>0,this.rng=new f(this.seed),this.store=new s(e.capacity??1024),this.archetypes=e.archetypes,e.archetypes.forEach((e,t)=>this.archIndex.set(e,t)),this.dt=e.dt??1/60,this.state=e.state}archetypeIndex(e){let t=this.archIndex.get(e);if(t===void 0)throw Error(`Unknown archetype '${e}'`);return t}archetypeName(e){return this.archetypes[e]??`unknown`}spawn(e,t,n,r={}){let i=this.ids.next(),a={...r.cold??{},id:i,slot:-1,archetype:e};return this.store.spawn(i,this.archetypeIndex(e),t,n,a,r),a}despawn(e){return this.store.despawn(e)}despawnLater(e){this.pendingDespawn.push(e)}flushDespawns(){for(let e of this.pendingDespawn)this.store.despawn(e);this.pendingDespawn.length=0}emit(e){this.events.push(e)}publish(e){this.published=e}drainEvents(){let e=this.events.slice();return this.events.length=0,e}step(e){this.store.beginTick(),e(this,this.dt),this.flushDespawns(),this.tick++,this.time+=this.dt}hash(){return(this.store.hash()^Math.imul(this.rng.state,2654435761)^this.tick)>>>0}};function g(e,t,n,r,i,a,o){let s=n-e,c=r-t,l=s*s+c*c,u=0;l>0&&(u=((i-e)*s+(a-t)*c)/l,u=u<0?0:u>1?1:u);let d=e+s*u-i,f=t+c*u-a;return d*d+f*f<=o*o}function _(e,t,n,r){let i=e.store;for(let a=0;a<i.count;a++){if(!(i.flags[a]&o.PROJECTILE)||i.flags[a]&o.DEAD)continue;let s=i.cold[a];s.life-=n;let c=i.x[a],l=i.z[a],u=c+i.vx[a]*n,d=l+i.vz[a]*n;if(i.x[a]=u,i.z[a]=d,s.life<=0||r.blocked&&r.blocked(u,d)){i.flags[a]|=o.DEAD,r.onExpire?.(a),e.despawnLater(i.id[a]);continue}let f=i.radius[a],p=!1;t.forEachNear(u,d,f+1.5,t=>{p||t===a||i.flags[t]&(o.DEAD|o.PROJECTILE)||i.id[t]!==s.owner&&r.canHit(a,t)&&g(c,l,u,d,i.x[t],i.z[t],i.radius[t]+f)&&(r.onHit(a,t)||(p=!0,i.flags[a]|=o.DEAD,e.despawnLater(i.id[a])))})}}var v=class{samples=[];events=[];opts;nextSampleAt=0;constructor(e){this.opts={sampleEvery:1,clock:e=>e.time,...e}}onTick(e){let t=this.opts.clock(e);if(t>=this.nextSampleAt){let n=this.opts.sample(e);n!==null&&this.samples.push(n),this.nextSampleAt=Math.max(this.nextSampleAt+this.opts.sampleEvery,t)}}log(e){this.events.push(e)}finish(e,t){return{version:this.opts.version,configHash:this.opts.configHash,seed:e.seed,durationS:this.opts.clock(e),ticks:e.tick,samples:this.samples,events:this.events,summary:t,recordedAt:new Date().toISOString()}}};function y(e){return n(JSON.stringify(e))}var b=class{world;playerId;log;factory;stepper;sim;view;pendingEvents=[];alpha=0;constructor(e,t,n=1){this.factory=e,this.world=e.create(t),this.sim=e.step,this.playerId=n,e.join?.(this.world,n),this.log=new d(t),this.stepper=new c({dt:this.world.dt}),this.view=l(this.world.store.capacity)}get tick(){return this.world.tick}get state(){return this.world.published}restart(e){this.world=this.factory.create(e),this.factory.join?.(this.world,this.playerId),this.log=new d(e),this.stepper.reset(),this.pendingEvents=[],this.alpha=0}send(e){this.world.commands.push(this.playerId,e,this.world.tick)&&this.log.record(this.world.tick,this.playerId,e)}frame(e){let t=this.stepper.advance(e,()=>{this.world.step(this.sim),this.world.events.length&&this.pendingEvents.push(...this.world.drainEvents())});return this.alpha=t.alpha,this.buildView()}resume(){this.stepper.reset()}buildView(){let e=this.world.store,n=this.view,r=this.alpha;n.tick=this.world.tick,n.count=e.count;for(let i=0;i<e.count;i++)n.id[i]=e.id[i],n.arch[i]=e.arch[i],n.team[i]=e.team[i],n.state[i]=e.state[i],n.flags[i]=e.flags[i],n.hp[i]=e.hp[i],n.maxHp[i]=e.maxHp[i],e.flags[i]&o.TELEPORTED?(n.x[i]=e.x[i],n.z[i]=e.z[i]):(n.x[i]=t(e.px[i],e.x[i],r),n.z[i]=t(e.pz[i],e.z[i],r)),n.yaw[i]=e.yaw[i];return n}drainEvents(){let e=this.pendingEvents;return this.pendingEvents=[],e}dispose(){}},x=1e3,S=1001,C=1002,w=1003,T=1004,E=1005,D=1006,O=1007,k=1008,A=1009,ee=1010,te=1011,ne=1012,re=1013,ie=1014,ae=1015,oe=1016,se=1017,ce=1018,le=1020,j=35902,ue=35899,de=1021,fe=1022,pe=1023,me=1026,he=1027,ge=1028,_e=1029,ve=1030,ye=1031,be=1033,xe=33776,Se=33777,Ce=33778,we=33779,Te=35840,Ee=35841,De=35842,Oe=35843,ke=36196,Ae=37492,je=37496,Me=37488,Ne=37489,Pe=37490,Fe=37491,Ie=37808,M=37809,Le=37810,Re=37811,ze=37812,N=37813,Be=37814,P=37815,Ve=37816,He=37817,Ue=37818,We=37819,Ge=37820,Ke=37821,qe=36492,Je=36494,Ye=36495,Xe=36283,Ze=36284,Qe=36285,$e=36286,et=2300,tt=2301,nt=2302,rt=2303,it=2400,at=2401,ot=2402,st=3200,ct=`srgb`,lt=`srgb-linear`,ut=`linear`,dt=`srgb`,ft=7680,pt=35044,mt=35048,ht=2e3;function gt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function _t(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function vt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function yt(){let e=vt(`canvas`);return e.style.display=`block`,e}var bt={};function xt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function St(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function F(...e){e=St(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function I(...e){e=St(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Ct(...e){let t=e.join(` `);t in bt||(bt[t]=!0,F(...e))}function wt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Tt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Et=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Dt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Ot=Math.PI/180,kt=180/Math.PI;function At(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Dt[e&255]+Dt[e>>8&255]+Dt[e>>16&255]+Dt[e>>24&255]+`-`+Dt[t&255]+Dt[t>>8&255]+`-`+Dt[t>>16&15|64]+Dt[t>>24&255]+`-`+Dt[n&63|128]+Dt[n>>8&255]+`-`+Dt[n>>16&255]+Dt[n>>24&255]+Dt[r&255]+Dt[r>>8&255]+Dt[r>>16&255]+Dt[r>>24&255]).toLowerCase()}function L(e,t,n){return Math.max(t,Math.min(n,e))}function jt(e,t){return(e%t+t)%t}function Mt(e,t,n){return(1-n)*e+n*t}function Nt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Pt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var R=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=L(this.x,e.x,t.x),this.y=L(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=L(this.x,e,t),this.y=L(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(L(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(L(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ft=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:F(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(L(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},z=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Lt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Lt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=L(this.x,e.x,t.x),this.y=L(this.y,e.y,t.y),this.z=L(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=L(this.x,e,t),this.y=L(this.y,e,t),this.z=L(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(L(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return It.copy(this).projectOnVector(e),this.sub(It)}reflect(e){return this.sub(It.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(L(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},It=new z,Lt=new Ft,B=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Ct(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Rt.makeScale(e,t)),this}rotate(e){return Ct(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Rt.makeRotation(-e)),this}translate(e,t){return Ct(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Rt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Rt=new B,zt=new B().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bt=new B().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vt(){let e={enabled:!0,workingColorSpace:lt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Ut(e.r),e.g=Ut(e.g),e.b=Ut(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Wt(e.r),e.g=Wt(e.g),e.b=Wt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?ut:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ct(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ct(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[lt]:{primaries:t,whitePoint:r,transfer:ut,toXYZ:zt,fromXYZ:Bt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ct},outputColorSpaceConfig:{drawingBufferColorSpace:ct}},[ct]:{primaries:t,whitePoint:r,transfer:dt,toXYZ:zt,fromXYZ:Bt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ct}}}),e}var Ht=Vt();function Ut(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Wt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Gt,Kt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Gt===void 0&&(Gt=vt(`canvas`)),Gt.width=e.width,Gt.height=e.height;let t=Gt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Gt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=vt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Ut(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Ut(t[e]/255)*255):t[e]=Ut(t[e]);return{data:t,width:e.width,height:e.height}}return F(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},qt=0,Jt=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qt++}),this.uuid=At(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Yt(r[t].image)):e.push(Yt(r[t]))}else e=Yt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Yt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Kt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(F(`Texture: Unable to serialize Texture.`),{})}var Xt=0,Zt=new z,Qt=class e extends Et{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=S,i=S,a=D,o=k,s=pe,c=A,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xt++}),this.uuid=At(),this.name=``,this.source=new Jt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new R(0,0),this.repeat=new R(1,1),this.center=new R(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new B,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Zt).x}get height(){return this.source.getSize(Zt).y}get depth(){return this.source.getSize(Zt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){F(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){F(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case x:e.x-=Math.floor(e.x);break;case S:e.x=e.x<0?0:1;break;case C:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case x:e.y-=Math.floor(e.y);break;case S:e.y=e.y<0?0:1;break;case C:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Qt.DEFAULT_IMAGE=null,Qt.DEFAULT_MAPPING=300,Qt.DEFAULT_ANISOTROPY=1;var $t=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=L(this.x,e.x,t.x),this.y=L(this.y,e.y,t.y),this.z=L(this.z,e.z,t.z),this.w=L(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=L(this.x,e,t),this.y=L(this.y,e,t),this.z=L(this.z,e,t),this.w=L(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(L(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},en=class extends Et{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:D,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new $t(0,0,e,t),this.scissorTest=!1,this.viewport=new $t(0,0,e,t),this.textures=[];let r=new Qt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:D,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Jt(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},tn=class extends en{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},nn=class extends Qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=w,this.minFilter=w,this.wrapR=S,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},rn=class extends Qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=w,this.minFilter=w,this.wrapR=S,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},an=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/on.setFromMatrixColumn(e,0).length(),i=1/on.setFromMatrixColumn(e,1).length(),a=1/on.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cn,e,ln)}lookAt(e,t,n){let r=this.elements;return fn.subVectors(e,t),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),un.crossVectors(n,fn),un.lengthSq()===0&&(Math.abs(n.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),un.crossVectors(n,fn)),un.normalize(),dn.crossVectors(fn,un),r[0]=un.x,r[4]=dn.x,r[8]=fn.x,r[1]=un.y,r[5]=dn.y,r[9]=fn.y,r[2]=un.z,r[6]=dn.z,r[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],ne=r[3],re=r[7],ie=r[11],ae=r[15];return i[0]=a*x+o*T+s*k+c*ne,i[4]=a*S+o*E+s*A+c*re,i[8]=a*C+o*D+s*ee+c*ie,i[12]=a*w+o*O+s*te+c*ae,i[1]=l*x+u*T+d*k+f*ne,i[5]=l*S+u*E+d*A+f*re,i[9]=l*C+u*D+d*ee+f*ie,i[13]=l*w+u*O+d*te+f*ae,i[2]=p*x+m*T+h*k+g*ne,i[6]=p*S+m*E+h*A+g*re,i[10]=p*C+m*D+h*ee+g*ie,i[14]=p*w+m*O+h*te+g*ae,i[3]=_*x+v*T+y*k+b*ne,i[7]=_*S+v*E+y*A+b*re,i[11]=_*C+v*D+y*ee+b*ie,i[15]=_*w+v*O+y*te+b*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=on.set(r[0],r[1],r[2]).length(),o=on.set(r[4],r[5],r[6]).length(),s=on.set(r[8],r[9],r[10]).length();i<0&&(a=-a),sn.copy(this);let c=1/a,l=1/o,u=1/s;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=l,sn.elements[5]*=l,sn.elements[6]*=l,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,t.setFromRotationMatrix(sn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=ht,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=ht,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},on=new z,sn=new an,cn=new z(0,0,0),ln=new z(1,1,1),un=new z,dn=new z,fn=new z,pn=new an,mn=new Ft,hn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(L(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-L(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(L(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-L(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(L(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-L(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:F(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return pn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mn.setFromEuler(this),this.setFromQuaternion(mn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};hn.DEFAULT_ORDER=`XYZ`;var gn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},_n=0,vn=new z,yn=new Ft,bn=new an,xn=new z,Sn=new z,Cn=new z,wn=new Ft,Tn=new z(1,0,0),En=new z(0,1,0),Dn=new z(0,0,1),On={type:`added`},kn={type:`removed`},An={type:`childadded`,child:null},jn={type:`childremoved`,child:null},Mn=class e extends Et{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_n++}),this.uuid=At(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new z,n=new hn,r=new Ft,i=new z(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new an},normalMatrix:{value:new B}}),this.matrix=new an,this.matrixWorld=new an,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yn.setFromAxisAngle(e,t),this.quaternion.multiply(yn),this}rotateOnWorldAxis(e,t){return yn.setFromAxisAngle(e,t),this.quaternion.premultiply(yn),this}rotateX(e){return this.rotateOnAxis(Tn,e)}rotateY(e){return this.rotateOnAxis(En,e)}rotateZ(e){return this.rotateOnAxis(Dn,e)}translateOnAxis(e,t){return vn.copy(e).applyQuaternion(this.quaternion),this.position.add(vn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Tn,e)}translateY(e){return this.translateOnAxis(En,e)}translateZ(e){return this.translateOnAxis(Dn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xn.copy(e):xn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Sn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(Sn,xn,this.up):bn.lookAt(xn,Sn,this.up),this.quaternion.setFromRotationMatrix(bn),r&&(bn.extractRotation(r.matrixWorld),yn.setFromRotationMatrix(bn),this.quaternion.premultiply(yn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(I(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(On),An.child=e,this.dispatchEvent(An),An.child=null):I(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(kn),jn.child=e,this.dispatchEvent(jn),jn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bn.multiply(e.parent.matrixWorld)),e.applyMatrix4(bn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(On),An.child=e,this.dispatchEvent(An),An.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sn,e,Cn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sn,wn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Mn.DEFAULT_UP=new z(0,1,0),Mn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Nn=class extends Mn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Pn={type:`move`},Fn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Pn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Nn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},In={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},Rn={h:0,s:0,l:0};function zn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var V=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ht.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ht.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ht.workingColorSpace){if(e=jt(e,1),t=L(t,0,1),n=L(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=zn(i,r,e+1/3),this.g=zn(i,r,e),this.b=zn(i,r,e-1/3)}return Ht.colorSpaceToWorking(this,r),this}setStyle(e,t=ct){function n(t){t!==void 0&&parseFloat(t)<1&&F(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:F(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);F(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ct){let n=In[e.toLowerCase()];return n===void 0?F(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ut(e.r),this.g=Ut(e.g),this.b=Ut(e.b),this}copyLinearToSRGB(e){return this.r=Wt(e.r),this.g=Wt(e.g),this.b=Wt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ct){return Ht.workingToColorSpace(Bn.copy(this),e),Math.round(L(Bn.r*255,0,255))*65536+Math.round(L(Bn.g*255,0,255))*256+Math.round(L(Bn.b*255,0,255))}getHexString(e=ct){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ht.workingColorSpace){Ht.workingToColorSpace(Bn.copy(this),t);let n=Bn.r,r=Bn.g,i=Bn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Ht.workingColorSpace){return Ht.workingToColorSpace(Bn.copy(this),t),e.r=Bn.r,e.g=Bn.g,e.b=Bn.b,e}getStyle(e=ct){Ht.workingToColorSpace(Bn.copy(this),e);let t=Bn.r,n=Bn.g,r=Bn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Ln),this.setHSL(Ln.h+e,Ln.s+t,Ln.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ln),e.getHSL(Rn);let n=Mt(Ln.h,Rn.h,t),r=Mt(Ln.s,Rn.s,t),i=Mt(Ln.l,Rn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Bn=new V;V.NAMES=In;var Vn=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new V(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Hn=class extends Mn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Un=new z,Wn=new z,Gn=new z,Kn=new z,qn=new z,Jn=new z,Yn=new z,Xn=new z,Zn=new z,Qn=new z,$n=new $t,er=new $t,tr=new $t,nr=class e{constructor(e=new z,t=new z,n=new z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Un.subVectors(e,t),r.cross(Un);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Un.subVectors(r,t),Wn.subVectors(n,t),Gn.subVectors(e,t);let a=Un.dot(Un),o=Un.dot(Wn),s=Un.dot(Gn),c=Wn.dot(Wn),l=Wn.dot(Gn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Kn)!==null&&Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Kn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Kn.x),s.addScaledVector(a,Kn.y),s.addScaledVector(o,Kn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return $n.setScalar(0),er.setScalar(0),tr.setScalar(0),$n.fromBufferAttribute(e,t),er.fromBufferAttribute(e,n),tr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector($n,i.x),a.addScaledVector(er,i.y),a.addScaledVector(tr,i.z),a}static isFrontFacing(e,t,n,r){return Un.subVectors(n,t),Wn.subVectors(e,t),Un.cross(Wn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Un.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),Un.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;qn.subVectors(r,n),Jn.subVectors(i,n),Xn.subVectors(e,n);let s=qn.dot(Xn),c=Jn.dot(Xn);if(s<=0&&c<=0)return t.copy(n);Zn.subVectors(e,r);let l=qn.dot(Zn),u=Jn.dot(Zn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(qn,a);Qn.subVectors(e,i);let f=qn.dot(Qn),p=Jn.dot(Qn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Jn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Yn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Yn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(qn,a).addScaledVector(Jn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},rr=class{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ar.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ar.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ar.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,ar):ar.fromBufferAttribute(r,t),ar.applyMatrix4(e.matrixWorld),this.expandByPoint(ar);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),or.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),or.copy(e.boundingBox)),or.applyMatrix4(e.matrixWorld),this.union(or)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ar),ar.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pr),mr.subVectors(this.max,pr),sr.subVectors(e.a,pr),cr.subVectors(e.b,pr),lr.subVectors(e.c,pr),ur.subVectors(cr,sr),dr.subVectors(lr,cr),fr.subVectors(sr,lr);let t=[0,-ur.z,ur.y,0,-dr.z,dr.y,0,-fr.z,fr.y,ur.z,0,-ur.x,dr.z,0,-dr.x,fr.z,0,-fr.x,-ur.y,ur.x,0,-dr.y,dr.x,0,-fr.y,fr.x,0];return!_r(t,sr,cr,lr,mr)||(t=[1,0,0,0,1,0,0,0,1],!_r(t,sr,cr,lr,mr))?!1:(hr.crossVectors(ur,dr),t=[hr.x,hr.y,hr.z],_r(t,sr,cr,lr,mr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ar).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ar).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ir[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ir[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ir[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ir[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ir[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ir[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ir[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ir[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ir),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ir=[new z,new z,new z,new z,new z,new z,new z,new z],ar=new z,or=new rr,sr=new z,cr=new z,lr=new z,ur=new z,dr=new z,fr=new z,pr=new z,mr=new z,hr=new z,gr=new z;function _r(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){gr.fromArray(e,a);let o=i.x*Math.abs(gr.x)+i.y*Math.abs(gr.y)+i.z*Math.abs(gr.z),s=t.dot(gr),c=n.dot(gr),l=r.dot(gr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var vr=new z,yr=new R,br=0,xr=class extends Et{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:br++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=pt,this.updateRanges=[],this.gpuType=ae,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)yr.fromBufferAttribute(this,t),yr.applyMatrix3(e),this.setXY(t,yr.x,yr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyMatrix3(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyMatrix4(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyNormalMatrix(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.transformDirection(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Nt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Nt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Nt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Nt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Nt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array),i=Pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},Sr=class extends xr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Cr=class extends xr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},wr=class extends xr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Tr=new rr,Er=new z,Dr=new z,Or=class{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Tr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);let t=Er.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Er,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(Dr)),this.expandByPoint(Er.copy(e.center).sub(Dr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},kr=0,Ar=new an,jr=new Mn,Mr=new z,Nr=new rr,Pr=new rr,Fr=new z,Ir=class e extends Et{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kr++}),this.uuid=At(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(gt(e)?Cr:Sr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new B().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ar.makeRotationFromQuaternion(e),this.applyMatrix4(Ar),this}rotateX(e){return Ar.makeRotationX(e),this.applyMatrix4(Ar),this}rotateY(e){return Ar.makeRotationY(e),this.applyMatrix4(Ar),this}rotateZ(e){return Ar.makeRotationZ(e),this.applyMatrix4(Ar),this}translate(e,t,n){return Ar.makeTranslation(e,t,n),this.applyMatrix4(Ar),this}scale(e,t,n){return Ar.makeScale(e,t,n),this.applyMatrix4(Ar),this}lookAt(e){return jr.lookAt(e),jr.updateMatrix(),this.applyMatrix4(jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mr).negate(),this.translate(Mr.x,Mr.y,Mr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new wr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&F(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){I(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Nr.setFromBufferAttribute(n),this.morphTargetsRelative?(Fr.addVectors(this.boundingBox.min,Nr.min),this.boundingBox.expandByPoint(Fr),Fr.addVectors(this.boundingBox.max,Nr.max),this.boundingBox.expandByPoint(Fr)):(this.boundingBox.expandByPoint(Nr.min),this.boundingBox.expandByPoint(Nr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&I(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Or);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){I(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new z,1/0);return}if(e){let n=this.boundingSphere.center;if(Nr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Pr.setFromBufferAttribute(n),this.morphTargetsRelative?(Fr.addVectors(Nr.min,Pr.min),Nr.expandByPoint(Fr),Fr.addVectors(Nr.max,Pr.max),Nr.expandByPoint(Fr)):(Nr.expandByPoint(Pr.min),Nr.expandByPoint(Pr.max))}Nr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Fr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Fr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Fr.fromBufferAttribute(a,t),o&&(Mr.fromBufferAttribute(e,t),Fr.add(Mr)),r=Math.max(r,n.distanceToSquared(Fr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&I(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){I(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new xr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new z,s[e]=new z;let c=new z,l=new z,u=new z,d=new R,f=new R,p=new R,m=new z,h=new z;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new z,y=new z,b=new z,x=new z;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new xr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new z,i=new z,a=new z,o=new z,s=new z,c=new z,l=new z,u=new z;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Fr.fromBufferAttribute(e,t),Fr.normalize(),e.setXYZ(t,Fr.x,Fr.y,Fr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new xr(a,r,i)}if(this.index===null)return F(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Lr=0,Rr=class extends Et{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lr++}),this.uuid=At(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new V(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ft,this.stencilZFail=ft,this.stencilZPass=ft,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){F(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){F(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new V().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new R().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new R().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},zr=new z,Br=new z,Vr=new z,Hr=new z,Ur=new z,Wr=new z,Gr=new z,Kr=class{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=zr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zr.copy(this.origin).addScaledVector(this.direction,t),zr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Br.copy(e).add(t).multiplyScalar(.5),Vr.copy(t).sub(e).normalize(),Hr.copy(this.origin).sub(Br);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Vr),o=Hr.dot(this.direction),s=-Hr.dot(Vr),c=Hr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Br).addScaledVector(Vr,d),f}intersectSphere(e,t){zr.subVectors(e.center,this.origin);let n=zr.dot(this.direction),r=zr.dot(zr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,zr)!==null}intersectTriangle(e,t,n,r,i){Ur.subVectors(t,e),Wr.subVectors(n,e),Gr.crossVectors(Ur,Wr);let a=this.direction.dot(Gr),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Hr.subVectors(this.origin,e);let s=o*this.direction.dot(Wr.crossVectors(Hr,Wr));if(s<0)return null;let c=o*this.direction.dot(Ur.cross(Hr));if(c<0||s+c>a)return null;let l=-o*Hr.dot(Gr);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qr=class extends Rr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new V(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Jr=new an,Yr=new Kr,Xr=new Or,Zr=new z,Qr=new z,$r=new z,ei=new z,ti=new z,ni=new z,ri=new z,ii=new z,ai=class extends Mn{constructor(e=new Ir,t=new qr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ni.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(ti.fromBufferAttribute(s,e),a?ni.addScaledVector(ti,r):ni.addScaledVector(ti.sub(t),r))}t.add(ni)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(i),Yr.copy(e.ray).recast(e.near),!(Xr.containsPoint(Yr.origin)===!1&&(Yr.intersectSphere(Xr,Zr)===null||Yr.origin.distanceToSquared(Zr)>(e.far-e.near)**2))&&(Jr.copy(i).invert(),Yr.copy(e.ray).applyMatrix4(Jr),(n.boundingBox===null||Yr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Yr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=si(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=si(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=si(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=si(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function oi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ii.copy(s),ii.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ii);return l<n.near||l>n.far?null:{distance:l,point:ii.clone(),object:e}}function si(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Qr),e.getVertexPosition(c,$r),e.getVertexPosition(l,ei);let u=oi(e,t,n,r,Qr,$r,ei,ri);if(u){let e=new z;nr.getBarycoord(ri,Qr,$r,ei,e),i&&(u.uv=nr.getInterpolatedAttribute(i,s,c,l,e,new R)),a&&(u.uv1=nr.getInterpolatedAttribute(a,s,c,l,e,new R)),o&&(u.normal=nr.getInterpolatedAttribute(o,s,c,l,e,new z),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new z,materialIndex:0};nr.getNormal(Qr,$r,ei,t.normal),u.face=t,u.barycoord=e}return u}var ci=class extends Qt{constructor(e=null,t=1,n=1,r,i,a,o,s,c=w,l=w,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},li=class extends xr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ui=new an,di=new an,fi=[],pi=new rr,mi=new an,hi=new ai,gi=new Or,_i=class extends ai{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new li(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,mi)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new rr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ui),pi.copy(e.boundingBox).applyMatrix4(ui),this.boundingBox.union(pi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Or),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ui),gi.copy(e.boundingSphere).applyMatrix4(ui),this.boundingSphere.union(gi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(hi.geometry=this.geometry,hi.material=this.material,hi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gi.copy(this.boundingSphere),gi.applyMatrix4(n),e.ray.intersectsSphere(gi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,ui),di.multiplyMatrices(n,ui),hi.matrixWorld=di,hi.raycast(e,fi);for(let e=0,n=fi.length;e<n;e++){let n=fi[e];n.instanceId=i,n.object=this,t.push(n)}fi.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new li(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ci(new Float32Array(r*this.count),r,this.count,ge,ae));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},vi=new z,yi=new z,bi=new B,xi=class{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=vi.subVectors(n,t).cross(yi.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(vi),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||bi.getNormalMatrix(e),r=this.coplanarPoint(vi).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Si=new Or,Ci=new R(.5,.5),wi=new z,Ti=class{constructor(e=new xi,t=new xi,n=new xi,r=new xi,i=new xi,a=new xi){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ht,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Si.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Si.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Si)}intersectsSprite(e){return Si.center.set(0,0,0),Si.radius=.7071067811865476+Ci.distanceTo(e.center),Si.applyMatrix4(e.matrixWorld),this.intersectsSphere(Si)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(wi.x=r.normal.x>0?e.max.x:e.min.x,wi.y=r.normal.y>0?e.max.y:e.min.y,wi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(wi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ei=class extends Rr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new V(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Di=new an,Oi=new Kr,ki=new Or,Ai=new z,ji=class extends Mn{constructor(e=new Ir,t=new Ei){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ki.copy(n.boundingSphere),ki.applyMatrix4(r),ki.radius+=i,e.ray.intersectsSphere(ki)===!1)return;Di.copy(r).invert(),Oi.copy(e.ray).applyMatrix4(Di);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Ai.fromBufferAttribute(l,n),Mi(Ai,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Ai.fromBufferAttribute(l,a),Mi(Ai,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Mi(e,t,n,r,i,a,o){let s=Oi.distanceSqToPoint(e);if(s<n){let n=new z;Oi.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ni=class extends Qt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Pi=class extends Qt{constructor(e,t,n=ie,r,i,a,o=w,s=w,c,l=me,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Jt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Fi=class extends Pi{constructor(e,t=ie,n=301,r,i,a=w,o=w,s,c=me){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ii=class extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Li=class e extends Ir{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new wr(c,3)),this.setAttribute(`normal`,new wr(l,3)),this.setAttribute(`uv`,new wr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new z;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ri=class e extends Ir{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new z,l=new R;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new wr(a,3)),this.setAttribute(`normal`,new wr(o,3)),this.setAttribute(`uv`,new wr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},zi=class e extends Ir{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new wr(u,3)),this.setAttribute(`normal`,new wr(d,3)),this.setAttribute(`uv`,new wr(f,2));function _(){let a=new z,_=new z,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new R,m=new z,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Bi=class e extends zi{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Vi=class e extends Ir{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new wr(i,3)),this.setAttribute(`normal`,new wr(i.slice(),3)),this.setAttribute(`uv`,new wr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new z,r=new z,i=new z;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new z;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new z;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new z,t=new z,n=new z,r=new z,o=new R,s=new R,c=new R;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Hi=class e extends Vi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ui=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){F(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new R:new z);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new z,r=[],i=[],a=[],o=new z,s=new an;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new z)}i[0]=new z,a[0]=new z;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(L(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(L(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Wi=class extends Ui{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new R){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Gi=class extends Wi{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Ki(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var qi=new z,Ji=new z,Yi=new Ki,Xi=new Ki,Zi=new Ki,Qi=class extends Ui{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new z){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Ji.subVectors(r[0],r[1]).add(r[0]),c=Ji);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(qi.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=qi),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Yi.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Xi.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Zi.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Yi.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Xi.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Zi.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Yi.calc(s),Xi.calc(s),Zi.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new z().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function $i(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function ea(e,t){let n=1-e;return n*n*t}function ta(e,t){return 2*(1-e)*e*t}function na(e,t){return e*e*t}function ra(e,t,n,r){return ea(e,t)+ta(e,n)+na(e,r)}function ia(e,t){let n=1-e;return n*n*n*t}function aa(e,t){let n=1-e;return 3*n*n*e*t}function oa(e,t){return 3*(1-e)*e*e*t}function sa(e,t){return e*e*e*t}function ca(e,t,n,r,i){return ia(e,t)+aa(e,n)+oa(e,r)+sa(e,i)}var la=class extends Ui{constructor(e=new R,t=new R,n=new R,r=new R){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new R){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ca(e,r.x,i.x,a.x,o.x),ca(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ua=class extends Ui{constructor(e=new z,t=new z,n=new z,r=new z){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new z){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ca(e,r.x,i.x,a.x,o.x),ca(e,r.y,i.y,a.y,o.y),ca(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},da=class extends Ui{constructor(e=new R,t=new R){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new R){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fa=class extends Ui{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new z){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},pa=class extends Ui{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ra(e,r.x,i.x,a.x),ra(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ma=class extends Ui{constructor(e=new z,t=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new z){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ra(e,r.x,i.x,a.x),ra(e,r.y,i.y,a.y),ra(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ha=class extends Ui{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new R){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set($i(o,s.x,c.x,l.x,u.x),$i(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new R().fromArray(n))}return this}},ga=Object.freeze({__proto__:null,ArcCurve:Gi,CatmullRomCurve3:Qi,CubicBezierCurve:la,CubicBezierCurve3:ua,EllipseCurve:Wi,LineCurve:da,LineCurve3:fa,QuadraticBezierCurve:pa,QuadraticBezierCurve3:ma,SplineCurve:ha}),_a=class extends Ui{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new ga[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new ga[n.type]().fromJSON(n))}return this}},va=class extends _a{constructor(e){super(),this.type=`Path`,this.currentPoint=new R,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new da(this.currentPoint.clone(),new R(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new pa(this.currentPoint.clone(),new R(e,t),new R(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new la(this.currentPoint.clone(),new R(e,t),new R(n,r),new R(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new ha([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Wi(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ya=class extends va{constructor(e){super(e),this.uuid=At(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new va().fromJSON(n))}return this}};function ba(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=xa(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=Oa(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return Ca(a,o,n,s,c,l,0),o}function xa(e,t,n,r,i){let a;if(i===Qa(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Ya(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Ya(i/r|0,e[i],e[i+1],a);return a&&Va(a,a.next)&&(Xa(a),a=a.next),a}function Sa(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Va(n,n.next)||Ba(n.prev,n,n.next)===0)){if(Xa(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Ca(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Na(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?Ta(e,r,i,a):wa(e)){t.push(c.i,e.i,l.i),Xa(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=Ea(Sa(e),t),Ca(e,t,n,r,i,a,2)):o===2&&Da(e,t,n,r,i,a):Ca(Sa(e),t,n,r,i,a,1);break}}}function wa(e){let t=e.prev,n=e,r=e.next;if(Ba(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Ra(i,s,a,c,o,l,m.x,m.y)&&Ba(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ta(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Ba(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Fa(p,m,t,n,r),v=Fa(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Ra(s,u,c,d,l,f,y.x,y.y)&&Ba(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Ra(s,u,c,d,l,f,b.x,b.y)&&Ba(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Ra(s,u,c,d,l,f,y.x,y.y)&&Ba(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Ra(s,u,c,d,l,f,b.x,b.y)&&Ba(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Ea(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Va(r,i)&&Ha(r,n,n.next,i)&&Ka(r,i)&&Ka(i,r)&&(t.push(r.i,n.i,i.i),Xa(n),Xa(n.next),n=e=i),n=n.next}while(n!==e);return Sa(n)}function Da(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&za(o,e)){let s=Ja(o,e);o=Sa(o,o.next),s=Sa(s,s.next),Ca(o,t,n,r,i,a,0),Ca(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Oa(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=xa(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Ia(o))}i.sort(ka);for(let e=0;e<i.length;e++)n=Aa(i[e],n);return n}function ka(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function Aa(e,t){let n=ja(e,t);if(!n)return t;let r=Ja(n,e);return Sa(r,r.next),Sa(n,n.next)}function ja(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Va(e,n))return n;do{if(Va(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&La(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Ka(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&Ma(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function Ma(e,t){return Ba(e.prev,e,t.prev)<0&&Ba(t.next,e,e.next)<0}function Na(e,t,n,r){let i=e;do i.z===0&&(i.z=Fa(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,Pa(i)}function Pa(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Fa(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Ia(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function La(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Ra(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&La(e,t,n,r,i,a,o,s)}function za(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Ga(e,t)&&(Ka(e,t)&&Ka(t,e)&&qa(e,t)&&(Ba(e.prev,e,t.prev)||Ba(e,t.prev,t))||Va(e,t)&&Ba(e.prev,e,e.next)>0&&Ba(t.prev,t,t.next)>0)}function Ba(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Va(e,t){return e.x===t.x&&e.y===t.y}function Ha(e,t,n,r){let i=Wa(Ba(e,t,n)),a=Wa(Ba(e,t,r)),o=Wa(Ba(n,r,e)),s=Wa(Ba(n,r,t));return!!(i!==a&&o!==s||i===0&&Ua(e,n,t)||a===0&&Ua(e,r,t)||o===0&&Ua(n,e,r)||s===0&&Ua(n,t,r))}function Ua(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Wa(e){return e>0?1:e<0?-1:0}function Ga(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Ha(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Ka(e,t){return Ba(e.prev,e,e.next)<0?Ba(e,t,e.next)>=0&&Ba(e,e.prev,t)>=0:Ba(e,t,e.prev)<0||Ba(e,e.next,t)<0}function qa(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Ja(e,t){let n=Za(e.i,e.x,e.y),r=Za(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Ya(e,t,n,r){let i=Za(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Xa(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Za(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Qa(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var $a=class{static triangulate(e,t,n=2){return ba(e,t,n)}},eo=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];to(e),no(n,e);let a=e.length;t.forEach(to);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,no(n,t[e]);let o=$a.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function to(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function no(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var ro=class e extends Ir{constructor(e=new ya([new R(.5,.5),new R(-.5,.5),new R(-.5,-.5),new R(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new wr(r,3)),this.setAttribute(`uv`,new wr(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?io:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new z,b=new z,x=new z}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!eo.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];eo.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));if(s<=10000000000000001e-36*c*c){e.splice(r,1),n--;continue}t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||I(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new R(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new R(r/a,i/a)}let ee=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),ee[e]=A(D[e],D[n],D[r]);let te=[],ne,re=ee.concat();for(let e=0,t=E;e<t;e++){let t=w[e];ne=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),ne[e]=A(t[e],t[r],t[i]);te.push(ne),re=re.concat(ne)}let ie;if(p===0)ie=eo.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],ee[t],a);j(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];ne=te[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],ne[e],a);j(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}ie=eo.triangulateShape(e,t)}let ae=ie.length,oe=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],re[e],oe):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),j(x.x,x.y,x.z)):j(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],re[t],oe):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),j(x.x,x.y,x.z)):j(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],ee[e],r);j(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];ne=te[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],ne[e],r);_?j(i.x,i.y+g[s-1].y,g[s-1].x+n):j(i.x,i.y,c+n)}}}se(),ce();function se(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<ae;e++){let n=ie[e];ue(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<ae;e++){let n=ie[e];ue(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<ae;e++){let t=ie[e];ue(t[2],t[1],t[0])}for(let e=0;e<ae;e++){let t=ie[e];ue(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function ce(){let e=r.length/3,t=0;le(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];le(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function le(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);de(t+r+n,t+i+n,t+i+a,t+r+a)}}}function j(e,t,n){a.push(e),a.push(t),a.push(n)}function ue(e,t,i){fe(e),fe(t),fe(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);pe(o[0]),pe(o[1]),pe(o[2])}function de(e,t,i,a){fe(e),fe(t),fe(a),fe(t),fe(i),fe(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);pe(s[0]),pe(s[1]),pe(s[3]),pe(s[1]),pe(s[2]),pe(s[3])}function fe(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function pe(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return ao(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ga[i.type]().fromJSON(i)),new e(r,t.options)}},io={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new R(a,o),new R(s,c),new R(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new R(o,1-c),new R(l,1-d),new R(f,1-m),new R(h,1-_)]:[new R(s,1-c),new R(u,1-d),new R(p,1-m),new R(g,1-_)]}};function ao(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var oo=class e extends Vi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},so=class e extends Vi{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},co=class e extends Ir{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new wr(p,3)),this.setAttribute(`normal`,new wr(m,3)),this.setAttribute(`uv`,new wr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},lo=class e extends Ir{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new z,p=new R;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new wr(s,3)),this.setAttribute(`normal`,new wr(c,3)),this.setAttribute(`uv`,new wr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},uo=class e extends Ir{constructor(e=new ya([new R(0,.5),new R(-.5,-.5),new R(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new wr(r,3)),this.setAttribute(`normal`,new wr(i,3)),this.setAttribute(`uv`,new wr(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;eo.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];eo.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=eo.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return fo(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function fo(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var po=class e extends Ir{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new z,d=new z,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new wr(p,3)),this.setAttribute(`normal`,new wr(m,3)),this.setAttribute(`uv`,new wr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},mo=class e extends Vi{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type=`TetrahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},ho=class e extends Ir{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new z,f=new z,p=new z;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new wr(c,3)),this.setAttribute(`normal`,new wr(l,3)),this.setAttribute(`uv`,new wr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},go=class e extends Ir{constructor(e=new ma(new z(-1,-1,0),new z(-1,1,0),new z(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new z,s=new z,c=new R,l=new z,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new wr(u,3)),this.setAttribute(`normal`,new wr(d,3)),this.setAttribute(`uv`,new wr(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new ga[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function _o(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(yo(i))i.isRenderTargetTexture?(F(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(yo(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function vo(e){let t={};for(let n=0;n<e.length;n++){let r=_o(e[n]);for(let e in r)t[e]=r[e]}return t}function yo(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function bo(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function xo(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ht.workingColorSpace}var So={clone:_o,merge:vo},Co=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wo=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,To=class extends Rr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Co,this.fragmentShader=wo,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_o(e.uniforms),this.uniformsGroups=bo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new V().setHex(r.value);break;case`v2`:this.uniforms[n].value=new R().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new z().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new $t().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new B().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new an().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Eo=class extends To{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Do=class extends Rr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new V(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new V(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new R(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Oo=class extends Rr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new V(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new V(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new R(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ko=class extends Rr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=st,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ao=class extends Rr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function jo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var Mo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},No=class extends Mo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:it,endingEnd:it}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case at:i=e,o=2*t-n;break;case ot:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case at:a=e,s=2*n-t;break;case ot:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Po=class extends Mo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Fo=class extends Mo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Io=class extends Mo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},Lo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=jo(t,this.TimeBufferType),this.values=jo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:jo(e.times,Array),values:jo(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Po(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new No(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Io(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case et:t=this.InterpolantFactoryMethodDiscrete;break;case tt:t=this.InterpolantFactoryMethodLinear;break;case nt:t=this.InterpolantFactoryMethodSmooth;break;case rt:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return F(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return et;case this.InterpolantFactoryMethodLinear:return tt;case this.InterpolantFactoryMethodSmooth:return nt;case this.InterpolantFactoryMethodBezier:return rt}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(I(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(I(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){I(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){I(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&_t(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){I(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===nt,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Lo.prototype.ValueTypeName=``,Lo.prototype.TimeBufferType=Float32Array,Lo.prototype.ValueBufferType=Float32Array,Lo.prototype.DefaultInterpolation=tt;var Ro=class extends Lo{constructor(e,t,n){super(e,t,n)}};Ro.prototype.ValueTypeName=`bool`,Ro.prototype.ValueBufferType=Array,Ro.prototype.DefaultInterpolation=et,Ro.prototype.InterpolantFactoryMethodLinear=void 0,Ro.prototype.InterpolantFactoryMethodSmooth=void 0;var zo=class extends Lo{constructor(e,t,n,r){super(e,t,n,r)}};zo.prototype.ValueTypeName=`color`;var Bo=class extends Lo{constructor(e,t,n,r){super(e,t,n,r)}};Bo.prototype.ValueTypeName=`number`;var Vo=class extends Mo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Ft.slerpFlat(i,0,a,c-o,a,c,s);return i}},Ho=class extends Lo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Vo(this.times,this.values,this.getValueSize(),e)}};Ho.prototype.ValueTypeName=`quaternion`,Ho.prototype.InterpolantFactoryMethodSmooth=void 0;var Uo=class extends Lo{constructor(e,t,n){super(e,t,n)}};Uo.prototype.ValueTypeName=`string`,Uo.prototype.ValueBufferType=Array,Uo.prototype.DefaultInterpolation=et,Uo.prototype.InterpolantFactoryMethodLinear=void 0,Uo.prototype.InterpolantFactoryMethodSmooth=void 0;var Wo=class extends Lo{constructor(e,t,n,r){super(e,t,n,r)}};Wo.prototype.ValueTypeName=`vector`;var Go=class extends Mn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new V(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ko=class extends Go{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new V(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},qo=new an,Jo=new z,Yo=new z,Xo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new R(512,512),this.mapType=A,this.map=null,this.mapPass=null,this.matrix=new an,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ti,this._frameExtents=new R(1,1),this._viewportCount=1,this._viewports=[new $t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Jo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jo),Yo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yo),t.updateMatrixWorld(),qo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Zo=new z,Qo=new Ft,$o=new z,es=class extends Mn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new an,this.projectionMatrix=new an,this.projectionMatrixInverse=new an,this.coordinateSystem=ht,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Zo,Qo,$o),$o.x===1&&$o.y===1&&$o.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zo,Qo,$o.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Zo,Qo,$o),$o.x===1&&$o.y===1&&$o.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zo,Qo,$o.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ts=new z,ns=new R,rs=new R,is=class extends es{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=kt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ot*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return kt*2*Math.atan(Math.tan(Ot*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ts.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ts.x,ts.y).multiplyScalar(-e/ts.z),ts.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ts.x,ts.y).multiplyScalar(-e/ts.z)}getViewSize(e,t){return this.getViewBounds(e,ns,rs),t.subVectors(rs,ns)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ot*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},as=class extends es{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},os=class extends Xo{constructor(){super(new as(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ss=class extends Go{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.target=new Mn,this.shadow=new os}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},cs=class extends Go{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},ls=-90,us=1,ds=class extends Mn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new is(ls,us,e,t);r.layers=this.layers,this.add(r);let i=new is(ls,us,e,t);i.layers=this.layers,this.add(i);let a=new is(ls,us,e,t);a.layers=this.layers,this.add(a);let o=new is(ls,us,e,t);o.layers=this.layers,this.add(o);let s=new is(ls,us,e,t);s.layers=this.layers,this.add(s);let c=new is(ls,us,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},fs=class extends is{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ps=`\\[\\]\\.:\\/`,ms=RegExp(`[\\[\\]\\.:\\/]`,`g`),hs=`[^\\[\\]\\.:\\/]`,gs=`[^`+ps.replace(`\\.`,``)+`]`,_s=`((?:WC+[\\/:])*)`.replace(`WC`,hs),vs=`(WCOD+)?`.replace(`WCOD`,gs),ys=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,hs),bs=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,hs),xs=RegExp(`^`+_s+vs+ys+bs+`$`),Ss=[`material`,`materials`,`bones`,`map`],Cs=class{constructor(e,t,n){let r=n||ws.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ws=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(ms,``)}static parseTrackName(e){let t=xs.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Ss.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){F(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){I(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){I(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){I(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){I(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){I(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){I(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){I(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;I(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){I(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){I(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ws.Composite=Cs,ws.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ws.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ws.prototype.GetterByBindingType=[ws.prototype._getValue_direct,ws.prototype._getValue_array,ws.prototype._getValue_arrayElement,ws.prototype._getValue_toArray],ws.prototype.SetterByBindingTypeAndVersioning=[[ws.prototype._setValue_direct,ws.prototype._setValue_direct_setNeedsUpdate,ws.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ws.prototype._setValue_array,ws.prototype._setValue_array_setNeedsUpdate,ws.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ws.prototype._setValue_arrayElement,ws.prototype._setValue_arrayElement_setNeedsUpdate,ws.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ws.prototype._setValue_fromArray,ws.prototype._setValue_fromArray_setNeedsUpdate,ws.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ts=new an,Es=class{constructor(e,t,n=0,r=1/0){this.ray=new Kr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new gn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):I(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Ts.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ts),this}intersectObject(e,t=!0,n=[]){return Os(e,this,n,t),n.sort(Ds),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Os(e[r],this,n,t);return n.sort(Ds),n}};function Ds(e,t){return e.distance-t.distance}function Os(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Os(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function ks(e,t,n,r){let i=As(r);switch(n){case de:return e*t;case ge:return e*t/i.components*i.byteLength;case _e:return e*t/i.components*i.byteLength;case ve:return e*t*2/i.components*i.byteLength;case ye:return e*t*2/i.components*i.byteLength;case fe:return e*t*3/i.components*i.byteLength;case pe:return e*t*4/i.components*i.byteLength;case be:return e*t*4/i.components*i.byteLength;case xe:case Se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ce:case we:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ee:case Oe:return Math.max(e,16)*Math.max(t,8)/4;case Te:case De:return Math.max(e,8)*Math.max(t,8)/2;case ke:case Ae:case Me:case Ne:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case je:case Pe:case Fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ie:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case M:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Le:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Re:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ze:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case N:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Be:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case P:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ve:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case He:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ue:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case We:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ge:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ke:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case qe:case Je:case Ye:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Xe:case Ze:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Qe:case $e:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function As(e){switch(e){case A:case ee:return{byteLength:1,components:1};case ne:case te:case oe:return{byteLength:2,components:1};case se:case ce:return{byteLength:2,components:4};case ie:case re:case ae:return{byteLength:4,components:1};case j:case ue:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?F(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);function js(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Ms(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var H={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},U={common:{diffuse:{value:new V(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new B},alphaMap:{value:null},alphaMapTransform:{value:new B},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new B}},envmap:{envMap:{value:null},envMapRotation:{value:new B},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new B}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new B}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new B},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new B},normalScale:{value:new R(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new B},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new B}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new B}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new B}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new V(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new V(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new B},alphaTest:{value:0},uvTransform:{value:new B}},sprite:{diffuse:{value:new V(16777215)},opacity:{value:1},center:{value:new R(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new B},alphaMap:{value:null},alphaMapTransform:{value:new B},alphaTest:{value:0}}},Ns={basic:{uniforms:vo([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.fog]),vertexShader:H.meshbasic_vert,fragmentShader:H.meshbasic_frag},lambert:{uniforms:vo([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.fog,U.lights,{emissive:{value:new V(0)},envMapIntensity:{value:1}}]),vertexShader:H.meshlambert_vert,fragmentShader:H.meshlambert_frag},phong:{uniforms:vo([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.fog,U.lights,{emissive:{value:new V(0)},specular:{value:new V(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:H.meshphong_vert,fragmentShader:H.meshphong_frag},standard:{uniforms:vo([U.common,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.roughnessmap,U.metalnessmap,U.fog,U.lights,{emissive:{value:new V(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:H.meshphysical_vert,fragmentShader:H.meshphysical_frag},toon:{uniforms:vo([U.common,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.gradientmap,U.fog,U.lights,{emissive:{value:new V(0)}}]),vertexShader:H.meshtoon_vert,fragmentShader:H.meshtoon_frag},matcap:{uniforms:vo([U.common,U.bumpmap,U.normalmap,U.displacementmap,U.fog,{matcap:{value:null}}]),vertexShader:H.meshmatcap_vert,fragmentShader:H.meshmatcap_frag},points:{uniforms:vo([U.points,U.fog]),vertexShader:H.points_vert,fragmentShader:H.points_frag},dashed:{uniforms:vo([U.common,U.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:H.linedashed_vert,fragmentShader:H.linedashed_frag},depth:{uniforms:vo([U.common,U.displacementmap]),vertexShader:H.depth_vert,fragmentShader:H.depth_frag},normal:{uniforms:vo([U.common,U.bumpmap,U.normalmap,U.displacementmap,{opacity:{value:1}}]),vertexShader:H.meshnormal_vert,fragmentShader:H.meshnormal_frag},sprite:{uniforms:vo([U.sprite,U.fog]),vertexShader:H.sprite_vert,fragmentShader:H.sprite_frag},background:{uniforms:{uvTransform:{value:new B},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:H.background_vert,fragmentShader:H.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new B}},vertexShader:H.backgroundCube_vert,fragmentShader:H.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:H.cube_vert,fragmentShader:H.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:H.equirect_vert,fragmentShader:H.equirect_frag},distance:{uniforms:vo([U.common,U.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:H.distance_vert,fragmentShader:H.distance_frag},shadow:{uniforms:vo([U.lights,U.fog,{color:{value:new V(0)},opacity:{value:1}}]),vertexShader:H.shadow_vert,fragmentShader:H.shadow_frag}};Ns.physical={uniforms:vo([Ns.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new B},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new B},clearcoatNormalScale:{value:new R(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new B},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new B},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new B},sheen:{value:0},sheenColor:{value:new V(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new B},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new B},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new B},transmissionSamplerSize:{value:new R},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new B},attenuationDistance:{value:0},attenuationColor:{value:new V(0)},specularColor:{value:new V(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new B},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new B},anisotropyVector:{value:new R},anisotropyMap:{value:null},anisotropyMapTransform:{value:new B}}]),vertexShader:H.meshphysical_vert,fragmentShader:H.meshphysical_frag};var Ps={r:0,b:0,g:0},Fs=new an,Is=new B;Is.set(-1,0,0,0,1,0,0,0,1);function Ls(e,t,n,r,i,a){let o=new V(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new ai(new Li(1,1,1),new To({name:`BackgroundCubeMaterial`,uniforms:_o(Ns.backgroundCube.uniforms),vertexShader:Ns.backgroundCube.vertexShader,fragmentShader:Ns.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Fs.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Is),l.material.toneMapped=Ht.getTransfer(i.colorSpace)!==dt,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new ai(new co(2,2),new To({name:`BackgroundMaterial`,uniforms:_o(Ns.background.uniforms),vertexShader:Ns.background.vertexShader,fragmentShader:Ns.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Ht.getTransfer(i.colorSpace)!==dt,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Ps,xo(e)),n.buffers.color.setClear(Ps.r,Ps.g,Ps.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Rs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function zs(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Bs(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(F(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&F(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Vs(e){let t=this,n=null,r=0,i=!1,a=!1,o=new xi,s=new B,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Hs=4,Us=[.125,.215,.35,.446,.526,.582],Ws=20,Gs=256,Ks=new as,qs=new V,Js=null,Ys=0,Xs=0,Zs=!1,Qs=new z,$s=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Qs}=i;Js=this._renderer.getRenderTarget(),Ys=this._renderer.getActiveCubeFace(),Xs=this._renderer.getActiveMipmapLevel(),Zs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=oc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ac(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Js,Ys,Xs),this._renderer.xr.enabled=Zs,e.scissorTest=!1,nc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Js=this._renderer.getRenderTarget(),Ys=this._renderer.getActiveCubeFace(),Xs=this._renderer.getActiveMipmapLevel(),Zs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:D,minFilter:D,generateMipmaps:!1,type:oe,format:pe,colorSpace:lt,depthBuffer:!1},r=tc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tc(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ec(r)),this._blurMaterial=ic(r,e,t),this._ggxMaterial=rc(r,e,t)}return r}_compileMaterial(e){let t=new ai(new Ir,e);this._renderer.compile(t,Ks)}_sceneToCubeUV(e,t,n,r,i){let a=new is(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(qs),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ai(new Li,new qr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(qs),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;nc(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=oc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ac());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;nc(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Ks)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Hs?n-d+Hs:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,nc(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Ks),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,nc(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Ks)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&I(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):Ws;m>Ws&&F(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ws}`);let h=[],g=0;for(let e=0;e<Ws;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];nc(t,3*v*(r>_-Hs?r-_+Hs:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Ks)}};function ec(e){let t=[],n=[],r=[],i=e,a=e-Hs+1+Us.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-Hs?s=Us[o-e+Hs-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Ir;h.setAttribute(`position`,new xr(f,3)),h.setAttribute(`uv`,new xr(p,2)),h.setAttribute(`faceIndex`,new xr(m,1)),r.push(new ai(h,null)),i>Hs&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function tc(e,t,n){let r=new tn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function nc(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function rc(e,t,n){return new To({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Gs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:sc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ic(e,t,n){let r=new Float32Array(Ws),i=new z(0,1,0);return new To({name:`SphericalGaussianBlur`,defines:{n:Ws,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ac(){return new To({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function oc(){return new To({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function sc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var cc=class extends tn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ni(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Li(5,5,5),i=new To({name:`CubemapFromEquirect`,uniforms:_o(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new ai(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=D),new ds(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function lc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new cc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new $s(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new $s(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function uc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ct(`WebGLRenderer: `+e+` extension not supported.`),t}}}function dc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Cr:Sr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function fc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function pc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:I(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function mc(e,t,n){let r=new WeakMap,i=new $t;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new nn(h,p,m,u);g.type=ae,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new R(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function hc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var gc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function _c(e,t,n,r,i,a){let o=new tn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,depthTexture:i?new Pi(t,n):void 0}),s=new tn(t,n,{type:oe,depthBuffer:!1,stencilBuffer:!1}),c=new Ir;c.setAttribute(`position`,new wr([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute(`uv`,new wr([0,2,0,0,2,0],2));let l=new Eo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new ai(c,l),d=new as(-1,1,1,-1,0,1),f=null,p=null,m=!1,h,g=null,_=[],v=!1;this.setSize=function(e,t){o.setSize(e,t),s.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=o.width,n=o.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(m||e.toneMapping===0&&_.length===0)return!1;if(g=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(o),h=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=h,m=!0;let n=o,r=s;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(f!==e.outputColorSpace||p!==e.toneMapping){f=e.outputColorSpace,p=e.toneMapping,l.defines={},Ht.getTransfer(f)===`srgb`&&(l.defines.SRGB_TRANSFER=``);let t=gc[p];t&&(l.defines[t]=``),l.needsUpdate=!0}l.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(g),e.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),c.dispose(),l.dispose()}}var vc=new Qt,yc=new Pi(1,1),bc=new nn,xc=new rn,Sc=new Ni,Cc=[],wc=[],Tc=new Float32Array(16),Ec=new Float32Array(9),Dc=new Float32Array(4);function Oc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Cc[i];if(a===void 0&&(a=new Float32Array(i),Cc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function kc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Ac(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function jc(e,t){let n=wc[t];n===void 0&&(n=new Int32Array(t),wc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Mc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Nc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(kc(n,t))return;e.uniform2fv(this.addr,t),Ac(n,t)}}function Pc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(kc(n,t))return;e.uniform3fv(this.addr,t),Ac(n,t)}}function Fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(kc(n,t))return;e.uniform4fv(this.addr,t),Ac(n,t)}}function Ic(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(kc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ac(n,t)}else{if(kc(n,r))return;Dc.set(r),e.uniformMatrix2fv(this.addr,!1,Dc),Ac(n,r)}}function Lc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(kc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ac(n,t)}else{if(kc(n,r))return;Ec.set(r),e.uniformMatrix3fv(this.addr,!1,Ec),Ac(n,r)}}function Rc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(kc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ac(n,t)}else{if(kc(n,r))return;Tc.set(r),e.uniformMatrix4fv(this.addr,!1,Tc),Ac(n,r)}}function zc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(kc(n,t))return;e.uniform2iv(this.addr,t),Ac(n,t)}}function Vc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(kc(n,t))return;e.uniform3iv(this.addr,t),Ac(n,t)}}function Hc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(kc(n,t))return;e.uniform4iv(this.addr,t),Ac(n,t)}}function Uc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Wc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(kc(n,t))return;e.uniform2uiv(this.addr,t),Ac(n,t)}}function Gc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(kc(n,t))return;e.uniform3uiv(this.addr,t),Ac(n,t)}}function Kc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(kc(n,t))return;e.uniform4uiv(this.addr,t),Ac(n,t)}}function qc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(yc.compareFunction=n.isReversedDepthBuffer()?518:515,a=yc):a=vc,n.setTexture2D(t||a,i)}function Jc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||xc,i)}function Yc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Sc,i)}function Xc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||bc,i)}function Zc(e){switch(e){case 5126:return Mc;case 35664:return Nc;case 35665:return Pc;case 35666:return Fc;case 35674:return Ic;case 35675:return Lc;case 35676:return Rc;case 5124:case 35670:return zc;case 35667:case 35671:return Bc;case 35668:case 35672:return Vc;case 35669:case 35673:return Hc;case 5125:return Uc;case 36294:return Wc;case 36295:return Gc;case 36296:return Kc;case 35678:case 36198:case 36298:case 36306:case 35682:return qc;case 35679:case 36299:case 36307:return Jc;case 35680:case 36300:case 36308:case 36293:return Yc;case 36289:case 36303:case 36311:case 36292:return Xc}}function Qc(e,t){e.uniform1fv(this.addr,t)}function $c(e,t){let n=Oc(t,this.size,2);e.uniform2fv(this.addr,n)}function el(e,t){let n=Oc(t,this.size,3);e.uniform3fv(this.addr,n)}function tl(e,t){let n=Oc(t,this.size,4);e.uniform4fv(this.addr,n)}function nl(e,t){let n=Oc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function rl(e,t){let n=Oc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function il(e,t){let n=Oc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function al(e,t){e.uniform1iv(this.addr,t)}function ol(e,t){e.uniform2iv(this.addr,t)}function sl(e,t){e.uniform3iv(this.addr,t)}function cl(e,t){e.uniform4iv(this.addr,t)}function ll(e,t){e.uniform1uiv(this.addr,t)}function ul(e,t){e.uniform2uiv(this.addr,t)}function dl(e,t){e.uniform3uiv(this.addr,t)}function fl(e,t){e.uniform4uiv(this.addr,t)}function pl(e,t,n){let r=this.cache,i=t.length,a=jc(n,i);kc(r,a)||(e.uniform1iv(this.addr,a),Ac(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?yc:vc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function ml(e,t,n){let r=this.cache,i=t.length,a=jc(n,i);kc(r,a)||(e.uniform1iv(this.addr,a),Ac(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||xc,a[e])}function hl(e,t,n){let r=this.cache,i=t.length,a=jc(n,i);kc(r,a)||(e.uniform1iv(this.addr,a),Ac(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Sc,a[e])}function gl(e,t,n){let r=this.cache,i=t.length,a=jc(n,i);kc(r,a)||(e.uniform1iv(this.addr,a),Ac(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||bc,a[e])}function _l(e){switch(e){case 5126:return Qc;case 35664:return $c;case 35665:return el;case 35666:return tl;case 35674:return nl;case 35675:return rl;case 35676:return il;case 5124:case 35670:return al;case 35667:case 35671:return ol;case 35668:case 35672:return sl;case 35669:case 35673:return cl;case 5125:return ll;case 36294:return ul;case 36295:return dl;case 36296:return fl;case 35678:case 36198:case 36298:case 36306:case 35682:return pl;case 35679:case 36299:case 36307:return ml;case 35680:case 36300:case 36308:case 36293:return hl;case 36289:case 36303:case 36311:case 36292:return gl}}var vl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Zc(t.type)}},yl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_l(t.type)}},bl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},xl=/(\w+)(\])?(\[|\.)?/g;function Sl(e,t){e.seq.push(t),e.map[t.id]=t}function Cl(e,t,n){let r=e.name,i=r.length;for(xl.lastIndex=0;;){let a=xl.exec(r),o=xl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Sl(n,l===void 0?new vl(s,e,t):new yl(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new bl(s),Sl(n,e)),n=e}}}var wl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Cl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Tl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var El=37297,Dl=0;function Ol(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var kl=new B;function Al(e){Ht._getMatrix(kl,Ht.workingColorSpace,e);let t=`mat3( ${kl.elements.map(e=>e.toFixed(4))} )`;switch(Ht.getTransfer(e)){case ut:return[t,`LinearTransferOETF`];case dt:return[t,`sRGBTransferOETF`];default:return F(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function jl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Ol(e.getShaderSource(t),r)}return i}function Ml(e,t){let n=Al(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Nl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Pl(e,t){let n=Nl[t];return n===void 0?(F(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Fl=new z;function Il(){return Ht.getLuminanceCoefficients(Fl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Fl.x.toFixed(4)}, ${Fl.y.toFixed(4)}, ${Fl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Ll(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Bl).join(`
`)}function Rl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function zl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Bl(e){return e!==``}function Vl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ul=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wl(e){return e.replace(Ul,Kl)}var Gl=new Map;function Kl(e,t){let n=H[t];if(n===void 0){let e=Gl.get(t);if(e!==void 0)n=H[e],F(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Wl(n)}var ql=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jl(e){return e.replace(ql,Yl)}function Yl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Xl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Zl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Ql(e){return Zl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var $l={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function eu(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:$l[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var tu={302:`ENVMAP_MODE_REFRACTION`};function nu(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:tu[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var ru={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function iu(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:ru[e.combine]||`ENVMAP_BLENDING_NONE`}function au(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function ou(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Ql(n),l=eu(n),u=nu(n),d=iu(n),f=au(n),p=Ll(n),m=Rl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Bl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Bl).join(`
`),_.length>0&&(_+=`
`)):(g=[Xl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Bl).join(`
`),_=[Xl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:H.tonemapping_pars_fragment,n.toneMapping===0?``:Pl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,H.colorspace_pars_fragment,Ml(`linearToOutputTexel`,n.outputColorSpace),Il(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Bl).join(`
`)),o=Wl(o),o=Vl(o,n),o=Hl(o,n),s=Wl(s),s=Vl(s,n),s=Hl(s,n),o=Jl(o),s=Jl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Tl(i,i.VERTEX_SHADER,y),S=Tl(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=jl(i,x,`vertex`),n=jl(i,S,`fragment`);I(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):F(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new wl(i,h),T=zl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,El)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Dl++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var su=0,cu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new lu(e),t.set(e,n)),n}},lu=class{constructor(e){this.id=su++,this.code=e,this.usedTimes=0}};function uu(e){return e===1030||e===37490||e===36285}function du(e,t,n,r,i,a){let o=new gn,s=new cu,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&F(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Ns[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),ne=h.isInstancedMesh===!0,re=h.isBatchedMesh===!0,ie=!!i.map,ae=!!i.matcap,oe=!!x,se=!!i.aoMap,ce=!!i.lightMap,le=!!i.bumpMap&&i.wireframe===!1,j=!!i.normalMap,ue=!!i.displacementMap,de=!!i.emissiveMap,fe=!!i.metalnessMap,pe=!!i.roughnessMap,me=i.anisotropy>0,he=i.clearcoat>0,ge=i.dispersion>0,_e=i.iridescence>0,ve=i.sheen>0,ye=i.transmission>0,be=me&&!!i.anisotropyMap,xe=he&&!!i.clearcoatMap,Se=he&&!!i.clearcoatNormalMap,Ce=he&&!!i.clearcoatRoughnessMap,we=_e&&!!i.iridescenceMap,Te=_e&&!!i.iridescenceThicknessMap,Ee=ve&&!!i.sheenColorMap,De=ve&&!!i.sheenRoughnessMap,Oe=!!i.specularMap,ke=!!i.specularColorMap,Ae=!!i.specularIntensityMap,je=ye&&!!i.transmissionMap,Me=ye&&!!i.thicknessMap,Ne=!!i.gradientMap,Pe=!!i.alphaMap,Fe=i.alphaTest>0,Ie=!!i.alphaHash,M=!!i.extensions,Le=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Le=e.toneMapping);let Re={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:re,batchingColor:re&&h._colorsTexture!==null,instancing:ne,instancingColor:ne&&h.instanceColor!==null,instancingMorph:ne&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Ht.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ie,matcap:ae,envMap:oe,envMapMode:oe&&x.mapping,envMapCubeUVHeight:S,aoMap:se,lightMap:ce,bumpMap:le,normalMap:j,displacementMap:ue,emissiveMap:de,normalMapObjectSpace:j&&i.normalMapType===1,normalMapTangentSpace:j&&i.normalMapType===0,packedNormalMap:j&&i.normalMapType===0&&uu(i.normalMap.format),metalnessMap:fe,roughnessMap:pe,anisotropy:me,anisotropyMap:be,clearcoat:he,clearcoatMap:xe,clearcoatNormalMap:Se,clearcoatRoughnessMap:Ce,dispersion:ge,iridescence:_e,iridescenceMap:we,iridescenceThicknessMap:Te,sheen:ve,sheenColorMap:Ee,sheenRoughnessMap:De,specularMap:Oe,specularColorMap:ke,specularIntensityMap:Ae,transmission:ye,transmissionMap:je,thicknessMap:Me,gradientMap:Ne,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Pe,alphaTest:Fe,alphaHash:Ie,combine:i.combine,mapUv:ie&&m(i.map.channel),aoMapUv:se&&m(i.aoMap.channel),lightMapUv:ce&&m(i.lightMap.channel),bumpMapUv:le&&m(i.bumpMap.channel),normalMapUv:j&&m(i.normalMap.channel),displacementMapUv:ue&&m(i.displacementMap.channel),emissiveMapUv:de&&m(i.emissiveMap.channel),metalnessMapUv:fe&&m(i.metalnessMap.channel),roughnessMapUv:pe&&m(i.roughnessMap.channel),anisotropyMapUv:be&&m(i.anisotropyMap.channel),clearcoatMapUv:xe&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:Se&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:De&&m(i.sheenRoughnessMap.channel),specularMapUv:Oe&&m(i.specularMap.channel),specularColorMapUv:ke&&m(i.specularColorMap.channel),specularIntensityMapUv:Ae&&m(i.specularIntensityMap.channel),transmissionMapUv:je&&m(i.transmissionMap.channel),thicknessMapUv:Me&&m(i.thicknessMap.channel),alphaMapUv:Pe&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(j||me),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ie||Pe),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&j===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Le,decodeVideoTexture:ie&&i.map.isVideoTexture===!0&&Ht.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:de&&i.emissiveMap.isVideoTexture===!0&&Ht.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:M&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(M&&i.extensions.multiDraw===!0||re)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Re.vertexUv1s=c.has(1),Re.vertexUv2s=c.has(2),Re.vertexUv3s=c.has(3),c.clear(),Re}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Ns[t];n=So.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new ou(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function fu(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function pu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function mu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function hu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t,a){n.length>1&&n.sort(e||pu),r.length>1&&r.sort(t||mu),i.length>1&&i.sort(t||mu),a&&(n.reverse(),r.reverse(),i.reverse())}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function gu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new hu,e.set(t,[i])):n>=r.length?(i=new hu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function _u(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new z,color:new V};break;case`SpotLight`:n={position:new z,direction:new z,color:new V,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new z,color:new V,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new z,skyColor:new V,groundColor:new V};break;case`RectAreaLight`:n={color:new V,position:new z,halfWidth:new z,halfHeight:new z}}return e[t.id]=n,n}}}function vu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new R};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new R};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new R,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var yu=0;function bu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function xu(e){let t=new _u,n=vu(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new z);let i=new z,a=new an,o=new an;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(bu);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=U.LTC_FLOAT_1,r.rectAreaLTC2=U.LTC_FLOAT_2):(r.rectAreaLTC1=U.LTC_HALF_1,r.rectAreaLTC2=U.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=yu++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function Su(e){let t=new xu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Cu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Su(e),t.set(n,[a])):r>=i.length?(a=new Su(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var wu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Eu=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],Du=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],Ou=new an,ku=new z,Au=new z;function ju(e,t,n){let r=new Ti,i=new R,a=new R,o=new $t,s=new ko,c=new Ao,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new To({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new R},radius:{value:4}},vertexShader:wu,fragmentShader:Tu}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Ir;m.setAttribute(`position`,new xr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new ai(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(F(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){F(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){F(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new tn(i.x,i.y,{format:ve,type:oe,minFilter:D,magFilter:D,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Pi(i.x,i.y,ae),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=me,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=w,d.map.depthTexture.magFilter=w}else l.isPointLight?(d.map=new cc(i.x),d.map.depthTexture=new Fi(i.x,ie)):(d.map=new tn(i.x,i.y),d.map.depthTexture=new Pi(i.x,i.y,ie)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=me,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=D,d.map.depthTexture.magFilter=D):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=w,d.map.depthTexture.magFilter=w);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),ku.setFromMatrixPosition(l.matrixWorld),e.position.copy(ku),Au.copy(e.position),Au.add(Eu[t]),e.up.copy(Du[t]),e.lookAt(Au),e.updateMatrixWorld(),n.makeTranslation(-ku.x,-ku.y,-ku.z),Ou.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Ou,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new tn(i.x,i.y,{format:ve,type:oe})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Mu(e,t){function n(){let t=!1,n=new $t,r=null,i=new $t(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?fe(e.DEPTH_TEST):pe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Tt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?fe(e.STENCIL_TEST):pe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new V(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ne=!1,re=0,ie=e.getParameter(e.VERSION);ie.indexOf(`WebGL`)===-1?ie.indexOf(`OpenGL ES`)!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),ne=re>=2):(re=parseFloat(/^WebGL (\d)/.exec(ie)[1]),ne=re>=1);let ae=null,oe={},se=e.getParameter(e.SCISSOR_BOX),ce=e.getParameter(e.VIEWPORT),le=new $t().fromArray(se),j=new $t().fromArray(ce);function ue(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let de={};de[e.TEXTURE_2D]=ue(e.TEXTURE_2D,e.TEXTURE_2D,1),de[e.TEXTURE_CUBE_MAP]=ue(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[e.TEXTURE_2D_ARRAY]=ue(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),de[e.TEXTURE_3D]=ue(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),fe(e.DEPTH_TEST),o.setFunc(3),xe(!1),Se(1),fe(e.CULL_FACE),ye(0);function fe(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function pe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function me(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function he(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ge(t){return h!==t&&(e.useProgram(t),h=t,!0)}let _e={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};_e[103]=e.MIN,_e[104]=e.MAX;let ve={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ye(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(pe(e.BLEND),g=!1);return}if(g===!1&&(fe(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:I(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:I(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:I(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:I(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(_e[n],_e[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ve[r],ve[i],ve[o],ve[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function be(t,n){t.side===2?pe(e.CULL_FACE):fe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),xe(r),t.blending===1&&t.transparent===!1?ye(0):ye(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),we(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?fe(e.SAMPLE_ALPHA_TO_COVERAGE):pe(e.SAMPLE_ALPHA_TO_COVERAGE)}function xe(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function Se(t){t===0?pe(e.CULL_FACE):(fe(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function Ce(t){t!==k&&(ne&&e.lineWidth(t),k=t)}function we(t,n,r){t?(fe(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):pe(e.POLYGON_OFFSET_FILL)}function Te(t){t?fe(e.SCISSOR_TEST):pe(e.SCISSOR_TEST)}function Ee(t){t===void 0&&(t=e.TEXTURE0+te-1),ae!==t&&(e.activeTexture(t),ae=t)}function De(t,n,r){r===void 0&&(r=ae===null?e.TEXTURE0+te-1:ae);let i=oe[r];i===void 0&&(i={type:void 0,texture:void 0},oe[r]=i),(i.type!==t||i.texture!==n)&&(ae!==r&&(e.activeTexture(r),ae=r),e.bindTexture(t,n||de[t]),i.type=t,i.texture=n)}function Oe(){let t=oe[ae];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function ke(){try{e.compressedTexImage2D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Ae(){try{e.compressedTexImage3D(...arguments)}catch(e){I(`WebGLState:`,e)}}function je(){try{e.texSubImage2D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Me(){try{e.texSubImage3D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Ne(){try{e.compressedTexSubImage2D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Pe(){try{e.compressedTexSubImage3D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Fe(){try{e.texStorage2D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Ie(){try{e.texStorage3D(...arguments)}catch(e){I(`WebGLState:`,e)}}function M(){try{e.texImage2D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Le(){try{e.texImage3D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Re(t){return d[t]===void 0?e.getParameter(t):d[t]}function ze(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function N(t){le.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),le.copy(t))}function Be(t){j.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),j.copy(t))}function P(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ve(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function He(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ae=null,oe={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new V(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,le.set(0,0,e.canvas.width,e.canvas.height),j.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:fe,disable:pe,bindFramebuffer:me,drawBuffers:he,useProgram:ge,setBlending:ye,setMaterial:be,setFlipSided:xe,setCullFace:Se,setLineWidth:Ce,setPolygonOffset:we,setScissorTest:Te,activeTexture:Ee,bindTexture:De,unbindTexture:Oe,compressedTexImage2D:ke,compressedTexImage3D:Ae,texImage2D:M,texImage3D:Le,pixelStorei:ze,getParameter:Re,updateUBOMapping:P,uniformBlockBinding:Ve,texStorage2D:Fe,texStorage3D:Ie,texSubImage2D:je,texSubImage3D:Me,compressedTexSubImage2D:Ne,compressedTexSubImage3D:Pe,scissor:N,viewport:Be,reset:He}}function Nu(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new R,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):vt(`canvas`)}function g(e,t,n){let r=1,i=Re(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),F(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&F(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];F(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||F(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?ut:Ht.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function A(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,F(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function ee(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function te(e){let t=e.target;t.removeEventListener(`dispose`,te),re(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function ne(e){let t=e.target;t.removeEventListener(`dispose`,ne),ae(t)}function re(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&ie(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function ie(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function ae(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let oe=0;function se(){oe=0}function ce(){return oe}function le(e){oe=e}function j(){let e=oe;return e>=i.maxTextures&&F(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),oe+=1,e}function ue(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function de(t,i){let a=r.get(t);if(t.isVideoTexture&&M(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)F(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)F(`WebGLRenderer: Texture marked for update but image is incomplete`);else{Ce(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function fe(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){Ce(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function pe(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){Ce(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function me(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){we(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ge={[x]:e.REPEAT,[S]:e.CLAMP_TO_EDGE,[C]:e.MIRRORED_REPEAT},_e={[w]:e.NEAREST,[T]:e.NEAREST_MIPMAP_NEAREST,[E]:e.NEAREST_MIPMAP_LINEAR,[D]:e.LINEAR,[O]:e.LINEAR_MIPMAP_NEAREST,[k]:e.LINEAR_MIPMAP_LINEAR},ve={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ye(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&F(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ge[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ge[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ge[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,_e[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,_e[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ve[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function be(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,te));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ue(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&ie(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function xe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Se(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=xe(n.start,r.width,4),c=xe(t.start,r.width,4);n.start<=i+1&&a===c&&xe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function Ce(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=be(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Ht.getPrimaries(Ht.workingColorSpace),r=o.colorSpace===``?null:Ht.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Le(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);ye(c,o);let h,y=o.mipmaps,x=o.isVideoTexture!==!0,S=f.__version===void 0||l===!0,C=u.dataReady,w=ee(o,t);if(o.isDepthTexture)m=A(o.format===he,o.type),S&&(x?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){x&&S&&n.texStorage2D(e.TEXTURE_2D,w,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],x?C&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else x?(S&&n.texStorage2D(e.TEXTURE_2D,w,m,t.width,t.height),C&&Se(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){x&&S&&n.texStorage3D(e.TEXTURE_2D_ARRAY,w,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(x){if(C){if(o.layerUpdates.size>0){let t=ks(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else F(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else x?C&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data)}else{x&&S&&n.texStorage2D(e.TEXTURE_2D,w,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?x?C&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?F(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):x?C&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(x){if(S&&n.texStorage3D(e.TEXTURE_2D_ARRAY,w,m,t.width,t.height,t.depth),C){if(o.layerUpdates.size>0){let i=ks(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)x?(S&&n.texStorage3D(e.TEXTURE_3D,w,m,t.width,t.height,t.depth),C&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(S){if(x)n.texStorage2D(e.TEXTURE_2D,w,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<w;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(x&&S){let t=Re(y[0]);n.texStorage2D(e.TEXTURE_2D,w,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],x?C&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(x){if(S){let r=Re(t);n.texStorage2D(e.TEXTURE_2D,w,m,r.width,r.height)}C&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function we(t,o,s){if(o.image.length!==6)return;let c=be(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Ht.getPrimaries(Ht.workingColorSpace),r=o.colorSpace===``?null:Ht.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Le(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),S=b(o.internalFormat,y,x,o.normalized,o.colorSpace),C=o.isVideoTexture!==!0,w=u.__version===void 0||c===!0,T=l.dataReady,E=ee(o,h);ye(e.TEXTURE_CUBE_MAP,o);let D;if(f){C&&w&&n.texStorage2D(e.TEXTURE_CUBE_MAP,E,S,h.width,h.height);for(let t=0;t<6;t++){D=m[t].mipmaps;for(let r=0;r<D.length;r++){let i=D[r];o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,S,i.width,i.height,0,y,x,i.data):y===null?F(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,S,i.width,i.height,0,i.data)}}}else{if(D=o.mipmaps,C&&w){D.length>0&&E++;let t=Re(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,E,S,t.width,t.height)}for(let t=0;t<6;t++)if(p){C?T&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,S,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<D.length;r++){let i=D[r].image[t].image;C?T&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,S,i.width,i.height,0,y,x,i.data)}}else{C?T&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,S,y,x,m[t]);for(let r=0;r<D.length;r++){let i=D[r];C?T&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,S,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Te(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ie(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Fe(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ee(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=A(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ie(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Fe(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Fe(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);Ie(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Fe(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Fe(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function De(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,te)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),ye(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else de(i.depthTexture,0);let u=l.__webglTexture,d=Fe(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Ie(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Ie(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Oe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)De(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?De(i.__webglFramebuffer[0],t,0):De(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Ee(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Ee(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ke(t,n,i){let a=r.get(t);n!==void 0&&Te(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Oe(t)}function Ae(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,ne);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Ie(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Fe(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),Ee(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ye(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Te(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Te(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ye(c,a),Te(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ye(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Te(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Te(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&Oe(t)}function je(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let Me=[],Ne=[];function Pe(t){if(t.samples>0){if(Ie(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Me.length=0,Ne.length=0,Me.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(Me.push(l),Ne.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ne)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Me))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Fe(e){return Math.min(i.maxSamples,e.samples)}function Ie(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function M(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Le(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Ht.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&F(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):I(`WebGLTextures: Unsupported texture color space:`,n)),t}function Re(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=j,this.resetTextureUnits=se,this.getTextureUnits=ce,this.setTextureUnits=le,this.setTexture2D=de,this.setTexture2DArray=fe,this.setTexture3D=pe,this.setTextureCube=me,this.rebindTextures=ke,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=je,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=Ie,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Pu(e,t){function n(n,r=``){let i,a=Ht.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Fu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Iu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Lu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ii(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new To({vertexShader:Fu,fragmentShader:Iu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ai(new co(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ru=class extends Et{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Lu,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new R,C=null,w=new is;w.viewport=new $t;let T=new is;T.viewport=new $t;let E=[w,T],D=new fs,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Fn,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Fn,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Fn,b[e]=t),t.getHandSpace()};function ee(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function te(){r.removeEventListener(`select`,ee),r.removeEventListener(`selectstart`,ee),r.removeEventListener(`selectend`,ee),r.removeEventListener(`squeeze`,ee),r.removeEventListener(`squeezestart`,ee),r.removeEventListener(`squeezeend`,ee),r.removeEventListener(`end`,te),r.removeEventListener(`inputsourceschange`,ne);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,k=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&F(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&F(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,ee),r.addEventListener(`selectstart`,ee),r.addEventListener(`selectend`,ee),r.addEventListener(`squeeze`,ee),r.addEventListener(`squeezestart`,ee),r.addEventListener(`squeezeend`,ee),r.addEventListener(`end`,te),r.addEventListener(`inputsourceschange`,ne),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?he:me,a=_.stencil?le:ie);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new tn(d.textureWidth,d.textureHeight,{format:pe,type:A,depthTexture:new Pi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new tn(f.framebufferWidth,f.framebufferHeight,{format:pe,type:A,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),de.setContext(r),de.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ne(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let re=new z,ae=new z;function oe(e,t,n){re.setFromMatrixPosition(t.matrixWorld),ae.setFromMatrixPosition(n.matrixWorld);let r=re.distanceTo(ae),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function se(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||k!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,k=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;se(D,i);for(let e=0;e<a.length;e++)se(a[e],i);a.length===2?oe(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),ce(e,D,i)};function ce(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=kt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let j=null;function ue(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new is,o.layers.enable(n),o.viewport=new $t,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Ii,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}j&&j(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let de=new js;de.setAnimationLoop(ue),this.setAnimationLoop=function(e){j=e},this.dispose=function(){}}},zu=new an,Bu=new B;Bu.set(-1,0,0,0,1,0,0,0,1);function Vu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,xo(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(zu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Bu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Hu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return I(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?F(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):F(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Uu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Wu=null;function Gu(){return Wu===null&&(Wu=new ci(Uu,16,16,ve,oe),Wu.name=`DFG_LUT`,Wu.minFilter=D,Wu.magFilter=D,Wu.wrapS=S,Wu.wrapT=S,Wu.generateMipmaps=!1,Wu.needsUpdate=!0),Wu}var Ku=class{constructor(e={}){let{canvas:t=yt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=A}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([be,ye,_e]),g=new Set([A,ie,ne,le,se,ce]),_=new Uint32Array(4),v=new Int32Array(4),y=new z,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,ee=null,te=null;this._outputColorSpace=ct;let re=0,ae=0,j=null,ue=-1,de=null,fe=new $t,pe=new $t,me=null,he=new V(0),ge=0,ve=t.width,xe=t.height,Se=1,Ce=null,we=null,Te=new $t(0,0,ve,xe),Ee=new $t(0,0,ve,xe),De=!1,Oe=new Ti,ke=!1,Ae=!1,je=new an,Me=new z,Ne=new $t,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Fe=!1;function Ie(){return j===null?Se:1}let M=n;function Le(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r185`),t.addEventListener(`webglcontextlost`,st,!1),t.addEventListener(`webglcontextrestored`,lt,!1),t.addEventListener(`webglcontextcreationerror`,ut,!1),M===null){let t=`webgl2`;if(M=Le(t,e),M===null)throw Le(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}}catch(e){throw I(`WebGLRenderer: `+e.message),e}let Re,ze,N,Be,P,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt,nt,rt,it;function at(){Re=new uc(M),Re.init(),nt=new Pu(M,Re),ze=new Bs(M,Re,e,nt),N=new Mu(M,Re),ze.reversedDepthBuffer&&d&&N.buffers.depth.setReversed(!0),O=M.createFramebuffer(),ee=M.createFramebuffer(),te=M.createFramebuffer(),Be=new pc(M),P=new fu,Ve=new Nu(M,Re,N,P,ze,nt,Be),He=new lc(T),Ue=new Ms(M),rt=new Rs(M,Ue),We=new dc(M,Ue,Be,rt),Ge=new hc(M,We,Ue,rt,Be),$e=new mc(M,ze,Ve),Xe=new Vs(P),Ke=new du(T,He,Re,ze,rt,Xe),qe=new Vu(T,P),Je=new gu,Ye=new Cu(Re),Qe=new Ls(T,He,N,Ge,p,s),Ze=new ju(T,Ge,ze),it=new Hu(M,Be,ze,N),et=new zs(M,Re,Be),tt=new fc(M,Re,Be),Be.programs=Ke.programs,T.capabilities=ze,T.extensions=Re,T.properties=P,T.renderLists=Je,T.shadowMap=Ze,T.state=N,T.info=Be}at(),m!==1009&&(w=new _c(m,t.width,t.height,o,r,i));let ot=new Ru(T,M);this.xr=ot,this.getContext=function(){return M},this.getContextAttributes=function(){return M.getContextAttributes()},this.forceContextLoss=function(){let e=Re.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Re.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return Se},this.setPixelRatio=function(e){e!==void 0&&(Se=e,this.setSize(ve,xe,!1))},this.getSize=function(e){return e.set(ve,xe)},this.setSize=function(e,n,r=!0){if(ot.isPresenting){F(`WebGLRenderer: Can't change size while VR device is presenting.`);return}ve=e,xe=n,t.width=Math.floor(e*Se),t.height=Math.floor(n*Se),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ve*Se,xe*Se).floor()},this.setDrawingBufferSize=function(e,n,r){ve=e,xe=n,Se=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){I(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){F(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(fe)},this.getViewport=function(e){return e.copy(Te)},this.setViewport=function(e,t,n,r){e.isVector4?Te.set(e.x,e.y,e.z,e.w):Te.set(e,t,n,r),N.viewport(fe.copy(Te).multiplyScalar(Se).round())},this.getScissor=function(e){return e.copy(Ee)},this.setScissor=function(e,t,n,r){e.isVector4?Ee.set(e.x,e.y,e.z,e.w):Ee.set(e,t,n,r),N.scissor(pe.copy(Ee).multiplyScalar(Se).round())},this.getScissorTest=function(){return De},this.setScissorTest=function(e){N.setScissorTest(De=e)},this.setOpaqueSort=function(e){Ce=e},this.setTransparentSort=function(e){we=e},this.getClearColor=function(e){return e.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(j!==null){let t=j.texture.format;e=h.has(t)}if(e){let e=j.texture.type,t=g.has(e),n=Qe.getClearColor(),r=Qe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,M.clearBufferuiv(M.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,M.clearBufferiv(M.COLOR,0,v))}else r|=M.COLOR_BUFFER_BIT}t&&(r|=M.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=M.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&M.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,st,!1),t.removeEventListener(`webglcontextrestored`,lt,!1),t.removeEventListener(`webglcontextcreationerror`,ut,!1),Qe.dispose(),Je.dispose(),Ye.dispose(),P.dispose(),He.dispose(),Ge.dispose(),rt.dispose(),it.dispose(),Ke.dispose(),ot.dispose(),ot.removeEventListener(`sessionstart`,vt),ot.removeEventListener(`sessionend`,bt),St.stop()};function st(e){e.preventDefault(),xt(`WebGLRenderer: Context Lost.`),E=!0}function lt(){xt(`WebGLRenderer: Context Restored.`),E=!1;let e=Be.autoReset,t=Ze.enabled,n=Ze.autoUpdate,r=Ze.needsUpdate,i=Ze.type;at(),Be.autoReset=e,Ze.enabled=t,Ze.autoUpdate=n,Ze.needsUpdate=r,Ze.type=i}function ut(e){I(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function dt(e){let t=e.target;t.removeEventListener(`dispose`,dt),ft(t)}function ft(e){pt(e),P.remove(e)}function pt(e){let t=P.get(e).programs;t!==void 0&&(t.forEach(function(e){Ke.releaseProgram(e)}),e.isShaderMaterial&&Ke.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Pe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Mt(e,t,n,r,i);N.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=We.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;rt.setup(i,r,s,n,c);let h,g=et;if(c!==null&&(h=Ue.get(c),g=tt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(N.setLineWidth(r.wireframeLinewidth*Ie()),g.setMode(M.LINES)):g.setMode(M.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),N.setLineWidth(e*Ie()),i.isLineSegments?g.setMode(M.LINES):i.isLineLoop?g.setMode(M.LINE_LOOP):g.setMode(M.LINE_STRIP)}else i.isPoints?g.setMode(M.POINTS):i.isSprite&&g.setMode(M.TRIANGLES);if(i.isBatchedMesh){if(Re.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ue.get(c).bytesPerElement:1,o=P.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(M,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function mt(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,kt(e,t,n),e.side=0,e.needsUpdate=!0,kt(e,t,n),e.side=2):kt(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),x=Ye.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];mt(a,n,e),r.add(a)}else mt(t,n,e),r.add(t)}}),x=C.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){P.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Re.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let gt=null;function _t(e){gt&&gt(e)}function vt(){St.stop()}function bt(){St.start()}let St=new js;St.setAnimationLoop(_t),typeof self<`u`&&St.setContext(self),this.setAnimationLoop=function(e){gt=e,ot.setAnimationLoop(e),e===null?St.stop():St.start()},ot.addEventListener(`sessionstart`,vt),ot.addEventListener(`sessionend`,bt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){I(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=ot.enabled===!0&&ot.isPresenting===!0,r=w!==null&&(j===null||n)&&w.begin(T,j);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(t),t=ot.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,j),x=Ye.get(e,C.length),x.init(t),x.state.textureUnits=Ve.getTextureUnits(),C.push(x),je.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Oe.setFromProjectionMatrix(je,ht,t.reversedDepth),Ae=this.localClippingEnabled,ke=Xe.init(this.clippingPlanes,Ae),b=Je.get(e,S.length),b.init(),S.push(b),ot.enabled===!0&&ot.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&Ct(e,t,-1/0,T.sortObjects)}Ct(e,t,0,T.sortObjects),b.finish(),T.sortObjects===!0&&b.sort(Ce,we,t.reversedDepth),Fe=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,Fe&&Qe.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ke===!0&&Xe.beginShadows();let i=x.state.shadowsArray;if(Ze.render(i,e,t),ke===!0&&Xe.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Et(n,r,e,a)}Fe&&Qe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Tt(b,e,n,n.viewport)}}else r.length>0&&Et(n,r,e,t),Fe&&Qe.render(e),Tt(b,e,t)}j!==null&&ae===0&&(Ve.updateMultisampleRenderTarget(j),Ve.updateRenderTargetMipmap(j)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),rt.resetDefaultState(),ue=-1,de=null,C.pop(),C.length>0?(x=C[C.length-1],Ve.setTextureUnits(x.state.textureUnits),ke===!0&&Xe.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function Ct(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||Oe.intersectsSprite(e)){r&&Ne.setFromMatrixPosition(e.matrixWorld).applyMatrix4(je);let t=Ge.update(e),i=e.material;i.visible&&b.push(e,t,i,n,Ne.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||Oe.intersectsObject(e))){let t=Ge.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),Ne.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ne.copy(e.boundingSphere.center)),Ne.applyMatrix4(e.matrixWorld).applyMatrix4(je)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&b.push(e,t,s,n,Ne.z,o)}}else i.visible&&b.push(e,t,i,n,Ne.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)Ct(i[e],t,n,r)}function Tt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),ke===!0&&Xe.setGlobalState(T.clippingPlanes,n),r&&N.viewport(fe.copy(r)),i.length>0&&Dt(i,t,n),a.length>0&&Dt(a,t,n),o.length>0&&Dt(o,t,n),N.buffers.depth.setTest(!0),N.buffers.depth.setMask(!0),N.buffers.color.setMask(!0),N.setPolygonOffset(!1)}function Et(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Re.has(`EXT_color_buffer_half_float`)||Re.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new tn(1,1,{generateMipmaps:!0,type:e?oe:A,minFilter:k,samples:Math.max(4,ze.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ht.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||fe;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(he),ge=T.getClearAlpha(),ge<1&&T.setClearColor(16777215,.5),T.clear(),Fe&&Qe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),ke===!0&&Xe.setGlobalState(T.clippingPlanes,r),Dt(e,n,r),Ve.updateMultisampleRenderTarget(a),Ve.updateRenderTargetMipmap(a),Re.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Ot(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Ve.updateMultisampleRenderTarget(a),Ve.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(he,ge),d!==void 0&&(r.viewport=d),T.toneMapping=u}function Dt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Ot(o,t,n,s,l,c)}}function Ot(e,t,n,r,i,a){e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function kt(e,t,n){t.isScene!==!0&&(t=Pe);let r=P.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ke.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ke.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=He.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,dt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return L(e,s),d}else s.uniforms=Ke.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ke.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Xe.uniform),L(e,s),r.needsLights=Pt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function At(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=wl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function L(e,t){let n=P.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function jt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function Mt(e,t,n,r,i){t.isScene!==!0&&(t=Pe),Ve.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=j===null?T.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ht.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=He.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=P.get(r),y=x.state.lights;if(ke===!0&&(Ae===!0||e!==de)){let t=e===de&&r.id===ue;Xe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Xe.numPlanes||v.numIntersection!==Xe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=kt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(N.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==ue&&(ue=r.id,w=!0),v.needsLights){let e=jt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||de!==e){N.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(M,`projectionMatrix`,e.projectionMatrix),O.setValue(M,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(M,Me.setFromMatrixPosition(e.matrixWorld)),ze.logarithmicDepthBuffer&&O.setValue(M,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(M,`isOrthographic`,e.isOrthographicCamera===!0),de!==e&&(de=e,w=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&O.setValue(M,`directionalShadowMap`,y.state.directionalShadowMap,Ve),y.state.spotShadowMap.length>0&&O.setValue(M,`spotShadowMap`,y.state.spotShadowMap,Ve),y.state.pointShadowMap.length>0&&O.setValue(M,`pointShadowMap`,y.state.pointShadowMap,Ve)),i.isSkinnedMesh){O.setOptional(M,i,`bindMatrix`),O.setOptional(M,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(M,`boneTexture`,e.boneTexture,Ve))}i.isBatchedMesh&&(O.setOptional(M,i,`batchingTexture`),O.setValue(M,`batchingTexture`,i._matricesTexture,Ve),O.setOptional(M,i,`batchingIdTexture`),O.setValue(M,`batchingIdTexture`,i._indirectTexture,Ve),O.setOptional(M,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(M,`batchingColorTexture`,i._colorsTexture,Ve));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&$e.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(M,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Gu()),w){if(O.setValue(M,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&Nt(k,E),a&&r.fog===!0&&qe.refreshFogUniforms(k,a),qe.refreshMaterialUniforms(k,r,Se,xe,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}wl.upload(M,At(v),k,Ve)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(wl.upload(M,At(v),k,Ve),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(M,`center`,i.center),O.setValue(M,`modelViewMatrix`,i.modelViewMatrix),O.setValue(M,`normalMatrix`,i.normalMatrix),O.setValue(M,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];it.update(n,S),it.bind(n,S)}}return S}function Nt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Pt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return re},this.getActiveMipmapLevel=function(){return ae},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(e,t,n){let r=P.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),P.get(e.texture).__webglTexture=t,P.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=P.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){j=e,re=t,ae=n;let r=null,i=!1,a=!1;if(e){let o=P.get(e);if(o.__useDefaultFramebuffer!==void 0){N.bindFramebuffer(M.FRAMEBUFFER,o.__webglFramebuffer),fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest,N.viewport(fe),N.scissor(pe),N.setScissorTest(me),ue=-1;return}if(o.__webglFramebuffer===void 0)Ve.setupRenderTarget(e);else if(o.__hasExternalTextures)Ve.rebindTextures(e,P.get(e.texture).__webglTexture,P.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&P.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Ve.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=P.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Ve.useMultisampledRTT(e)===!1?P.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest}else fe.copy(Te).multiplyScalar(Se).floor(),pe.copy(Ee).multiplyScalar(Se).floor(),me=De;if(n!==0&&(r=O),N.bindFramebuffer(M.FRAMEBUFFER,r)&&N.drawBuffers(e,r),N.viewport(fe),N.scissor(pe),N.setScissorTest(me),i){let r=P.get(e.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=P.get(e.textures[t]);M.framebufferTextureLayer(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=P.get(e.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,t.__webglTexture,n)}ue=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){I(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=P.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){N.bindFramebuffer(M.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&M.readBuffer(M.COLOR_ATTACHMENT0+s),!ze.textureFormatReadable(c)){I(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!ze.textureTypeReadable(l)){I(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&M.readPixels(t,n,r,i,nt.convert(c),nt.convert(l),a)}finally{let e=j===null?null:P.get(j).__webglFramebuffer;N.bindFramebuffer(M.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=P.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){N.bindFramebuffer(M.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&M.readBuffer(M.COLOR_ATTACHMENT0+s),!ze.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!ze.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=M.createBuffer();M.bindBuffer(M.PIXEL_PACK_BUFFER,d),M.bufferData(M.PIXEL_PACK_BUFFER,a.byteLength,M.STREAM_READ),M.readPixels(t,n,r,i,nt.convert(l),nt.convert(u),0);let f=j===null?null:P.get(j).__webglFramebuffer;N.bindFramebuffer(M.FRAMEBUFFER,f);let p=M.fenceSync(M.SYNC_GPU_COMMANDS_COMPLETE,0);return M.flush(),await wt(M,p,4),M.bindBuffer(M.PIXEL_PACK_BUFFER,d),M.getBufferSubData(M.PIXEL_PACK_BUFFER,0,a),M.deleteBuffer(d),M.deleteSync(p),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Ve.setTexture2D(e,0),M.copyTexSubImage2D(M.TEXTURE_2D,n,0,0,o,s,i,a),N.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=nt.convert(t.format),_=nt.convert(t.type),v;t.isData3DTexture?(Ve.setTexture3D(t,0),v=M.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Ve.setTexture2DArray(t,0),v=M.TEXTURE_2D_ARRAY):(Ve.setTexture2D(t,0),v=M.TEXTURE_2D),N.activeTexture(M.TEXTURE0),N.pixelStorei(M.UNPACK_FLIP_Y_WEBGL,t.flipY),N.pixelStorei(M.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),N.pixelStorei(M.UNPACK_ALIGNMENT,t.unpackAlignment);let y=N.getParameter(M.UNPACK_ROW_LENGTH),b=N.getParameter(M.UNPACK_IMAGE_HEIGHT),x=N.getParameter(M.UNPACK_SKIP_PIXELS),S=N.getParameter(M.UNPACK_SKIP_ROWS),C=N.getParameter(M.UNPACK_SKIP_IMAGES);N.pixelStorei(M.UNPACK_ROW_LENGTH,h.width),N.pixelStorei(M.UNPACK_IMAGE_HEIGHT,h.height),N.pixelStorei(M.UNPACK_SKIP_PIXELS,l),N.pixelStorei(M.UNPACK_SKIP_ROWS,u),N.pixelStorei(M.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=P.get(e),r=P.get(t),h=P.get(n.__renderTarget),g=P.get(r.__renderTarget);N.bindFramebuffer(M.READ_FRAMEBUFFER,h.__webglFramebuffer),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,P.get(e).__webglTexture,i,d+n),M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,P.get(t).__webglTexture,a,m+n)),M.blitFramebuffer(l,u,o,s,f,p,o,s,M.DEPTH_BUFFER_BIT,M.NEAREST);N.bindFramebuffer(M.READ_FRAMEBUFFER,null),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||P.has(e)){let n=P.get(e),r=P.get(t);N.bindFramebuffer(M.READ_FRAMEBUFFER,ee),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,te);for(let e=0;e<c;e++)w?M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):M.framebufferTexture2D(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,n.__webglTexture,i),T?M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):M.framebufferTexture2D(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,r.__webglTexture,a),i===0?T?M.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):M.copyTexSubImage2D(v,a,f,p,l,u,o,s):M.blitFramebuffer(l,u,o,s,f,p,o,s,M.COLOR_BUFFER_BIT,M.NEAREST);N.bindFramebuffer(M.READ_FRAMEBUFFER,null),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?M.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?M.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):M.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?M.texSubImage2D(M.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?M.compressedTexSubImage2D(M.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):M.texSubImage2D(M.TEXTURE_2D,a,f,p,o,s,g,_,h);N.pixelStorei(M.UNPACK_ROW_LENGTH,y),N.pixelStorei(M.UNPACK_IMAGE_HEIGHT,b),N.pixelStorei(M.UNPACK_SKIP_PIXELS,x),N.pixelStorei(M.UNPACK_SKIP_ROWS,S),N.pixelStorei(M.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&M.generateMipmap(v),N.unbindTexture()},this.initRenderTarget=function(e){P.get(e).__webglFramebuffer===void 0&&Ve.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Ve.setTextureCube(e,0):e.isData3DTexture?Ve.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Ve.setTexture2DArray(e,0):Ve.setTexture2D(e,0),N.unbindTexture()},this.resetState=function(){re=0,ae=0,j=null,N.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return ht}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ht._getUnpackColorSpace()}};function qu(e,t,n,r={}){let i=new _i(e,new Do({color:t,roughness:r.roughness??.8,emissive:r.emissive?t:0,emissiveIntensity:r.emissive?.8:0,transparent:r.transparent??!1,opacity:r.opacity??1}),n);return i.instanceMatrix.setUsage(mt),i.count=0,i.frustumCulled=!1,i}var Ju=new Mn,Yu=new V,Xu={scale:1,y:0,yaw:0},Zu=class{root=new Nn;byIndex=[];nameToIndex=new Map;hpBg;hpFill;hpCapacity;drawn=0;constructor(e,t=256){e.forEach((e,t)=>this.nameToIndex.set(e,t)),this.hpCapacity=t;let n=new co(1,.12);this.hpBg=new _i(n,new qr({color:1118481,transparent:!0,opacity:.8,depthWrite:!1}),t),this.hpFill=new _i(n,new qr({color:6280031,depthWrite:!1}),t);for(let e of[this.hpBg,this.hpFill])e.instanceMatrix.setUsage(mt),e.count=0,e.frustumCulled=!1,e.renderOrder=10;this.root.add(this.hpBg,this.hpFill)}register(e,t){let n=this.nameToIndex.get(e);if(n===void 0)throw Error(`Archetype '${e}' is not in the world's archetype list`);let r=t.maxInstances??128,i;t.material?(i=new _i(t.geometry,t.material,r),i.instanceMatrix.setUsage(mt),i.count=0,i.frustumCulled=!1):i=qu(t.geometry,t.color??16777215,r,{emissive:t.emissive}),t.geometry.boundingBox||t.geometry.computeBoundingBox();let a=t.geometry.boundingBox,o=t.yOffset??-a.min.y*(t.scale??1),s={visual:{...t,maxInstances:r,yOffset:o,scale:t.scale??1,faceYaw:t.faceYaw??!0,bob:t.bob??0,bobStyle:t.bobStyle??`walk`,hpBar:t.hpBar??!1},mesh:i,baseColor:new V(t.color??16777215),hasTint:!!t.tint};if(s.hasTint)for(let e=0;e<r;e++)i.setColorAt(e,s.baseColor);return this.byIndex[n]=s,this.root.add(i),i}isRegistered(e){let t=this.nameToIndex.get(e);return t!==void 0&&this.byIndex[t]!==void 0}update(e,t){for(let e of this.byIndex)e&&(e.mesh.count=0);let n=0;this.drawn=0;for(let r=0;r<e.count;r++){let i=this.byIndex[e.arch[r]];if(!i||e.flags[r]&o.HIDDEN)continue;let a=i.mesh.count;if(a>=i.visual.maxInstances)continue;let s=i.visual,c=e.x[r],l=e.z[r];if(Xu.scale=s.scale,Xu.y=s.yOffset,Xu.yaw=s.faceYaw?-e.yaw[r]:0,s.bob>0){let n=t*(s.bobStyle===`hover`?5:9)+e.id[r]*.7;Xu.y+=(s.bobStyle===`hover`?Math.sin(n):Math.abs(Math.sin(n)))*s.bob}s.pose?.(e,r,Xu,t);let u=Xu.y;if(Ju.position.set(c,u,l),Ju.rotation.set(0,Xu.yaw,0),Ju.scale.setScalar(Xu.scale),Ju.updateMatrix(),i.mesh.setMatrixAt(a,Ju.matrix),i.hasTint&&(s.tint(e,r,Yu)?i.mesh.setColorAt(a,Yu):i.mesh.setColorAt(a,i.baseColor)),i.mesh.count=a+1,this.drawn++,s.hpBar&&n<this.hpCapacity){let t=e.hp[r],i=e.maxHp[r];if(i>0&&t<i&&t>0){let e=t/i,r=u+1.4*Xu.scale;Ju.position.set(c,r,l),Ju.rotation.set(-Math.PI/4,Math.PI/4,0,`YXZ`),Ju.scale.set(1,1,1),Ju.updateMatrix(),this.hpBg.setMatrixAt(n,Ju.matrix),Ju.translateX(-(1-e)*.5),Ju.scale.set(Math.max(.01,e),1,1),Ju.updateMatrix(),this.hpFill.setMatrixAt(n,Ju.matrix),n++}}}for(let e of this.byIndex)e&&(e.mesh.instanceMatrix.needsUpdate=!0,e.hasTint&&e.mesh.instanceColor&&(e.mesh.instanceColor.needsUpdate=!0));this.hpBg.count=n,this.hpFill.count=n,this.hpBg.instanceMatrix.needsUpdate=!0,this.hpFill.instanceMatrix.needsUpdate=!0}dispose(){for(let e of this.byIndex)e&&(e.mesh.dispose(),e.mesh.material.dispose());this.hpBg.dispose(),this.hpFill.dispose()}};function Qu(e){let t=new Ku({antialias:e.antialias,powerPreference:e.powerPreference??`high-performance`});return{kind:`webgl`,active:`webgl`,domElement:t.domElement,renderer:t,setPixelRatio:e=>t.setPixelRatio(e),setSize:(e,n)=>t.setSize(e,n,!1),render:(e,n)=>t.render(e,n),drawCalls:()=>t.info.render.calls,isContextLost:()=>{let e=t.getContext();return!!e&&e.isContextLost()},onContextEvents:(e,n)=>{let r=t=>{t.preventDefault(),e()};return t.domElement.addEventListener(`webglcontextlost`,r,!1),t.domElement.addEventListener(`webglcontextrestored`,n,!1),()=>{t.domElement.removeEventListener(`webglcontextlost`,r),t.domElement.removeEventListener(`webglcontextrestored`,n)}},simulateLoss:e=>{let n=t.getContext()?.getExtension(`WEBGL_lose_context`);return n?(n.loseContext(),e>=0&&setTimeout(()=>n.restoreContext(),e),!0):!1},dispose:()=>t.dispose()}}var $u=class{camera;target=new z;viewHeight;offset;followLerp;shakeAmount=0;aspect=1;constructor(e={}){this.viewHeight=e.viewHeight??26;let t=e.offset??{x:20,y:28,z:20};this.offset=new z(t.x,t.y,t.z),this.followLerp=e.followLerp??.08,this.camera=new as(-1,1,1,-1,e.near??.1,e.far??200),this.resize(1,1),this.update(0)}resize(e,t){this.aspect=e/Math.max(1,t);let n=this.viewHeight/2;this.camera.left=-n*this.aspect,this.camera.right=n*this.aspect,this.camera.top=n,this.camera.bottom=-n,this.camera.updateProjectionMatrix()}follow(e,t,n){let r=1-(1-this.followLerp)**(n*60);this.target.x+=(e-this.target.x)*r,this.target.z+=(t-this.target.z)*r}snapTo(e,t){this.target.set(e,0,t)}shake(e){this.shakeAmount=Math.max(this.shakeAmount,e)}update(e){let t=this.shakeAmount>0?(Math.random()-.5)*this.shakeAmount*1.2:0,n=this.shakeAmount>0?(Math.random()-.5)*this.shakeAmount*1.2:0;this.shakeAmount=Math.max(0,this.shakeAmount-e*1.5),this.camera.position.set(this.target.x+this.offset.x+t,this.offset.y,this.target.z+this.offset.z+n),this.camera.lookAt(this.target.x+t,0,this.target.z+n)}},ed=class{backend;opts;timer=null;lowFrames=0;lost=!1;unsubscribe;constructor(e,t){this.backend=e,this.opts={pollMs:2e3,floorFrames:120,onRestored:()=>{},...t},this.unsubscribe=e.onContextEvents(()=>this.declareLost(),()=>{this.lost=!1,this.opts.onRestored()}),this.timer=setInterval(()=>this.poll(),this.opts.pollMs)}get isLost(){return this.lost}poll(){this.lost||this.backend.isContextLost()&&this.declareLost()}afterFrame(e){this.lost||(e>0&&this.backend.drawCalls()===0?++this.lowFrames>=this.opts.floorFrames&&this.declareLost():this.lowFrames=0)}declareLost(){this.lost||(this.lost=!0,this.lowFrames=0,this.opts.onLost())}reset(){this.lost=!1,this.lowFrames=0}simulateLoss(e=500){return this.backend.simulateLoss(e)}dispose(){this.timer&&clearInterval(this.timer),this.timer=null,this.unsubscribe()}},td=new R,nd=new Es,rd=new xi(new z(0,1,0),0),id=new z;function ad(e,t,n,r,i,a={x:0,z:0}){return td.set(t/r*2-1,-(n/i)*2+1),nd.setFromCamera(td,e),nd.ray.intersectPlane(rd,id)&&(a.x=id.x,a.z=id.z),a}function od(e,t,n,r,i,a,o){return id.set(t,n,r).project(e),o.x=(id.x*.5+.5)*i,o.y=(-id.y*.5+.5)*a,id.z<1}var sd={x:0,y:0},cd=class{layer;texts=[];className;constructor(e,t=`gm-float-text`){this.layer=e,this.className=t,dd(t)}spawn(e,t,n,r=16777215,i=1,a=2){let o=document.createElement(`div`);return o.className=this.className,o.textContent=n,o.style.color=`#${r.toString(16).padStart(6,`0`)}`,this.layer.appendChild(o),this.texts.push({el:o,x:e,y:a,z:t,life:i,maxLife:i}),o}update(e,t,n,r){for(let i=this.texts.length-1;i>=0;i--){let a=this.texts[i];if(a.life-=e,a.y+=e*1.5,a.life<=0){a.el.remove(),this.texts[i]=this.texts[this.texts.length-1],this.texts.pop();continue}od(t,a.x,a.y,a.z,n,r,sd),a.el.style.transform=`translate(-50%, -50%) translate(${sd.x.toFixed(1)}px, ${sd.y.toFixed(1)}px)`,a.el.style.opacity=String(Math.min(1,a.life/a.maxLife+.2))}}clear(){for(let e of this.texts)e.el.remove();this.texts.length=0}},ld=class{layer;labels=new Map;frame=0;className;constructor(e,t=`gm-label`){this.layer=e,this.className=t,dd(t)}begin(){this.frame++}set(e,t,n,r,i,a,o,s){let c=this.labels.get(e);if(!c){let t=document.createElement(`div`);t.className=this.className,this.layer.appendChild(t),c={el:t,seen:0},this.labels.set(e,c)}c.el.textContent!==t&&(c.el.textContent=t),od(n,r,i,a,o,s,sd),c.el.style.transform=`translate(-50%, -100%) translate(${sd.x.toFixed(1)}px, ${sd.y.toFixed(1)}px)`,c.seen=this.frame}end(){for(let[e,t]of this.labels)t.seen!==this.frame&&(t.el.remove(),this.labels.delete(e))}},ud=new Set;function dd(e){if(ud.has(e)||typeof document>`u`)return;ud.add(e);let t=document.createElement(`style`);t.textContent=`.${e}{position:absolute;left:0;top:0;pointer-events:none;white-space:nowrap;font:600 14px/1 system-ui,sans-serif;text-shadow:0 1px 2px #000;will-change:transform,opacity;}`,document.head.appendChild(t)}var fd=class{points;geo;particles=[];max;color=new V;constructor(e=600,t=.28){this.max=e,this.geo=new Ir,this.geo.setAttribute(`position`,new xr(new Float32Array(e*3),3)),this.geo.setAttribute(`color`,new xr(new Float32Array(e*3),3));let n=new Ei({size:t,vertexColors:!0,transparent:!0,opacity:.95});this.points=new ji(this.geo,n),this.points.frustumCulled=!1}burst(e,t,n,r,i=3,a=.6,o=.6){this.color.setHex(n);for(let n=0;n<r&&this.particles.length<this.max;n++){let n=Math.random()*Math.PI*2,r=2+Math.random()*4,s=i*(.4+Math.random()*.6);this.particles.push({x:e,y:a,z:t,vx:Math.cos(n)*s,vy:r,vz:Math.sin(n)*s,life:o,maxLife:o,r:this.color.r,g:this.color.g,b:this.color.b})}}update(e){let t=this.geo.getAttribute(`position`),n=this.geo.getAttribute(`color`);for(let t=this.particles.length-1;t>=0;t--){let n=this.particles[t];if(n.life-=e,n.life<=0){this.particles[t]=this.particles[this.particles.length-1],this.particles.pop();continue}n.vy-=14*e,n.x+=n.vx*e,n.y+=n.vy*e,n.z+=n.vz*e,n.y<.05&&(n.y=.05,n.vy*=-.3)}for(let e=0;e<this.max;e++)if(e<this.particles.length){let r=this.particles[e];t.setXYZ(e,r.x,r.y,r.z);let i=r.life/r.maxLife;n.setXYZ(e,r.r*i,r.g*i,r.b*i)}else t.setXYZ(e,0,-100,0);t.needsUpdate=!0,n.needsUpdate=!0}get active(){return this.particles.length}dispose(){this.geo.dispose(),this.points.material.dispose()}},pd=class{scene=new Hn;rig;registry;particles;texts;labels;textLayer;ready;gl=null;guard=null;opts;width=1;height=1;dpr=1;telegraphs=[];telegraphGeo=new lo(.9,1,48);telegraphMat=new qr({color:16733508,transparent:!0,opacity:.8,side:2});frames=0;contextLosses=0;fellBack=!1;backendFactory;lossTimes=[];disposed=!1;constructor(e){this.opts=e,this.backendFactory=typeof e.backend==`function`?e.backend:Qu,this.rig=new $u(e.camera),this.registry=new Zu(e.archetypes),this.particles=new fd(e.maxParticles??600),this.textLayer=e.textLayer??this.makeTextLayer(e.container),this.texts=new cd(this.textLayer),this.labels=new ld(this.textLayer);let t=e.background??658708;if(this.scene.background=new V(t),e.fog!==!1){let n=e.fog??{near:40,far:90};this.scene.fog=new Vn(t,n.near,n.far)}let n=new ss(12571903,1.4);n.position.set(10,20,8),this.scene.add(n,new cs(3359829,1.6),new Ko(2241348,660488,.8)),this.scene.add(this.registry.root,this.particles.points),this.ready=this.createBackend()}makeTextLayer(e){let t=document.createElement(`div`);return t.style.cssText=`position:absolute;inset:0;overflow:hidden;pointer-events:none;`,e.appendChild(t),t}async createBackend(){let e=this.backendFactory({antialias:this.opts.antialias??!0}),t=e instanceof Promise?await e:e;if(this.disposed){t.dispose();return}this.gl=t,this.applySize(),t.domElement.style.cssText=`display:block;position:absolute;inset:0;touch-action:none;`,this.opts.container.insertBefore(t.domElement,this.opts.container.firstChild),this.guard=new ed(t,{onLost:()=>this.rebuild(),onRestored:()=>this.guard?.reset()})}rebuild(){this.contextLosses++;let e=performance.now();this.lossTimes=this.lossTimes.filter(t=>e-t<1e4),this.lossTimes.push(e),this.backendFactory!==Qu&&this.lossTimes.length>=3&&(this.backendFactory=Qu,this.fellBack=!0,console.warn(`gravemind: renderer backend lost 3 times in 10 s, falling back to WebGL`)),this.guard?.dispose(),this.gl?.domElement.remove(),this.gl?.dispose(),this.gl=null,this.guard=null,this.ready=this.createBackend().then(()=>this.opts.onContextRebuilt?.())}get backend(){return this.gl?.active??null}get canvas(){if(!this.gl)throw Error(`GameRenderer: backend not ready (await renderer.ready)`);return this.gl.domElement}get three(){if(!this.gl)throw Error(`GameRenderer: backend not ready (await renderer.ready)`);return this.gl.renderer}get camera(){return this.rig.camera}get drawCalls(){return this.gl?this.gl.drawCalls():0}resize(e,t,n=this.dpr){this.width=Math.max(1,e),this.height=Math.max(1,t),this.dpr=n,this.applySize(),this.rig.resize(this.width,this.height)}applySize(){this.gl&&(this.gl.setPixelRatio(this.dpr),this.gl.setSize(this.width,this.height),this.gl.domElement.style.width=`${this.width}px`,this.gl.domElement.style.height=`${this.height}px`)}screenToWorld(e,t,n={x:0,z:0}){let r=this.gl?this.gl.domElement.getBoundingClientRect():this.opts.container.getBoundingClientRect();return ad(this.rig.camera,e-r.left,t-r.top,this.width,this.height,n)}consumeEvents(e){for(let t of e)switch(t.kind){case`burst`:this.particles.burst(t.x,t.z,t.color,t.count,t.speed,t.y,t.life);break;case`text`:this.texts.spawn(t.x,t.z,t.text,t.color);break;case`shake`:this.rig.shake(t.magnitude);break;case`telegraph`:{let e=new ai(this.telegraphGeo,this.telegraphMat);e.rotation.x=-Math.PI/2,e.position.set(t.x,.08,t.z),e.scale.setScalar(t.radius),this.scene.add(e),this.telegraphs.push({mesh:e,life:t.duration,max:t.duration});break}case`custom`:this.opts.onCustomEvent?.(t.type,t.data)}}render(e,t,n){if(this.gl&&this.guard){this.registry.update(e,n),this.particles.update(t);for(let e=this.telegraphs.length-1;e>=0;e--){let n=this.telegraphs[e];if(n.life-=t,n.life<=0){this.scene.remove(n.mesh),this.telegraphs.splice(e,1);continue}let r=1-n.life/n.max;n.mesh.scale.setScalar(n.mesh.scale.x),n.mesh.material.opacity=.3+.6*r}this.rig.update(t),this.gl.render(this.scene,this.rig.camera),this.texts.update(t,this.rig.camera,this.width,this.height),this.frames++,this.guard.afterFrame(this.registry.drawn)}}simulateContextLoss(){return this.guard?.simulateLoss(-1)??!1}dispose(){this.disposed=!0,this.guard?.dispose(),this.registry.dispose(),this.particles.dispose(),this.texts.clear(),this.gl?.dispose(),this.gl?.domElement.remove(),this.gl=null,this.guard=null}};function md(e={}){let t=e.maxDpr??2,n={width:1,height:1,dpr:1,dispose:o},r=()=>{let r=window.visualViewport;n.width=Math.round(r?.width??window.innerWidth),n.height=Math.round(r?.height??window.innerHeight),n.dpr=Math.min(window.devicePixelRatio||1,t),e.onResize?.(n.width,n.height,n.dpr)},i=()=>e.onVisibility?.(document.visibilityState===`visible`);window.addEventListener(`resize`,r),window.addEventListener(`orientationchange`,r),window.visualViewport?.addEventListener(`resize`,r),document.addEventListener(`visibilitychange`,i);let a=document.documentElement.style;a.setProperty(`--gm-safe-top`,`env(safe-area-inset-top, 0px)`),a.setProperty(`--gm-safe-bottom`,`env(safe-area-inset-bottom, 0px)`),a.setProperty(`--gm-safe-left`,`env(safe-area-inset-left, 0px)`),a.setProperty(`--gm-safe-right`,`env(safe-area-inset-right, 0px)`),r();function o(){window.removeEventListener(`resize`,r),window.removeEventListener(`orientationchange`,r),window.visualViewport?.removeEventListener(`resize`,r),document.removeEventListener(`visibilitychange`,i)}return n}var W={N:0,E:1,S:2,W:3},hd=[0,1,0,-1],gd=[-1,0,1,0],_d=e=>e+2&3,vd={IronOre:0,CopperOre:1,IronPlate:2,CopperWire:3,Slug:4,ShockCell:5,PlasmaCell:6},yd=[{kind:vd.IronOre,name:`Clay`,color:8364998,silhouette:`chunk`},{kind:vd.CopperOre,name:`Copper`,color:11033130,silhouette:`chunk`},{kind:vd.IronPlate,name:`Block`,color:12375014,silhouette:`plate`},{kind:vd.CopperWire,name:`Wire`,color:15229482,silhouette:`coil`},{kind:vd.Slug,name:`Seedpod`,color:15721412,silhouette:`bullet`},{kind:vd.ShockCell,name:`Sun cell`,color:3526896,silhouette:`cell`},{kind:vd.PlasmaCell,name:`Spore`,color:13400487,silhouette:`orb`}],G={Floor:0,Rock:1,IronNode:2,CopperNode:3,PlasmaVent:4,Path:5,KeepClear:6},bd=[{id:1,key:`core`,name:`Grove`,w:3,h:3,hp:2e3,cost:[],rotatable:!1,blocksPath:!0,spec:{role:`core`}},{id:2,key:`belt`,name:`Belt`,w:1,h:1,hp:30,cost:[{kind:vd.IronOre,count:1}],rotatable:!0,blocksPath:!1,spec:{role:`belt`,speed:8}},{id:3,key:`drill.iron`,name:`Clay digger`,w:1,h:1,hp:120,cost:[{kind:vd.IronOre,count:6}],rotatable:!0,blocksPath:!0,spec:{role:`drill`,terrain:G.IronNode,yields:vd.IronOre,ticksPerItem:60}},{id:4,key:`drill.copper`,name:`Copper digger`,w:1,h:1,hp:120,cost:[{kind:vd.IronOre,count:8}],rotatable:!0,blocksPath:!0,spec:{role:`drill`,terrain:G.CopperNode,yields:vd.CopperOre,ticksPerItem:60}},{id:5,key:`press`,name:`Biofab`,w:2,h:2,hp:200,cost:[{kind:vd.IronOre,count:20}],rotatable:!0,blocksPath:!0,spec:{role:`factory`,recipes:[{inputs:[{kind:vd.IronOre,count:2}],output:{kind:vd.IronPlate,count:1},ticks:60},{inputs:[{kind:vd.IronPlate,count:1}],output:{kind:vd.Slug,count:4},ticks:45}]}},{id:6,key:`gun`,name:`Slinger`,w:1,h:1,hp:150,cost:[{kind:vd.IronOre,count:12}],rotatable:!1,blocksPath:!0,spec:{role:`turret`,ammo:[vd.Slug,vd.IronOre],range:3.5,cooldownTicks:20,magazine:40}},{id:7,key:`wall`,name:`Sunwall`,w:1,h:1,hp:400,cost:[{kind:vd.IronOre,count:4}],rotatable:!1,blocksPath:!0,spec:{role:`wall`}}],xd=new Map(bd.map(e=>[e.key,e])),Sd=new Map(bd.map(e=>[e.id,e])),Cd=[{x:1,y:0},{x:1,y:2},{x:7,y:2},{x:7,y:5},{x:1,y:5},{x:1,y:8},{x:4,y:8},{x:4,y:10}],wd={x:3,y:11},Td=[{name:`entry`,x:4,y:0,w:2,h:2,amount:450},{name:`pocket`,x:2,y:3,w:3,h:2,amount:400},{name:`core-left`,x:0,y:11,w:2,h:3,amount:140},{name:`core-right`,x:7,y:11,w:2,h:3,amount:140}],Ed=[{key:`drill.iron`,x:4,y:4,dir:W.E},{key:`gun`,x:5,y:4,dir:W.N},{key:`drill.iron`,x:1,y:11,dir:W.E},{key:`belt`,x:2,y:11,dir:W.E}];function Dd(e){e.fill(G.Floor);for(let t of Td)for(let n=t.y;n<t.y+t.h;n++)for(let r=t.x;r<t.x+t.w;r++)e[n*9+r]=G.IronNode;for(let t=1;t<Cd.length;t++){let n=Cd[t-1],r=Cd[t],i=Math.sign(r.x-n.x),a=Math.sign(r.y-n.y);for(let t=n.x,o=n.y;e[o*9+t]=G.Path,t!==r.x||o!==r.y;t+=i,o+=a);}}function Od(e){kd(Ad,e)}function kd(e,t){t.fill(0);for(let n of e.oreClusters)for(let r=n.y;r<n.y+n.h;r++)for(let i=n.x;i<n.x+n.w;i++)t[r*e.w+i]=n.amount}var Ad={id:`classic`,w:9,h:14,core:wd,oreClusters:Td,starter:Ed,waypoints:Cd,gates:[],paint:Dd};function jd(e,t){return t-e.w/2+.5}function Md(e,t){return t-e.h/2+.5}function Nd(e){return e-9/2+.5}function Pd(e){return e-7+.5}var K={coreHp:200,startingOre:30,firstWaveAt:20,waveEvery:30,totalWaves:15,callEarlyOrePerSecond:.5,callWaveCooldown:3,spawnGap:.8,spawnJitter:.5,crawler:{hp:1,speed:1.15,radius:.13,coreDamage:2},brute:{hp:22,speed:.6,radius:.34,coreDamage:40},packBase:3,packsPerWave:1.4,packSize:8,packGrowth:.8,packMax:18,packSpread:.07,packOffset:.3,bruteFromWave:3,hpGrowth:.1,maxEnemies:500,ammo:{[vd.IronOre]:{rounds:2,damage:1},[vd.Slug]:{rounds:1,damage:4}},shotSpeed:14,shotLife:.5,quickRemovalSeconds:10},Fd=y({CONFIG:K,BUILDINGS:bd,MAP:{MAP_W:9,MAP_H:14,WAYPOINTS:Cd,CORE:wd,ORE_CLUSTERS:Td}}),Id={buildingCost:40,wallCost:80,spread:1,startingOre:60,speedScale:.75,crowdScale:1,biteTicks:30,bite:{crawler:1,brute:10},claimLeadS:20,claimAutoS:120,frontPacks:.5},Ld=1073741823,Rd=class{w;h;dist;version=-1;down;heapCell;heapCost;constructor(e,t){this.w=e,this.h=t,this.dist=new Int32Array(e*t),this.down=new Int32Array(8),this.heapCell=new Int32Array(e*t*4+16),this.heapCost=new Int32Array(e*t*4+16)}build(e,t,n){let{w:r,h:i,dist:a}=this;a.fill(Ld);let o=0,s=(e,t)=>{let n=o++;for(;n>0;){let r=n-1>>1,i=this.heapCost[r];if(i<t||i===t&&this.heapCell[r]<e)break;this.heapCell[n]=this.heapCell[r],this.heapCost[n]=i,n=r}this.heapCell[n]=e,this.heapCost[n]=t},c=()=>{let e=this.heapCell[0],t=this.heapCell[--o],n=this.heapCost[o],r=0;for(;;){let e=2*r+1;if(e>=o)break;let i=e+1;i<o&&(this.heapCost[i]<this.heapCost[e]||this.heapCost[i]===this.heapCost[e]&&this.heapCell[i]<this.heapCell[e])&&(e=i);let a=this.heapCost[e];if(n<a||n===a&&t<=this.heapCell[e])break;this.heapCell[r]=this.heapCell[e],this.heapCost[r]=a,r=e}return this.heapCell[r]=t,this.heapCost[r]=n,e};for(let e of t)a[e]=0,s(e,0);for(;o>0;){let t=this.heapCost[0],n=c();if(t>a[n])continue;let o=n%r,l=n/r|0;for(let n=0;n<4;n++){let c=n===0?o:n===1?o+1:n===2?o:o-1,u=n===0?l-1:n===1?l:n===2?l+1:l;if(c<0||u<0||c>=r||u>=i)continue;let d=u*r+c,f=e(d);if(f<0)continue;let p=t+f;p<a[d]&&(a[d]=p,s(d,p))}}this.version=n}},zd=xd.get(`core`).id,Bd=xd.get(`wall`)?.id??-1,Vd=xd.get(`belt`).id;function Hd(e,t,n,r){let i=[];for(let e=0;e<n.length;e++)n[e]===zd&&i.push(e);e.build(e=>{if(t[e]===G.Rock)return-1;let r=n[e];return r===0||r===Vd||r===zd?1:1+(r===Bd?Id.wallCost:Id.buildingCost)},i,r)}var Ud=[0,1,0,-1,1,1,-1,-1],Wd=[-1,0,1,0,-1,1,1,-1];function Gd(e){return e!==0&&e!==Vd&&e!==zd}function Kd(e,t,n){let{w:r,h:i,dist:a,down:o}=e,s=t%r,c=t/r|0,l=a[t],u=0;for(let e=0;e<8;e++){let t=s+Ud[e],d=c+Wd[e];if(t<0||d<0||t>=r||d>=i)continue;let f=d*r+t;a[f]>=l||e>=4&&(Yd(a,n,c*r+t)||Yd(a,n,d*r+s))||(o[u++]=f)}return u}function qd(e,t,n,r){let i=Kd(e,t,r);if(i===0)return-1;let a=e.down,o=0;for(let e=0;e<i;e++)Gd(r[a[e]])||o++;if(o===0)return Jd(e,i,!1,r);if(n<0)return Jd(e,i,!0,r);let s=n%o;for(let e=0;e<i;e++){let t=a[e];if(!Gd(r[t])&&s--===0)return t}return-1}function Jd(e,t,n,r){let{dist:i,down:a}=e,o=-1,s=0;for(let e=0;e<t;e++){let t=a[e];n&&Gd(r[t])||(o<0||i[t]<s)&&(o=t,s=i[t])}return o}function Yd(e,t,n){return e[n]>=1073741823||Gd(t[n])}var Xd=class{width;height;terrain;building;dir;instance;version=0;nextInstance=1;constructor(e,t){this.width=e,this.height=t;let n=e*t;this.terrain=new Uint8Array(n),this.building=new Uint8Array(n),this.dir=new Uint8Array(n),this.instance=new Uint16Array(n)}inBounds(e,t){return e>=0&&t>=0&&e<this.width&&t<this.height}idx(e,t){return t*this.width+e}canPlace(e,t,n,r){let i=Sd.get(e);if(!i)return!1;let[a,o]=Zd(i.w,i.h,r);for(let e=n;e<n+o;e++)for(let n=t;n<t+a;n++){if(!this.inBounds(n,e))return!1;let t=this.idx(n,e);if(this.building[t]!==0||this.terrain[t]===G.Rock||this.terrain[t]===G.Path||this.terrain[t]===G.KeepClear)return!1}return!0}place(e,t,n,r){if(!this.canPlace(e,t,n,r))return 0;let i=Sd.get(e),[a,o]=Zd(i.w,i.h,r),s=this.nextInstance++;for(let i=n;i<n+o;i++)for(let n=t;n<t+a;n++){let t=this.idx(n,i);this.building[t]=e,this.dir[t]=r,this.instance[t]=s}return this.version++,s}rotate(e,t,n){if(!this.inBounds(e,t))return!1;let r=this.idx(e,t);return this.building[r]===0||this.dir[r]===n?!1:(this.dir[r]=n,this.version++,!0)}save(){return{building:Array.from(this.building),dir:Array.from(this.dir),instance:Array.from(this.instance),version:this.version,nextInstance:this.nextInstance}}load(e){let t=this.width*this.height;if(e.building.length!==t||e.dir.length!==t||e.instance.length!==t)throw Error(`grid save is for another board size`);this.building.set(e.building),this.dir.set(e.dir),this.instance.set(e.instance),this.version=e.version,this.nextInstance=e.nextInstance}remove(e,t){if(!this.inBounds(e,t))return!1;let n=this.instance[this.idx(e,t)];if(n===0)return!1;for(let e=0;e<this.instance.length;e++)this.instance[e]===n&&(this.building[e]=0,this.dir[e]=0,this.instance[e]=0);return this.version++,!0}};function Zd(e,t,n){return n&1?[t,e]:[e,t]}var Qd={split:1,bruteGap:2,packGap:3,spawn:4};function $d(e,t){let n=Math.imul(t|0,3432918353);return n=n<<15|n>>>17,n=Math.imul(n,461845907),e^=n,e=e<<13|e>>>19,Math.imul(e,5)+3864292196|0}function ef(e){return e^=e>>>16,e=Math.imul(e,2246822507),e^=e>>>13,e=Math.imul(e,3266489909),e^=e>>>16,e>>>0}function tf(e,t,n,r=0,i=0){return ef($d($d($d($d(e|0,t),n),r),i))}function nf(e,t,n,r=0,i=0){return tf(e,t,n,r,i)/4294967296}function rf(e,t,n,r,i,a=0,o=0){return e+(t-e)*nf(n,r,i,a,o)}function af(e,t,n,r,i=0,a=0){return Math.floor(nf(t,n,r,i,a)*e)}var of=class e{length;capacity;gaps;kinds;head=0;count=0;tailSpace;constructor(e){this.length=e*256,this.capacity=Math.floor(this.length/64)+1,this.gaps=new Int32Array(this.capacity),this.kinds=new Uint8Array(this.capacity),this.tailSpace=this.length}get size(){return this.count}canInsert(){return this.count<this.capacity&&(this.count===0||this.tailSpace>=64)}insert(e){if(!this.canInsert())return!1;let t=(this.head+this.count)%this.capacity;return this.gaps[t]=this.tailSpace,this.kinds[t]=e,this.count++,this.tailSpace=0,!0}peekOutput(){return this.count>0&&this.gaps[this.head]===0?this.kinds[this.head]:-1}takeOutput(){let e=this.peekOutput();return e<0?-1:(this.head=(this.head+1)%this.capacity,this.count--,this.count===0&&(this.tailSpace=this.length),e)}step(e){let t=e;for(let e=0;e<this.count&&t>0;e++){let n=(this.head+e)%this.capacity,r=e===0?0:64,i=this.gaps[n]-r;if(i<=0)continue;let a=i<t?i:t;this.gaps[n]-=a,this.tailSpace+=a,t-=a}}writeItems(e,t,n,r,i,a){let o=0;for(let s=0;s<this.count;s++){let c=(this.head+s)%this.capacity;o+=this.gaps[c];let l=(this.length-o)/256;e[t++]=n+i*l,e[t++]=r+a*l,e[t++]=this.kinds[c]}return t}save(){let e=[],t=[];for(let n=0;n<this.count;n++){let r=(this.head+n)%this.capacity;e.push(this.gaps[r]),t.push(this.kinds[r])}return{cells:this.length/256,gaps:e,kinds:t,tailSpace:this.tailSpace}}static load(t){let n=new e(t.cells);if(t.gaps.length>n.capacity||t.kinds.length!==t.gaps.length)throw Error(`lane save does not fit`);for(let e=0;e<t.gaps.length;e++)n.gaps[e]=t.gaps[e],n.kinds[e]=t.kinds[e];return n.count=t.gaps.length,n.tailSpace=t.tailSpace,n}forEach(e){let t=0;for(let n=0;n<this.count;n++){let r=(this.head+n)%this.capacity;t+=this.gaps[r],e(this.kinds[r],this.length-t)}}},sf=`0.1.0`,cf=[`crawler`,`brute`,`shot`],lf=0,uf=1,df=2,ff=xd.get(`belt`).id,pf=1024,mf=2e3;function hf(e){return{n:e,packs:K.packBase+Math.floor(K.packsPerWave*e),perPack:Math.min(K.packMax,K.packSize+Math.floor(K.packGrowth*(e-1))),brutes:e>=K.bruteFromWave?Math.ceil((e-K.bruteFromWave+1)/2):0}}var gf=Array.from({length:K.totalWaves},(e,t)=>Object.freeze(hf(t+1))),_f=gf.map(e=>Object.freeze({...e,perPack:Math.max(1,Math.round(e.perPack*Id.crowdScale))}));function vf(e){let t=e.map,n=t.regions;if(!n)e.locked=null,e.claimedIds=[];else{let r=new Uint8Array(t.w*t.h).fill(1);for(let i of e.claimed)for(let[e,a,o,s]of n[i].rects)for(let n=a;n<a+s;n++)for(let i=e;i<e+o;i++)r[n*t.w+i]=0;e.locked=r,e.claimedIds=e.claimed.map(e=>n[e].id)}e.liveGates=yf(t,e.claimedIds),e.liveGateIds=e.liveGates.map(e=>t.gates[e].id)}function yf(e,t){return e.gates.flatMap((n,r)=>!e.regions||n.region===void 0||t.includes(n.region)?[r]:[])}function bf(e,t,n,r,i){let a=e.locked;if(!a)return!1;let o=e.map.w,s=Math.min(o,n+Ef(t,i)),c=Math.min(e.map.h,r+Df(t,i));for(let e=Math.max(0,r);e<c;e++)for(let t=Math.max(0,n);t<s;t++)if(a[e*o+t])return!0;return!1}function xf(e,t,n){let r=t.regions,i=t.claims??[];return _f.map(a=>{let o=a.n,s=0;for(;s+1<n.length&&i[s]!==void 0&&i[s].afterWave<o;)s++;let c=r?n.slice(0,s+1).map(e=>r[e].id):[],l=yf(t,c),u=l.length,d=s>0&&i[s-1].afterWave+1===o?l.findIndex(e=>t.gates[e].region===c[s]):-1,f=d>=0?d:u>0?af(u,e,Qd.split,o):0,p=1+Id.frontPacks*Math.max(0,u-2),m=Math.round(a.packs*p),h=Math.round(a.brutes*p),g=Array.from({length:u>0?h:0},(e,t)=>l[(f+t)%u]),_=Array.from({length:u>0?m:0},(e,t)=>l[(f+t)%u]),v=Array(t.gates.length).fill(0);for(let e of g)v[e]+=1;for(let e of _)v[e]+=a.perPack;return Object.freeze({...a,packs:m,brutes:h,bruteGate:Object.freeze(g),packGate:Object.freeze(_),byGate:Object.freeze(v)})})}var Sf=bd.reduce((e,t)=>Math.max(e,t.id),0)+1;function Cf(e,t){return{hp:new Uint16Array(e),wreck:new Uint8Array(e),wreckDir:new Uint8Array(e),wreckAt:new Float32Array(e),bitten:new Int32Array(t*Sf),broken:new Int32Array(t*Sf),heldTicks:new Int32Array(t),chewTicks:new Int32Array(t),rebuilt:0,cleared:0,refusedOnMachine:0,refundLost:0,wallLines:0,repairS:[],hpBuf:[new Uint16Array(e),new Uint16Array(e)],occBuf:[new Uint8Array(e),new Uint8Array(e)]}}function wf(e,t=Ad){let n=new Xd(t.w,t.h);t.paint(n.terrain);let r=t.w*t.h,i=new Uint16Array(r);kd(t,i);let a=i.slice(),o=r*5,s={map:t,wpX:(t.waypoints??[]).map(e=>jd(t,e.x)),wpZ:(t.waypoints??[]).map(e=>Md(t,e.y)),flow:t.waypoints?null:new Rd(t.w,t.h),grid:n,lanes:Array(r).fill(null),timer:new Uint16Array(r),ammo:new Uint16Array(r),ammoKind:new Uint8Array(r),starved:new Uint8Array(r),placedAt:new Float32Array(r),oreLeft:i,oreFull:a,inventory:new Int32Array(8),coreHp:K.coreHp,phase:`build`,wave:0,nextWaveAt:K.firstWaveAt,waveStartedAt:-1,plans:gf,spawnQueue:[],undo:[],hash:new u(2),telemetry:new v({version:sf,configHash:Fd,sample:Sp}),stats:{placed:{},quickRemovals:0,undos:0,quickUndos:0,rowQuickRemovals:Array(t.h).fill(0),rowUndos:Array(t.h).fill(0),starvedTurretSeconds:0,peakBeltItems:0,coreDamageBy:{},kills:0,oreMined:0,oreBanked:0,oreToGuns:0,tilesDepleted:0,engageS:[],firstSpawnAt:[],quietS:0,...t.gates.length>0?{fronts:Dp(t.gates.length)}:{}},itemBuffers:[new Float32Array(o*3),new Float32Array(o*3)],oreBuffers:[new Uint16Array(r),new Uint16Array(r)],flip:0,board:void 0,boardDirty:!1,record:null,breach:t.waypoints?null:Cf(r,t.gates.length),claimed:t.regions?[0]:[],locked:null,liveGates:[],claimedIds:[],liveGateIds:[],claim:null,claimView:null};vf(s),t.waypoints||(s.plans=xf(e>>>0,t,s.claimed)),s.inventory[vd.IronOre]=t.waypoints?K.startingOre:Id.startingOre;let c=new h({seed:e,archetypes:cf,state:s,capacity:pf});n.place(xd.get(`core`).id,t.core.x,t.core.y,W.N);for(let e of t.starter)Tf(c,xd.get(e.key),e.x,e.y,e.dir);return Yf(s),s.board=kp(s,0),c}function Tf(e,t,n,r,i){let a=e.state,o=a.grid;if(bf(a,t,n,r,i)||t.spec.role===`drill`&&(o.terrain[o.idx(n,r)]!==t.spec.terrain||a.oreLeft[o.idx(n,r)]===0))return 0;let s=a.breach;if(s&&Gd(t.id)&&o.canPlace(t.id,n,r,i)&&Of(e,t,n,r,i))return s.refusedOnMachine++,0;let c=o.place(t.id,n,r,i);if(!c)return 0;let l=o.idx(n,r);return a.placedAt[l]=e.time,a.timer[l]=0,a.ammo[l]=0,a.starved[l]=0,t.spec.role===`belt`&&(a.lanes[l]=new of(1)),s&&kf(e,t,n,r,i),c}var Ef=(e,t)=>t&1?e.h:e.w,Df=(e,t)=>t&1?e.w:e.h;function Of(e,t,n,r,i){let a=e.store,s=e.state,c=s.map.w,l=n+Ef(t,i),u=r+Df(t,i);for(let e=0;e<a.count;e++){let t=a.arch[e];if(t!==lf&&t!==uf||a.flags[e]&o.DEAD)continue;let i=Jf(s,a.x[e],a.z[e]),d=i%c,f=i/c|0;if(d>=n&&d<l&&f>=r&&f<u)return!0}return!1}function kf(e,t,n,r,i){let a=e.state,o=a.breach,s=a.grid.width,c=n+Ef(t,i),l=r+Df(t,i);for(let i=r;i<l;i++)for(let r=n;r<c;r++){let n=i*s+r;o.hp[n]=t.hp;let a=o.wreck[n];if(!a)continue;let c=_p(e.time-o.wreckAt[n]);o.wreck[n]=0,o.wreckDir[n]=0,o.wreckAt[n]=0,o.rebuilt++,o.repairS.push(c),gp(e,{type:`rebuilt`,t:e.time,key:t.key,x:r,y:i,was:Sd.get(a)?.key??String(a),after:c})}}function Af(e,t,n,r){let i=e.breach;if(n.w*n.h===1){i.hp[t]=r;return}let a=e.grid.instance[t];for(let t=0;t<i.hp.length;t++)e.grid.instance[t]===a&&(i.hp[t]=r)}function jf(e,t,n){let r=e.state,i=r.grid,a=Sd.get(i.building[t]),o=r.breach;if(!a)return o&&n===`remove`&&o.wreck[t]&&Mf(e,t),-1;if(a.spec.role===`core`)return-1;let s=t%i.width,c=t/i.width|0,l=e.time-r.placedAt[t],u=o?o.hp[t]:a.hp;o&&Af(r,t,a,0),i.remove(s,c),r.lanes[t]=null,r.ammo[t]=0,r.starved[t]=0;let d=0,f=0;for(let e of a.cost){let t=u>=a.hp?e.count:Math.floor(e.count*u/a.hp);r.inventory[e.kind]+=t,d+=t,f+=e.count-t}return o&&(o.refundLost+=f),gp(e,{type:`remove`,t:e.time,key:a.key,x:s,y:c,age:_p(l),via:n,...f>0?{refund:d}:{}}),l}function Mf(e,t){let n=e.state,r=n.breach,i=n.grid.width,a=Sd.get(r.wreck[t])?.key??String(r.wreck[t]);r.wreck[t]=0,r.wreckDir[t]=0,r.wreckAt[t]=0,r.cleared++,n.boardDirty=!0,gp(e,{type:`cleared`,t:e.time,key:a,x:t%i,y:t/i|0})}function Nf(e,t){return t.cost.every(t=>e.inventory[t.kind]>=t.count)}function Pf(e,t){for(let n of t.cost)e.inventory[n.kind]-=n.count}function Ff(e,t){t.cells.length!==0&&(e.undo.push(t),e.undo.length>mf&&e.undo.shift())}function If(e,t){return e.instance[t.i]===t.inst&&(!t.rotated||e.dir[t.i]!==t.prevDir)}var Lf=(e,t)=>t.cells.some(t=>If(e,t)),Rf=(e,t)=>t.cells.some(t=>e.instance[t.i]===t.inst);function zf(e){let t=e.state;return!rp(t)&&t.wave<K.totalWaves&&(t.waveStartedAt<0||e.time-t.waveStartedAt>=K.callWaveCooldown)}function Bf(e,t){let n=e.state,r=n.grid,i=xd.get(`belt`);switch(t.type){case`placeBelts`:{let a={cells:[],at:e.time},o=0,s=0;for(let c of t.data.cells){if(!r.inBounds(c.x,c.y))continue;let t=r.idx(c.x,c.y);if(r.building[t]===i.id){let e=r.dir[t];r.rotate(c.x,c.y,c.dir)&&(a.cells.push({i:t,inst:r.instance[t],rotated:!0,prevDir:e}),s++);continue}if(!Nf(n,i))break;let l=Tf(e,i,c.x,c.y,c.dir);l&&(Pf(n,i),a.cells.push({i:t,inst:l,rotated:!1,prevDir:0}),o++)}let c=t.data.aim;if(c&&a.cells.length>0&&r.inBounds(c.x,c.y)){let e=r.idx(c.x,c.y),t=r.dir[e];Sd.get(r.building[e])?.spec.role===`drill`&&r.rotate(c.x,c.y,c.dir)&&a.cells.unshift({i:e,inst:r.instance[e],rotated:!0,prevDir:t})}Ff(n,a),n.stats.placed.belt=(n.stats.placed.belt??0)+o,gp(e,{type:`belts`,t:e.time,placed:o,rotated:s,drawn:t.data.cells.length,...yp(t.data.via)});break}case`place`:{let i=xd.get(t.data.key);if(!i||i.spec.role===`core`||!Nf(n,i))break;let a=Tf(e,i,t.data.x,t.data.y,t.data.dir);if(!a)break;Pf(n,i),Ff(n,{cells:[{i:r.idx(t.data.x,t.data.y),inst:a,rotated:!1,prevDir:0}],at:e.time}),n.stats.placed[i.key]=(n.stats.placed[i.key]??0)+1,gp(e,{type:`place`,t:e.time,key:i.key,x:t.data.x,y:t.data.y,...yp(t.data.via)});break}case`placeWalls`:{let i=xd.get(`wall`),a={cells:[],at:e.time},o=0,s=0;for(let c of t.data.cells){if(!Nf(n,i))break;let t=r.inBounds(c.x,c.y)?Tf(e,i,c.x,c.y,W.N):0;if(!t){s++;continue}Pf(n,i),a.cells.push({i:r.idx(c.x,c.y),inst:t,rotated:!1,prevDir:0}),o++}Ff(n,a),o>0&&(n.stats.placed.wall=(n.stats.placed.wall??0)+o,n.breach&&n.breach.wallLines++),gp(e,{type:`walls`,t:e.time,placed:o,drawn:t.data.cells.length,refused:s,...yp(t.data.via)});break}case`remove`:{let i=[];for(let n of t.data.cells){if(!r.inBounds(n.x,n.y))continue;let t=jf(e,r.idx(n.x,n.y),`remove`);t>=0&&t<K.quickRemovalSeconds&&!i.includes(n.y)&&i.push(n.y)}i.length&&n.stats.quickRemovals++;for(let e of i)n.stats.rowQuickRemovals[e]++;n.undo=n.undo.filter(e=>Rf(r,e));break}case`rotate`:{let{x:i,y:a}=t.data;if(!r.inBounds(i,a))break;let o=r.idx(i,a),s=Sd.get(r.building[o]),c=r.dir[o];s?.rotatable&&r.rotate(i,a,c+1&3)&&Ff(n,{cells:[{i:o,inst:r.instance[o],rotated:!0,prevDir:c}],at:e.time});break}case`undo`:{let t=n.undo.pop();for(;t&&!Lf(r,t);)t=n.undo.pop();if(!t)break;let i=0,a=t.cells[t.cells.length-1].i/r.width|0,o=e.time-t.at;for(let n=t.cells.length-1;n>=0;n--){let a=t.cells[n];If(r,a)&&(a.rotated?r.rotate(a.i%r.width,a.i/r.width|0,a.prevDir):jf(e,a.i,`undo`),i++)}n.stats.undos++,n.stats.rowUndos[a]++,o<3&&n.stats.quickUndos++,gp(e,{type:`undo`,t:e.time,cells:i,age:_p(o),y:a});break}case`claim`:{let r=n.map.regions,i=t.data?.region,a=r&&typeof i==`string`?r.findIndex(e=>e.id===i):-1;if(!n.claim||a<0||!n.claim.offers.includes(a)){gp(e,{type:`claim`,t:e.time,rejected:!0,region:String(i)});break}op(e,a,!1);break}case`callWave`:{if(!zf(e)){gp(e,{type:`callWave`,t:e.time,rejected:!0,wave:n.wave});break}let t=Math.max(0,n.nextWaveAt-e.time),r=Math.floor(t*K.callEarlyOrePerSecond);n.inventory[vd.IronOre]+=r,n.nextWaveAt=e.time,gp(e,{type:`callWave`,t:e.time,skipped:_p(t),bonus:r});break}}}function Vf(e,t,n){let r=Sd.get(e.grid.building[t]);if(!r)return!1;switch(r.spec.role){case`belt`:return e.lanes[t].insert(n);case`core`:return e.inventory[n]++,n===vd.IronOre&&e.stats.oreBanked++,!0;case`turret`:{let i=K.ammo[n];return!i||!r.spec.ammo.includes(n)||e.ammo[t]+i.rounds>r.spec.magazine||e.ammo[t]>0&&e.ammoKind[t]!==n?!1:(e.ammo[t]+=i.rounds,e.ammoKind[t]=n,n===vd.IronOre&&e.stats.oreToGuns++,!0)}default:return!1}}function Hf(e,t,n,r){let i=t+hd[r],a=n+gd[r];return i>=0&&a>=0&&i<e.width&&a<e.height?a*e.width+i:-1}function Uf(e){let t=e.state,n=t.grid,r=n.width*n.height;for(let e=0;e<r;e++){let r=t.lanes[e];if(!r)continue;let i=Sd.get(n.building[e]);r.step(i.spec.speed)}for(let e=0;e<r;e++){let r=t.lanes[e];if(!r)continue;let i=r.peekOutput();if(i<0)continue;let a=Hf(n,e%n.width,e/n.width|0,n.dir[e]);a>=0&&Vf(t,a,i)&&r.takeOutput()}for(let i=0;i<r;i++){let r=Sd.get(n.building[i]);if(!r||r.spec.role!==`drill`||t.oreLeft[i]===0)continue;if(t.timer[i]<r.spec.ticksPerItem){t.timer[i]++;continue}let a=i%n.width,o=i/n.width|0,s=Hf(n,a,o,n.dir[i]);s<0||!Vf(t,s,r.spec.yields)||(t.timer[i]=0,t.stats.oreMined++,--t.oreLeft[i]===0&&(t.stats.tilesDepleted++,t.boardDirty=!0,gp(e,{type:`depleted`,t:e.time,x:a,y:o})))}}function Wf(e,t,n,r=-1,i=0){if(e.state.flow&&r>=0)return Gf(e,t,n,r,i);let a=K[t],s=e.state.stats;n>0&&s.firstSpawnAt[n-1]===-1&&(s.firstSpawnAt[n-1]=e.time);let c=0,l=0,u=a.hp;t===`crawler`?(c=e.rng.range(-K.packOffset,K.packOffset),l=e.rng.range(-K.packOffset,K.packOffset)):(c=e.rng.range(-.25,.25),u=Math.round(a.hp*(1+K.hpGrowth*(e.state.wave-1))));let d=e.state;e.spawn(t,d.wpX[0]+c,d.wpZ[0]-.5+l,{radius:a.radius,hp:u,team:df,flags:o.NO_SEPARATE,cold:{wp:1,coreDamage:a.coreDamage,ox:t===`crawler`?c:0,oz:t===`crawler`?l:0,wave:n}})}function Gf(e,t,n,r,i){let a=e.state,s=K[t],c=a.stats;n>0&&c.firstSpawnAt[n-1]===-1&&(c.firstSpawnAt[n-1]=e.time);let l=e.seed,u=a.map.gates[r],d=jd(a.map,u.x)-.5+rf(0,u.w,l,Qd.spawn,n,i,0),f=Md(a.map,u.y)-.5+rf(0,u.h,l,Qd.spawn,n,i,1),p=af(8,l,Qd.spawn,n,i,2),m=t===`crawler`,h=m?rf(-K.packOffset,K.packOffset,l,Qd.spawn,n,i,3):0,g=m?rf(-K.packOffset,K.packOffset,l,Qd.spawn,n,i,4):0,_=m?s.hp:Math.round(s.hp*(1+K.hpGrowth*(a.wave-1)));e.spawn(t,d,f,{radius:s.radius,hp:_,team:df,flags:o.NO_SEPARATE,cold:{wp:0,coreDamage:s.coreDamage,ox:h,oz:g,wave:n,gate:r,lane:p}}),a.stats.fronts&&a.stats.fronts.sent[r]++}function Kf(e,t){let n=e.store,r=n.cold[t],i=e.state;if(i.flow)return 1e9-i.flow.dist[Jf(i,n.x[t],n.z[t])];let a=i.wpX[r.wp]+r.ox-n.x[t],o=i.wpZ[r.wp]+r.oz-n.z[t];return r.wp*100-Math.sqrt(a*a+o*o)}function qf(e,t){let n=e.store,r=e.state;if(r.flow)return Zf(e,t);for(let i=0;i<n.count;i++){let a=n.arch[i];if(a!==lf&&a!==uf||n.flags[i]&o.DEAD)continue;let s=n.cold[i],c=(a===lf?K.crawler.speed:K.brute.speed)*t;for(;c>0;){let t=r.wpX[s.wp]+s.ox,a=r.wpZ[s.wp]+s.oz,l=t-n.x[i],u=a-n.z[i],d=Math.sqrt(l*l+u*u);if(d>c){n.x[i]+=l/d*c,n.z[i]+=u/d*c;break}if(n.x[i]=t,n.z[i]=a,c-=d,++s.wp>=r.wpX.length){r.coreHp=Math.max(0,r.coreHp-s.coreDamage);let t=s.archetype;r.stats.coreDamageBy[t]=(r.stats.coreDamageBy[t]??0)+s.coreDamage,gp(e,{type:`core_hit`,t:e.time,by:t,dmg:s.coreDamage,hp:r.coreHp}),e.emit({kind:`shake`,magnitude:.25}),e.emit({kind:`burst`,x:n.x[i],z:n.z[i],color:16724821,count:16}),n.flags[i]|=o.DEAD,e.despawnLater(n.id[i]);break}}}}function Jf(e,t,n){let r=e.map.w,i=e.map.h,a=Math.floor(t+r/2),o=Math.floor(n+i/2);return a<0?a=0:a>=r&&(a=r-1),o<0?o=0:o>=i&&(o=i-1),o*r+a}function Yf(e){let t=e.flow;t&&t.version!==e.grid.version&&Hd(t,e.grid.terrain,e.grid.building,e.grid.version)}function Xf(e,t,n){let r=e.store,i=e.state;i.coreHp=Math.max(0,i.coreHp-n.coreDamage);let a=n.archetype;i.stats.coreDamageBy[a]=(i.stats.coreDamageBy[a]??0)+n.coreDamage,gp(e,{type:`core_hit`,t:e.time,by:a,dmg:n.coreDamage,hp:i.coreHp,...n.gate===void 0?{}:{gate:i.map.gates[n.gate]?.id}});let s=i.stats.fronts;s&&n.gate!==void 0&&(s.hits[n.gate]++,s.dmg[n.gate]+=n.coreDamage),e.emit({kind:`shake`,magnitude:.25}),e.emit({kind:`burst`,x:r.x[t],z:r.z[t],color:16724821,count:16}),r.flags[t]|=o.DEAD,e.despawnLater(r.id[t])}function Zf(e,t){let n=e.store,r=e.state,i=r.flow,a=r.grid,s=r.breach,c=r.map.w,l=Id.spread,u=e.tick%Id.biteTicks===0;for(let d=0;d<n.count;d++){let f=n.arch[d];if(f!==lf&&f!==uf||n.flags[d]&o.DEAD)continue;let p=n.cold[d],m=(f===lf?K.crawler.speed:K.brute.speed)*Id.speedScale*t,h=Jf(r,n.x[d],n.z[d]);if(i.dist[h]===0){Xf(e,d,p);continue}let g=p.gate??0;if(f===uf&&a.building[h]===ff&&p.bit!==h){s.chewTicks[g]++;let t=jd(r.map,h%c),i=Md(r.map,h/c|0),a=t-n.x[d],o=i-n.z[d],l=Math.sqrt(a*a+o*o);l>m?(n.x[d]+=a/l*m,n.z[d]+=o/l*m):(n.x[d]=t,n.z[d]=i),u&&Qf(e,h,p,g);continue}let _=qd(i,h,p.lane??0,a.building),v=r.map.core,y=_>=0?jd(r.map,_%c)+p.ox*l:jd(r.map,v.x+1),b=_>=0?Md(r.map,_/c|0)+p.oz*l:Md(r.map,v.y+1),x=y-n.x[d],S=b-n.z[d],C=Math.sqrt(x*x+S*S),w=y,T=b;if(C>m&&(w=n.x[d]+x/C*m,T=n.z[d]+S/C*m),_>=0&&Gd(a.building[_])){let t=n.radius[d]+.5;if(Math.abs(w-jd(r.map,_%c))<t&&Math.abs(T-Md(r.map,_/c|0))<t){s.heldTicks[g]++,u&&Qf(e,_,p,g);continue}}n.x[d]=w,n.z[d]=T}}function Qf(e,t,n,r){let i=e.state,a=i.breach,o=i.grid.building[t],s=Sd.get(o);if(!s)return;let c=Id.bite[n.archetype]??0,l=a.hp[t];a.bitten[r*Sf+o]+=Math.min(c,l),l>c?Af(i,t,s,l-c):$f(e,t,s,n,r)}function $f(e,t,n,r,i){let a=e.state,o=a.breach,s=a.grid,c=t%s.width,l=t/s.width|0;o.wreck[t]=n.id,o.wreckDir[t]=s.dir[t],o.wreckAt[t]=e.time,Af(a,t,n,0);let u=s.instance[t];for(let e=0;e<s.instance.length;e++)s.instance[e]===u&&(a.lanes[e]=null,a.ammo[e]=0,a.starved[e]=0,a.timer[e]=0);s.remove(c,l),o.broken[i*Sf+n.id]++,n.spec.role===`belt`&&(r.bit=t),a.undo=a.undo.filter(e=>Rf(s,e)),gp(e,{type:`broken`,t:e.time,key:n.key,x:c,y:l,by:r.archetype,gate:a.map.gates[i]?.id??String(i),wave:r.wave})}function ep(e,t){let n=e.store,r=e.state,i=r.grid,a=i.width,s=a*i.height;for(let c=0;c<s;c++){let s=Sd.get(i.building[c]);if(!s||s.spec.role!==`turret`)continue;r.timer[c]>0&&r.timer[c]--;let l=jd(r.map,c%a),u=Md(r.map,c/a|0),d=s.spec.range*s.spec.range,f=-1,p=-1/0;for(let t=0;t<n.count;t++){if(n.team[t]!==df||n.flags[t]&(o.DEAD|o.PROJECTILE))continue;let r=n.x[t]-l,i=n.z[t]-u;if(r*r+i*i>d)continue;let a=Kf(e,t);a>p&&(p=a,f=t)}if(r.starved[c]&&r.ammo[c]>0&&(r.starved[c]=0,gp(e,{type:`fed`,t:e.time,x:c%a,y:c/a|0})),f<0)continue;if(r.ammo[c]===0){r.stats.starvedTurretSeconds+=t,r.starved[c]||(r.starved[c]=1,gp(e,{type:`starved`,t:e.time,x:c%a,y:c/a|0}));continue}if(r.timer[c]>0)continue;r.timer[c]=s.spec.cooldownTicks,r.ammo[c]--;let m=n.cold[f].wave,h=r.stats;if(m>0&&h.engageS[m-1]===-1&&h.firstSpawnAt[m-1]>=0){let t=_p(e.time-h.firstSpawnAt[m-1]);h.engageS[m-1]=t,gp(e,{type:`engaged`,t:e.time,n:m,after:t})}let g=n.x[f]-l,_=n.z[f]-u,v=Math.sqrt(g*g+_*_)||1,y=e.spawn(`shot`,l+g/v*.35,u+_/v*.35,{radius:.08,team:1,flags:o.PROJECTILE|o.NO_SEPARATE,cold:{life:K.shotLife,owner:0,damage:K.ammo[r.ammoKind[c]].damage}});n.vx[y.slot]=g/v*K.shotSpeed,n.vz[y.slot]=_/v*K.shotSpeed,e.emit({kind:`custom`,type:`sfx`,data:{name:`shoot`,x:l,z:u}})}}function tp(e,t){let n=e.store,r=e.state;r.hash.build(n),_(e,r.hash,t,{canHit:(e,t)=>n.team[t]===df&&!(n.flags[t]&o.PROJECTILE),onHit:(t,i)=>{if(n.hp[i]-=n.cold[t].damage,n.hp[i]<=0&&!(n.flags[i]&o.DEAD)){n.flags[i]|=o.DEAD,r.stats.kills++;let t=n.cold[i].gate;t!==void 0&&r.stats.fronts&&r.stats.fronts.kills[t]++,e.emit({kind:`burst`,x:n.x[i],z:n.z[i],color:8257434,count:10,speed:3,life:.4}),e.despawnLater(n.id[i])}}})}function np(e){let t=e.state;if(t.wave<K.totalWaves&&e.time>=t.nextWaveAt&&!rp(t)){t.wave++;let n=t.wave;t.flow?cp(e,n):sp(e,n)}let n=t.spawnQueue.length&&t.spawnQueue[0].at<=e.time?dp(e):0;for(;t.spawnQueue.length&&t.spawnQueue[0].at<=e.time&&n<K.maxEnemies;){let r=t.spawnQueue.shift();Wf(e,r.arch,r.wave,r.gate??-1,r.k??0),n++}}function rp(e){if(!e.map.regions)return!1;let t=e.map.claims?.[e.claimed.length-1];return t!==void 0&&t.afterWave===e.wave}function ip(e){let t=e.state;if(t.claim||!rp(t)||t.spawnQueue.length>0||dp(e)>0)return;let n=t.map.regions,r=t.map.claims[t.claimed.length-1],i=t.claimed.length;t.claim={act:i,offers:r.offers.map(e=>n.findIndex(t=>t.id===e)),at:e.time},t.claimView=ap(t),gp(e,{type:`claimOffer`,t:e.time,act:i,offers:[...r.offers]})}function ap(e){let t=e.claim,n=e.map.regions;return t&&n?Object.freeze({act:t.act,offers:Object.freeze(t.offers.map(e=>n[e].id))}):null}function op(e,t,n){let r=e.state,i=r.claim,a=r.map.regions;r.claimed.push(t),r.claim=null,r.claimView=null,vf(r),r.plans=xf(e.seed>>>0,r.map,r.claimed),r.boardDirty=!0,r.nextWaveAt=e.time+Id.claimLeadS,gp(e,{type:`claim`,t:e.time,act:i.act,region:a[t].id,offers:i.offers.map(e=>a[e].id),auto:n,waitS:_p(e.time-i.at)})}function sp(e,t){let n=e.state,{packs:r,brutes:i,perPack:a}=n.plans[t-1],o=r*a,s=e.time,c=K.spawnJitter;for(let r=0;r<i;r++)n.spawnQueue.push({at:s+=K.spawnGap*1.5*(1+e.rng.range(-c,c)),arch:`brute`,wave:t});for(let i=0;i<r;i++){s+=K.spawnGap*(1+e.rng.range(-c,c));for(let e=0;e<a;e++)n.spawnQueue.push({at:s+e*K.packSpread,arch:`crawler`,wave:t})}let l=lp(e,t);gp(e,{type:`wave`,t:e.time,n:t,crawlers:o,packs:r,brutes:i,undoCleared:l})}function cp(e,t){let n=e.state,r=n.plans[t-1],{packs:i,brutes:a,perPack:o}=r,s=i*o,c=up(e),l=e.seed,u=e.time,d=K.spawnJitter;for(let e=0;e<a;e++)u+=K.spawnGap*1.5*(1+rf(-d,d,l,Qd.bruteGap,t,e)),n.spawnQueue.push({at:u,arch:`brute`,wave:t,gate:r.bruteGate[e],k:e});for(let e=0;e<i;e++){u+=K.spawnGap*(1+rf(-d,d,l,Qd.packGap,t,e));for(let i=0;i<o;i++)n.spawnQueue.push({at:u+i*K.packSpread,arch:`crawler`,wave:t,gate:r.packGate[e],k:a+e*o+i})}let f=lp(e,t),p={};n.map.gates.forEach((e,t)=>p[e.id]=r.byGate[t]),gp(e,{type:`wave`,t:e.time,n:t,crawlers:s,packs:i,brutes:a,undoCleared:f,byGate:p,h:c})}function lp(e,t){let n=e.state;n.stats.engageS[t-1]=-1,n.stats.firstSpawnAt[t-1]=-1,n.spawnQueue.sort((e,t)=>e.at-t.at),n.nextWaveAt=e.time+K.waveEvery,n.waveStartedAt=e.time;let r=n.undo.reduce((e,t)=>e+ +!!Rf(n.grid,t),0);return n.undo=[],r}function up(e){let t=e.state,n=t.grid,r=e.store,i=$d(-2128831035,e.tick);i=$d(i,t.coreHp);for(let e=0;e<t.inventory.length;e++)i=$d(i,t.inventory[e]);for(let e=0;e<n.building.length;e++)i=$d(i,n.building[e]),i=$d(i,n.dir[e]),i=$d(i,t.oreLeft[e]),i=$d(i,t.ammo[e]),i=$d(i,t.lanes[e]?.size??0),t.breach&&(i=$d(i,t.breach.hp[e]),i=$d(i,t.breach.wreck[e]));i=$d(i,dp(e));for(let e=0;e<r.count;e++)r.team[e]!==df||r.flags[e]&o.DEAD||(i=$d(i,r.arch[e]),i=$d(i,Math.round(r.x[e]*64)),i=$d(i,Math.round(r.z[e]*64)),i=$d(i,Math.round(r.hp[e]*16)));return ef(i)}function dp(e){let t=e.store,n=0;for(let e=0;e<t.count;e++)t.team[e]===df&&!(t.flags[e]&o.DEAD)&&n++;return n}function fp(e,t){let n=e.state;if(n.phase!==`build`){for(let t of e.commands.drain());return}let r=n.grid.version;for(let t of e.commands.drain())Bf(e,t.cmd);if(n.claim&&e.time-n.claim.at>=Id.claimAutoS&&op(e,n.claim.offers[0],!0),n.claim){(n.grid.version!==r||n.boardDirty)&&(n.board=kp(n,n.board.rev+1),n.boardDirty=!1),n.telemetry.onTick(e),Ap(e);return}Uf(e),np(e),ip(e),Yf(n),qf(e,t),ep(e,t),tp(e,t);let i=n.spawnQueue.length+dp(e);i===0&&(n.stats.quietS+=t),n.coreHp<=0?pp(e,`lost`,`core destroyed`):n.wave>=K.totalWaves&&i===0&&pp(e,`won`,null),(n.grid.version!==r||n.boardDirty)&&(n.board=kp(n,n.board.rev+1),n.boardDirty=!1),n.telemetry.onTick(e),Ap(e)}function pp(e,t,n){let r=e.state;r.phase=t,gp(e,{type:`end`,t:e.time,result:t}),r.record={...mp(e,t,n),ticks:e.tick+1,durationS:e.time+e.dt}}function mp(e,t,n){return e.state.telemetry.finish(e,wp(e,t,n))}function hp(e,t){let n=e.state.telemetry.finish(e,wp(e,`abandoned`,t));return{...n,samples:n.samples.slice(),events:n.events.slice()}}function gp(e,t){t.t=_p(t.t),e.state.telemetry.log(t)}var _p=e=>Math.round(e*10)/10,vp=[`drag`,`snap`,`route`,`tap`,`hotbar`,`sweep`,`rebuild`],yp=e=>typeof e==`string`&&vp.includes(e)?{via:e}:{};function bp(e){let t=e.state,n=t.grid,r=0,i=0,a=0,o=0,s=0;for(let e=0;e<n.building.length;e++){let c=t.lanes[e];c&&(r++,i+=c.size),Sd.get(n.building[e])?.spec.role===`turret`&&(a++,s+=t.ammo[e],t.ammo[e]===0&&o++)}return{belts:r,beltItems:i,guns:a,gunsEmpty:o,rounds:s}}function xp(e){let t=0;for(let n=0;n<e.oreLeft.length;n++)t+=e.oreLeft[n];return t}function Sp(e){let t=e.state,n=bp(e);return n.beltItems>t.stats.peakBeltItems&&(t.stats.peakBeltItems=n.beltItems),{t:Math.floor(e.time),wave:t.wave,coreHp:t.coreHp,ore:t.inventory[vd.IronOre],enemies:dp(e),...n,oreField:xp(t),...t.breach?Cp(t):{}}}function Cp(e){let t=e.breach,n=e.grid,r=xd.get(`wall`).id,i=0,a=0,o=0;for(let e=0;e<n.building.length;e++){let s=n.building[e];if(t.wreck[e]&&a++,!s)continue;s===r&&i++;let c=Sd.get(s);c&&c.spec.role!==`core`&&t.hp[e]<c.hp&&o++}return{walls:i,wrecks:a,damaged:o}}function wp(e,t,n){let r=e.state;return{result:t,reason:n,wave:r.wave,perks:[],placed:{...r.stats.placed},quickRemovals:r.stats.quickRemovals,dragsCancelled:0,undos:r.stats.undos,quickUndos:r.stats.quickUndos,rows:{misses:Array(r.map.h).fill(0),quickRemovals:r.stats.rowQuickRemovals.slice(),undos:r.stats.rowUndos.slice()},touch:null,starvedTurretSeconds:_p(r.stats.starvedTurretSeconds),peakBeltItems:r.stats.peakBeltItems,coreDamageBy:{...r.stats.coreDamageBy},metaEarned:0,kills:r.stats.kills,coreHp:r.coreHp,waves:{engageS:r.stats.engageS.slice(),quietS:_p(r.stats.quietS)},ore:{mined:r.stats.oreMined,banked:r.stats.oreBanked,toGuns:r.stats.oreToGuns,unspent:r.inventory[vd.IronOre],leftInGround:xp(r),tilesDepleted:r.stats.tilesDepleted},...r.stats.fronts?{fronts:Op(r,r.stats.fronts)}:{},...r.breach?{breach:Ep(r,r.breach)}:{},...r.map.claims?{claims:Tp(r.telemetry.events)}:{}}}function Tp(e){let t=[];for(let n of e)if(n.type===`claimOffer`)t.push({act:Number(n.act),offered:n.offers.slice(),offeredAt:n.t,picked:null,at:null,auto:!1,waitS:null});else if(n.type===`claim`&&!n.rejected){let e=t.find(e=>e.act===n.act);if(!e)continue;e.picked=String(n.region),e.at=n.t,e.auto=n.auto===!0,e.waitS=Number(n.waitS)}return t}function Ep(e,t){let n=e.map.gates,r={},i={},a={},o={};n.forEach((e,n)=>{a[e.id]=_p(t.heldTicks[n]/60),o[e.id]=_p(t.chewTicks[n]/60);for(let a of bd){let o=n*Sf+a.id;t.broken[o]&&(r[`${e.id}:${a.key}`]=t.broken[o]),t.bitten[o]&&(i[`${e.id}:${a.key}`]=t.bitten[o])}});let s=t.repairS.slice().sort((e,t)=>e-t),c=s.length>>1,l=0;for(let e=0;e<t.wreck.length;e++)t.wreck[e]&&l++;return{walls:e.stats.placed.wall??0,wallLines:t.wallLines,broken:r,bitten:i,heldS:a,chewS:o,rebuilt:t.rebuilt,rebuildMedianS:s.length===0?null:s.length&1?s[c]:_p((s[c-1]+s[c])/2),wrecksLeft:l,cleared:t.cleared,refusedOnMachine:t.refusedOnMachine,refundLost:t.refundLost}}function Dp(e){return{sent:Array(e).fill(0),kills:Array(e).fill(0),hits:Array(e).fill(0),dmg:Array(e).fill(0)}}function Op(e,t){let n={};return e.map.gates.forEach((r,i)=>{let a=0;for(let t=1;t<=e.wave&&a===0;t++)(e.plans[t-1]?.byGate?.[i]??0)>0&&(a=t);n[r.id]={sent:t.sent[i]??0,kills:t.kills[i]??0,hits:t.hits[i]??0,dmg:t.dmg[i]??0,...a?{opened:a}:{}}}),n}function kp(e,t){let n=e.grid,r={version:n.version,rev:t,width:n.width,height:n.height,terrain:n.terrain.slice(),building:n.building.slice(),dir:n.dir.slice(),ore:e.oreLeft.slice(),locked:e.locked?e.locked.slice():null};return e.breach&&(r.wreck=e.breach.wreck.slice(),r.wreckDir=e.breach.wreckDir.slice()),r}function Ap(e){let t=e.state,n=t.grid;t.flip^=1;let r=t.itemBuffers[t.flip],i=0;for(let e=0;e<t.lanes.length;e++){let a=t.lanes[e];if(!a||a.size===0)continue;let o=n.dir[e],s=jd(t.map,e%n.width)-hd[o]*.5,c=Md(t.map,e/n.width|0)-gd[o]*.5;i=a.writeItems(r,i,s,c,hd[o],gd[o])}let a=t.oreBuffers[t.flip];a.set(t.oreLeft);let s=new Uint8Array(t.ammo.length);for(let e=0;e<s.length;e++)s[e]=Math.min(255,t.ammo[e]);let c={t:e.time,tick:e.tick,phase:t.phase,wave:t.wave,totalWaves:K.totalWaves,nextWaveIn:t.wave>=K.totalWaves?-1:Math.max(0,t.nextWaveAt-e.time),nextWave:t.plans[t.wave]??null,threat:t.spawnQueue.length+dp(e),canCallWave:t.phase===`build`&&zf(e),coreHp:t.coreHp,coreMax:K.coreHp,ore:t.inventory[vd.IronOre],undoable:t.undo.reduce((e,t)=>e+ +!!Rf(n,t),0),board:t.board,ammo:s,oreLeft:a,oreFull:t.oreFull,starved:t.starved.slice(),items:r,itemCount:i/3,record:t.record,claimed:t.claimedIds,liveGates:t.liveGateIds,claim:t.claimView,claimNext:!t.claim&&rp(t)},l=t.breach;if(l){let n=l.hpBuf[t.flip];n.set(l.hp);let r=l.occBuf[t.flip];r.fill(0);let i=e.store;for(let e=0;e<i.count;e++){let n=i.arch[e];n!==lf&&n!==uf||i.flags[e]&o.DEAD||(r[Jf(t,i.x[e],i.z[e])]=1)}c.hp=n,c.occupied=r}e.publish(c)}var jp=`##vvv##########,##vvv##########,#:::::###..:::<,#.:::.###...::<,#.....###....:<,#.....###.....#,#cc...###...cc#,#cc...###...cc#,#cc...###...cc#,#.............#,#.............#,#.....###.....#,#.....###.....#,#.....###.....#,#.....###.....#,#.....GGG.....#,#.cc..GGG..cc.#,#.cc..GGG..cc.#,#.............#,#.............#,#.....ccc.....#,#.............#,##...#####.####,#.....###.....#,#.cc..###.....#,#.cc..###.....#,#.....#######.#,#.....###ccc..#,>:....###....:<,>:.cc.###....:<,>:.cc.###....:<,###############`.split(`,`),Mp=[{id:`north`,kind:`canyon`,pad:[2,0,3,2],apron:0,face:W.S,crew:8},{id:`east`,kind:`canyon`,pad:[14,2,1,3],apron:0,face:W.W,crew:8},{id:`west`,kind:`canyon`,pad:[0,28,1,3],apron:0,face:W.E,crew:8,region:`tansy`},{id:`southeast`,kind:`canyon`,pad:[14,28,1,3],apron:0,face:W.W,crew:8,region:`hazel`}],Np={x:6,y:15,w:3,h:3},Pp=[[1,6,2,3],[12,6,2,3],[2,16,2,2],[11,16,2,2],[6,20,3,1],[2,24,2,2],[3,29,2,2],[9,27,3,1]],Fp=[{id:`home`,rects:[[0,0,15,22]]},{id:`tansy`,rects:[[0,22,6,10]]},{id:`hazel`,rects:[[9,22,6,10]]}],Ip=[{afterWave:5,offers:[`tansy`,`hazel`]}];jp.flatMap((e,t)=>[...e].flatMap((e,n)=>e===`#`?[[n,t,1,1]]:[]));var Lp=[{kind:`drill`,x:2,y:7,dir:W.E},{kind:`gun`,x:3,y:7,dir:W.N},{kind:`drill`,x:12,y:7,dir:W.W},{kind:`gun`,x:11,y:7,dir:W.N},{kind:`drill`,x:3,y:16,dir:W.E},{kind:`belt`,x:4,y:16,dir:W.E},{kind:`belt`,x:5,y:16,dir:W.E}],Rp=325,zp={belt:`belt`,drill:`drill.iron`,gun:`gun`},Bp={"#":G.Rock,v:G.KeepClear,"<":G.KeepClear,">":G.KeepClear,":":G.KeepClear,c:G.IronNode,G:G.Floor,".":G.Floor};function Vp(e){for(let t=0;t<32;t++)for(let n=0;n<15;n++){let r=jp[t][n],i=r===void 0?void 0:Bp[r];if(i===void 0)throw Error(`og-v0 ART: unknown cell '${r}' at ${n},${t}`);e[t*15+n]=i}}var Hp={id:`og-v0`,w:15,h:32,core:{x:Np.x,y:Np.y},oreClusters:Pp.map((e,t)=>({name:`clay-${t}`,x:e[0],y:e[1],w:e[2],h:e[3],amount:Rp})),starter:Lp.map(e=>({key:zp[e.kind],x:e.x,y:e.y,dir:e.dir})),waypoints:null,gates:Mp.map(e=>({id:e.id,name:e.id,x:e.pad[0],y:e.pad[1],w:e.pad[2],h:e.pad[3],...e.region?{region:e.region}:{}})),paint:Vp,regions:Fp,claims:Ip},Up=new Map([[Ad.id,Ad],[Hp.id,Hp]]);function Wp(e){let t=Up.get(e??Ad.id);if(!t)throw Error(`unknown map "${e}"`);return t}function Gp(){try{let e=typeof location<`u`?new URLSearchParams(location.search).get(`map`):null;return e?Wp(e):Ad}catch{return Ad}}var Kp=Gp(),qp=Kp.waypoints===null,q=Kp.w,Jp=Kp.h,Yp=Kp.core;function Xp(e){return e-q/2+.5}function Zp(e){return e-Jp/2+.5}function Qp(e){return e+q/2}function $p(e){return e+Jp/2}function em(e){Kp.paint(e)}var tm={A:{kind:`A`,perspective:!0,fovDeg:18,pitchDeg:62,yawDeg:2},B:{kind:`B`,perspective:!1,fovDeg:0,pitchDeg:62,yawDeg:0}},nm=.2,rm=-.5,im=-1.5,am=.5,om=40,sm=1.45,cm=.4,lm=1.1,um=1.95;function dm(e,t,n,r){let i=Xp(e)-.5+n/2,a=Zp(t)-.5+r/2+cm,o=(o,s,c)=>({x0:i-o,x1:i+o,y0:1.3,y1:c,z0:a-s,z1:a+s,gx0:e,gy0:t,gx1:e+n,gy1:t+r});return[o(1,.45,1.5),o(.45,1.05,1.5),o(.75,.75,1.75),o(.45,.88,1.75)]}var fm=Math.PI/180;function pm(e,t,n,r,i,a,o){let s=e.pitchDeg*fm,c=e.yawDeg*fm,l=Math.sin(c)*Math.cos(s),u=Math.sin(s),d=Math.cos(c)*Math.cos(s),f=Math.hypot(d,l),p=d/f,m=-l/f,h=u*m,g=d*p-l*m,_=-u*p;return{spec:e,width:t,height:n,scale:o,cell:e.perspective?o/a:o,targetX:r,targetZ:i,ex:r+l*a,ey:u*a,ez:i+d*a,rx:p,ry:0,rz:m,ux:h,uy:g,uz:_,fx:-l,fy:-u,fz:-d}}function mm(e,t,n,r,i,a,o=om){return pm({kind:`B`,perspective:!1,fovDeg:0,pitchDeg:n,yawDeg:0},e,t,r,i,o,a)}function hm(e,t,n,r,i,a,o){let s=t/2/Math.tan(n*fm/2);return pm({kind:`A`,perspective:!0,fovDeg:n,pitchDeg:r,yawDeg:0},e,t,i,a,o,s)}var gm=6.5,_m=.42,vm=14,ym=32;function bm(e,t){let n=Math.tan(39*fm/2)*(e/t);return Math.min(ym,Math.max(vm,gm/2/n))}function xm(e,t,n,r,i){let a=bm(e,t),o=n.top+_m*(n.bottom-n.top),s={x:0,y:0},c=n=>Cm(hm(e,t,39,31,r,n,a),r,0,i,s).y,l=.01,u=i;for(let e=0;e<4;e++){let e=c(u),t=(c(u+l)-e)/l;if(!(Math.abs(t)>1e-9))break;u-=(e-o)/t}return hm(e,t,39,31,r,u,a)}function Sm(e){return Math.hypot(e.ex-e.targetX,e.ey,e.ez-e.targetZ)}function Cm(e,t,n,r,i){let a=t-e.ex,o=n-e.ey,s=r-e.ez,c=a*e.rx+o*e.ry+s*e.rz,l=a*e.ux+o*e.uy+s*e.uz,u=e.spec.perspective?e.scale/(a*e.fx+o*e.fy+s*e.fz):e.scale;return i.x=e.width/2+c*u,i.y=e.height/2-l*u,i}function wm(e,t,n,r,i=tm.B){let a=q/2+nm,o=Jp/2+nm,s=[];for(let e of[-a,a])for(let t of[im,am])for(let n of[-o,o])s.push([e,t,n]);let c=[];for(let e of[-q/2,q/2])for(let t of[-Jp/2,Jp/2])c.push([e,0,t]);let l=Math.max(1,r-n-6),u=Math.max(1,e-6),d=Math.max(1,e-32),f=i.perspective?t/2/Math.tan(i.fovDeg*fm/2):0,p=i.perspective?50:om,m=i.perspective?f:30,h=0,g=0,_={x:0,y:0},v=pm(i,e,t,h,g,p,m);for(let a=0;a<200;a++){let a=1/0,o=-1/0,y=1/0,b=-1/0;for(let[e,t,n]of s)Cm(v,e,t,n,_),a=Math.min(a,_.x),o=Math.max(o,_.x),y=Math.min(y,_.y),b=Math.max(b,_.y);let x=1/0,S=-1/0;for(let[e,t,n]of c)Cm(v,e,t,n,_),x=Math.min(x,_.x),S=Math.max(S,_.x);let C=Math.min(d/(S-x),u/(o-a),l/(b-y)),w=e/2-(x+S)/2,T=(n+r)/2-(y+b)/2;if(Math.abs(C-1)<1e-9&&Math.abs(w)<1e-6&&Math.abs(T)<1e-6)break;i.perspective?p/=C:m*=C;let E=i.perspective?f/p:m,D=-w/E,O=T/E,k=v.rx*v.uz-v.rz*v.ux;h+=(D*v.uz-v.rz*O)/k,g+=(v.rx*O-D*v.ux)/k,v=pm(i,e,t,h,g,p,m)}return v}function Tm(e,t){let n={x:0,y:0},r={x:0,y:0},i=1/0,a=1/0,o=Zp(t);for(let t=0;t<q;t++){let s=Xp(t);Cm(e,s-.5,0,o,n),Cm(e,s+.5,0,o,r),i=Math.min(i,Math.hypot(r.x-n.x,r.y-n.y)),Cm(e,s,0,o-.5,n),Cm(e,s,0,o+.5,r),a=Math.min(a,Math.hypot(r.x-n.x,r.y-n.y))}return{w:Math.round(i*10)/10,h:Math.round(a*10)/10}}function Em(e){return Tm(e,0)}var Dm={ox:0,oy:0,oz:0,dx:0,dy:0,dz:0};function Om(e,t,n){let r=t-e.width/2,i=e.height/2-n;if(e.spec.perspective)Dm.ox=e.ex,Dm.oy=e.ey,Dm.oz=e.ez,Dm.dx=e.fx*e.scale+e.rx*r+e.ux*i,Dm.dy=e.fy*e.scale+e.ry*r+e.uy*i,Dm.dz=e.fz*e.scale+e.rz*r+e.uz*i;else{let t=1/e.scale;Dm.ox=e.ex+(e.rx*r+e.ux*i)*t,Dm.oy=e.ey+(e.ry*r+e.uy*i)*t,Dm.oz=e.ez+(e.rz*r+e.uz*i)*t,Dm.dx=e.fx,Dm.dy=e.fy,Dm.dz=e.fz}}var km={t0:0,t1:0};function Am(e,t,n,r){if(Math.abs(t)<1e-12)return e>=n&&e<=r;let i=(n-e)/t,a=(r-e)/t;if(i>a){let e=i;i=a,a=e}return i>km.t0&&(km.t0=i),a<km.t1&&(km.t1=a),km.t0<=km.t1}function jm(e,t,n,r,i,a){return km.t0=0,km.t1=1/0,!Am(Dm.ox,Dm.dx,e,t)||!Am(Dm.oy,Dm.dy,n,r)||!Am(Dm.oz,Dm.dz,i,a)?1/0:km.t0}function Mm(e,t,n,r,i){Om(e,n,r);let a=1/0,o=-1;for(let e=0;e<q*Jp;e++){let n=e%q-q/2,r=(e/q|0)-Jp/2,i=t.floors[e],s=t.heights[e],c=t.insets[e],l=jm(n,n+1,im,i,r,r+1);s>i&&(l=Math.min(l,jm(n+c,n+1-c,i,s,r+c,r+1-c))),l<a&&(a=l,o=e)}let s=null;if(t.extra)for(let e of t.extra){let t=jm(e.x0,e.x1,e.y0,e.y1,e.z0,e.z1);t<a&&(a=t,s=e)}let c=1e-4;if(s)return i.x=Math.min(s.gx1-c,Math.max(s.gx0+c,Qp(Dm.ox+Dm.dx*a))),i.y=Math.min(s.gy1-c,Math.max(s.gy0+c,$p(Dm.oz+Dm.dz*a))),i;if(o<0){let e=Dm.dy===0?0:-Dm.oy/Dm.dy;return i.x=Qp(Dm.ox+Dm.dx*e),i.y=$p(Dm.oz+Dm.dz*e),i}let l=o%q,u=o/q|0;return i.x=Math.min(l+1-c,Math.max(l+c,Qp(Dm.ox+Dm.dx*a))),i.y=Math.min(u+1-c,Math.max(u+c,$p(Dm.oz+Dm.dz*a))),i}var Nm={x:0,y:0},Pm=[[0,0],[0,-.25],[0,-.4],[-.25,-.3],[.25,-.3],[-.35,0],[.35,0]];function Fm(e,t,n,r){let i=n>=0&&r>=0&&n<q&&r<Jp?t.heights[r*q+n]:0,a={x:0,y:0};for(let[o,s]of Pm)if(Cm(e,Xp(n)+o,i,Zp(r)+s,a),Mm(e,t,a.x,a.y,Nm),Math.floor(Nm.x)===n&&Math.floor(Nm.y)===r)return a;return Cm(e,Xp(n),i,Zp(r),a)}var Im=`fm.camera.v1`;function Lm(){try{let e=localStorage.getItem(Im);if(e===`A`||e===`B`)return e}catch{}return Rm??`B`}var Rm=null;function zm(e){Rm=e;try{localStorage.setItem(Im,e)}catch{}}function Bm(e,t,n=1,r=0,i=0,a=0,o=0){let s=1/n,c=t.rx*a+t.ux*o,l=t.ry*a+t.uy*o,u=t.rz*a+t.uz*o,d=r+(t.targetX-r)*s+c,f=i+(t.targetZ-i)*s+u;e.up.set(0,1,0);let p=Sm(t);if(e instanceof is)e.position.set(r+(t.ex-r)*s+c,t.ey*s+l,i+(t.ez-i)*s+u),e.fov=t.spec.fovDeg,e.aspect=t.width/t.height,e.near=Math.max(1,p*s-30),e.far=p*s+40;else{e.position.set(t.ex+(d-t.targetX),t.ey+l,t.ez+(f-t.targetZ));let r=t.width/2/t.scale,i=t.height/2/t.scale;e.left=-r,e.right=r,e.top=i,e.bottom=-i,e.zoom=n,e.near=1,e.far=p+60}e.lookAt(d,l,f),e.updateProjectionMatrix()}function Vm(e){let t=e.pitchDeg*Math.PI/180,n=e.yawDeg*Math.PI/180;return{q:new Ft().setFromEuler(new hn(-t,n,0,`YXZ`)),rx:Math.cos(n),rz:-Math.sin(n)}}var Hm=.3,Um=.25,Wm=.5,Gm=.06,Km=.35,qm=.035,Jm=.12,Ym={x:0,z:-2},Xm={x:Xp(Yp.x)+1,z:Zp(Yp.y)+1},Zm=90,Qm=e=>{let t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)},$m=class{ortho=new as(-1,1,1,-1,1,100);persp=new is(20,1,1,200);counts={pushes:0,punches:0,snaps:0};reducedMotion;kicks=!0;layout=null;override=null;pushT=1/0;punchT=1/0;held=!1;constructor(){let e=!1;try{e=matchMedia(`(prefers-reduced-motion: reduce)`).matches}catch{}this.reducedMotion=e}install(e){e.rig=this}get spec(){return this.layout?.spec??tm.B}get camera(){return(this.override?.spec??this.spec).perspective?this.persp:this.ortho}get overridden(){return this.override!==null}setOverride(e){this.override=e,e&&(this.pushT=this.punchT=1/0),this.apply()}setLayout(e){this.layout=e,this.apply()}pushIn(){this.blocked()||(this.pushT=0,this.counts.pushes++)}punch(){this.blocked()||(this.punchT=0,this.counts.punches++)}hold(e){e&&this.override&&(this.override=null,this.apply()),e&&this.kicking()&&(this.counts.snaps++,this.pushT=this.punchT=1/0,this.apply()),this.held=e}resize(e,t){}shake(e){this.punch()}update(e){this.pushT!==1/0&&(this.pushT+=e),this.punchT!==1/0&&(this.punchT+=e),this.pushT>1.05&&(this.pushT=1/0),this.punchT>Km&&(this.punchT=1/0),this.apply()}blocked(){return this.held||this.reducedMotion||!this.kicks||!this.layout||this.override!==null}kicking(){return this.pushT!==1/0||this.punchT!==1/0}apply(){let e=this.override;if(e){let t=e.spec.perspective?this.persp:this.ortho;Bm(t,e),t.far=Sm(e)+Zm,t.updateProjectionMatrix();return}let t=this.layout;if(!t)return;let n=this.spec.perspective?this.persp:this.ortho;if(!this.kicking()){Bm(n,t);return}let r=1,i=0,a=0,o=0,s=0,c=0;if(this.pushT!==1/0){let e=this.pushT,t=e<Hm?Qm(e/Hm):e<.55?1:1-Qm((e-Hm-Um)/Wm);r+=Gm*t,i+=Ym.x*t,a+=Ym.z*t,o+=t}if(this.punchT!==1/0){let e=(1-this.punchT/Km)**2;r+=qm*e,i+=Xm.x*e,a+=Xm.z*e,o+=e,s=(Math.random()-.5)*2*Jm*e,c=(Math.random()-.5)*2*Jm*e}o>0&&(i/=o,a/=o),Bm(n,t,r,i,a,s,c)}};function eh(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Ir,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=th(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=th(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function th(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new xr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function nh(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c={},l={},u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=[`setX`,`setY`,`setZ`,`setW`];for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.attributes[n];c[n]=new r.constructor(new r.array.constructor(r.count*r.itemSize),r.itemSize,r.normalized);let i=e.morphAttributes[n];i&&(l[n]||(l[n]=[]),i.forEach((e,t)=>{let r=new e.array.constructor(e.count*e.itemSize);l[n][t]=new e.constructor(r,e.itemSize,e.normalized)}))}let p=t*.5,m=10**Math.log10(1/t),h=p*m;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${~~(r[d[e]](i)*m+h)},`}if(a in n)u.push(n[a]);else{for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),a=e.morphAttributes[n],u=r.itemSize,p=c[n],m=l[n];for(let e=0;e<u;e++){let t=d[e],n=f[e];if(p[n](o,r[t](i)),a)for(let e=0,r=a.length;e<r;e++)m[e][n](o,a[e][t](i))}}n[a]=o,u.push(o),o++}}let g=e.clone();for(let t in e.attributes){let e=c[t];if(g.setAttribute(t,new e.constructor(e.array.slice(0,o*e.itemSize),e.itemSize,e.normalized)),t in l)for(let e=0;e<l[t].length;e++){let n=l[t][e];g.morphAttributes[t][e]=new n.constructor(n.array.slice(0,o*n.itemSize),n.itemSize,n.normalized)}}return g.setIndex(u),g}function rh(e={}){if(e.kit)return yh(e);let t=e.opacity!==void 0&&e.opacity<1||e.map!==void 0||e.additive===!0||e.overlay===!0,n={color:e.colors?16777215:e.color??16777215,transparent:t,opacity:e.opacity??1,depthWrite:!t,depthTest:e.depthTest??!0,vertexColors:e.vertexColors??!1,blending:e.additive?2:1,side:e.doubleSide?2:0},r=e.map??e.texture;return e.unlit?new qr(r?{...n,map:r}:n):new Oo({...n,...r?{map:r}:{},flatShading:e.flat??!0,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1})}function J(e,t,n={}){let r=new _i(e,rh(n),t);return n.colors&&(r.instanceColor=new li(new Float32Array(t*3),3)),r.instanceMatrix.setUsage(mt),r.frustumCulled=!1,r.count=0,n.renderOrder!==void 0&&(r.renderOrder=n.renderOrder),r}function Y(e,t,n,r=0,i=0,a=0){return new Li(e,t,n).translate(r,i+t/2,a)}function ih(e,t){return new ro(new ya(e.map(([e,t])=>new R(e,t))),{depth:t,bevelEnabled:!1}).rotateX(-Math.PI/2)}function X(e,t){let n=new V(t),r=e.attributes.position.count,i=new Float32Array(r*3);for(let e=0;e<r;e++)n.toArray(i,e*3);return e.setAttribute(`color`,new xr(i,3)),e}function ah(...e){let t=e.every(e=>e.attributes.color!==void 0),n=eh(e.map(e=>{let n=e.index?e.toNonIndexed():e;for(let e of Object.keys(n.attributes))e!==`position`&&e!==`normal`&&!(t&&e===`color`)&&n.deleteAttribute(e);return n}),!1);if(!n)throw Error(`merge: incompatible geometries`);return n.computeVertexNormals(),n}var oh=new an,sh=new Ft,ch=new z,lh=new z,uh=new z(0,1,0);function dh(e,t,n,r,i,a=0,o=1,s=1,c=1){sh.setFromAxisAngle(uh,a),ch.set(n,r,i),lh.set(o,s,c),oh.compose(ch,sh,lh),e.setMatrixAt(t,oh)}function fh(e,t,n,r,i,a,o=1,s=1){ch.set(n,r,i),lh.set(o,s,1),oh.compose(ch,a,lh),e.setMatrixAt(t,oh)}var ph=e=>-e*(Math.PI/2),mh=(e,t)=>{let n=Math.sin(e*12.9898+t*78.233)*43758.5453;return n-Math.floor(n)};function hh(e,t=!1){let n=e.count;if(n<=0)return;let r=e.instanceMatrix;r.clearUpdateRanges(),r.addUpdateRange(0,n*16),r.needsUpdate=!0;let i=e.instanceColor;t&&i&&(i.clearUpdateRanges(),i.addUpdateRange(0,n*3),i.needsUpdate=!0)}function gh(e=32,t=.35){let n=new Uint8Array(e*e*4);for(let r=0;r<e;r++)for(let i=0;i<e;i++){let a=Math.min(1,Math.min(i+.5,e-i-.5)/(e*t)),o=Math.min(1,Math.min(r+.5,e-r-.5)/(e*t)),s=a*a*(3-2*a)*(o*o*(3-2*o));n[(r*e+i)*4+3]=Math.round(255*s)}let r=new ci(n,e,e,pe);return r.magFilter=D,r.minFilter=D,r.needsUpdate=!0,r}var _h={value:0},vh={value:1};function yh(e={}){let t=new Oo({color:16777215,vertexColors:!0,flatShading:!0,side:e.doubleSide?2:0,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1});return t.onBeforeCompile=e=>{e.uniforms.uPhase=_h,e.uniforms.uFlowSpeed=vh,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float lume;
attribute float flow;
varying float vLume;
varying float vFlow;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vLume = lume;
vFlow = flow;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uPhase;
uniform float uFlowSpeed;
varying float vLume;
varying float vFlow;`).replace(`#include <color_fragment>`,`#include <color_fragment>
if (vFlow > 0.5) {
  float band = 1.0 - step(0.16, fract(vFlow - uPhase * uFlowSpeed));
  diffuseColor.rgb = mix(diffuseColor.rgb, mix(diffuseColor.rgb, vec3(1.0), 0.65), band);
}`).replace(`#include <opaque_fragment>`,`outgoingLight = mix(outgoingLight, diffuseColor.rgb * (1.0 + 0.12 * sin(uPhase * 1.5708)), vLume);
#include <opaque_fragment>`)},t.customProgramCacheKey=()=>`coalition-kit`,t}function bh(e,t){return X(e,t),e.setAttribute(`lume`,new xr(new Float32Array(e.attributes.position.count).fill(1),1)),e}function xh(e,t){let n=e.attributes.position,r=new Float32Array(n.count);for(let e=0;e<n.count;e++)r[e]=1+t(n.getX(e),n.getY(e),n.getZ(e));return e.setAttribute(`flow`,new xr(r,1)),e}function Sh(...e){let t=eh(e.map(e=>{let t=e.index?e.toNonIndexed():e,n=t.attributes.position.count;for(let e of Object.keys(t.attributes))[`position`,`color`,`lume`,`flow`].includes(e)||t.deleteAttribute(e);return t.attributes.color||X(t,16777215),t.attributes.lume||t.setAttribute(`lume`,new xr(new Float32Array(n),1)),t.attributes.flow||t.setAttribute(`flow`,new xr(new Float32Array(n),1)),t}),!1);if(!t)throw Error(`kitMerge: incompatible geometries`);return nh(t,1e-5)}function Ch(e,t,n){e.computeBoundingBox();let r=e.boundingBox,i=e.attributes.position,a=new V(t),o=new V(n),s=new V,c=new Float32Array(i.count*3),l=r.max.y-r.min.y||1;for(let e=0;e<i.count;e++)s.copy(a).lerp(o,(i.getY(e)-r.min.y)/l).toArray(c,e*3);return e.setAttribute(`color`,new xr(c,3)),e}function wh(e,t,n,r,i=0){return new zi(e,t,n,r).translate(0,i+n/2,0)}function Th(e,t,n,r=0,i=Math.PI*2,a=32,o=0){let s=new ya,c=(e,t)=>[e*Math.cos(t),-e*Math.sin(t)];if(Math.abs(i-r)>=Math.PI*2-1e-6){if(s.absarc(0,0,t,0,Math.PI*2,!1),e>0){let t=new va;t.absarc(0,0,e,0,Math.PI*2,!0),s.holes.push(t)}}else{for(let e=0;e<=a;e++){let[n,o]=c(t,r+(i-r)*e/a);e?s.lineTo(n,o):s.moveTo(n,o)}if(e>0)for(let t=a;t>=0;t--){let[n,o]=c(e,r+(i-r)*t/a);s.lineTo(n,o)}else s.lineTo(0,0);s.closePath()}return new ro(s,{depth:n,bevelEnabled:!1,curveSegments:a}).rotateX(-Math.PI/2).translate(0,o,0)}var Eh=new z,Dh=new z,Oh=new z(0,1,0),kh=(e,t,n)=>(Eh.set(t[0],t[1],t[2]),Dh.set(n[0],n[1],n[2]).sub(Eh).normalize(),e.applyQuaternion(new Ft().setFromUnitVectors(Oh,Dh)).translate(Eh.x,Eh.y,Eh.z));function Ah(e,t,n,r=n,i=8){let a=Eh.set(e[0],e[1],e[2]).distanceTo(Dh.set(t[0],t[1],t[2]));return kh(new zi(r,n,a,i).translate(0,a/2,0),e,t)}function jh(e,t,n,r=n){let i=Eh.set(e[0],e[1],e[2]).distanceTo(Dh.set(t[0],t[1],t[2]));return kh(new Li(n,i,r).translate(0,i/2,0),e,t)}function Mh(e,t,n,r,i,a,o=16){let s=new z(e[0],e[1],e[2]),c=new z(t[0],t[1],t[2]),l=[];for(let e=0;e<=o;e++){let t=e/o,a=s.clone().lerp(c,t),u=i+t*r*Math.PI*2;l.push(new z(a.x+Math.cos(u)*n,a.y,a.z+Math.sin(u)*n))}return new go(new Qi(l),o,a,4,!1)}function Nh(e,t,n=8,r=2/3,i=Math.PI/8){let a=Math.PI*2/n;return ah(...Array.from({length:n},(n,o)=>new lo(e,t,6,1,i+o*a,a*r).rotateX(-Math.PI/2)))}function Ph(e,t=!0){let n=new Uint8Array(16384),r=new Float32Array(4096).fill(1),i=(e,t,n)=>{e<0||t<0||e>=64||t>=64||(r[t*64+e]=r[t*64+e]*(1-n))},a=(e,t,n,r,a,o)=>{for(let s=0;s<64;s++)for(let c=0;c<64;c++){let l=c+.5-e,u=s+.5-t,d=n-e,f=r-t,p=Math.max(0,Math.min(1,(l*d+u*f)/(d*d+f*f)));Math.hypot(l-p*d,u-p*f)<a/2&&i(c,s,o)}};if(e===`flag`){for(let e=0;t&&e<64;e++)for(let[t,n]of[[e,0],[e,1],[0,e],[1,e],[e,63],[63,e]])i(t,n,.1);a(1,26,40,30,1.4,.07),a(40,30,63,22,1.4,.07),a(40,30,36,63,1.4,.07)}else if(e===`gravel`){r.fill(.94);let e=11,t=()=>(e=e*16807%2147483647)/2147483647;for(let e=0;e<260;e++){let e=Math.floor(t()*64),n=Math.floor(t()*64),r=1+Math.floor(t()*2.6),a=.06+t()*.12;for(let t=0;t<r;t++)for(let o=0;o<r;o++)i((e+o)%64,(n+t)%64,a);if(t()<.35)for(let t=0;t<r;t++)i((e+t)%64,(n+64-1)%64,-.06)}}else{let e=5,t=()=>(e=e*16807%2147483647)/2147483647;for(let e=0;e<110;e++){let e=Math.floor(t()*64),n=Math.floor(t()*64),r=.03+t()*.05;i(e,n,r),i(e+1,n,r)}for(let e=0;e<64;e++)for(let[t,n]of[[e,0],[e,1],[0,e],[1,e]])i(t,n,.12)}for(let e=0;e<4096;e++){let t=Math.min(255,Math.round(255*r[e]));n[e*4]=t,n[e*4+1]=t,n[e*4+2]=t,n[e*4+3]=255}let o=new ci(n,64,64,pe);return o.colorSpace=ct,o.magFilter=D,o.minFilter=k,o.generateMipmaps=!0,o.anisotropy=4,o.needsUpdate=!0,o}var Fh=14,Ih=6,Lh=-.02,Rh=[0,.35,.9,1.5],zh=.08,Bh=.75,Vh=.5,Hh=[1,1.8,2.6],Uh=.4,Wh=.55,Gh=.6,Kh=3.2,qh=8023904,Jh=12169376,Yh=10787456,Xh=10128500,Zh=4867132,Qh=11773580,$h=6971474,eg=10524034,tg=6971474,ng=11182221;function rg(e,t){return t.y===0?`north`:t.x+t.w===e.w?`east`:t.y+t.h===e.h?`south`:t.x===0?`west`:null}function ig(e,t){let n=rg(e,t);switch(n){case`north`:return{id:t.id,side:n,x0:t.x,z0:-5,x1:t.x+t.w,z1:0};case`south`:return{id:t.id,side:n,x0:t.x,z0:e.h,x1:t.x+t.w,z1:e.h+5};case`east`:return{id:t.id,side:n,x0:e.w,z0:t.y,x1:e.w+5,z1:t.y+t.h};case`west`:return{id:t.id,side:n,x0:-5,z0:t.y,x1:0,z1:t.y+t.h};default:return null}}var ag=e=>e.side===`north`||e.side===`south`;function og(e,t,n){switch(e.side){case`north`:return e.z1-n;case`south`:return n-e.z0;case`east`:return t-e.x0;default:return e.x1-t}}function sg(e){return ag(e)?[e.x0-1,e.z0,e.x1+1,e.z1]:[e.x0,e.z0-1,e.x1,e.z1+1]}function cg(e,t,n,r,i,a){let o=Math.max(n-e,0,e-i),s=Math.max(r-t,0,t-a);return Math.sqrt(o*o+s*s)}function lg(e){let t=Math.min(1,Math.max(0,e/Kh));return t*t*(3-2*t)}function ug(e,t){let n=e.w,r=e.h,i=e.gates.map(t=>ig(e,t)).filter(e=>e!==null),a=i.map(sg),o=(e,i)=>e>=0&&i>=0&&e<n&&i<r&&t[i*n+e]!==G.Rock,s=new Float32Array(n*r),c=new Float32Array(n*r),l=new Float32Array(n*r*2),u=Rh.length-1;for(let e=0;e<r;e++)for(let t=0;t<n;t++){if(o(t,e))continue;let r=u;for(let n=1;n<u&&r===u;n++)for(let i=e-n;i<=e+n&&r===u;i++)for(let e=t-n;e<=t+n;e++)o(e,i)&&(r=n);let i=e*n+t,a=Rh[r];s[i]=a,c[i]=.5-Math.max(.1,Math.min(.3,r-.5-a)),l[i*2]=t+.5+(mh(i,41)-.5)*2*zh,l[i*2+1]=e+.5+(mh(i,42)-.5)*2*zh}let d=2*n+1,f=new Float32Array(d*(2*r+1)),p=(e,t)=>e>=0&&t>=0&&e<n&&t<r?s[t*n+e]:0;for(let e=0;e<=2*r;e++)for(let t=0;t<=2*n;t++){let r=e*d+t;if(t&1&&e&1){let i=(e-1)/2*n+(t-1)/2;f[r]=s[i]*(.85+.15*mh(i,51));continue}let i=t&1?[(t-1)/2]:[t/2-1,t/2],a=e&1?[(e-1)/2]:[e/2-1,e/2],o=1/0;for(let e of a)for(let t of i)o=Math.min(o,p(t,e));f[r]=o*(t&1||e&1?Bh:Vh)*(.65+.35*mh(r,52))}let m=[],h=(e,t,n,r,a,s)=>{let c=n,l=r;for(let n of i)c=Math.min(c,cg(e,t,n.x0,n.z0,n.x1,n.z1)-.05);for(let n=Math.floor(t-c)-1;n<=Math.floor(t+c)+1;n++)for(let r=Math.floor(e-c)-1;r<=Math.floor(e+c)+1;r++)o(r,n)&&(c=Math.min(c,cg(e,t,r,n,r+1,n+1)-.05));s>0&&(l=Math.min(l,Gh*s));for(let n of i)ag(n)||e+c<=n.x0||e-c>=n.x1||t<=n.z1||(l=Math.min(l,Gh*(t-.5-n.z1)));c<.3||l<.25||m.push({x:e,z:t,y:0,r:c,h:l,seg:5+Math.floor(mh(a,6)*3),yaw:mh(a,7)*Math.PI*2})},g=n+10;for(let e=-5;e<r+5;e++)for(let t=-5;t<n+5;t++){if(t>=0&&e>=0&&t<n&&e<r||a.some(([n,r,i,a])=>t>=n&&t<i&&e>=r&&e<a))continue;let i=(e+5)*g+t+5,o=t<0?-t:t>=n?t-n+1:0,s=e<0?-e:e>=r?e-r+1:0,c=Math.max(o,s),l=e>=r;if(l?s>=2&&mh(i,9)<.2:c>=4&&mh(i,3)<.35)continue;let u=l?.7:.4,d=t+.5+(mh(i,1)-.5)*u,f=e+.5+(mh(i,2)-.5)*u;c===1&&o===1&&(d+=t<0?-.15:.15),c===1&&s===1&&(f+=e<0?-.15:.15);let p=l?Gh*s*(.45+.55*mh(i,8)):1.1+.6*c+mh(i,4)*1.1,m=l?.8+mh(i,5)*.5:c===1?.62+mh(i,5)*.15:.8+mh(i,5)*.45;h(d,f,m,p,i,l?s:0)}let _=[],v=[];return i.forEach((e,t)=>{let n=Hh.length*3,i=5/n;if((ag(e)?[[e.x0-.92,e.x0],[e.x1,e.x1+.92]]:[[e.z0-.92,e.z0]]).forEach(([r,a],o)=>{for(let s=0;s<n;s++){let c=t*131+o*37+s,l=Hh[Math.floor(s/3)]+(mh(c,11)-.5)*.36,u=s*i,d=(s+1)*i,f=(s+.5)/n,p;p=e.side===`north`?{x0:r,z0:e.z1-d,x1:a,z1:e.z1-u,h:l,far:f}:e.side===`south`?{x0:r,z0:e.z0+u,x1:a,z1:e.z0+d,h:l,far:f}:e.side===`east`?{x0:e.x0+u,z0:r,x1:e.x0+d,z1:a,h:l,far:f}:{x0:e.x1-d,z0:r,x1:e.x1-u,z1:a,h:l,far:f},_.push(p),m.push({x:(p.x0+p.x1)/2,z:(p.z0+p.z1)/2,y:l,r:.4,h:.3+mh(c,12)*.35,seg:4+Math.floor(mh(c,13)*2),yaw:mh(c,14)*Math.PI*2})}}),!ag(e)){let n=[];for(let e=0;e<=10;e++)n.push(Uh*(.6+.4*mh(t*53+e,15)));v.push({x0:e.x0,x1:e.x1,z0:e.z1,crest:n})}let a=ag(e)?e.x1-e.x0+2:e.z1-e.z0+2;for(let n=0;n<=a;n++){let i=5e3+t*61+n,a=1+mh(i,16)*.4,o=3+mh(i,17)*1.5,s=5+a+.1,c=n-.5;e.side===`north`?h(e.x0+c,e.z1-s,a,o,i,0):e.side===`south`?h(e.x0+c,e.z0+s,a,o,i,e.z0+s-r):e.side===`east`?h(e.x0+s,e.z0+c,a,o,i,0):h(e.x1-s,e.z0+c,a,o,i,0)}}),{canyons:i,cones:m,walls:_,banks:v,crag:s,cragInset:c,lattice:f,peak:l}}var dg=[[0,0],[1,0],[2,0],[2,1],[2,2],[1,2],[0,2],[0,1]],fg=new V,pg=new V,mg=new V;function hg(e,t){let n=new Ir;return n.setAttribute(`position`,new xr(new Float32Array(e),3)),n.setAttribute(`normal`,new xr(new Float32Array(e.length),3)),n.setAttribute(`color`,new xr(new Float32Array(t),3)),n}function gg(e,t,n,r,i,a){let o=[],s=[];for(let[c,l]of[[e,t],[e,r],[n,r],[e,t],[n,r],[n,t]])o.push(c,i,l),a(c,l,mg),s.push(mg.r,mg.g,mg.b);return hg(o,s)}function _g(e,t,n){let r=[-14,-8,e+Fh-Ih,e+Fh],i=[-14,-8,t+Fh-Ih,t+Fh],a=new V(Yh),o=new V(n),s=(e,t)=>e>r[0]&&e<r[3]&&t>i[0]&&t<i[3],c=[];for(let e=0;e<3;e++)for(let t=0;t<3;t++)c.push(gg(r[t],i[e],r[t+1],i[e+1],Lh,(e,t,n)=>n.copy(s(e,t)?a:o)));return c}function vg(e,t){let n=e.w,r=e.h,i=(e,r)=>t[r*n+e]===G.Rock,a=new V(tg),o=new V(Yh),s=[],c=(e,t)=>void t.copy(a).lerp(o,Math.min(1,Math.max(0,e))**1.5),l=-.017;for(let e=0;e<n;e++)i(e,0)&&s.push(gg(e,-1,e+1,0,l,(e,t,n)=>c(-t/1,n))),i(e,r-1)&&s.push(gg(e,r,e+1,r+1,l,(e,t,n)=>c((t-r)/1,n)));for(let e=0;e<r;e++)i(0,e)&&s.push(gg(-1,e,0,e+1,l,(e,t,n)=>c(-e/1,n))),i(n-1,e)&&s.push(gg(n,e,n+1,e+1,l,(e,t,r)=>c((e-n)/1,r)));return s}function yg(e,t){let n=new Bi(e.r,e.h,e.seg,1,!0),r=n.attributes.position;for(let n=0;n<r.count;n++){if(r.getY(n)>0)continue;let i=.85+.15*mh(t*13+n%(e.seg+1)%e.seg,21);r.setX(n,r.getX(n)*i),r.setZ(n,r.getZ(n)*i)}let i=e.y>0?e.y:Lh;n.rotateY(e.yaw).translate(e.x,i+e.h/2,e.z);let a=n.toNonIndexed(),o=a.attributes.position,s=new Float32Array(o.count*3);fg.setHex(qh),pg.setHex(Jh);let c=Math.max(e.y+e.h,2.2);for(let e=0;e<o.count;e++)mg.copy(fg).lerp(pg,Math.min(1,Math.max(0,(o.getY(e)-Lh)/c))).toArray(s,e*3);return a.setAttribute(`color`,new xr(s,3)),a}function bg(e){let t=new Li(e.x1-e.x0,e.h,e.z1-e.z0).translate((e.x0+e.x1)/2,Lh+e.h/2,(e.z0+e.z1)/2).toNonIndexed(),n=t.attributes.position,r=t.attributes.normal,i=new Float32Array(n.count*3),a=1-.45*lg(e.far*5);fg.setHex($h),pg.setHex(eg);for(let t=0;t<n.count;t++)r.getY(t)>.5?mg.copy(pg):mg.copy(fg).lerp(pg,.35*Math.min(1,(n.getY(t)-Lh)/e.h)),mg.multiplyScalar(a).toArray(i,t*3);return t.setAttribute(`color`,new xr(i,3)),t}function xg(e,t){if(t.canyons.length===0)return null;let n=new V(Xh),r=new V(Zh),i=[],a=[],o=[],s=[];for(let c of t.canyons)for(let t=c.z0;t<c.z1;t++)for(let l=c.x0;l<c.x1;l++)for(let[u,d]of[[0,0],[0,1],[1,1],[0,0],[1,1],[1,0]])i.push(l+u-e.w/2,0,t+d-e.h/2),mg.copy(n).lerp(r,lg(og(c,l+u,t+d))).toArray(a,a.length),o.push(u,1-d),s.push(0,1,0);let c=new Ir;return c.setAttribute(`position`,new xr(new Float32Array(i),3)),c.setAttribute(`normal`,new xr(new Float32Array(s),3)),c.setAttribute(`color`,new xr(new Float32Array(a),3)),c.setAttribute(`uv`,new xr(new Float32Array(o),2)),c}function Sg(e,t){let n=[],r=[],i=new V(Xh),a=new V(Zh),o=new V(Qh),s=[e.z0,e.z0+Wh,e.z0+1],c=(c,l)=>{let u=e.x0+c/2,d=l===1?e.crest[c]:Lh+(l===0?.02:0);n.push(u,d,s[l]);let f=mg.copy(i).lerp(a,lg(og(t,u,s[l]))*.8);l===1&&f.lerp(o,.4),r.push(f.r,f.g,f.b)};for(let t=0;t<e.crest.length-1;t++)for(let e of[0,1])c(t,e),c(t,e+1),c(t+1,e+1),c(t,e),c(t+1,e+1),c(t+1,e);return hg(n,r)}function Cg(e,t){let n=2*e.w+1,r=[],i=[];fg.setHex(tg),pg.setHex(ng);let a=1,o=(e,t,n)=>{r.push(e,t,n),mg.copy(fg).lerp(pg,Math.min(1,t/.9)).multiplyScalar(a),i.push(mg.r,mg.g,mg.b)};for(let r=0;r<e.w*e.h;r++){if(t.crag[r]<=0)continue;let i=r%e.w,s=r/e.w|0,c=t.lattice[(2*s+1)*n+2*i+1];for(let e=0;e<8;e++){let[l,u]=dg[e],[d,f]=dg[(e+1)%8];a=.9+.16*mh(r*8+e,53),o(t.peak[r*2],c,t.peak[r*2+1]),o(i+d/2,t.lattice[(2*s+f)*n+2*i+d],s+f/2),o(i+l/2,t.lattice[(2*s+u)*n+2*i+l],s+u/2)}}return hg(r,i)}function wg(e,t,n,r){let i=[..._g(e.w,e.h,n)];r&&i.push(...vg(e,r)),t.cones.forEach((e,t)=>i.push(yg(e,t)));for(let e of t.walls)i.push(bg(e));return t.banks.forEach(e=>{let n=t.canyons.find(t=>!ag(t)&&t.z1===e.z0&&t.x0===e.x0);i.push(Sg(e,n))}),i.push(Cg(e,t)),ah(...i).translate(-e.w/2,0,-e.h/2)}var Tg=class{plan;mesh;floor;constructor(e,t,n){this.plan=ug(e,t),this.mesh=new ai(wg(e,this.plan,n,t),rh({vertexColors:!0}));let r=xg(e,this.plan);this.floor=r?new ai(r,rh({vertexColors:!0,texture:Ph(`gravel`)})):null}},Eg=3055195,Dg=10365730,Og=2072500,kg=16740277,Ag=4182394,jg=2072500,Mg=15002594,Z=q*Jp,Ng=Z*5,Pg=.74,Fg=.13,Ig=.08,Q={pearl:15659500,shade:13489617,navy:2569822,navyHi:4020879,rail:2834275,mint:8384719,algae:4178554,algaeSpent:8362632,green:4168274,greenLt:6076518,greenDk:3112514,trunk:7032634,patina:5220506,terra:12865582,terraRim:10632994,cobalt:4157400,coreDk:3818832,spent:10130570,alarm:14698042,ink:2502698},Lg={formwork:12170667,roadLip:13222576,clayLump:10273766,cliff:9075296,lip:13221801,shelf:8365150,forest:5212746,forestDk:4158528,grass:8827482,glow:15921124},Rg=0,zg=-.4,Bg=qp?Rg:zg,Vg=.08,Hg=.06,Ug=.21,Wg=.62,Gg=.3,Kg=.44,qg=.6,Jg=.42,Yg=-.04999999999999999,Xg=.28,Zg=.27,Qg=.74,$g=.12,e_=1.25,t_=1.5,n_=.13,r_=.47,i_=1.08,a_=.5,o_=.74,s_=.26,c_=.03,l_=.62,u_=.8,d_=.62,f_=.13,p_=.56,m_=.075,h_=14833484,g_=.62,__=7031354,v_=[9068616,6044975,8016448],y_=.05,b_=.12,x_=.08,S_=.34,C_=20,w_=.42,T_=.12,E_=-3.2,D_=-6,O_={belt:Vg,drill:Wg,turret:Qg,core:w_,wall:a_,factory:.5,splitter:Vg},k_={drill:.08,turret:.25},A_={[G.Floor]:11840404,[G.Rock]:8025452,[G.IronNode]:7309990,[G.CopperNode]:9067066,[G.PlasmaVent]:7035474,[G.Path]:9407622,[G.KeepClear]:14208942},j_=8219479,M_=11314059,N_={[G.KeepClear]:10128500,[G.Rock]:10129791},P_=13223613,F_=.6,I_=.75,L_=new V(P_);function R_(e){let t=e.r*.3+e.g*.59+e.b*.11;return e.setRGB(e.r+(t-e.r)*I_,e.g+(t-e.g)*I_,e.b+(t-e.b)*I_).lerp(L_,F_)}var z_=Lg.formwork,B_=xd.get(`belt`).id,V_=new Uint16Array(256);for(let e of Sd.values())e.spec.role!==`core`&&(V_[e.id]=e.hp);var H_=xd.get(`gun`).id,U_=xd.get(`wall`).id,W_=xd.get(`core`),G_=xd.get(`belt`),K_=G_.spec.role===`belt`?G_.spec.speed*60/256:1.875,q_=cf.indexOf(`crawler`),J_=cf.indexOf(`brute`),Y_=[[0,.15],[.25,-.05],[.25,-.16],[0,.04],[-.25,-.16],[-.25,-.05]],X_=Y_.map(([e,t])=>[e*1.4,t*1.6]),Z_=(e,t,n)=>new V(e).lerp(new V(t),n).getHex(),Q_=qp?Z_(M_,A_[G.Floor],.5):M_,$_=(e,t)=>{let n=(t-e)%(Math.PI*2);return n>Math.PI?n-=Math.PI*2:n<-Math.PI&&(n+=Math.PI*2),n};function ev(e,t=.1){return[X(wh(e-.02,e,t-.025,18),Q.pearl),X(wh(e-.05,e-.02,.025,18,t-.025),Q.pearl),X(wh(e+.01,e+.01,.018,18),Q.shade)]}function tv(){let e=ih(Y_.map(([e,t])=>[e*.62,t*.62]),.003).translate(0,Hg,0);return Sh(X(Y(.8,Hg,1),Q.rail),X(Y(.08,.085,1,-.36),Q.shade),X(Y(.08,.085,1,.36),Q.shade),X(e,Z_(Q.rail,Q.pearl,.2)),xh(bh(Y(.08,.006,1,0,Hg),Q.mint),(e,t,n)=>.5-n))}function nv(){let e=(e,t,n,r)=>Th(e,t,n,0,Math.PI/2,12,r).translate(-.5,0,-.5);return Sh(X(e(.1,.9,Hg,0),Q.rail),X(e(.1,.18,.085,0),Q.shade),X(e(.82,.9,.085,0),Q.shade),xh(bh(e(.46,.54,.006,Hg),Q.mint),(e,t,n)=>1-Math.atan2(n+.5,e+.5)/(Math.PI/2)))}function rv(){return Sh(X(new Hi(.14,0).scale(1.15,.72,1.1),14211288),X(new so(.05,0).scale(1.4,.4,1).translate(-.03,.08,-.02),16777215),X(new Ri(.12,8).rotateX(-Math.PI/2).translate(.02,-.14100000000000001,-.02),4871536))}function iv(e){let t=[...ev(.34,.1)],n=X(Th(.23,.345,.05,Math.PI/2-.8,Math.PI/2+.8,8,.075),e?Q.algaeSpent:Q.algae);t.push(e?n:xh(n,e=>e*5));for(let e=0;e<3;e++){let n=-Math.PI/2+e*Math.PI*2/3;t.push(X(jh([Math.cos(n)*.44,0,Math.sin(n)*.44],[Math.cos(n)*.17,.44,Math.sin(n)*.17],.08,.06),Q.pearl))}return t.push(X(wh(.035,.035,.4,6,.1),Q.shade)),t.push(X(wh(.2,.2,.06,12,.42),Q.pearl)),t.push(Sh(X(Y(.2,.018,.22),Q.navy),X(Y(.2,.004,.012,0,.018,0),Q.navyHi),X(Y(.012,.004,.22,0,.018,0),Q.navyHi)).rotateX(.44).rotateY(-.5).translate(.3,.3,.12)),t}function av(){let e=.12,t=.36,n=[];for(let r=0;r<3;r++)n.push(X(Mh([0,e,0],[0,t,0],.2,.33,r*Math.PI*2/3,.024,8),Q.pearl));for(let r of[e,t])n.push(X(new ho(.21,.022,3,12).rotateX(Math.PI/2).translate(0,r,0),Q.pearl));return n}function ov(e){let t=[X(wh(.15,.15,.13,12,.46),e?Q.spent:Q.terra),X(wh(.155,.155,.018,12,.46),e?8814970:Q.terraRim),X(new zi(.045,.055,.14,8).rotateX(Math.PI/2).translate(0,.51,-.19),Q.shade)];return e?t.push(X(wh(.03,.03,.006,10,.59),7236194)):t.push(X(ih([[0,.125],[.105,-.06],[-.105,-.06]],.012).translate(0,.59,-.01),Q.pearl),bh(wh(.028,.028,.008,10,.59).translate(0,0,.1),Q.mint)),t}function sv(){let e=[...ev(.36,.12)];for(let t of[Math.PI*145/180,Math.PI*215/180]){let n=Math.cos(t)*.28,r=Math.sin(t)*.28;e.push(X(wh(.115,.105,.04,12,.1).translate(n,0,r),Q.shade)),e.push(Ch(new oo(.122,0).scale(1,.62,1).translate(n,.16,r),Q.greenDk,Q.greenLt))}e.push(X(wh(.09,.12,.38,8,.12),Q.shade));for(let t of[.24,.34])e.push(X(new ho(.1,.016,3,10).rotateX(Math.PI/2).translate(0,t,0),Q.patina));return e.push(X(wh(.13,.11,.04,12,.48),Q.pearl)),Sh(...e)}function cv(e){let t=[],n=.26,r=.025;for(let i=0;i<6;i++){let a=new ya;a.moveTo(-.08/2,0),a.lineTo(.08/2,0),a.lineTo(.12/2,n),a.lineTo(-.12/2,n),a.closePath();let o=Sh(X(new ro(a,{depth:r,bevelEnabled:!1}).rotateX(Math.PI/2).translate(0,r,0),Q.cobalt),bh(Y(.124,.006,.024,0,.024,.249),Q.mint));t.push(o.rotateX(-e).translate(0,0,.13).rotateY(Math.PI/6+i/6*Math.PI*2).translate(0,.52,0))}return Sh(...t)}function lv(){let e=(e,t)=>e.rotateX(Math.PI/2).translate(0,qg,t);return Sh(X(wh(.1,.12,.08,10,.52),Q.pearl),X(e(new zi(.09,.09,Jg,10),.06),Q.shade),X(e(new zi(.1,.1,.035,10),Zg),Q.pearl),X(e(new zi(.097,.097,.08,10),-.09999999999999999),Q.navy),bh(e(new zi(.1,.1,.026,10),-.09999999999999999),Q.mint),X(Y(.075,.012,Xg,0,.6819999999999999,.09000000000000002),Q.coreDk))}function uv(){return Sh(X(new zi(.045,.045,1,8).rotateX(Math.PI/2).translate(0,.6619999999999999,.5),14606046),X(Y(.02,.006,1,-.012,.705,0),16777215).translate(0,0,.5))}function dv(){return Sh(X(Y(1,.44,1),Q.rail),X(Y(1,.06,1,0,.44),Q.pearl),bh(Y(1.03,.03,1.03,0,.305),Q.mint))}function fv(){let e=[[-.4,-.3],[-.22,-.4],[-.05,-.31],[.12,-.42],[.38,-.26],[.3,-.06],[.41,.12],[.27,.36],[.06,.28],[-.1,.41],[-.33,.3],[-.27,.1],[-.41,-.05]],[t,n,r]=v_;return ah(X(ih(e,.035),__),X(new Li(.28,.04,.13).rotateZ(.55).rotateY(.4).translate(-.12,.1,-.06),t),X(new Li(.2,.035,.11).rotateX(-.65).rotateY(-.9).translate(.16,.08,.13),n),X(new mo(.1).translate(.1,.07,-.19),r))}function pv(){let e=e=>Y(.05,.2,.001,0,-.1,0).rotateZ(e).translate(0,0,.002);return ah(X(new Ri(.19,18),Q.ink),X(new Ri(.16,18).translate(0,0,.001),Q.alarm),X(ah(e(Math.PI/4),e(-Math.PI/4)),16777215))}function mv(e){switch(xd.get(e)?.spec.role){case`belt`:return[Q.rail,Q.shade,Q.mint,Q.rail,Q.shade,Q.rail,Q.mint,Q.shade];case`wall`:return[Q.rail,Q.pearl,Q.mint,Q.rail,Q.pearl,Q.rail,Q.pearl,Q.shade];case`turret`:return[Q.pearl,Q.cobalt,Q.navy,Q.pearl,Q.cobalt,Q.shade,Q.navy,Q.mint];case`drill`:return[Q.pearl,Q.algae,Q.navy,Q.pearl,Q.algae,Q.shade,Q.navyHi,Q.pearl];default:return[Q.pearl,Q.navy,Q.shade,Q.pearl,Q.navy,Q.shade,Q.pearl,Q.navy]}}function hv(){let e=77,t=()=>(e=e*16807%2147483647)/2147483647,n=[],r=Math.PI*2;n.push(X(new zi(1.33,1.35,.1,40).translate(0,.05,0),Q.pearl),X(new zi(1.28,1.33,.02,40).translate(0,.11,0),Q.pearl),X(wh(1.37,1.37,.02,40),Q.shade),X(Th(1.2,1.28,.006,0,r,40,T_),Q.navy));for(let e=0;e<6;e++){let t=e/6*r,i=Math.cos(t)*.98,a=Math.sin(t)*.98;n.push(xh(X(wh(.11,.11,.36,10,T_).translate(i,0,a),Q.algae),(e,t)=>t*7),X(wh(.12,.12,.04,10,.48).translate(i,0,a),Q.pearl),X(wh(.125,.125,.03,10,T_).translate(i,0,a),Q.pearl),X(jh([i*.88,.2,a*.88],[i*.3,.2,a*.3],.05),Q.shade))}n.push(X(new po(.3,6,3,0,r,0,Math.PI/2).translate(0,T_,.98),Q.pearl),X(Th(.3,.34,.03,0,r,6,T_).translate(0,0,.98),Q.navy));let i=[0,T_,-.05],a=[0,sm-.1,cm-.05];n.push(X(Ah(i,a,.24,.15,10),Q.trunk));for(let e=0;e<3;e++)n.push(X(Mh(i,[a[0],a[1]+.05,a[2]],.28,.9,e*r/3,.028,20),Q.pearl));for(let e of[.25,.6]){let t=new z(...i).lerp(new z(...a),e);n.push(X(new ho(.28,.022,4,18).rotateX(Math.PI/2).translate(t.x,t.y,t.z),Q.pearl))}for(let e=0;e<10;e++){let t=e/10*r+.31;n.push(X(jh([0,sm-.25,cm-.05],[Math.cos(t)*.98,sm-.03,cm+Math.sin(t)*.98],.04),Q.pearl))}let o=sm,s=[X(new zi(lm,.45,.14,36).translate(0,o-.07,0),Q.shade),X(wh(lm,lm,.05,36,o),Q.pearl),X(Th(1.02,1.1,.05,0,r,36,o+.05),Q.pearl),X(Th(.89,1.02,.008,0,r,40,o+.05),Q.navy),bh(Th(.92,.99,.01,0,r,40,o+.05),Q.mint)];s.push(Ch(new oo(.34,1).scale(1,.4,1).translate(0,o+.12,0),Q.greenDk,Q.greenLt));for(let e=0;e<7;e++){let n=e/7*r+t()*.3,i=.28+t()*.05,a=.15+t()*.04;s.push(Ch(new oo(a,1).scale(1,.45,1).translate(Math.cos(n)*i,o+.1+t()*.04,Math.sin(n)*i),Q.greenDk,Q.greenLt))}for(let e=0;e<10;e++){let t=e/10*r+.31+Math.PI/10;s.push(X(Th(.44,.88,.05,t-.135,t+.135,4,o+.05),Q.green));for(let e of[.56,.72])s.push(Ch(new oo(.05,0).scale(1,.5,1).translate(Math.cos(t)*e,o+.1,Math.sin(t)*e),Q.greenDk,Q.greenLt))}let c=o+.24;s.push(X(Th(.36,.46,.04,0,r,36,c),Q.pearl));for(let e=0;e<5;e++){let t=e/5*r+.2;s.push(X(Ah([Math.cos(t)*.4,o+.02,Math.sin(t)*.4],[Math.cos(t)*.41,c,Math.sin(t)*.41],.025,.025,5),Q.pearl))}for(let e=0;e<10;e++){let t=e/10*r+.31,n=e===2||e===6;s.push(Sh(X(Y(.2,.022,.46),n?Q.navyHi:Q.navy),X(Y(.2,.024,.03,0,0,.215),Q.pearl),X(Y(.008,.004,.42,0,.022),n?7179456:Q.navyHi)).rotateX(-.16).translate(0,c+.01,.66).rotateY(Math.PI/2-t))}return s.push(X(wh(.07,.09,.06,12,o+.26),Q.pearl),X(wh(.062,.062,.04,12,o+.32),Q.navy),bh(wh(.066,.066,.016,12,o+.332),Q.mint),X(new Bi(.055,um+.04-(o+.36),10).translate(0,(o+.36+um+.04)/2,0),Q.pearl)),n.push(Sh(...s).translate(0,0,cm)),Sh(...n)}function gv(e){let t=q+nm*2,n=Jp+nm*2,r=[X(Y(t,rm-im,n,0,im),Lg.cliff),Ch(Y(t-.1,im-E_,n-.1,0,E_),Mg,Lg.cliff),X(Y(t+.05,.2,n+.05,0,rm-.24),Lg.lip)],i=-n/2-.8,a=[-t/2-.3,...e.flatMap(e=>[e-.5,e+.5]),t/2+.3];for(let e=0;e+1<a.length;e+=2){let t=a[e],n=a[e+1];n>t&&r.push(X(Y(n-t,.9,1.6,(t+n)/2,-.9,i),Lg.shelf))}for(let t of e){r.push(X(Y(1,.5,1.6,t,-.9,i),9407622));for(let e of[-1,1])r.push(X(Y(.06,.4,1.6,t+e*.47,zg,i),Lg.formwork))}for(let i=0;i<34;i++){let a=-t/2-.1+mh(i,1)*(t+.2);if(e.some(e=>Math.abs(a-e)<.75))continue;let o=-n/2-.3-mh(i,2)*1.15,s=.8+mh(i,3)*.5;r.push(X(wh(.05,.06,.2*s,5).translate(a,-.05,o),Q.trunk),X(new Bi(.34*s,.6*s,7).translate(a,-.05+.5*s,o),Lg.forest),X(new Bi(.26*s,.45*s,7).translate(a,-.05+.77*s,o),Lg.forestDk))}for(let e=0;e<22;e++){let i=-t/2+.2+mh(e,5)*(t-.4);r.push(X(new Bi(.2,1,3).rotateZ(Math.PI).translate(0,-.5,0).scale(.4+mh(e,6)*.5,.15+mh(e,7)*.3,.1).translate(i,rm-.04,n/2+.03),mh(e,8)<.5?5214026:Lg.grass))}return ah(...r)}function _v(e){let t=[];for(let n=0;n<q;n++)e[n]===G.Path&&t.push(Xp(n));let n=new ai(gv(t),rh({vertexColors:!0})),r=q+nm*2,i=Jp+nm*2,a=new ai(new co(r+1.2,i+1.2).rotateX(-Math.PI/2),new qr({color:0,transparent:!0,opacity:.3,map:gh(32,.2),depthWrite:!1}));a.position.set(1.4,-5.99,-1.6),a.renderOrder=-1;let o=new Ri(19,48).rotateX(-Math.PI/2),s=new Float32Array(o.attributes.position.count*3),c=new V(Lg.glow),l=new V(Mg);for(let e=0;e<s.length/3;e++)(e===0?c:l).toArray(s,e*3);o.setAttribute(`color`,new xr(s,3));let u=new ai(o,new qr({vertexColors:!0,depthWrite:!1}));return u.position.set(0,D_,1),u.renderOrder=-2,{parts:[u,a,n],ground:n}}var vv=class{root=new Nn;heights=new Float32Array(Z);floors=new Float32Array(Z);insets=new Float32Array(Z);extra=dm(Yp.x,Yp.y,W_.w,W_.h);gridTex=Ph(`flag`);plainTex=qp?Ph(`flag`,!1):null;gridOn=!0;tiles=J(Y(1,1,1,0,-1),Z,{colors:!0,texture:this.gridTex});road=J(Y(1,1,1,0,-1),Z,{colors:!0,texture:Ph(qp?`gravel`:`concrete`)});trenchWalls=J(ah(X(Y(1,.398,.03,0,zg,-.485),z_),...[0,1,2,3].map(e=>X(Y(.15,.012,.03,-.375+e*.25,-.002,-.485),Lg.roadLip))),Z*2,{vertexColors:!0});lumps=J(new po(1,8,5).scale(1.1,.6,1),Z*3,{colors:!0,emissive:3828382,emissiveIntensity:.3,flat:!1});contact=J(new co(1,1).rotateX(-Math.PI/2),Z+2,{color:0,opacity:.26,map:gh(),unlit:!0,renderOrder:1});rails=J(tv(),Z,{kit:!0});railCorners=J(nv(),Z,{kit:!0,doubleSide:!0});items=J(rv(),Ng,{kit:!0,colors:!0});drillBase=J(Sh(...iv(!1)),Z,{kit:!0});drillRotor=J(Sh(...av()),Z,{kit:!0});drillCap=J(Sh(...ov(!1)),Z,{kit:!0});drillSpentMesh=J(Sh(...iv(!0),...av(),...ov(!0)),Z,{kit:!0});gunBase=J(sv(),Z,{kit:!0});bladesOpen=J(cv($g),Z,{kit:!0});bladesBud=J(cv(e_),Z,{kit:!0});gunTube=J(lv(),Z,{kit:!0});gunCore=J(uv(),Z,{kit:!0,colors:!0});walls=J(dv(),Z*5,{kit:!0});flashes=J(new lo(.1,.15,20),Z,{color:Q.mint,unlit:!0,doubleSide:!0,renderOrder:9});ammoBg=J(new co(Pg,Fg),Z*2,{color:Q.ink,unlit:!0,renderOrder:C_,depthTest:!1,overlay:!0});ammoFill=J(new co(1,Ig).translate(.5,0,0),Z*2,{colors:!0,unlit:!0,renderOrder:21,depthTest:!1,overlay:!0});emptyRing=J(ah(X(Nh(.415,.525,8,.72,Math.PI/8-Math.PI/4*.027),Q.ink),X(Nh(.44,.5).translate(0,.002,0),Q.alarm)),Z,{colors:!0,vertexColors:!0,unlit:!0,renderOrder:2});badge=J(ah(X(new Ri(.16,16),Q.alarm),X(ah(Y(.05,.14,.001,0,-.02,.002),Y(.05,.05,.001,0,-.1,.002)),16777215)),Z,{colors:!0,vertexColors:!0,unlit:!0,renderOrder:22,depthTest:!1,overlay:!0});wrecks=J(fv(),Z,{vertexColors:!0});pins=J(pv(),Z,{vertexColors:!0,unlit:!0,renderOrder:22,depthTest:!1,overlay:!0});ghostBox=J(Y(1,1,1),Z,{colors:!0,opacity:.42,unlit:!0,renderOrder:5});ghostArrow=J(ih(X_,.02),Z,{color:16777215,unlit:!0,opacity:.95,renderOrder:6});ghostCross=J(ah(Y(.13,.02,.62).rotateY(Math.PI/4),Y(.13,.02,.62).rotateY(-Math.PI/4)),Z,{color:16777215,unlit:!0,opacity:.95,renderOrder:6});sourceRing=J(ah(X(Nh(.4,.56,10,.68,Math.PI/8-Math.PI*2/10*.04),16777215),X(Nh(.425,.535,10,.6).translate(0,.002,0),kg)),8,{vertexColors:!0,unlit:!0,renderOrder:7});sources=new Float32Array(24);sourceCount=0;handleRing=J(ah(X(Nh(.36,.58,12,.7),16777215),X(Nh(.4,.54,12,.62).translate(0,.002,0),Ag)),1,{vertexColors:!0,unlit:!0,renderOrder:7});handleAt=new Float32Array(3);handleShown=!1;grove;coreShadow;itemColors=yd.map(e=>new V(e.color).lerp(new V(16777215),.1));loadColor=new V(yd[vd.IronOre].color).lerp(new V(16777215),.1);tmp=new V;lumpColor=new V(Lg.clayLump);alarm=new V(Q.alarm);white=new V(16777215);ammoOk=new V(3055195);hpRed=new V(h_);emptyBarDim=new V(Q.alarm).multiplyScalar(.45);oreBar=new V(8176895);copperBar=new V(11033130);rev=-1;drills=new Int32Array(Z);drillActive=new Uint8Array(Z);drillSpentAt=new Uint8Array(Z);drillCopper=new Uint8Array(Z);drillCount=0;wreckCells=new Int32Array(Z);wreckCount=0;hpBars=0;guns=new Int32Array(Z);magazine=new Float32Array(Z);range2=new Float32Array(Z);gunCount=0;gunYaw=new Float32Array(Z).fill(Math.PI);openUntil=new Float32Array(Z);recoil=new Float32Array(Z);lastFlash=new Float32Array(Z).fill(-1);flashLeft=new Float32Array(Z);facing=Vm(tm.B);lastCoreHp=-1;coreFlash=0;casters;staticCasters;receivers;shadowSun=null;scenery;constructor(e){vh.value=K_;let t=new Uint8Array(Z);em(t),this.scenery=qp?new Tg(Kp,t,Mg):null;let n=this.scenery?{parts:this.scenery.floor?[this.scenery.mesh,this.scenery.floor]:[this.scenery.mesh],ground:this.scenery.mesh}:_v(t),r=Xp(Yp.x)+(W_.w-1)/2,i=Zp(Yp.y)+(W_.h-1)/2;this.grove=new ai(hv(),yh()),this.grove.position.set(r,0,i),this.coreShadow=[r,i,W_.w+.3],this.casters=[this.grove,this.drillBase,this.drillRotor,this.drillCap,this.drillSpentMesh,this.gunBase,this.bladesOpen,this.bladesBud,this.gunTube,this.walls],this.staticCasters=[this.grove,this.drillBase,this.drillCap,this.drillSpentMesh,this.gunBase,this.walls],this.receivers=[n.ground,this.tiles,this.road,this.trenchWalls,this.rails,this.railCorners,this.grove,this.drillBase,this.gunBase],this.root.add(...n.parts,this.tiles,this.road,this.trenchWalls,this.lumps,this.contact,this.grove,this.rails,this.railCorners,this.drillBase,this.drillRotor,this.drillCap,this.drillSpentMesh,this.gunBase,this.bladesOpen,this.bladesBud,this.gunTube,this.gunCore,this.walls,this.wrecks,this.items,this.flashes,this.emptyRing,this.ammoBg,this.ammoFill,this.badge,this.pins,this.ghostBox,this.ghostArrow,this.ghostCross,this.sourceRing,this.handleRing),e.add(this.root)}update(e,t,n,r){_h.value=r,e.board.rev!==this.rev&&this.rebuild(e),this.updateCore(e,n),this.updateGuns(e,t,n,r),this.updateDrills(e,r),this.updateHp(e),this.updatePins(),this.updateItems(e),this.updateSource(r)}enableShadows(){for(let e of this.casters)e.castShadow=!0;for(let e of this.receivers)e.receiveShadow=!0;return`guns, drills, core`}useShadowMap(e){for(let e of this.staticCasters)e.castShadow=!0;for(let e of this.receivers)e.receiveShadow=!0;return e.castShadow=!0,e.shadow.autoUpdate=!1,e.shadow.needsUpdate=!0,this.shadowSun=e,this.contact.visible=!1,`core, drills, gun bases (cached)`}badgeScale=1;setGrid(e){this.plainTex&&e!==this.gridOn&&(this.gridOn=e,this.tiles.material.map=e?this.gridTex:this.plainTex)}get grid(){return this.gridOn}setFacing(e){this.facing=e,this.rev=-1}fired(e,t,n){let r=Math.floor(e+q/2),i=Math.floor(t+Jp/2);if(r<0||i<0||r>=q||i>=Jp)return;let a=i*q+r;this.recoil[a]=1,(this.lastFlash[a]<0||n-this.lastFlash[a]>=S_)&&(this.lastFlash[a]=n,this.flashLeft[a]=x_)}setGhosts(e){let t=0,n=0,r=0;this.sourceCount=0,this.handleShown=!1;let i=Math.min(e.length,Z);for(let a=0;a<i;a++){let i=e[a],o=Xp(i.x),s=Zp(i.y),c=i.x>=0&&i.y>=0&&i.x<q&&i.y<Jp;if(i.color===4182394){this.handleShown=!0,this.handleAt[0]=o,this.handleAt[1]=(c?this.floors[i.y*q+i.x]:0)+.02,this.handleAt[2]=s;continue}if(i.color===16740277&&this.sourceCount<8){let e=this.sourceCount++;this.sources[e*3]=o,this.sources[e*3+1]=(c?this.floors[i.y*q+i.x]:0)+.02,this.sources[e*3+2]=s;continue}let l=Math.max(c?this.heights[i.y*q+i.x]:0,.06)+.06;dh(this.ghostBox,r,o,-.04,s,0,.98,l+.04,.98),this.ghostBox.setColorAt(r++,this.tmp.setHex(i.color)),i.color===10365730?dh(this.ghostCross,n++,o,l+.005,s,0):i.dir>=0&&dh(this.ghostArrow,t++,o,l+.005,s,ph(i.dir))}this.ghostBox.count=r,this.ghostArrow.count=t,this.ghostCross.count=n,this.sourceRing.count=this.sourceCount,this.handleRing.count=+!!this.handleShown,hh(this.ghostBox,!0),hh(this.ghostArrow),hh(this.ghostCross)}rebuild(e){let t=e.board;this.rev=t.rev;let n=0,r=0,i=0,a=0,o=0,s=0,c=0,l=0,u=0,d=0,f=(e,n)=>e>=0&&n>=0&&e<q&&n<Jp&&t.building[n*q+e]===U_,p=(e,t,n,r=.004)=>{dh(this.contact,c++,e+.1,r,t-.1,0,n,1,n)};this.drillCount=this.gunCount=0;for(let c=0;c<Z;c++){let m=c%q,h=c/q|0,g=Xp(m),_=Zp(h),v=t.terrain[c],y=t.building[c],b=y?Sd.get(y):void 0,x=v===G.Path&&!qp,S=qp&&N_[v]!==void 0,C=v===G.Floor,w=v===G.IronNode,T=w&&t.ore[c]===0,E=x?zg:v===G.Rock&&!qp?.35:Rg,D=t.locked!==null&&t.locked[c]===1&&v!==G.Rock;x||S?(dh(this.road,r,g,E,_,0,1,E-rm,1),this.tmp.setHex(x?A_[G.Path]:N_[v]),S&&this.tmp.multiplyScalar(.96+.08*mh(c,29)),D&&R_(this.tmp),this.road.setColorAt(r++,this.tmp)):(dh(this.tiles,n,g,E,_,0,1,E-rm,1),this.tmp.setHex(T?j_:C&&m+h&1?Q_:A_[v]??A_[G.Floor]),C||this.tmp.multiplyScalar(.96+.08*mh(c,29)),D&&R_(this.tmp),this.tiles.setColorAt(n++,this.tmp)),this.floors[c]=E;let O=this.scenery?this.scenery.plan.crag[c]:0;if(this.heights[c]=b?O_[b.spec.role]??.5:O>0?O:E,this.insets[c]=b?k_[b.spec.role]??0:O>0?this.scenery.plan.cragInset[c]:0,x)for(let e=0;e<4;e++){let n=m+hd[e],r=h+gd[e];n<0||r<0||n>=q||r>=Jp||t.terrain[r*q+n]===G.Path||s<Z*2&&dh(this.trenchWalls,s++,g,0,_,ph(e))}if(w&&!b&&!T){let n=e.oreFull[c]||1,r=t.ore[c]*3>n*2?3:t.ore[c]*3>n?2:1;for(let e=0;e<r;e++){let t=(mh(c,e)-.5)*.56,n=(mh(c,e+7)-.5)*.56,r=.09+mh(c,e+13)*.05;dh(this.lumps,i,g+t,r*.25,_+n,mh(c,e+3)*3,r,r,r),this.lumps.setColorAt(i++,D?R_(this.tmp.copy(this.lumpColor)):this.lumpColor)}}let k=t.wreck?.[c]??0;if(k&&(dh(this.wrecks,d,g,.002,_,mh(c,41)*Math.PI*2),this.wreckCells[d++]=c,k===B_)){let e=t.wreckDir[c]+2&3;dh(this.rails,a++,g+hd[e]*.24,.03,_+gd[e]*.24,ph(t.wreckDir[c])+.5,1,1,.42)}if(!b)continue;let A=t.dir[c],ee=ph(A);switch(b.spec.role){case`belt`:{let t=A+3&3,n=A+1&3,r=A+2&3,i=Cv(e,m+hd[r],h+gd[r],A),s=Cv(e,m+hd[t],h+gd[t],n),c=Cv(e,m+hd[n],h+gd[n],t);!i&&s!==c?dh(this.railCorners,o++,g,Rg,_,ee,s?1:-1):dh(this.rails,a++,g,Rg,_,ee);break}case`drill`:{let n=t.ore[c]===0;if(p(g,_,.9),n){dh(this.drillSpentMesh,l++,g,Rg,_,ee);break}let r=this.drillCount++;dh(this.drillBase,r,g,Rg,_),dh(this.drillCap,r,g,Rg,_,ee),this.drills[r]=c,this.drillCopper[r]=+(b.spec.terrain===G.CopperNode);let i=Sv(e,m+hd[A],h+gd[A]);this.drillActive[r]=+(i===B_||i===H_||i===W_.id);break}case`turret`:{let e=this.gunCount++;dh(this.gunBase,e,g,Rg,_),p(g,_,.85),fh(this.ammoBg,e,g,n_,_+r_,this.facing.q),this.guns[e]=c,this.magazine[e]=b.spec.magazine,this.range2[e]=b.spec.range*b.spec.range;break}case`wall`:{let e=this.walls;dh(e,u++,g,Rg,_,0,o_,1,o_),p(g,_,.9);let t=f(m+1,h),n=f(m,h+1);t&&dh(e,u++,g+.5,Rg,_,Math.PI/2,s_,1,.5),n&&dh(e,u++,g,Rg,_+.5,0,s_,1,.5),f(m+1,h+1)&&!t&&!n&&dh(e,u++,g+.5,Rg,_+.5,Math.PI/4,s_,1,.9),f(m-1,h+1)&&!n&&!f(m-1,h)&&dh(e,u++,g-.5,Rg,_+.5,-Math.PI/4,s_,1,.9);break}}}let[m,h,g]=this.coreShadow;p(m-.1,h-.1,g),p(m+.02,h+cm+.2,2.1,.124),this.tiles.count=n,this.road.count=r,this.trenchWalls.count=s,this.contact.count=c,this.lumps.count=i,this.rails.count=a,this.railCorners.count=o,this.drillSpentMesh.count=l,this.walls.count=u,this.wrecks.count=this.wreckCount=d;let _=this.gunCount;for(let e=0;e<this.drillCount;e++){let t=this.drills[e];fh(this.ammoBg,_++,Xp(t%q),Gg,Zp(t/q|0)+Kg,this.facing.q,.62)}this.drillBase.count=this.drillCap.count=this.drillCount,this.gunBase.count=this.gunCount,this.ammoBg.count=_,hh(this.tiles,!0),hh(this.road,!0),hh(this.lumps,!0);for(let e of[this.trenchWalls,this.contact,this.rails,this.railCorners,this.drillBase,this.drillCap,this.drillSpentMesh,this.gunBase,this.walls,this.wrecks,this.ammoBg])hh(e);this.redrawShadows()}redrawShadows(){this.shadowSun&&(this.shadowSun.shadow.needsUpdate=!0)}updateCore(e,t){this.lastCoreHp>=0&&e.coreHp<this.lastCoreHp&&(this.coreFlash=.35),this.lastCoreHp=e.coreHp,this.coreFlash=Math.max(0,this.coreFlash-t);let n=this.grove.material;n.emissive.copy(this.alarm),n.emissiveIntensity=this.coreFlash>0?.55*(this.coreFlash/.35):0}updateDrills(e,t){let n=this.gunCount;for(let r=0;r<this.drillCount;r++){let i=this.drills[r],a=Xp(i%q),o=Zp(i/q|0),s=this.drillActive[r]?t*4+i:i;dh(this.drillRotor,r,a,Rg,o,s);let c=Math.min(1,(e.oreLeft[i]??0)/Math.max(1,e.oreFull[i]??1)),l=this.facing;fh(this.ammoFill,n,a-l.rx*.21,Gg,o+Kg-l.rz*.21,l.q,Math.max(.001,.42*c)),this.ammoFill.setColorAt(n++,this.drillCopper[r]?this.copperBar:this.oreBar)}this.drillRotor.count=this.drillCount,this.ammoFill.count=n,hh(this.drillRotor),hh(this.ammoFill,!0)}updateGuns(e,t,n,r){let i=.55+.45*Math.sin(r*12),a=Math.min(1,n*10),s=this.facing,c=this.badgeScale,l=i_+.3*(c-1),u=0,d=0,f=0,p=0,m=0;for(let h=0;h<this.gunCount;h++){let g=this.guns[h],_=Xp(g%q),v=Zp(g/q|0),y=-1,b=this.range2[h];for(let e=0;e<t.count;e++){let n=t.arch[e];if(n!==q_&&n!==J_||t.flags[e]&(o.DEAD|o.HIDDEN))continue;let r=t.x[e]-_,i=t.z[e]-v,a=r*r+i*i;a<=b&&(b=a,y=e)}let x=y>=0?Math.atan2(t.x[y]-_,t.z[y]-v):Math.PI+.7*Math.sin(r*.5+g*1.3),S=this.gunYaw[g]=this.gunYaw[g]+$_(this.gunYaw[g],x)*(y>=0?a:a*.2),C=Math.sin(S),w=Math.cos(S),T=this.recoil[g]=Math.max(0,this.recoil[g]-n/b_),E=y_*T*T;dh(this.gunTube,h,_-C*E,0,v-w*E,S);let D=e.starved[g]===1,O=Math.min(1,(e.ammo[g]??0)/Math.max(1,this.magazine[h]));if(O>0&&(dh(this.gunCore,m,_+C*(Yg-E),0,v+w*(Yg-E),S,1,1,Math.max(.02,Xg*O)),this.gunCore.setColorAt(m++,this.loadColor),y>=0&&(this.openUntil[g]=r+t_)),O>0&&this.openUntil[g]>r?dh(this.bladesOpen,f++,_,0,v,S):dh(this.bladesBud,p++,_,0,v,S),this.flashLeft[g]>0){this.flashLeft[g]=this.flashLeft[g]-n;let e=1.3-.5*(this.flashLeft[g]/x_),t=.32-E;dh(this.flashes,u++,_+C*t,qg,v+w*t,S,e,e,e)}let k=_-s.rx*.34,A=v+r_-s.rz*.34;if(D?(fh(this.ammoFill,h,k,n_,A,s.q,.68),this.ammoFill.setColorAt(h,this.tmp.copy(this.alarm).multiplyScalar(.5+.5*i))):O<=0?(fh(this.ammoFill,h,k,n_,A,s.q,.34),this.ammoFill.setColorAt(h,r%1<.5?this.alarm:this.emptyBarDim)):(fh(this.ammoFill,h,k,n_,A,s.q,Math.max(.001,.68*O)),this.ammoFill.setColorAt(h,this.ammoOk)),D||O<=0){let e=D?.7+.3*i:1,t=D?1+.06*i:1;dh(this.emptyRing,d,_,.012,v,0,t,1,t),this.emptyRing.setColorAt(d,this.tmp.copy(this.white).multiplyScalar(e)),fh(this.badge,d,_,l,v,s.q,t*c,t*c),this.badge.setColorAt(d,this.tmp.copy(this.white).multiplyScalar(e)),d++}}this.gunTube.count=this.gunCount,this.gunCore.count=m,this.bladesOpen.count=f,this.bladesBud.count=p,this.flashes.count=u,this.emptyRing.count=this.badge.count=d,hh(this.gunTube),hh(this.gunCore,!0),hh(this.bladesOpen),hh(this.bladesBud),hh(this.flashes),hh(this.emptyRing,!0),hh(this.badge,!0)}updateHp(e){let t=e.hp,n=this.gunCount+this.drillCount,r=n;if(t){let n=this.facing,i=this.badgeScale,a=e.board.building;for(let e=0;e<Z;e++){let o=t[e],s=V_[a[e]];if(o<=0||o>=s)continue;let c=Xp(e%q),l=Zp(e/q|0)+(a[e]===H_?u_:l_);fh(this.ammoBg,r,c,c_,l,n.q,d_/Pg,f_/Fg*i),fh(this.ammoFill,r,c-n.rx*(p_/2),c_,l-n.rz*(p_/2),n.q,Math.max(.001,p_*o/s),m_/Ig*i),this.ammoFill.setColorAt(r++,this.hpRed)}}(r!==n||this.hpBars!==0)&&(this.hpBars=r-n,this.ammoBg.count=this.ammoFill.count=r,hh(this.ammoBg),hh(this.ammoFill,!0))}updatePins(){let e=this.wreckCount;if(e===0&&this.pins.count===0)return;let t=this.facing,n=this.badgeScale,r=g_+.3*(n-1);for(let i=0;i<e;i++){let e=this.wreckCells[i];fh(this.pins,i,Xp(e%q),r,Zp(e/q|0),t.q,n,n)}this.pins.count=e,hh(this.pins)}get wreckPins(){return this.pins.count}updateItems(e){let t=Math.min(e.itemCount,Ng),n=e.items;for(let e=0;e<t;e++){let t=n[e*3],r=n[e*3+1];dh(this.items,e,t,Ug,r,(t+r)*2.5),this.items.setColorAt(e,this.itemColors[n[e*3+2]]??this.itemColors[0])}this.items.count=t,hh(this.items,!0)}updateSource(e){if(this.handleShown&&(dh(this.handleRing,0,this.handleAt[0],this.handleAt[1],this.handleAt[2],e*-.5),hh(this.handleRing)),this.sourceCount!==0){for(let t=0;t<this.sourceCount;t++)dh(this.sourceRing,t,this.sources[t*3],this.sources[t*3+1],this.sources[t*3+2],e*.5);hh(this.sourceRing)}}};function yv(e){for(let t of e.children)t instanceof ss?(t.color.setHex(16774368),t.intensity=3,t.position.set(-7,20,11)):t instanceof Ko?(t.color.setHex(13625087),t.groundColor.setHex(9076582),t.intensity=1.25):t instanceof cs&&(t.color.setHex(16643816),t.intensity=.35)}var bv=1024;function xv(e){let t=e.children.find(e=>e instanceof ss);t.shadow.mapSize.set(bv,bv);let n=t.shadow.camera;return n.left=n.bottom=-12,n.right=n.top=12,n.near=1,n.far=60,n.updateProjectionMatrix(),t.shadow.bias=-5e-4,t.shadow.normalBias=.03,t.castShadow=!1,t}function Sv(e,t,n){return t>=0&&n>=0&&t<q&&n<Jp?e.board.building[n*q+t]:0}function Cv(e,t,n,r){let i=Sv(e,t,n);if(!i)return!1;let a=Sd.get(i)?.spec.role;return(a===`belt`||a===`drill`)&&e.board.dir[n*q+t]===r}function wv(e){addEventListener(`error`,t=>{e.push(t.message||String(t.error))}),addEventListener(`unhandledrejection`,t=>{let n=t.reason;e.push(`unhandled rejection: ${n instanceof Error?n.message:String(n)}`)})}var Tv=Bg,Ev=1.15,Dv=.6,Ov=.7,$={graphite:3421755,plate:4869460,rim:6974836,hazard:14725678,hazTop:15123290,hazSide:13212200,black:1776671,concrete:10591636,mouth:7236454,beacon:16752410,signPlate:6053732,dust:15328472,bolt:7237750,spring:10396328,fleck:15764004,stem:7323466,leaf:9224304,clayShot:10273766,mint:8384719,streakTail:14087658,barBg:2502698,barFill:16763955};function kv(e,t,n,r=.25){let i=e.index?e.toNonIndexed():e;i.computeVertexNormals();let a=i.attributes.normal,o=new Float32Array(a.count*3),s=new V(t),c=new V(n);for(let e=0;e<a.count;e++)(a.getY(e)>r?s:c).toArray(o,e*3);return i.setAttribute(`color`,new xr(o,3)),i}var Av=(e,t)=>kv(e,$.hazTop,$.hazSide,t);function jv(e,t){return new ro(new ya(e.map(([e,t])=>new R(e,t))),{depth:t,bevelEnabled:!1}).translate(0,0,-t/2).rotateY(-Math.PI/2)}var Mv=1.06;function Nv(){let e=e=>e.rotateX(-.32).translate(0,.012,.17);return Sh(X(jv([[-.17,.03],[.12,.03],[.12,.07],[-.02,.16],[-.17,.18]],.32),$.graphite),X(Y(.26,.012,.125,0,.176,-.095).rotateX(.07),$.plate),...[-.17,.17].flatMap(e=>[-.09,.07].map(t=>X(Y(.045,.096,.096,e,0,t),$.black))),Av(e(new Li(.44,.1,.06).translate(0,.05,0))),X(Y(.024,.14,.024,.1,.18,-.12),$.black),bh(new so(.05,0).translate(.1,.36,-.12),$.beacon)).scale(Mv,Mv,Mv)}function Pv(){return Sh(Av(new zi(.18,.18,.92,12).rotateZ(Math.PI/2),.2),...[-.48,.48].map(e=>X(new zi(.185,.185,.04,12).rotateZ(Math.PI/2).translate(e,0,0),$.black)),X(Y(.06,.006,.05,-.3,.178,.02),$.graphite))}function Fv(){let e=[X(Y(.7,.28,.56,0,.1,-.06),$.graphite),X(Y(.66,.03,.52,0,.38,-.06),$.plate)];for(let t of[-1,1])e.push(X(Y(.03,.035,.58,t*.35,.37,-.06),$.rim),X(Y(.73,.035,.03,0,.37,-.06+t*.28),$.rim)),e.push(X(new zi(.13,.13,.1,10).rotateZ(Math.PI/2).translate(t*.36,.13,-.22),$.black),X(new zi(.06,.06,.105,8).rotateZ(Math.PI/2).translate(t*.36,.13,-.22),$.hazSide),X(Y(.05,.08,.34,t*.42,.26,.2),$.graphite),X(Y(.005,.1,.22,t*.352,.2,-.06),$.signPlate),X(Y(.03,.26,.03,t*.26,.4,.14),$.black));e.push(Pv().translate(0,.18,.36),X(Y(.9,.06,.08,0,.36,.26),$.graphite),X(new zi(.33,.2,.22,4).rotateY(Math.PI/4).scale(1.1,1,.85).translate(0,.52,-.08),$.concrete),X(Y(.38,.01,.3,0,.63,-.08),$.mouth),X(Y(.3,.06,.12,0,.06,-.38),$.concrete),X(Y(.56,.03,.03,0,.66,.14),$.black),X(wh(.03,.03,.2,6,.4).translate(.26,0,-.26),$.black),bh(new so(.05,0).translate(0,.73,.14),$.beacon));for(let t=0;t<5;t++)e.push(X(new Li(.09,.3,.01).rotateZ(.6).translate(-.24+t*.12,.25,-.345),t%2?$.black:$.hazard));return Sh(...e)}function Iv(){return ah(X(new oo(.065,0).scale(1,1,1.35),$.clayShot),X(new Li(.045,.045,.14).translate(0,0,-.1),$.mint))}var Lv=1024,Rv=new Int32Array(Lv).fill(-1),zv=new Float32Array(Lv),Bv=new Float32Array(Lv),Vv=new Float32Array(Lv);function Hv(e,t,n){let r=e.id[t],i=r&1023,a=e.x[t],o=e.z[t];if(Rv[i]!==r)Rv[i]=r,Vv[i]=Math.atan2(a-Xp(Math.floor(Qp(a))),o-Zp(Math.floor($p(o))));else{let e=a-zv[i],t=o-Bv[i];e*e+t*t>1e-6&&(Vv[i]=Math.atan2(e,t))}zv[i]=a,Bv[i]=o,n.yaw=Vv[i]}var Uv={crawlers:K.maxEnemies,brutes:64,shots:256},Wv={scale:1};function Gv(e){let t=new Int32Array(e).fill(-1),n=new Float32Array(e),r=new Float32Array(e),i=new Float32Array(e);return Object.assign((a,o,s)=>{let c=a.id[o],l=c&e-1,u=a.x[o],d=a.z[o];if(t[l]!==c)t[l]=c,i[l]=0;else{let e=u-n[l],t=d-r[l],a=e*e+t*t;a>1e-8&&a<1&&(i[l]=Math.atan2(e,t))}n[l]=u,r[l]=d,s.yaw=i[l]},{reset:()=>void t.fill(-1)})}function Kv(e,t=Uv,n=Gv(4096)){let r=(e,t,r)=>{n(e,t,r),r.scale*=Wv.scale};e.registry.register(`crawler`,{geometry:Nv(),material:yh(),maxInstances:t.crawlers,yOffset:Tv,bob:.012,pose:r}),e.registry.register(`brute`,{geometry:Fv(),material:yh(),maxInstances:t.brutes,yOffset:Tv,bob:.008,pose:r}),e.registry.register(`shot`,{geometry:Iv(),material:new qr({vertexColors:!0}),maxInstances:t.shots,yOffset:Dv,faceYaw:!0,pose:Hv})}var qv=64,Jv=class{maxShadows;maxTracers;shadows;bg=J(new co(.8,.13),64,{color:$.barBg,unlit:!0,renderOrder:7});fill=J(new co(1,.09).translate(.5,0,0),64,{color:$.barFill,unlit:!0,renderOrder:8});tracers;crawler=cf.indexOf(`crawler`);brute=cf.indexOf(`brute`);shot=cf.indexOf(`shot`);tId=new Int32Array(Lv).fill(-1);tX=new Float32Array(Lv);tZ=new Float32Array(Lv);pX=new Float32Array(qv);pZ=new Float32Array(qv);pavers=0;facing=Vm(tm.B);constructor(e,t=K.maxEnemies+64,n=Uv.shots){this.maxShadows=t,this.maxTracers=n,this.shadows=J(new Ri(.3,12).rotateX(-Math.PI/2),t,{color:0,opacity:.3,unlit:!0,renderOrder:1});let r=new Li(.045,.045,1).translate(0,0,-.5).toNonIndexed(),i=r.attributes.position,a=new Float32Array(i.count*3),o=new V($.mint),s=new V($.streakTail),c=new V;for(let e=0;e<i.count;e++){let t=-i.getZ(e);i.setXYZ(e,i.getX(e)*(1-.85*t),i.getY(e)*(1-.85*t),i.getZ(e)),c.copy(o).lerp(s,t).toArray(a,e*3)}r.setAttribute(`color`,new xr(a,3)),this.tracers=J(r,n,{vertexColors:!0,unlit:!0}),e.add(this.shadows,this.bg,this.fill,this.tracers)}setFacing(e){this.facing=e}paverNear(e,t,n=.6){for(let r=0;r<this.pavers;r++){let i=this.pX[r]-e,a=this.pZ[r]-t;if(i*i+a*a<n*n)return!0}return!1}update(e){let t=0,n=0,r=0,i=0,a=this.facing;for(let s=0;s<e.count;s++){let c=e.arch[s];if(c===this.shot&&!(e.flags[s]&(o.HIDDEN|o.DEAD))&&r<this.maxTracers){this.tracer(e,s,r++);continue}if(c!==this.brute&&c!==this.crawler||e.flags[s]&o.HIDDEN)continue;let l=e.x[s],u=e.z[s],d=c===this.brute,f=Wv.scale;if(n<this.maxShadows&&dh(this.shadows,n++,l+.03,Tv+.01,u-.02,0,(d?1.9:.85)*f,1,(d?1.7:.8)*f),!d||(i<qv&&(this.pX[i]=l,this.pZ[i++]=u),t>=64))continue;let p=e.hp[s],m=e.maxHp[s];if(m<=0||p>=m||p<=0)continue;let h=Tv+Ev*f;fh(this.bg,t,l,h,u,a.q),fh(this.fill,t,l-a.rx*.36,h,u+.01-a.rz*.36,a.q,p/m*.72),t++}this.pavers=i,this.shadows.count=n,this.bg.count=this.fill.count=t,this.tracers.count=r,hh(this.shadows),hh(this.bg),hh(this.fill),hh(this.tracers)}tracer(e,t,n){let r=e.id[t],i=r&1023,a=e.x[t],o=e.z[t];this.tId[i]!==r&&(this.tId[i]=r,this.tX[i]=Xp(Math.floor(Qp(a))),this.tZ[i]=Zp(Math.floor($p(o))));let s=a-this.tX[i],c=o-this.tZ[i],l=Math.sqrt(s*s+c*c);if(l<1e-4)return dh(this.tracers,n,a,Dv,o,0,1,1,.001);dh(this.tracers,n,a,Dv,o,Math.atan2(s,c),1,1,Math.min(Ov,l))}},Yv=8257434,Xv=16724821,Zv=[$.hazTop,$.hazard,$.concrete,$.hazSide,$.concrete,$.graphite],Qv=[$.hazTop,$.hazard,$.concrete,$.concrete,$.graphite,$.hazSide,$.graphite,$.concrete],$v=512,ey=64,ty=64,ny=8,ry=.45,iy=.6,ay=3,oy=1.4,sy=new Ft,cy=new Ft,ly=new hn,uy=new an,dy=new z,fy=new z,py=new z(1,0,0),my=new z(0,1,0),hy=new z(0,0,1),gy=new V;function _y(){return ah(X(wh(.012,.016,.12,5),$.stem),X(new po(.05,6,3).scale(1.3,.35,.65).rotateZ(.45).translate(.05,.12,0),$.leaf),X(new po(.045,6,3).scale(1.3,.35,.65).rotateZ(-.45).translate(-.045,.13,.01),$.leaf))}function vy(){return ah(new oo(.32,0).scale(1,.62,1),new oo(.22,0).scale(1,.62,1).translate(.22,.04,.08),new oo(.2,0).scale(1,.62,1).translate(-.18,.06,-.12))}var yy=class{chips=J(new Li(1,1,1),$v,{colors:!0,renderOrder:2});puffs=J(vy(),ey,{colors:!0});sprouts=J(_y(),ty,{vertexColors:!0});drums=new _i(Pv(),yh(),ny);cX=new Float32Array($v);cY=new Float32Array($v);cZ=new Float32Array($v);cDx=new Float32Array($v);cDz=new Float32Array($v);cR=new Float32Array($v);cH=new Float32Array($v);cT=new Float32Array($v).fill(-1e9);cW=new Float32Array($v);cTh=new Float32Array($v);cD=new Float32Array($v);cSpin=new Float32Array($v*3);cCol=new Uint32Array($v);chipNext=0;pX=new Float32Array(ey);pY=new Float32Array(ey);pZ=new Float32Array(ey);pT=new Float32Array(ey).fill(-1e9);pS=new Float32Array(ey);pYaw=new Float32Array(ey);pCol=new Uint32Array(ey);puffNext=0;sX=new Float32Array(ty);sZ=new Float32Array(ty);sT=new Float32Array(ty).fill(-1e9);sYaw=new Float32Array(ty);sproutNext=0;dX=new Float32Array(ny);dZ=new Float32Array(ny);dA=new Float32Array(ny);dT=new Float32Array(ny).fill(-1e9);drumNext=0;bursts=0;now=0;constructor(e){this.drums.instanceMatrix.setUsage(mt),this.drums.frustumCulled=!1,this.drums.count=0,e.add(this.chips,this.puffs,this.sprouts,this.drums)}scrap(e,t,n){let r=this.bursts++,i=n?1.35:1,a=n?Qv:Zv,o=a.length,s=Math.random()*Math.PI*2;for(let n=0;n<o;n++){let r=s+n/o*Math.PI*2+(Math.random()-.5)*.6,c=(.12+Math.random()*.04)*i;this.chip(e,t,r,(.4+Math.random()*.2)*i,.25+Math.random()*.2,c,.016*i,c*(.7+Math.random()*.3),a[n])}this.chip(e,t,s+1,.3*i,.35,.035,.035,.1,$.bolt),r%3==0&&this.chip(e,t,s+3.5,.32*i,.3,.07,.05,.07,$.spring);for(let n=0;n<2;n++)this.chip(e,t,Math.random()*Math.PI*2,.25+Math.random()*.2,.45,.04,.02,.04,$.fleck);this.puff(e,Tv+.06,t,.5*(n?1.8:1),$.dust),this.sprout(e+.04,t+.05),n&&this.drum(e,t,s)}splash(e,t){let n=Xp(Yp.x+1),r=Zp(Yp.y+1),i=e+(n-e)*.45,a=t+(r-t)*.45;this.puff(i,.14,a,.8,$.concrete);let o=Math.random()*Math.PI*2;for(let e=0;e<4;e++)this.chip(i,a,o+e*1.6,.35,.3,.1,.02,.08,e%2?$.concrete:$.dust,.2)}dust(e,t,n,r){let i=e+n*.42,a=t+r*.42;for(let e=0;e<4;e++){let t=e&1?$.concrete:$.dust;this.puff(i+(Math.random()-.5)*.4,.12+Math.random()*.25,a+(Math.random()-.5)*.4,.14+Math.random()*.08,t)}}debris(e,t,n){let r=Math.random()*Math.PI*2;for(let i=0;i<8;i++){let a=r+i/8*Math.PI*2+(Math.random()-.5)*.5,o=.1+Math.random()*.06;this.chip(e,t,a,.45+Math.random()*.25,.3+Math.random()*.25,o,.03,o*(.6+Math.random()*.4),n[i%n.length],.25)}this.puff(e,.1,t,.7,$.dust)}reset(){this.cT.fill(-1e9),this.pT.fill(-1e9),this.sT.fill(-1e9),this.dT.fill(-1e9)}update(e){this.now=e,this.chips.count=this.drawChips(),this.puffs.count=this.drawPuffs(),this.sprouts.count=this.drawSprouts(),this.drums.count=this.drawDrums(),hh(this.chips,!0),hh(this.puffs,!0),hh(this.sprouts),hh(this.drums)}chip(e,t,n,r,i,a,o,s,c,l=Tv+.12){let u=this.chipNext;this.chipNext=(u+1)%$v,this.cX[u]=e,this.cY[u]=l,this.cZ[u]=t,this.cDx[u]=Math.cos(n),this.cDz[u]=Math.sin(n)*.85,this.cR[u]=r,this.cH[u]=i,this.cT[u]=this.now,this.cW[u]=a,this.cTh[u]=o,this.cD[u]=s;for(let e=0;e<3;e++)this.cSpin[u*3+e]=(Math.random()-.5)*16;this.cCol[u]=c}puff(e,t,n,r,i){let a=this.puffNext;this.puffNext=(a+1)%ey,this.pX[a]=e,this.pY[a]=t,this.pZ[a]=n,this.pT[a]=this.now,this.pS[a]=r,this.pYaw[a]=Math.random()*Math.PI*2,this.pCol[a]=i}sprout(e,t){let n=this.sproutNext;this.sproutNext=(n+1)%ty,this.sX[n]=e,this.sZ[n]=t,this.sT[n]=this.now,this.sYaw[n]=Math.random()*Math.PI*2}drum(e,t,n){let r=this.drumNext;this.drumNext=(r+1)%ny,this.dX[r]=e,this.dZ[r]=t,this.dA[r]=n,this.dT[r]=this.now}drawChips(){let e=0;for(let t=0;t<$v;t++){let n=(this.now-this.cT[t])/ry;if(n<0||n>=1)continue;let r=1-(1-n)*(1-n),i=n<.6?1:1-(n-.6)/.4;dy.set(this.cX[t]+this.cDx[t]*this.cR[t]*r,this.cY[t]+this.cH[t]*4*n*(1-n),this.cZ[t]+this.cDz[t]*this.cR[t]*r);let a=this.now-this.cT[t];sy.setFromEuler(ly.set(this.cSpin[t*3]*a,this.cSpin[t*3+1]*a,this.cSpin[t*3+2]*a)),fy.set(this.cW[t]*i,this.cTh[t]*i,this.cD[t]*i),this.chips.setMatrixAt(e,uy.compose(dy,sy,fy)),this.chips.setColorAt(e++,gy.setHex(this.cCol[t]))}return e}drawPuffs(){let e=0;for(let t=0;t<ey;t++){let n=this.now-this.pT[t];if(n<0||n>=iy)continue;let r=n/iy,i=this.pS[t]*(r<.2?.5+2.5*r:1-((r-.2)/.8)**2);dh(this.puffs,e,this.pX[t],this.pY[t]+.12*r,this.pZ[t],this.pYaw[t],i,i*(1-.4*r),i),this.puffs.setColorAt(e++,gy.setHex(this.pCol[t]))}return e}drawSprouts(){let e=0;for(let t=0;t<ty;t++){let n=this.now-this.sT[t];if(n<0||n>=ay)continue;let r=n<.15?0:Math.min(1,(n-.15)/.2),i=1.25*(r<1?r*(1+.5*Math.sin(r*Math.PI)):1)*Math.min(1,(ay-n)/.4);i<=.01||dh(this.sprouts,e++,this.sX[t],Tv,this.sZ[t],this.sYaw[t],i,i,i)}return e}drawDrums(){let e=0;for(let t=0;t<ny;t++){let n=this.now-this.dT[t];if(n<0||n>=oy)continue;let r=Math.min(1,n/.6),i=.55*(1-(1-r)*(1-r)),a=n<.6?0:Math.min(1,(n-.6)/.25),o=n<1.0999999999999999?1:(oy-n)/.3,s=this.dA[t];sy.setFromAxisAngle(my,-s+Math.PI/2),sy.multiply(cy.setFromAxisAngle(hy,.5*a*a)),sy.multiply(cy.setFromAxisAngle(py,i/.18)),dy.set(this.dX[t]+Math.cos(s)*i,Tv+.16+.08*a-.12*(1-o),this.dZ[t]+Math.sin(s)*i),fy.setScalar(.85*o),this.drums.setMatrixAt(e++,uy.compose(dy,sy,fy))}return e}},by=class{hp;building;puffAt;primed=!1;constructor(e){this.hp=new Uint16Array(e),this.building=new Uint8Array(e),this.puffAt=new Float32Array(e).fill(-1e9)}reset(){this.primed=!1}update(e,t,n,r,i){let a=e.hp;if(!a)return;let o=e.board.building,s=e.board.wreck;if(this.primed)for(let e=0;e<a.length;e++){let c=o[e],l=this.building[e];if(c!==0&&c===l&&a[e]<this.hp[e]&&n-this.puffAt[e]>=xy){this.puffAt[e]=n;let a=Xp(e%i),o=Zp(e/i|0),s=wy(t,a,o),c=s>=0?t.x[s]-a:0,l=s>=0?t.z[s]-o:0,u=Math.hypot(c,l);r.dust(a,o,u>.001?c/u:0,u>.001?l/u:0)}else l!==0&&c===0&&s&&s[e]===l&&r.debris(Xp(e%i),Zp(e/i|0),mv(Sd.get(l)?.key??``))}this.primed=!0,this.hp.set(a),this.building.set(o)}},xy=.4,Sy=cf.indexOf(`crawler`),Cy=cf.indexOf(`brute`);function wy(e,t,n){let r=-1,i=1/0;for(let a=0;a<e.count;a++){let s=e.arch[a];if(s!==Sy&&s!==Cy||e.flags[a]&(o.DEAD|o.HIDDEN))continue;let c=e.x[a]-t,l=e.z[a]-n,u=c*c+l*l;u<i&&(i=u,r=a)}return r}var Ty=xd.get(`belt`),Ey=xd.get(`core`),Dy=xd.get(`gun`),Oy=`drill`,ky=(e,t)=>e>=0&&t>=0&&e<q&&t<Jp,Ay=(e,t)=>t*q+e;function jy(e){let t=xd.get(e);return t?t.cost.reduce((e,t)=>e+(t.kind===vd.IronOre?t.count:0),0):0}function My(e,t,n){return ky(t,n)?e.board.building[Ay(t,n)]:0}function Ny(e,t,n){return My(e,t,n)===Ty.id}function Py(e,t,n){return My(e,t,n)===Dy.id}function Fy(e,t,n){return Sd.get(My(e,t,n))?.rotatable===!0}function Iy(e,t,n){let r=My(e,t,n);return r!==0&&r!==Ey.id||Ly(e,t,n)!==0}function Ly(e,t,n){return ky(t,n)?e.board.wreck?.[Ay(t,n)]??0:0}function Ry(t){let n=xd.get(t)?.spec.role;return t===`belt`?e.hotbar.belt:n===`drill`?e.hotbar.drill:t===`gun`?e.hotbar.gun:t===`wall`?e.hotbar.wall:xd.get(t)?.name??t}function zy(e,t,n){let r=Sd.get(My(e,t,n));if(!r)return 0;let i=jy(r.key),a=e.hp?.[Ay(t,n)]??r.hp;return a>=r.hp?i:Math.floor(i*a/r.hp)}function By(e,t,n){if(!ky(t,n))return!0;let r=Ay(t,n);if(e.board.locked?.[r])return!0;let i=e.board.terrain[r];if(i===G.Path||i===G.Rock||i===G.KeepClear)return!0;let a=e.board.building[r];return a!==0&&a!==Ty.id}function Vy(t,n,r,i){let a=Hy(t,n,r,i);if(a)return a;let o=jy(n);return t.ore<o?e.place.needOre(o,t.ore):null}function Hy(t,n,r,i){let a=xd.get(n);if(!a||!ky(r,i))return e.place.offMap;let o=Ay(r,i);if(t.board.building[o]!==0)return e.place.occupied;let s=t.board.terrain[o];return s===G.Path?e.place.onPath:s===G.Rock?e.place.onRock:t.board.locked?.[o]?e.place.companyLand:s===G.KeepClear?e.place.keepClear:a.spec.role===`drill`&&s!==a.spec.terrain?e.place.drillOnOre:a.spec.role===`drill`&&t.oreLeft[o]===0?e.place.oreSpent:t.occupied?.[o]&&Gd(a.id)?e.place.machineThere:null}function Uy(e,t,n){return Sd.get(My(e,t,n))?.spec.role===Oy}function Wy(e,t,n){let r=My(e,t,n);return r===Ty.id||r===Dy.id||r===Ey.id}function Gy(e,t,n){return!By(e,t,n)&&My(e,t,n)===0}function Ky(e,t,n){return My(e,t,n)===Ey.id}function qy(e,t,n){if(!Ny(e,t,n))return!1;let r=e.board.dir[Ay(t,n)];return!Wy(e,t+hd[r],n+gd[r])}function Jy(e,t,n){let r=[],i=new Set,a=t,o=n;for(let s=0;s<=q*Jp;s++){if(Ny(e,a,o)){if(i.has(Ay(a,o)))break;i.add(Ay(a,o)),(a!==t||o!==n)&&r.push({x:a,y:o})}let s=e.board.dir[Ay(a,o)],c=a+hd[s],l=o+gd[s],u=My(e,c,l);if(u===Dy.id)return{belts:r,to:`gun`,end:{x:c,y:l}};if(u===Ey.id)return{belts:r,to:`core`,end:{x:c,y:l}};if(u!==Ty.id)break;a=c,o=l}return{belts:r,to:`nothing`,end:null}}var Yy=[W.E,W.S,W.W,W.N];function Xy(e,t,n,r){return n>e?W.E:n<e?W.W:r>t?W.S:W.N}function Zy(e,t,n,r){let i=r=>My(e,t+hd[r],n+gd[r]),a=r=>e.board.dir[Ay(t+hd[r],n+gd[r])];for(let e of Yy)if(i(e)===Ty.id&&a(e)===e)return e;for(let e of Yy)if(i(e)===Ty.id&&a(e)!==_d(e))return e;for(let e of Yy)if(i(e)===Dy.id)return e;for(let e of Yy)if(i(e)===Ey.id)return e;let o=r=>Gy(e,t+hd[r],n+gd[r]),s=r=>o(r)&&e.board.terrain[Ay(t+hd[r],n+gd[r])]===G.Floor;if(s(r))return r;let c=Yp.x+(Ey.w>>1),l=Yp.y+(Ey.h>>1),u=e=>Math.abs(t+hd[e]-c)+Math.abs(n+gd[e]-l),d=e=>{let t=null;for(let n of Yy)e(n)&&(t===null||u(n)<u(t))&&(t=n);return t};return d(s)??(o(r)?r:d(o))??r}function Qy(e,t,n,r,i){let a=Math.floor(r)-t,o=Math.floor(i)-n;if(a===0&&o===0)return null;let s=[Math.sign(a),0],c=[0,Math.sign(o)];for(let[r,i]of Math.abs(a)>=Math.abs(o)?[s,c]:[c,s])if((r!==0||i!==0)&&!By(e,t+r,n+i))return{x:t+r,y:n+i};return null}function $y(e,t,n){if(n)return{x:n.x,y:n.y,dir:Xy(n.x,n.y,t.x,t.y)};for(let n of Yy){let r=t.x+hd[n],i=t.y+gd[n];if(!Uy(e,r,i)||t.dir===n)continue;let a=e.board.dir[Ay(r,i)];if(!Wy(e,r+hd[a],i+gd[a]))return{x:r,y:i,dir:_d(n)}}return null}var eb=(e,t)=>t*65536+e;function tb(e,t){return t.x>e.x?W.E:t.x<e.x?W.W:t.y>e.y?W.S:W.N}var nb=class{hysteresis;isBlocked;maxLength;path=[];occupied=new Set;lastDir=W.E;retraced=0;peak=0;constructor(e={}){this.hysteresis=e.hysteresis??.25,this.maxLength=e.maxLength??1/0,this.isBlocked=e.isBlocked??(()=>!1)}get active(){return this.path.length>0}get length(){return this.path.length}setMaxLength(e){this.maxLength=e}begin(e,t){this.cancel();let n=Math.floor(e),r=Math.floor(t);return this.isBlocked(n,r)||this.maxLength<1?!1:(this.push({x:n,y:r}),!0)}move(e,t){if(!this.active)return;let n=this.path[this.path.length-1],r=this.hysteresis;e>=n.x-r&&e<n.x+1+r&&t>=n.y-r&&t<n.y+1+r||this.extendTo(Math.floor(e),Math.floor(t))}end(){if(!this.active)return null;let e=this.preview();return this.lastDir=e[e.length-1].dir,this.cancel(),{cells:e}}cancel(){this.path=[],this.occupied.clear(),this.retraced=0,this.peak=0}get retracedToStart(){return this.path.length===1&&this.peak>1}preview(){let e=this.path,t=[];for(let n=0;n<e.length;n++){let r;r=n<e.length-1?tb(e[n],e[n+1]):e.length>1?tb(e[n-1],e[n]):this.lastDir,t.push({x:e[n].x,y:e[n].y,dir:r})}return t}extendTo(e,t){for(let n=0;n<4096;n++){let n=this.path[this.path.length-1],r=e-n.x,i=t-n.y;if(r===0&&i===0)return;let a=this.nextStep(n,r,i),o=this.path[this.path.length-2];if(o&&o.x===a.x&&o.y===a.y){this.pop(),this.retraced++;continue}if(this.occupied.has(eb(a.x,a.y))||this.isBlocked(a.x,a.y)||this.path.length>=this.maxLength)return;this.push(a)}}nextStep(e,t,n){let r=this.path[this.path.length-2],i;return i=t===0?!1:n===0?!0:r?r.y===e.y:Math.abs(t)>=Math.abs(n),i?{x:e.x+Math.sign(t),y:e.y}:{x:e.x,y:e.y+Math.sign(n)}}push(e){this.path.push(e),this.occupied.add(eb(e.x,e.y)),this.path.length>this.peak&&(this.peak=this.path.length)}pop(){let e=this.path.pop();this.occupied.delete(eb(e.x,e.y))}},rb=(e,t)=>t*65536+e,ib=class{cells=[];anchor=null;fresh=!1;keys=new Set;get active(){return this.cells.length>0}get end(){return this.cells[this.cells.length-1]??null}get prefix(){return this.cells.slice(0,-1)}set(e,t){this.cells=e.map(e=>({x:e.x,y:e.y,dir:e.dir})),this.anchor=t?{x:t.x,y:t.y}:null,this.fresh=!0,this.rekey()}clear(){this.cells=[],this.anchor=null,this.fresh=!1,this.keys.clear()}inPrefix=(e,t)=>this.keys.has(rb(e,t));joined(e){let t=this.prefix.map(e=>({x:e.x,y:e.y,dir:e.dir})),n=this.end;if(e.length===1&&n)t.push({x:e[0].x,y:e[0].y,dir:n.dir});else if(e.length===0&&n)t.push({x:n.x,y:n.y,dir:n.dir});else for(let n of e)t.push({x:n.x,y:n.y,dir:n.dir});return t}truncate(e){let t=this.cells.findIndex(t=>e(t.x,t.y));return t<0?`kept`:t===0?(this.clear(),`gone`):(this.cells=this.cells.slice(0,t),this.rekey(),`cut`)}rekey(){this.keys.clear();for(let e=0;e<this.cells.length-1;e++)this.keys.add(rb(this.cells[e].x,this.cells[e].y))}};function ab(e,t,n,r){let i=r*r,a=0,o=0,s=-1,c=1/0,l=0,u=new Set;for(let r=0;r<e.length;r++){let d=e[r],f=d.x-t,p=d.y-n,m=f*f+p*p;m>i||(u.has(d.id)||(u.add(d.id),l++,l===1&&(a=d.id)),d.id===a&&m<c&&(c=m,o=d.id,s=r))}return l===0?{kind:`none`}:l>1?{kind:`many`,n:l}:{kind:`one`,id:o,index:s}}var ob=1e3,sb=()=>({retraces:0,retraceCells:0,retraceCancels:0,snaps:0,autoConnects:0,sources:0,routes:0,extends:0,routeFails:0}),cb=()=>({opens:0,rotate:0,remove:0,info:0,rebuild:0,clear:0}),lb=class{rows;dragsCancelled=0;invalidTaps=0;belt=sb();hotbarDrags=0;ring=cb();magnifierShows=0;misses;bands=Array(10).fill(0);timings=new Map;constructor(e){this.rows=e,this.misses=Array(e).fill(0)}reset(){this.dragsCancelled=0,this.invalidTaps=0,this.belt=sb(),this.hotbarDrags=0,this.ring=cb(),this.magnifierShows=0,this.misses.fill(0),this.bands.fill(0),this.timings.clear()}touchDown(e,t){if(!(t>0))return;let n=Math.floor(e/t*10);this.bands[Math.min(9,Math.max(0,n))]++}invalid(e){this.invalidTaps++,e>=0&&e<this.rows&&this.misses[e]++}committed(e,t){let n=this.timings.get(e);n||this.timings.set(e,n=[]),n.length<ob&&t>=0&&n.push(t)}rowMisses(){return this.misses.slice()}summary(e,t=!1,n=!1){let r={};for(let[e,t]of this.timings)r[e]=ub(t);return{invalidTaps:this.invalidTaps,commitMs:r,yBands:this.bands.slice(),cellPt:e,leftHand:t,belt:{...this.belt},hotbarDrags:this.hotbarDrags,ring:{...this.ring},magnifier:{on:n,shows:this.magnifierShows}}}save(){return{dragsCancelled:this.dragsCancelled,invalidTaps:this.invalidTaps,misses:this.misses.slice(),bands:this.bands.slice(),timings:Object.fromEntries([...this.timings].map(([e,t])=>[e,t.slice()])),belt:{...this.belt},hotbarDrags:this.hotbarDrags,ring:{...this.ring},magnifierShows:this.magnifierShows}}load(e){this.reset(),this.dragsCancelled=e.dragsCancelled|0,this.invalidTaps=e.invalidTaps|0,e.misses.slice(0,this.rows).forEach((e,t)=>this.misses[t]=e),e.bands.slice(0,10).forEach((e,t)=>this.bands[t]=e);for(let[t,n]of Object.entries(e.timings))this.timings.set(t,n.slice(0,ob));for(let t of Object.keys(this.belt))this.belt[t]=e.belt?.[t]??0;for(let t of Object.keys(this.ring))this.ring[t]=e.ring?.[t]??0;this.hotbarDrags=e.hotbarDrags??0,this.magnifierShows=e.magnifierShows??0}};function ub(e){let t=e.length;if(!t)return{n:0,p50:0,p90:0};let n=e.slice().sort((e,t)=>e-t),r=e=>Math.round(n[Math.min(t-1,Math.max(0,Math.ceil(e*t)-1))]);return{n:t,p50:r(.5),p90:r(.9)}}var db=[W.E,W.S,W.W,W.N],fb=1e6,pb=1e3,mb=1,hb=4;function gb(e,t,n,r=1/0){let{width:i,height:a}=e,o=(e,t)=>e>=0&&t>=0&&e<i&&t<a,s=i*a,c=s*5,l=new Float64Array(c).fill(1/0),u=new Int32Array(c),d=new Int32Array(c).fill(-1),f=new Int32Array(c).fill(-1),p=new Uint8Array(c),m=new Uint8Array(s),h=(t,n)=>e.ore?.(t,n)?pb:0;for(t.forEach((e,t)=>{if(!o(e.x,e.y))return;let n=e.y*i+e.x,r=n*5+(e.dir??hb);l[r]<=fb+h(e.x,e.y)||(m[n]=1,l[r]=fb+h(e.x,e.y),u[r]=1,f[r]=t)});;){let t=-1;for(let e=0;e<c;e++)!p[e]&&l[e]<1/0&&(t<0||l[e]<l[t])&&(t=e);if(t<0)break;if(p[t]=1,u[t]>=r)continue;let n=t/5|0,a=t%5,s=n%i,g=n/i|0;for(let n of db){let r=s+hd[n],c=g+gd[n];if(!o(r,c)||m[c*i+r]||!e.open(r,c))continue;let p=(c*i+r)*5+n,_=l[t]+fb+h(r,c)+(a!==hb&&a!==n?mb:0);_<l[p]&&(l[p]=_,u[p]=u[t]+1,d[p]=t,f[p]=f[t])}}let g=-1,_=1/0,v=W.E;for(let e=0;e<c;e++){if(l[e]===1/0)continue;let r=e/5|0,a=e%5,s=r%i,c=r/i|0;if(`cell`in n){if(s!==n.cell.x||c!==n.cell.y)continue;l[e]<_&&(g=e,_=l[e],v=a===hb?t[f[e]]?.dir??W.E:a);continue}for(let t of db){let r=s+hd[t],i=c+gd[t];if(!o(r,i)||!n.into(r,i))continue;let u=l[e]+(a!==hb&&a!==t?mb:0);u<_&&(g=e,_=u,v=t)}}if(g<0)return null;let y=[];for(let e=g;e>=0;e=d[e])y.push(e);y.reverse();let b=y.map(e=>{let t=e/5|0;return{x:t%i,y:t/i|0,dir:W.E}});for(let e=0;e<b.length-1;e++)b[e].dir=_b(b[e],b[e+1]);return b[b.length-1].dir=v,{cells:b,start:t[f[g]]}}function _b(e,t){return t.x>e.x?W.E:t.x<e.x?W.W:t.y>e.y?W.S:W.N}function vb(e,t,n){return ky(t,n)&&(Wy(e,t,n)||Gy(e,t,n))}function yb(e,t,n,r,i){if(!vb(e,n,r)||t.x===n&&t.y===r||i?.(n,r)||Ny(e,n,r)&&Sb(e,n,r,t.x,t.y))return`target`;let a=[];if(t.kind===`drill`){let n=e.board.dir[Ay(t.x,t.y)];for(let r of[n,W.E,W.S,W.W,W.N]){let n=t.x+hd[r],i=t.y+gd[r];Gy(e,n,i)&&!a.some(e=>e.x===n&&e.y===i)&&a.push({x:n,y:i,from:{x:t.x,y:t.y}})}}else{let n=e.board.dir[Ay(t.x,t.y)];a.push(Ny(e,t.x,t.y)?{x:t.x,y:t.y,dir:n}:{x:t.x,y:t.y})}if(!a.length)return`none`;let o=Ny(e,n,r)?xb(e,n,r):null,s={width:q,height:Jp,open:(t,n)=>Gy(e,t,n)&&!(o&&t===o.x&&n===o.y)&&!i?.(t,n),ore:(t,n)=>e.board.terrain[Ay(t,n)]!==G.Floor},c;c=Gy(e,n,r)?{cell:{x:n,y:r}}:Ky(e,n,r)?{into:(t,n)=>Ky(e,t,n)}:{into:(e,t)=>e===n&&t===r};let l=gb(s,a,c);if(!l)return`none`;let u=l.cells[0],d=l.start.from,f=d?{x:d.x,y:d.y,dir:Xy(d.x,d.y,u.x,u.y)}:$y(e,u,null),p=0;for(let t of l.cells)Ny(e,t.x,t.y)||p++;return{cells:l.cells,aim:f,newBelts:p,cost:p*jy(`belt`),open:`cell`in c}}function bb(e,t,n){return Uy(e,t,n)?{kind:`drill`,x:t,y:n}:qy(e,t,n)?{kind:`end`,x:t,y:n}:null}function xb(e,t,n){let r=e.board.dir[Ay(t,n)];return{x:t+hd[r],y:n+gd[r]}}function Sb(e,t,n,r,i){let a=t,o=n;for(let t=0;t<=q*Jp&&Ny(e,a,o);t++){if(a===r&&o===i)return!0;({x:a,y:o}=xb(e,a,o))}return a===r&&o===i}function Cb(e,t,n){let r=t[t.length-1];if(!r||Ny(e,n.x,n.y)&&t.some(t=>Sb(e,n.x,n.y,t.x,t.y)))return null;let i=Ky(e,n.x,n.y);for(let t of[W.E,W.S,W.W,W.N]){let a=r.x+hd[t],o=r.y+gd[t];if(i?Ky(e,a,o):a===n.x&&o===n.y)return t}return null}var wb=[`belt`,`drill`,`gun`,`wall`,`remove`],Tb={belt:`belt`,drill:`drill.iron`,gun:`gun`,wall:`wall`},Eb=xd.get(`wall`).id,Db=xd.get(`belt`).id,Ob=450,kb=10,Ab=2,jb=300,Mb=2e3,Nb=6,Pb=class{canvas;ctx;tool=null;touch=new lb(Jp);ghost=new ib;keptShown=!1;ghostRev=-1;ghostOre=-1;turnArm=null;overview=null;overviewRev=-1;gesture=null;down=new Set;drag;lastDrillDir=W.E;source=null;sourceRev=-1;pending=null;gestureGhosts=[];hoverGhosts=[];overlay=[];swallowClick=!1;serial=0;sp={id:0,x:0,y:0,sx:0,sy:0,capped:!1};detach;constructor(e,t){this.canvas=e,this.ctx=t,this.drag=new nb({isBlocked:(e,n)=>{let r=t.view();return!r||By(r,e,n)||this.gesture?.resume===!0&&this.ghost.inPrefix(e,n)}});let n=t=>{t.isPrimary&&this.down.clear(),this.down.add(t.pointerId),this.flushPending();let n=this.gesture;n&&t.pointerId!==n.id&&(this.ctx.openMap&&!n.hotbar&&n.tool!==null&&e.contains(t.target)||this.ctx.inert?.(t.target)||this.cancel(!0))},r=e=>this.onDown(e),i=e=>this.onMove(e),a=e=>{this.down.delete(e.pointerId),this.gesture?.id===e.pointerId&&(e.type===`pointercancel`?this.cancel(!0):this.finish(e))};window.addEventListener(`pointerdown`,n,!0),e.addEventListener(`pointerdown`,r),window.addEventListener(`pointermove`,i),window.addEventListener(`pointerup`,a),window.addEventListener(`pointercancel`,a),this.detach=()=>{window.removeEventListener(`pointerdown`,n,!0),e.removeEventListener(`pointerdown`,r),window.removeEventListener(`pointermove`,i),window.removeEventListener(`pointerup`,a),window.removeEventListener(`pointercancel`,a)}}get busy(){return this.gesture!==null||this.pending!==null}get overviewShown(){return this.overview!==null}overviewCells(){return this.overview?this.overview.data.cells.map(e=>[e.x,e.y]):null}get farRouteReady(){if(!this.ctx.openMap||this.tool!==`belt`)return!1;if(this.ghost.active)return!0;let e=this.source,t=this.ctx.view();return!!t&&!!e&&!e.handle&&(Uy(t,e.x,e.y)||qy(t,e.x,e.y))}get stroking(){let e=this.gesture;return this.ctx.openMap!==!0||e===null||e.held||!e.moved||e.tool===null||!this.ctx.enabled()?!1:!this.drawsBelts(e)||e.resume||e.anchor!==null||this.drag.active}strokePoint(){let e=this.gesture;if(!e||!this.stroking||e.hotbar&&e.cy>=this.ctx.boardBottom())return null;let t=this.sp;if(t.id=e.serial,t.x=e.cx,t.y=e.cy,t.sx=e.sx,t.sy=e.sy,t.capped=e.tool===`wall`?e.wallShort:this.drawsBelts(e)&&this.drag.active&&this.drag.length>=e.cap,t.capped){let n=this.ctx.view();n&&e.tool===`wall`?(this.wallShortNow(n,e)||this.preview(n),t.capped=e.wallShort):n&&(this.capBelt(n,e),t.capped=this.drag.length>=e.cap)}return t}restroke(e){let t=this.gesture;if(!t||!this.stroking)return;let n=this.ctx.view();n&&this.ctx.enabled()&&(e&&(t.magnifying&&this.ctx.magnify(null),t.magnifying=!1,this.restAt(t,t.cx,t.cy)),this.feed(n,t,t.cx,t.cy),this.preview(n))}setTool(e){e!==this.tool&&(this.cancel(!1),this.dropOverview(!0),this.dropGhost(`tool`),this.turnArm=null,this.clearSource(),this.tool=e,this.hover(null))}hover(e){let t=[],n=this.ctx.view(),r=this.tool;if(e&&n&&r&&!this.gesture&&this.ctx.enabled()){let i=this.ctx.toGrid(e.x,e.y),a=Math.floor(i.x),o=Math.floor(i.y);if(ky(a,o)){if(r===`remove`)Iy(n,a,o)&&(t=[{x:a,y:o,color:Dg,dir:-1}]);else if(r===`belt`)My(n,a,o)===0&&(t=[{x:a,y:o,color:Hy(n,Tb.belt,a,o)===null?Eg:Dg,dir:-1}]);else{let e=Vy(n,Tb[r],a,o)===null;t=[{x:a,y:o,color:e?Eg:Dg,dir:r===`drill`&&e?Zy(n,a,o,this.lastDrillDir):-1}]}}}(t.length!==0||this.hoverGhosts.length!==0)&&(this.hoverGhosts=t,this.renderGhosts())}reset(){this.cancel(!1),this.dropPending(),this.clearSource(),this.ghost.clear(),this.keptShown=!1,this.ghostRev=this.ghostOre=-1,this.turnArm=null,this.overview=null,this.renderGhosts(),this.touch.reset(),this.lastDrillDir=W.E}dispose(){this.cancel(!1),this.dropPending(),this.detach()}consumeHotbarClick(){let e=this.swallowClick;return this.swallowClick=!1,e}cancel(e){this.flushPending();let t=this.gesture;t&&(this.stopTimers(t),e&&this.drawsBelts(t)&&this.drag.active&&this.touch.dragsCancelled++,this.drag.cancel(),this.gesture=null,this.showGestureGhosts([]))}endStroke(e,t,n){let r=this.gesture;if(r&&!r.hotbar&&r.tool!==null&&!(e&&t!==`hud`&&this.drawsBelts(r)&&this.keepUnfinished(r,t))){if(n){this.ctx.draw?.pinchStart(),this.cancel(!1);return}this.cancel(!this.ctx.openMap||r.moved)}}jumpEnd(){let e=this.gesture;e&&this.ctx.openMap&&this.drawsBelts(e)&&this.keepUnfinished(e,`jump`)||this.cancel(!1)}handleAt(e,t){let n=this.ghost.end;if(!this.ctx.openMap||this.tool!==`belt`||!n)return!1;let r=this.ctx.cellToClient?.(n.x,n.y);if(r&&Math.hypot(e-r.x,t-r.y)<=22)return!0;let i=this.ctx.toGrid(e,t);return Math.floor(i.x)===n.x&&Math.floor(i.y)===n.y}confirmCell(){if(this.tool!==`belt`||this.gesture)return null;let e=this.overview;return e?e.data.cells[e.data.cells.length-1]??null:this.ghost.active?this.ghost.end:null}confirm(){let e=this.ctx.view();return!e||this.gesture?!1:this.overview?this.confirmOverview(e):this.ghost.active?(this.flushPending(),this.commitGhost(e,this.ghost.cells,`drag`,`confirm`,!1)):!1}undoGhost(){return!this.ghost.active||!this.ghost.fresh?!1:(this.dropGhost(`undo`),this.ctx.toast(e.draw.cleared),!0)}dropShown(){return this.overview?(this.dropOverview(!0),!0):this.ghost.active?(this.dropGhost(`back`),!0):!1}pickedSource(){let e=this.source;return e?{x:e.x,y:e.y,handle:e.handle===!0}:null}boardEdited(){this.ghost.fresh=!1}keepUnfinished(t,n){let r=this.beltPath(t);if(!t.resume&&r.length<2)return!1;!t.resume&&this.ghost.active&&this.ctx.draw?.dropped(`replaced`);let i=t.resume&&!t.moved?this.ghost.fresh:!0;return this.ghost.set(r,t.resume?this.ghost.anchor:t.anchor),this.ghost.fresh=i,this.ghostRev=-1,this.ctx.draw?.rescue(n),this.stopTimers(t),this.drag.cancel(),this.gesture=null,this.gestureGhosts=[],this.source=null,this.renderGhosts(),this.keptShown||(this.keptShown=!0,this.ctx.toast(e.draw.kept)),!0}finishResume(t,n){let r=this.ghost.end;if(!r){this.drag.cancel();return}if(!n.moved){if(this.drag.cancel(),this.source?.handle){this.clearSource();return}this.source={kind:`cell`,x:r.x,y:r.y,t0:n.t0,handle:!0},this.ctx.draw?.handleTap(),this.ctx.toast(e.draw.fromHandle),this.renderGhosts();return}if(this.ctx.draw?.resumeStroke(),this.drag.retraced>0&&(this.touch.belt.retraces++,this.touch.belt.retraceCells+=this.drag.retraced),this.clearSource(),this.drag.retracedToStart){this.drag.cancel(),this.touch.belt.retraceCancels++,this.renderGhosts();return}let i={x:n.x,y:n.y},a=this.beltPath(n);this.drag.end();let o=a.some(e=>e.x===i.x&&e.y===i.y),s=this.ghost.anchor;if(!o&&ky(i.x,i.y)&&Wy(t,i.x,i.y)&&!(s&&s.x===i.x&&s.y===i.y)){let e=Cb(t,a,i);if(e!==null)a[a.length-1].dir=e,this.touch.belt.autoConnects++;else{let e=yb(t,{kind:`cell`,x:r.x,y:r.y},i.x,i.y,this.ghost.inPrefix),a=typeof e==`string`?null:[...this.ghost.prefix,...e.cells];if(a&&this.newBeltCost(t,a)<=t.ore){this.touch.belt.snaps++,this.commitGhost(t,a,`snap`,`resume`,!1),this.committed(n,`belt`);return}}}this.commitGhost(t,a,`drag`,`resume`,!0)&&this.committed(n,`belt`)}commitGhost(t,n,r,i,a){if(n.length===0)return!1;let o=this.newBeltCost(t,n);if(o>t.ore)return this.ctx.toast(e.toast.routeCost(o,t.ore),!0),a&&this.ghost.set(n,this.ghost.anchor),this.renderGhosts(),!1;let s=$y(t,n[0],this.ghost.anchor),c=s?{cells:n,aim:s,via:r}:{cells:n,via:r};return this.ghost.clear(),this.ctx.draw?.built(i),r===`snap`?this.showPending(c):this.send(`placeBelts`,c),this.renderGhosts(),!0}dropGhost(e){this.ghost.active&&(this.overview?.fromHandle&&this.dropOverview(!0),this.ghost.clear(),this.source?.handle&&(this.source=null),this.ctx.draw?.dropped(e),this.renderGhosts())}overviewTap(t,n){let r=this.ctx.view(),i=this.ctx.cellToClient;if(!r||!i||!this.ctx.openMap||this.tool!==`belt`||this.gesture)return!1;let a=this.routeSource(r);if(!a)return!1;let o=[],s=[];for(let e=0;e<Jp;e++)for(let t=0;t<q;t++){let n=Ky(r,t,e);if(!n&&!Py(r,t,e))continue;let a=i(t,e);o.push({id:n?-1:Ay(t,e),x:a.x,y:a.y}),s.push({x:t,y:e})}let c=ab(o,t,n,22);if(c.kind===`none`)return!1;let l=this.ctx.draw;if(c.kind===`many`)return l?.overview(`ambiguous`),this.ctx.toast(e.draw.pickOne),!1;let u=s[c.index],d=this.overviewPlan(r,a,u.x,u.y);if(typeof d==`string`)return l?.overview(`failed`),this.ctx.toast(e.toast.noRoute,!0),!0;let f=this.newBeltCost(r,d.data.cells);return f>r.ore?(l?.overview(`failed`),this.ctx.toast(e.toast.routeCost(f,r.ore),!0),!0):(this.overview&&l?.overview(`dropped`),this.overview=d,this.overviewRev=r.board.rev,l?.overview(`shown`),this.ctx.toast(e.draw.routeShown),this.renderGhosts(),!0)}routeSource(e){let t=this.source,n=this.ghost.end;if(t?.handle){if(n&&n.x===t.x&&n.y===t.y)return t}else if(t&&bb(e,t.x,t.y))return t;return n?{kind:`cell`,x:n.x,y:n.y,t0:performance.now(),handle:!0}:null}overviewPlan(e,t,n,r){let i=t.handle===!0,a=i?yb(e,{kind:`cell`,x:t.x,y:t.y},n,r,this.ghost.inPrefix):yb(e,t,n,r);if(typeof a==`string`)return a;let o=i?this.ghost.prefix:[],s=[...o,...a.cells],c=i?$y(e,s[0],this.ghost.anchor):a.aim,l=[];for(let e of o)l.push({x:e.x,y:e.y,color:Eg,dir:e.dir});for(let e of a.cells)l.push({x:e.x,y:e.y,color:Og,dir:e.dir});return c&&l.push({x:c.x,y:c.y,color:Og,dir:c.dir}),{data:c?{cells:s,aim:c,via:`route`}:{cells:s,via:`route`},ghosts:l,src:{...t},target:{x:n,y:r},fromHandle:i}}confirmOverview(t){let n=this.overview;this.flushPending();let r=this.newBeltCost(t,n.data.cells);return r>t.ore?(this.ctx.toast(e.toast.routeCost(r,t.ore),!0),!1):(this.overview=null,n.fromHandle&&(this.ghost.clear(),this.ctx.draw?.built(`route`)),this.send(`placeBelts`,n.data),this.ctx.draw?.overview(`confirmed`),this.source=null,this.renderGhosts(),!0)}dropOverview(e){this.overview&&(this.overview=null,e&&this.ctx.draw?.overview(`dropped`),this.renderGhosts())}recheckOverview(t){let n=this.overview,r=this.ghost.end,i=(n.fromHandle?r!==null&&r.x===n.src.x&&r.y===n.src.y:bb(t,n.src.x,n.src.y)!==null)?this.overviewPlan(t,n.src,n.target.x,n.target.y):null;if(i&&typeof i!=`string`&&Fb(i.data.cells,n.data.cells)){this.overview=i,this.renderGhosts();return}this.dropOverview(!0),this.ctx.toast(e.draw.routeGone,!0)}newBeltCost(e,t){let n=0;for(let r of t)Ny(e,r.x,r.y)||n++;return n*jy(`belt`)}send=(e,t)=>{e!==`undo`&&e!==`callWave`&&(this.ghost.fresh=!1),this.ctx.send(e,t)};pressHotbar(e,t){(t!==`wall`||this.ctx.openMap)&&(this.swallowClick=!1,!(t===`remove`||e.button>0||this.down.size>1||this.gesture||!(this.ctx.enabled()||this.ctx.live?.()))&&(this.gesture=this.newGesture(e,t,!0,-1,-1)))}newGesture(e,t,n,r,i){return{id:e.pointerId,serial:++this.serial,tool:t,hotbar:n,t0:performance.now(),sx:e.clientX,sy:e.clientY,x0:r,y0:i,x:r,y:i,cx:e.clientX,cy:e.clientY,moved:!1,held:!1,anchor:null,timer:null,sweep:new Map,gx:0,gy:0,restX:e.clientX,restY:e.clientY,dwell:null,magnifying:!1,resume:!1,wallShort:!1,cap:1/0,zoomed:!1,zx:e.clientX,zy:e.clientY,zoomTimer:null}}drawsBelts(e){return!e.hotbar&&(e.tool===`belt`||e.tool===null&&!this.ctx.openMap)}onDown(e){if(this.ctx.openMap&&this.gesture&&this.gesture.id!==e.pointerId&&this.cancel(!0),e.button>0||this.down.size>1||this.gesture||!this.ctx.enabled())return;let t=this.ctx.view();if(!t)return;e.preventDefault();let n=this.ctx.toGrid(e.clientX,e.clientY),r=Math.floor(n.x),i=Math.floor(n.y);this.touch.touchDown(e.clientY,innerHeight);let a=this.newGesture(e,this.tool,!1,r,i);a.gx=n.x,a.gy=n.y,this.gesture=a,this.hoverGhosts=[];try{this.canvas.setPointerCapture(e.pointerId)}catch{}a.tool!==`remove`&&!this.ctx.openMap&&Fy(t,r,i)&&(a.timer=setTimeout(()=>this.holdReady(a),Ob)),this.restAt(a,e.clientX,e.clientY);let o=this.ghost.end;o&&a.tool===`belt`&&this.handleAt(e.clientX,e.clientY)?(a.resume=!0,a.x0=a.x=o.x,a.y0=a.y=o.y,this.capBelt(t,a),this.drag.begin(o.x+.5,o.y+.5)):this.drawsBelts(a)?(this.capBelt(t,a),!this.drag.begin(n.x,n.y)&&Uy(t,r,i)&&(a.anchor={x:r,y:i})):(a.tool===`remove`||a.tool===`wall`)&&this.sweepTo(t,a,n.x,n.y),this.preview(t)}onMove(e){let t=this.gesture;if(!t||e.pointerId!==t.id)return;let n=this.ctx.view();if(!n||!(this.ctx.enabled()||t.hotbar&&this.ctx.live?.())){this.cancel(!1);return}!t.moved&&Math.hypot(e.clientX-t.sx,e.clientY-t.sy)>kb&&(t.moved=!0,t.timer&&clearTimeout(t.timer),t.timer=null,t.held=!1,t.hotbar?this.swallowClick=!0:this.dropOverview(!0)),t.cx=e.clientX,t.cy=e.clientY,t.hotbar&&this.hotbarRest(t),t.magnifying?this.ctx.magnify({x:e.clientX,y:e.clientY}):Math.hypot(e.clientX-t.restX,e.clientY-t.restY)>Nb&&this.restAt(t,e.clientX,e.clientY);let r=e.getCoalescedEvents?.()??[];for(let i of r.length?r:[e])this.feed(n,t,i.clientX,i.clientY);this.preview(n)}feed(e,t,n,r){let i=this.ctx.toGrid(n,r);if(t.x=Math.floor(i.x),t.y=Math.floor(i.y),this.drawsBelts(t)){if(this.capBelt(e,t),t.anchor&&!this.drag.active){let n=Qy(e,t.anchor.x,t.anchor.y,i.x,i.y);n&&this.drag.begin(n.x+.5,n.y+.5)}this.drag.move(i.x,i.y)}else(t.tool===`remove`||t.tool===`wall`)&&this.sweepTo(e,t,i.x,i.y)}capBelt(e,t){t.cap=this.beltLimit(e,t),this.drag.setMaxLength(t.cap)}finish(t){let n=this.gesture;n.hotbar&&(!n.zoomed&&n.moved&&t.clientY<this.ctx.boardBottom()&&this.ctx.live?.()&&this.ctx.zoomInAt?.(t.clientX,t.clientY)&&(n.zoomed=!0,this.ctx.draw?.hotbarZoomIn(!0)),n.zoomed&&this.ctx.settleCamera?.());let r=this.ctx.view(),i=this.ctx.enabled();if(this.stopTimers(n),this.gesture=null,this.showGestureGhosts([]),!r||!i){this.drag.cancel();return}if(n.hotbar){this.finishHotbar(r,n,t);return}if(this.dropOverview(!0),n.held&&!n.moved){this.drag.cancel(),Fy(r,n.x0,n.y0)&&this.send(`rotate`,{x:n.x0,y:n.y0});return}if(n.resume){this.finishResume(r,n);return}if(n.tool===null&&!this.drawsBelts(n)){n.moved||this.tapNoTool(r,n);return}if(this.drawsBelts(n)){if(!n.moved){this.drag.cancel(),n.tool===null?this.tapNoTool(r,n):this.tapBelt(r,n);return}this.clearSource(),this.ctx.ringCell()&&this.ctx.ring(null),this.finishDrag(r,n);return}switch(n.tool){case`drill`:case`gun`:case`wall`:{if(n.tool===`wall`&&n.moved){this.finishWalls(r,n);return}let e=this.ctx.toGrid(t.clientX,t.clientY);this.placeAt(r,n,n.tool,Math.floor(e.x),Math.floor(e.y),`tap`);return}case`remove`:{let t=[...n.sweep.values()];if(t.length){this.send(`remove`,{cells:t}),this.committed(n,`remove`);return}if(!ky(n.x0,n.y0))return;this.touch.invalid(n.y0),r.board.building[Ay(n.x0,n.y0)]!==0&&this.ctx.toast(e.toast.coreStays,!0);return}}}finishDrag(t,n){if(this.drag.retraced>0&&(this.touch.belt.retraces++,this.touch.belt.retraceCells+=this.drag.retraced),this.drag.retracedToStart){this.drag.cancel(),this.touch.belt.retraceCancels++;return}let r={x:n.x,y:n.y},i=this.beltPath(n),a=!i.some(e=>e.x===r.x&&e.y===r.y)&&ky(r.x,r.y)&&Wy(t,r.x,r.y)&&!(n.anchor&&n.anchor.x===r.x&&n.anchor.y===r.y);if(!this.drag.active){if(this.drag.cancel(),a&&n.anchor&&this.snap(t,n,{kind:`drill`,x:n.anchor.x,y:n.anchor.y},r))return;ky(n.x0,n.y0)&&this.touch.invalid(n.y0),n.anchor?this.ctx.toast(e.toast.noRoomForBelt,!0):this.toastBlocked(t,n.x0,n.y0);return}if(a){let e=i[i.length-1],a=Cb(t,i,r);if(a!==null)e.dir=a,this.touch.belt.autoConnects++;else{let e=n.anchor?{kind:`drill`,x:n.anchor.x,y:n.anchor.y}:{kind:`cell`,x:i[0].x,y:i[0].y};if(this.drag.end(),this.snap(t,n,e,r))return;this.commitPath(t,n,i,`drag`);return}}this.drag.end(),this.commitPath(t,n,i,`drag`)}commitPath(t,n,r,i){let{commit:a}=this.beltPlan(t,r);if(a.length===0){this.ctx.toast(e.toast.beltCost(jy(`belt`)),!0);return}let o=$y(t,a[0],n.anchor);this.send(`placeBelts`,o?{cells:a,aim:o,via:i}:{cells:a,via:i}),this.committed(n,`belt`)}snap(e,t,n,r){let i=yb(e,n,r.x,r.y);return typeof i==`string`||i.cost>e.ore?!1:(this.touch.belt.snaps++,this.committed(t,`belt`),this.showPending(this.routeData(i,`snap`)),!0)}routeData(e,t){return e.aim?{cells:e.cells,aim:e.aim,via:t}:{cells:e.cells,via:t}}showPending(e){this.flushPending();let t=e.cells.map(e=>({x:e.x,y:e.y,color:Og,dir:e.dir}));e.aim&&t.push({x:e.aim.x,y:e.aim.y,color:Og,dir:e.aim.dir}),this.pending={data:e,ghosts:t,timer:setTimeout(()=>this.flushPending(),300)},this.renderGhosts()}flushPending(){let e=this.pending;e&&(clearTimeout(e.timer),this.pending=null,this.renderGhosts(),this.ctx.enabled()&&this.send(`placeBelts`,e.data))}dropPending(){this.pending&&(clearTimeout(this.pending.timer),this.pending=null,this.renderGhosts())}tapNoTool(e,t){let n=this.ctx.ringCell();if(!ky(t.x0,t.y0)||My(e,t.x0,t.y0)===0&&Ly(e,t.x0,t.y0)===0||n&&n.x===t.x0&&n.y===t.y0){this.ctx.ring(null);return}this.ctx.ring({x:t.x0,y:t.y0})}tapBelt(t,n){let r=n.x0,i=n.y0;if(!ky(r,i))return;let a=this.source;if(a?.handle){let e=this.ghost.end;(!e||e.x!==a.x||e.y!==a.y)&&(a=this.clearSource())}else a&&!bb(t,a.x,a.y)&&(a=this.clearSource());if(a?.handle){this.tapFromHandle(t,n,a,r,i);return}if(a){if(a.x===r&&a.y===i){a.kind===`end`?this.send(`rotate`,{x:r,y:i}):this.clearSource();return}if(Uy(t,r,i)){this.pickSource(t,n,r,i);return}let o=yb(t,a,r,i);if(typeof o==`string`){this.touch.belt.routeFails++,o===`target`&&this.touch.invalid(i),this.ctx.toast(e.toast.noRoute,!0);return}if(o.cost>t.ore){this.touch.belt.routeFails++,this.ctx.toast(e.toast.routeCost(o.cost,t.ore),!0);return}this.send(`placeBelts`,this.routeData(o,`route`)),this.touch.belt.routes++,a.kind===`end`&&o.open&&o.newBelts===1&&Math.abs(a.x-r)+Math.abs(a.y-i)===1&&this.touch.belt.extends++,this.touch.committed(`route`,performance.now()-a.t0),this.source=o.open?{kind:`end`,x:r,y:i,t0:n.t0}:null,this.renderGhosts();return}if(!this.pickSource(t,n,r,i)){if(Ny(t,r,i)){this.tapTurn(r,i);return}if(Ly(t,r,i)===Db){let e=Vy(t,Tb.belt,r,i);if(e){this.touch.invalid(i),this.ctx.toast(e,!0);return}this.send(`placeBelts`,{cells:[{x:r,y:i,dir:t.board.wreckDir?.[Ay(r,i)]??W.N}],via:`rebuild`}),this.committed(n,`belt`);return}if(!By(t,r,i)){this.drag.begin(r+.5,i+.5);let e=this.beltPath(n);this.drag.end(),this.commitPath(t,n,e,`tap`);return}this.touch.invalid(i),Wy(t,r,i)?this.ctx.toast(e.toast.pickSource,!0):this.toastBlocked(t,r,i)}}pickSource(t,n,r,i){let a=bb(t,r,i);return a?(this.source={...a,t0:n.t0},this.touch.belt.sources++,this.ctx.toast(a.kind===`drill`?e.toast.routeFrom:e.toast.routeFromEnd),this.renderGhosts(),!0):!1}tapTurn(t,n){if(!this.ctx.openMap){this.send(`rotate`,{x:t,y:n});return}let r=this.turnArm,i=performance.now();r&&r.x===t&&r.y===n&&i-r.t<=Mb?(this.turnArm=null,this.send(`rotate`,{x:t,y:n}),this.ctx.draw?.beltTurn(!0)):(this.turnArm={x:t,y:n,t:i},this.ctx.draw?.beltTurn(!1),this.ctx.toast(e.draw.turnAgain)),this.renderGhosts()}tapFromHandle(t,n,r,i,a){if(r.x===i&&r.y===a){this.clearSource();return}if(Uy(t,i,a)){this.pickSource(t,n,i,a);return}let o=yb(t,{kind:`cell`,x:r.x,y:r.y},i,a,this.ghost.inPrefix);if(typeof o==`string`){this.touch.belt.routeFails++,o===`target`&&this.touch.invalid(a),this.ctx.toast(e.toast.noRoute,!0);return}if(!this.commitGhost(t,[...this.ghost.prefix,...o.cells],`route`,`route`,!1)){this.touch.belt.routeFails++;return}this.touch.belt.routes++,this.touch.committed(`route`,performance.now()-r.t0),this.source=o.open?{kind:`end`,x:i,y:a,t0:n.t0}:null,this.renderGhosts()}update(e){this.turnArm&&performance.now()-this.turnArm.t>Mb&&(this.turnArm=null,this.renderGhosts()),e.board.rev!==this.sourceRev&&(this.sourceRev=e.board.rev,this.source&&!this.source.handle&&!bb(e,this.source.x,this.source.y)&&this.clearSource()),this.ghost.active&&!this.gesture?.resume&&(e.board.rev!==this.ghostRev&&(this.ghostRev=e.board.rev,this.recheckGhost(e)),this.ghost.active&&e.ore!==this.ghostOre&&(this.ghostOre=e.ore,this.renderGhosts())),this.overview&&e.board.rev!==this.overviewRev&&(this.overviewRev=e.board.rev,this.recheckOverview(e))}recheckGhost(t){let n=this.ghost.anchor;n&&!Uy(t,n.x,n.y)&&(this.ghost.anchor=null);let r=this.ghost.truncate((e,n)=>By(t,e,n));if(r===`kept`)return;r===`cut`?this.ctx.toast(e.draw.cut):this.ctx.draw?.dropped(`blocked`);let i=this.ghost.end;this.source?.handle&&(this.source=i?{...this.source,x:i.x,y:i.y}:null),this.renderGhosts()}clearSource(){return this.source&&(this.source=null,this.renderGhosts()),null}placeAt(e,t,n,r,i,a){let o=Tb[n],s=Vy(e,o,r,i);if(s)return ky(r,i)?(this.ctx.toast(s,!0),Hy(e,o,r,i)&&(this.touch.invalid(i),n===`wall`&&this.ctx.walls?.refused(1)),!1):!1;let c=W.N;return n===`drill`&&(c=Zy(e,r,i,this.lastDrillDir),this.lastDrillDir=c),this.send(`place`,{key:o,x:r,y:i,dir:c,via:a}),this.committed(t,a===`hotbar`?`hotbar`:n),!0}hotbarRest(e){if(!e.zoomed&&this.ctx.zoomInAt&&e.moved){if(e.cy>=this.ctx.boardBottom()){e.zoomTimer&&clearTimeout(e.zoomTimer),e.zoomTimer=null;return}e.zoomTimer&&Math.hypot(e.cx-e.zx,e.cy-e.zy)<=Nb||(e.zoomTimer&&clearTimeout(e.zoomTimer),e.zx=e.cx,e.zy=e.cy,e.zoomTimer=setTimeout(()=>{e.zoomTimer=null,!(this.gesture!==e||e.zoomed||e.cy>=this.ctx.boardBottom()||!this.ctx.live?.())&&this.ctx.zoomInAt?.(e.cx,e.cy)&&(e.zoomed=!0,this.ctx.draw?.hotbarZoomIn(!1))},200))}}finishHotbar(e,t,n){if(!t.moved||n.clientY>=this.ctx.boardBottom())return;let r=this.ctx.toGrid(n.clientX,n.clientY),i=Math.floor(r.x),a=Math.floor(r.y);if(ky(i,a)){if(t.tool===`belt`){let r=Vy(e,`belt`,i,a);if(r){this.ctx.toast(r,!0),Hy(e,`belt`,i,a)&&this.touch.invalid(a);return}let o=n.clientX-t.sx,s=n.clientY-t.sy,c=Math.abs(o)>Math.abs(s)*1.5?o>0?W.E:W.W:W.N;this.send(`placeBelts`,{cells:[{x:i,y:a,dir:c}],via:`hotbar`}),this.committed(t,`hotbar`),this.touch.hotbarDrags++;return}(t.tool===`drill`||t.tool===`gun`||t.tool===`wall`)&&this.placeAt(e,t,t.tool,i,a,`hotbar`)&&this.touch.hotbarDrags++}}finishWalls(t,n){let r=[...n.sweep.values()],i=this.wallPlan(t,r);if(i.refused&&this.ctx.walls?.refused(i.refused),i.commit.length===0){i.refused&&ky(n.x0,n.y0)&&this.touch.invalid(n.y0),this.ctx.toast(i.problem??(r.length?e.place.needOre(jy(`wall`),t.ore):e.place.occupied),!0);return}this.send(`placeWalls`,{cells:i.commit,via:`sweep`}),this.ctx.walls?.sweep(),this.committed(n,`wall`)}wallShortNow(e,t){let n=0;for(let r of t.sweep.values())Hy(e,`wall`,r.x,r.y)===null&&n++;return n*jy(`wall`)>e.ore}wallPlan(e,t){let n=jy(`wall`),r=[],i=[],a=0,o=0,s=null,c=!1;for(let l of t){let t=Hy(e,`wall`,l.x,l.y);if(t)o++,s??=t;else if(a+n>e.ore)c=!0;else{a+=n,i.push(l),r.push({x:l.x,y:l.y,color:Eg,dir:-1});continue}r.push({x:l.x,y:l.y,color:Dg,dir:-1})}return{ghosts:r,commit:i,refused:o,problem:s,short:c}}committed(e,t){this.touch.committed(t,performance.now()-e.t0)}stopTimers(e){e.timer&&clearTimeout(e.timer),e.timer=null,e.zoomTimer&&clearTimeout(e.zoomTimer),e.zoomTimer=null,e.dwell&&clearTimeout(e.dwell),e.dwell=null,e.magnifying&&this.ctx.magnify(null),e.magnifying=!1}restAt(e,t,n){e.restX=t,e.restY=n,e.dwell&&clearTimeout(e.dwell),e.dwell=null,!(!this.ctx.magnifierOn()||e.tool===null&&this.ctx.openMap)&&(e.dwell=setTimeout(()=>{e.dwell=null,!(this.gesture!==e||e.hotbar&&e.cy>=this.ctx.boardBottom())&&(e.magnifying=!0,this.touch.magnifierShows++,this.ctx.magnify({x:e.cx,y:e.cy}))},jb))}holdReady(t){if(t.timer=null,this.gesture!==t||t.moved)return;let n=this.ctx.view();n&&this.ctx.enabled()&&Fy(n,t.x0,t.y0)&&(t.held=!0,this.showGestureGhosts([{x:t.x0,y:t.y0,color:Eg,dir:-1}]),this.ctx.toast(e.toast.letGoToRotate))}beltPath(e){let t=this.drag.preview();return e.resume?this.ghost.joined(t):(e.anchor&&t.length===1&&(t[0].dir=Xy(e.anchor.x,e.anchor.y,t[0].x,t[0].y)),t)}beltLimit(e,t){let n=Math.max(1,jy(`belt`)),r=0;for(let t of this.drag.preview())Ny(e,t.x,t.y)&&r++;let i=Math.floor(e.ore/n)+r+Ab;if(!t.resume)return i;let a=0;for(let t of this.ghost.prefix)Ny(e,t.x,t.y)||a++;return Math.max(1,i-a)}beltPlan(e,t){let n=jy(`belt`),r=0,i=!1,a=[],o=[];for(let s of t)!i&&!Ny(e,s.x,s.y)&&(r+=n,r>e.ore&&(i=!0)),a.push({x:s.x,y:s.y,color:i?Dg:Eg,dir:s.dir}),i||o.push(s);return{ghosts:a,commit:o}}sweepTo(e,t,n,r){let i=Math.max(1,Math.ceil(Math.hypot(n-t.gx,r-t.gy)/.25)),a=t.tool===`wall`;for(let o=0;o<=i;o++){let s=Math.floor(t.gx+(n-t.gx)*o/i),c=Math.floor(t.gy+(r-t.gy)*o/i);(a?ky(s,c)&&My(e,s,c)!==Eb:Iy(e,s,c))&&t.sweep.set(Ay(s,c),{x:s,y:c})}t.gx=n,t.gy=r}preview(e){let t=this.gesture;if(t&&!t.held){if(t.hotbar){if(!(t.moved&&t.cy<this.ctx.boardBottom()&&ky(t.x,t.y)&&t.tool!==null&&t.tool!==`remove`)){this.showGestureGhosts([]);return}let n=Tb[t.tool],r=Vy(e,n,t.x,t.y)===null,i=t.tool===`drill`&&r?Zy(e,t.x,t.y,this.lastDrillDir):-1;this.showGestureGhosts([{x:t.x,y:t.y,color:r?Eg:Dg,dir:i}]);return}if(this.drawsBelts(t)){let n=this.beltPath(t),{ghosts:r}=this.beltPlan(e,n),i=n.length?$y(e,n[0],t.resume?this.ghost.anchor:t.anchor):null;i&&r.push({x:i.x,y:i.y,color:Eg,dir:i.dir}),this.showGestureGhosts(r);return}switch(t.tool){case`drill`:case`gun`:case`wall`:{if(t.tool===`wall`&&t.moved){let n=this.wallPlan(e,[...t.sweep.values()]);t.wallShort=n.short,this.showGestureGhosts(n.ghosts);break}if(!ky(t.x,t.y)){this.showGestureGhosts([]);break}let n=Vy(e,Tb[t.tool],t.x,t.y)===null,r=t.tool===`drill`&&n?Zy(e,t.x,t.y,this.lastDrillDir):-1;this.showGestureGhosts([{x:t.x,y:t.y,color:n?Eg:Dg,dir:r}]);break}case`remove`:this.showGestureGhosts([...t.sweep.values()].map(e=>({x:e.x,y:e.y,color:Dg,dir:-1})))}}}setOverlay(e){this.overlay=e,this.renderGhosts()}showGestureGhosts(e){this.gestureGhosts=e,this.renderGhosts()}renderGhosts(){let e=[...this.overlay];this.source&&e.push({x:this.source.x,y:this.source.y,color:kg,dir:-1}),this.pending&&e.push(...this.pending.ghosts),this.overview&&e.push(...this.overview.ghosts);let t=this.ghost.end;if(t&&!this.gesture?.resume&&!this.overview?.fromHandle){let n=this.ctx.view();if(n){e.push(...this.beltPlan(n,this.ghost.cells).ghosts);let t=$y(n,this.ghost.cells[0],this.ghost.anchor);t&&e.push({x:t.x,y:t.y,color:Eg,dir:t.dir})}else for(let t of this.ghost.cells)e.push({x:t.x,y:t.y,color:Eg,dir:t.dir});this.source?.handle||e.push({x:t.x,y:t.y,color:Ag,dir:-1})}this.turnArm&&e.push({x:this.turnArm.x,y:this.turnArm.y,color:Eg,dir:-1}),e.push(...this.gestureGhosts),this.gesture||e.push(...this.hoverGhosts),this.ctx.setGhosts(e)}toastBlocked(t,n,r){if(!ky(n,r))return;let i=Vy(t,`belt`,n,r);i&&i!==e.place.occupied?this.ctx.toast(i,!0):i&&this.ctx.toast(e.toast.beltsGoAround,!0)}};function Fb(e,t){return e.length===t.length&&e.every((e,n)=>e.x===t[n].x&&e.y===t[n].y&&e.dir===t[n].dir)}var Ib=e=>{let t=document.getElementById(e);if(!t)throw Error(`#${e} missing from index.html`);return t},Lb=12,Rb=class{text=new Map;hotbar=Ib(`hotbar`);toolButtons;toolNames;tool=null;farTool=!1;ore=Ib(`ore`);coreFill=Ib(`core-fill`);coreText=Ib(`core-text`);wave=Ib(`wave`);waveNext=Ib(`wave-next`);callWave=Ib(`call-wave`);callBonus=Ib(`call-bonus`);callLabel=Ib(`call-label`);holdFill=document.querySelector(`#call-wave .hold-ring .fill`);speedBtn=Ib(`speed`);speedLabel=Ib(`speed-label`);chip=Ib(`wave-chip`);chipTitle=Ib(`chip-title`);chipRow=document.querySelector(`#wave-chip .chip-row`);chipPacks=Ib(`chip-packs`);chipBrutesWrap=Ib(`chip-brutes-wrap`);chipBrutes=Ib(`chip-brutes`);chipSplit=Ib(`chip-split`);chipNote=Ib(`chip-note`);lastHold=-1;chipPlan=void 0;chipClaim=!1;chipPacksWrap=document.querySelector(`#wave-chip .chip-packs`);undo=Ib(`undo`);undoCount=Ib(`undo-count`);ghostUndo=!1;hint=Ib(`hint`);toastEl=Ib(`toast`);chips=Ib(`flag-chips`);flagBtn=Ib(`flag`);badge=Ib(`upload-badge`);toastTimer=null;chipTimer=null;lastCoreFrac=-1;constructor(t){this.toolButtons=wb.map(e=>document.querySelector(`#hotbar button[data-tool="${e}"]`)),this.toolNames=this.toolButtons.map(e=>e.querySelector(`.name`)),this.toolButtons.forEach((e,n)=>{e.addEventListener(`click`,()=>t.onTool(wb[n])),e.addEventListener(`pointerdown`,e=>t.onToolPress(wb[n],e))}),this.undo.addEventListener(`click`,t.onUndo),this.speedBtn.addEventListener(`click`,t.onSpeed),this.callWave.addEventListener(`pointerdown`,e=>{try{this.callWave.setPointerCapture(e.pointerId)}catch{}t.onCallDown(e)});for(let e of[`pointerup`,`pointercancel`,`lostpointercapture`])this.callWave.addEventListener(e,e=>t.onCallUp(e));this.callWave.addEventListener(`pointermove`,e=>{let n=this.callWave.getBoundingClientRect();(e.clientX<n.left-Lb||e.clientX>n.right+Lb||e.clientY<n.top-Lb||e.clientY>n.bottom+Lb)&&t.onCallLeave(e)}),this.callWave.addEventListener(`click`,t.onCallClick),this.callWave.addEventListener(`contextmenu`,e=>e.preventDefault());for(let t of document.querySelectorAll(`[data-cost]`))t.textContent=e.hotbar.cost(jy(t.dataset.cost))}setTool(t){this.tool=t,this.toolButtons.forEach((e,n)=>e.setAttribute(`aria-pressed`,String(wb[n]===t))),this.writeNames(),this.set(this.hint,e.hint[t??`none`])}setFar(e){e!==this.farTool&&(this.farTool=e,this.hotbar.classList.toggle(`far`,e),this.writeNames())}get far(){return this.farTool}writeNames(){wb.forEach((t,n)=>this.set(this.toolNames[n],this.farTool&&t===this.tool?e.hotbar.zoomIn:e.hotbar[t]))}setHint(e){this.set(this.hint,e)}update(t,n){this.set(this.ore,String(t.ore));let r=Math.max(0,t.coreHp/t.coreMax);r!==this.lastCoreFrac&&(this.lastCoreFrac=r,this.coreFill.style.width=`${(r*100).toFixed(1)}%`,this.coreFill.classList.toggle(`low`,r<.3)),this.set(this.coreText,`${Math.ceil(t.coreHp)}/${t.coreMax}`),this.set(this.wave,e.top.wave(t.wave,t.totalWaves));let i=t.nextWaveIn>=0,a=t.claimNext||t.claim!==null;this.set(this.waveNext,a?`\xA0`:i?e.top.nextIn(Math.ceil(t.nextWaveIn)):e.top.finalWave);let o=i?Math.floor(t.nextWaveIn*K.callEarlyOrePerSecond):0;this.set(this.callBonus,i&&t.canCallWave?e.pace.callBonus(o):e.pace.callNone),this.callWave.disabled=!n||!t.canCallWave,this.updateChip(t),this.flagBtn.disabled=!n,this.undo.disabled=!n||t.undoable===0&&!this.ghostUndo,this.set(this.undoCount,String(t.undoable));for(let e=0;e<wb.length;e++){let n=wb[e],r=n!==`remove`&&t.ore<jy(Tb[n]);this.toolButtons[e].classList.toggle(`poor`,r)}}updateChip(t){let n=t.nextWave,r=t.claimNext||t.claim!==null;if(n===this.chipPlan&&r===this.chipClaim)return;if(this.chipPlan=n,this.chipClaim=r,this.chipPacksWrap.hidden=r,this.chipNote.hidden=!r,r){this.chipRow.hidden=!1,this.chipBrutesWrap.hidden=!0,this.chipSplit.hidden=!0,this.set(this.chipTitle,e.pace.chipClaimTitle),this.set(this.chipNote,e.pace.chipClaimRow),this.chip.setAttribute(`aria-label`,e.pace.chipClaim);return}if(!n){this.set(this.chipTitle,e.pace.chipLast),this.chipRow.hidden=!0,this.chipSplit.hidden=!0,this.chip.removeAttribute(`aria-label`);return}this.chipRow.hidden=!1;let i=n.n===K.totalWaves;this.set(this.chipPacks,e.pace.packs(n.packs,n.perPack)),this.chipBrutesWrap.hidden=n.brutes===0,this.set(this.chipBrutes,String(n.brutes));let a=n.byGate,o=Kp.gates,s=o.filter(e=>t.liveGates.includes(e.id)),c=a&&a.length===o.length&&s.length>1;this.chipSplit.hidden=!c,this.set(this.chipTitle,c?e.pace.chipHead(n.n,i):i?e.pace.chipFinal:e.pace.chipTitle(n.n));let l=e.pace.chipAria(n.n,n.packs,n.perPack,n.brutes);c&&(this.set(this.chipSplit,e.og.split(s.map(t=>[e.og.mouth[t.id]??t.id,a[o.indexOf(t)]]))),l+=e.og.splitAria(s.map(t=>[e.og.mouthName[t.id]??t.id,a[o.indexOf(t)]]))),this.chip.setAttribute(`aria-label`,l)}setHold(e){let t=Math.round(e*100);t!==this.lastHold&&(this.lastHold=t,this.holdFill.style.strokeDashoffset=String(100-t),this.callWave.classList.toggle(`holding`,t>0))}setArmed(t,n){this.callWave.classList.toggle(`armed`,t),this.set(this.callLabel,t?e.pace.confirm:e.pace.call),this.callWave.setAttribute(`aria-label`,n===`hold`?e.pace.callAria:e.pace.callAriaConfirm)}setSpeed(t){this.speedBtn.setAttribute(`aria-pressed`,String(t>1)),this.set(this.speedLabel,e.pace.speed(t))}toast(e,t=!1,n=1400,r=[]){if(this.toastEl.textContent=e,this.toastEl.classList.toggle(`bad`,t),this.toastEl.classList.remove(`low`),r.length){let e=this.toastEl.getBoundingClientRect();r.some(t=>t>=e.top-8&&t<=e.bottom+8)&&this.toastEl.classList.add(`low`)}this.toastEl.classList.add(`show`),this.toastTimer&&clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this.toastEl.classList.remove(`show`),n)}hideToast(){this.toastTimer&&clearTimeout(this.toastTimer),this.toastEl.classList.remove(`show`)}showFlagChips(e){this.flagBtn.classList.add(`flash`),setTimeout(()=>this.flagBtn.classList.remove(`flash`),250),this.chips.hidden=!1,this.chipTimer&&clearTimeout(this.chipTimer);let t=t=>{this.chipTimer&&clearTimeout(this.chipTimer),this.chipTimer=null,this.chips.hidden=!0,this.chips.onclick=null,e(t)};this.chipTimer=setTimeout(()=>t(null),3e3),this.chips.onclick=e=>{let n=e.target.closest(`[data-tag]`)?.dataset.tag;n&&t(n)}}hideFlagChips(){this.chipTimer&&clearTimeout(this.chipTimer),this.chipTimer=null,this.chips.hidden=!0,this.chips.onclick=null}set(e,t){this.text.get(e)!==t&&(this.text.set(e,t),e.textContent=t)}};function zb(){let e=e=>e.preventDefault();for(let t of[`gesturestart`,`gesturechange`,`gestureend`,`contextmenu`,`dblclick`])document.addEventListener(t,e,{passive:!1});document.addEventListener(`selectstart`,e=>{Bb(e.target)||e.preventDefault()},{passive:!1}),document.addEventListener(`touchstart`,e=>{if(e.target?.closest?.(`#game`)){for(let t of Array.from(e.changedTouches))if(t.clientX<24||t.clientX>innerWidth-24){e.preventDefault();return}}},{passive:!1}),document.addEventListener(`touchmove`,e=>{let t=e.target;(e.touches.length>1||!t?.closest?.(`.card`))&&e.preventDefault()},{passive:!1})}function Bb(e){return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var Vb=`0.0.0`,Hb=`d61ebd9dfd37`,Ub=`gustavares/factory-mobile`;function Wb(e){return`playtests/runs/${e}.json`}function Gb(e){return JSON.stringify(e,null,1)+`
`}function Kb(e){let t=e.run,n=e.feedback,r=[`playtest: ${String(e.id)}`];return t?.summary?.result&&r.push(t.summary.result),typeof t?.summary?.wave==`number`&&r.push(`wave ${t.summary.wave}`),typeof t?.durationS==`number`&&r.push(`${Math.round(t.durationS)}s`),n?.rating&&r.push(`rated ${n.rating}`),n?.text&&r.push(`with notes`),e.stress?r.push(`performance test`):t||r.push(`feedback only`),r.join(`, `)}function qb(e){let t=new TextEncoder().encode(e),n=``;for(let e=0;e<t.length;e+=32768)n+=String.fromCharCode(...t.subarray(e,e+32768));return btoa(n)}var Jb=`fm.playtest.outbox.v1`,Yb=`fm.playtest.token.v1`,Xb=class{transport;storage;fetchImpl;chain=Promise.resolve(`sent`);last=`sent`;constructor(e){this.transport=e.transport,this.storage=e.storage,this.fetchImpl=e.fetch}get needsToken(){return this.transport.kind===`github`}get hasToken(){return!this.needsToken||!!this.token()}setToken(e){let t=e.trim();t?this.storage.setItem(Yb,t):this.storage.removeItem(Yb)}get lastStatus(){return this.last}pending(){return this.readOutbox().length}stash(e){let t=this.readOutbox().filter(t=>t.id!==e.id);for(t.push(e);t.length>10;)t.shift();this.writeOutbox(t)}submit(e){return this.stash(e),this.flush()}flush(e){let t=()=>this.flushOnce(e).then(e=>this.last=e);return this.chain=this.chain.then(t,t),this.chain}async flushOnce(e){let t=this.readOutbox().filter(t=>t.id!==e);if(t.length===0)return`sent`;if(!this.hasToken)return`no-token`;let n=!1;for(let e of t){let t;try{t=await this.upload(e)}catch{return`queued`}if(t===`retry`)return`queued`;if(t===`bad-token`)return`token-rejected`;t===`bad-record`&&(console.warn(`[playtest] record rejected, dropped:`,JSON.stringify(e)),n=!0),this.writeOutbox(this.readOutbox().filter(t=>t.id!==e.id))}return n?`rejected`:`sent`}async upload(e){let t=this.transport;if(t.kind===`dev`){let n=await this.fetchImpl(t.endpoint,{method:`POST`,headers:{"content-type":`application/json`},body:JSON.stringify(e)});return n.ok||n.status===409?`stored`:n.status===400||n.status===413?`bad-record`:`retry`}let n=await this.fetchImpl(`https://api.github.com/repos/${t.repo}/contents/${Wb(e.id)}`,{method:`PUT`,headers:{authorization:`Bearer ${this.token()}`,accept:`application/vnd.github+json`,"x-github-api-version":`2022-11-28`,"content-type":`application/json`},body:JSON.stringify({message:Kb(e),content:qb(Gb(e)),branch:t.branch})});return n.status===200||n.status===201||n.status===422?`stored`:n.status===401||n.status===404?`bad-token`:n.status===403?n.headers.get(`x-ratelimit-remaining`)===`0`?`retry`:`bad-token`:n.status===413?`bad-record`:`retry`}token(){return this.storage.getItem(Yb)}readOutbox(){try{let e=this.storage.getItem(Jb);return e?JSON.parse(e):[]}catch{return[]}}writeOutbox(e){try{e.length===0?this.storage.removeItem(Jb):this.storage.setItem(Jb,JSON.stringify(e))}catch{e.length>1&&this.writeOutbox(e.slice(1))}}};function Zb(){let e=navigator;return{userAgent:e.userAgent,dpr:window.devicePixelRatio,viewport:{w:window.innerWidth,h:window.innerHeight},screen:{w:screen.width,h:screen.height},touch:e.maxTouchPoints>0,standalone:e.standalone===!0||matchMedia(`(display-mode: standalone)`).matches,memoryGb:e.deviceMemory??null,cores:e.hardwareConcurrency??null}}function Qb(){return{opens:{button:0,hidden:0,relaunch:0},shownS:0}}function $b(e,t=Math.random){let n=(e,t=2)=>String(e).padStart(t,`0`),r=`${e.getUTCFullYear()}${n(e.getUTCMonth()+1)}${n(e.getUTCDate())}`,i=`${n(e.getUTCHours())}${n(e.getUTCMinutes())}${n(e.getUTCSeconds())}`,a=``;for(let e=0;e<6;e++)a+=`abcdefghijklmnopqrstuvwxyz0123456789`[Math.floor(t()*36)];return`${r}-${i}-${a}`}var ex=class{buckets=new Uint32Array(251);frames=0;over33=0;over100=0;last=-1;stopped=!1;frame(e){this.stopped||(this.last>=0&&this.add(e-this.last),this.last=e)}stop(){this.stopped=!0,this.last=-1}reset(){this.buckets.fill(0),this.frames=0,this.over33=0,this.over100=0,this.last=-1,this.stopped=!1}resetClock(){this.last=-1}add(e){let t=Math.min(Math.max(Math.round(e),0),250);this.buckets[t]++,this.frames++,e>33&&this.over33++,e>100&&this.over100++}save(){let e=[];return this.buckets.forEach((t,n)=>{t&&e.push([n,t])}),{buckets:e,over33:this.over33,over100:this.over100}}load(e){for(let[t,n]of e.buckets)t>=0&&t<this.buckets.length&&(this.buckets[t]+=n,this.frames+=n);this.over33+=e.over33,this.over100+=e.over100}stats(){return{frames:this.frames,p50:this.percentile(.5),p95:this.percentile(.95),p99:this.percentile(.99),over33:this.over33,over100:this.over100}}percentile(e){if(this.frames===0)return 0;let t=Math.ceil(e*this.frames),n=0;for(let e=0;e<this.buckets.length;e++)if(n+=this.buckets[e],n>=t)return e;return 250}},tx=`fm.playtest.sessions.v1`,nx=class{storage;state;hiddenAt=null;constructor(e,t,n){this.storage=e,this.state=rx(e)??{installedAt:new Date(t).toISOString(),installEstimated:n,sessions:0,runsFinished:0,log:[]},this.begin(t,!1)}hidden(e,t){this.touch(e,t),this.hiddenAt=e}visible(e,t){let n=this.hiddenAt===null?0:e-this.hiddenAt;this.hiddenAt=null,n>=3e4?this.begin(e,t):this.touch(e,t)}heartbeat(e,t){this.hiddenAt===null&&this.touch(e,t)}resumedRun(e){this.current.resumed=!0,this.touch(e,!0)}runFinished(e){this.state.runsFinished++,this.current.runs++,this.touch(e,!1)}info(e){let t=this.state;return{installedAt:t.installedAt,installEstimated:t.installEstimated,tzOffsetMin:-new Date(e).getTimezoneOffset(),sessions:t.sessions,runsFinished:t.runsFinished,current:this.current.n,log:t.log.map(e=>({...e}))}}get current(){return this.state.log[this.state.log.length-1]}begin(e,t){let n=this.state,r=new Date(e).toISOString();n.sessions++,n.log.push({n:n.sessions,start:r,end:r,runs:0,midRun:!1,resumed:t}),n.log.length>20&&n.log.splice(0,n.log.length-20),this.save()}touch(e,t){let n=this.current;n.end=new Date(e).toISOString(),n.midRun=t,this.save()}save(){try{this.storage.setItem(tx,JSON.stringify(this.state))}catch{}}};function rx(e){try{let t=e.getItem(tx);if(!t)return null;let n=JSON.parse(t);return typeof n.installedAt!=`string`||!Array.isArray(n.log)?null:{installedAt:n.installedAt,installEstimated:n.installEstimated===!0,sessions:typeof n.sessions==`number`?n.sessions:n.log.length,runsFinished:typeof n.runsFinished==`number`?n.runsFinished:0,log:n.log.slice(-20)}}catch{return null}}var ix=15e3;function ax(){return new Xb({transport:{kind:`github`,repo:Ub,branch:`main`},storage:localStorage,fetch:(...e)=>fetch(...e)})}function ox(e,t=!1,n=null){let r=ax(),i=()=>!1,a=new nx(localStorage,Date.now(),t);setInterval(()=>a.heartbeat(Date.now(),i()),ix);let o=new ex,s=n?l(n):c();r.flush(s.id);function c(){return o.reset(),{schema:1,id:$b(new Date),recordedAt:new Date().toISOString(),build:{version:Vb,commit:Hb,configHash:e},device:Zb(),perf:o.stats(),feedback:{rating:null,text:``,markers:[]},run:null,replay:null,save:{checkpoints:0,writeFailures:0,lastBytes:0,resumes:[],pauses:Qb()}}}function l(e){let t=c();return o.load(e.meter),{...t,id:e.id,recordedAt:e.recordedAt,build:e.build,device:e.device,feedback:{...t.feedback,markers:e.markers.map(e=>({...e}))},save:{...e.save,resumes:e.save.resumes.map(e=>({...e})),pauses:e.save.pauses?{opens:{...e.save.pauses.opens},shownS:e.save.pauses.shownS}:Qb()}}}let u=null,d=()=>{if(a.hidden(Date.now(),i()),!s.run){let e=u?.();if(!e&&!s.feedback.markers.length)return;if(e){r.stash({...s,run:e.run,replay:e.replay,perf:o.stats(),sessions:a.info(Date.now())});return}}f(),r.stash(s)},f=()=>{s.perf=o.stats(),s.sessions=a.info(Date.now())};return addEventListener(`pagehide`,d),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?d():(a.visible(Date.now(),i()),o.resetClock(),r.flush(s.id))}),{meter:o,uploader:r,mark(e,t,n=null){let r={t:e,tick:t,tag:n};return s.feedback.markers.push(r),r},get openId(){return s.id},setRun(e,t){s.run=e,s.replay=t,o.stop(),a.runFinished(Date.now()),f(),r.stash(s)},send(e){s.feedback.rating=e.rating,s.feedback.text=e.text,f();let t=r.submit(s);return s=c(),t},reset(){s=c()},setCheckpoint(e){u=e},setInRun(e){i=e},get saveInfo(){return s.save??={checkpoints:0,writeFailures:0,lastBytes:0,resumes:[],pauses:Qb()}},openState(){return{id:s.id,recordedAt:s.recordedAt,build:s.build,device:s.device,markers:s.feedback.markers.map(e=>({...e})),meter:o.save(),save:this.saveInfo}},resumed(e){this.saveInfo.resumes.push(e),a.resumedRun(Date.now())}}}export{ih as $,xd as $t,Xv as A,kp as At,vv as B,K as Bt,Iy as C,pf as Ct,zy as D,mp as Dt,Vy as E,vf as Et,Gv as F,Ld as Ft,xv as G,Cd as Gt,jg as H,Id as Ht,Kv as I,Rd as It,hh as J,jd as Jt,rg as K,Nd as Kt,wv as L,Hd as Lt,Yv as M,fp as Mt,yy as N,of as Nt,Ly as O,xf as Ot,Wv as P,Xd as Pt,dh as Q,Sd as Qt,Mg as R,Gd as Rt,ky as S,cf as St,jy as T,wf as Tt,bv as U,Ad as Ut,Bg as V,Fd as Vt,yv as W,wd as Wt,ah as X,Od as Xt,J as Y,Md as Yt,X as Z,Dd as Zt,ub as _,o as _n,Xp as _t,$b as a,pd as an,xm as at,Ay as b,$p as bt,Zb as c,Bi as cn,wm as ct,Ub as d,uo as dn,Tm as dt,hd as en,$m as et,zb as f,b as fn,Cm as ft,Pb as g,u as gn,q as gt,wb as h,_ as hn,Jp as ht,Qb as i,G as in,tm as it,Jv as j,hp as jt,by as k,Ap as kt,Hb as l,co as ln,mm as lt,Rb as m,y as mn,qp as mt,ox as n,W as nn,Vm as nt,Jb as o,md as on,Em as ot,Ib as p,h as pn,Kp as pt,wh as q,Pd as qt,ex as r,vd as rn,zm as rt,Yb as s,V as sn,Fm as st,ax as t,gd as tn,Lm as tt,Vb as u,ya as un,Mm as ut,My as v,n as vn,Zp as vt,Fy as w,ap as wt,Jy as x,Wp as xt,Ry as y,r as yn,Qp as yt,Vg as z,qd as zt};