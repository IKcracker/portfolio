/* GPU-native 3D: signed-distance raymarching, three orbital rings,
   animated normals and Fresnel shading. No API costs or runtime dependencies. */
const VERTEX = `#version 300 es
in vec2 aPosition;
void main(){gl_Position=vec4(aPosition,0.0,1.0);}`;
const FRAGMENT = `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 uResolution;
uniform vec2 uRotation;
uniform float uTime;
uniform vec3 uAccent;
mat3 rotateX(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,s,0.,-s,c);}
mat3 rotateY(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}
float torus(vec3 p,vec2 r){return length(vec2(length(p.xy)-r.x,p.z))-r.y;}
vec2 field(vec3 p){
 vec3 q=rotateX(uRotation.y)*rotateY(uRotation.x)*p;
 float pulse=sin(uTime*.5)*.016;
 float displacement=.035*sin(q.x*8.+uTime*.24)*sin(q.y*9.-uTime*.17)*sin(q.z*7.);
 float center=length(q)-(1.02+pulse)+displacement;
 float ring1=torus(rotateX(.22)*q,vec2(1.44,.017));
 float ring2=torus(rotateX(1.06)*rotateY(.55)*q,vec2(1.43,.019));
 float ring3=torus(rotateY(1.27)*rotateX(.52)*q,vec2(1.51,.012));
 float rings=min(min(ring1,ring2),ring3);
 return center<rings?vec2(center,1.):vec2(rings,2.);
}
vec3 normalAt(vec3 p){
 vec2 e=vec2(.002,0.);
 return normalize(vec3(field(p+e.xyy).x-field(p-e.xyy).x,field(p+e.yxy).x-field(p-e.yxy).x,field(p+e.yyx).x-field(p-e.yyx).x));
}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
 vec2 uv=(gl_FragCoord.xy*2.-uResolution)/uResolution.y;
 float aspect=uResolution.x/uResolution.y;
 vec3 origin=vec3(0.,0.,4.7);
 vec3 direction=normalize(vec3(uv*1.05,-2.5));
 vec3 col=vec3(.027,.052,.040);
 float fog=exp(-dot(uv,uv)*.82);
 col+=uAccent*.065*fog;
 vec2 cells=floor((uv+vec2(aspect*.5,.5))*vec2(103.,80.));
 vec2 cellUV=fract(uv*vec2(103.,80.))-.5;
 float glint=step(.9974,hash(cells));
 col+=vec3(.33,.55,.33)*glint*pow(max(0.,1.-length(cellUV)*2.),12.)*.50;
 float travel=0.;
 vec2 hit=vec2(0.);
 vec3 pos=origin;
 bool found=false;
 for(int i=0;i<84;i++){
  pos=origin+direction*travel;
  hit=field(pos);
  if(hit.x<.0022){found=true;break;}
  travel+=max(hit.x*.70,.008);
  if(travel>9.)break;
 }
 if(found){
  vec3 norm=normalAt(pos);
  vec3 light=normalize(vec3(-.62,.78,1.1));
  vec3 light2=normalize(vec3(.75,-.4,.3));
  float diff=max(dot(norm,light),0.);
  float diff2=max(dot(norm,light2),0.);
  float fresnel=pow(1.-max(dot(norm,-direction),0.),3.);
  float spec=pow(max(dot(reflect(-light,norm),-direction),0.),35.);
  vec3 shade;
  if(hit.y<1.5){
   float weave=.5+.5*sin(pos.y*18.+uTime*.17)*sin(pos.x*16.-uTime*.09);
   shade=mix(vec3(.035,.103,.069),uAccent*.56,.35+weave*.30);
   shade*=.52+diff*.91+diff2*.21;
   shade+=uAccent*fresnel*1.16+vec3(.85,1.,.68)*spec*.68;
   shade+=vec3(.05,.21,.11)*(.45+.5*sin(pos.y*13.))*fresnel;
  }else{
   shade=uAccent*(.52+diff*.55);
   shade+=vec3(.73,.97,.52)*fresnel*.76;
   shade+=vec3(.69,.99,.69)*spec*1.2;
  }
  float haze=clamp((travel-2.)/6.,0.,1.);
  col=mix(shade,col,haze*.29);
 }
 float glow=.17*exp(-length(uv)*3.)*(.6+.4*sin(uTime*.4));
 col+=uAccent*glow;
 col=1.-exp(-col*1.12);
 col=pow(col,vec3(.88));
 outColor=vec4(col,1.);
}`;

export type UniverseEngine={render:(elapsed:number,yaw:number,pitch:number,accent:[number,number,number])=>void;dispose:()=>void;};

export function createUniverseEngine(gl:WebGL2RenderingContext):UniverseEngine{
 const shader=(type:number,source:string)=>{
  const result=gl.createShader(type);
  if(!result)throw Error("Could not create shader");
  gl.shaderSource(result,source);gl.compileShader(result);
  if(!gl.getShaderParameter(result,gl.COMPILE_STATUS)){
   const message=gl.getShaderInfoLog(result)||"unknown shader error";
   gl.deleteShader(result);throw Error(message);
  }
  return result;
 };
 const vertex=shader(gl.VERTEX_SHADER,VERTEX);
 let fragment:WebGLShader;
 try{fragment=shader(gl.FRAGMENT_SHADER,FRAGMENT);}
 catch(error){gl.deleteShader(vertex);throw error;}
 const program=gl.createProgram();
 if(!program){gl.deleteShader(vertex);gl.deleteShader(fragment);throw Error("Could not create WebGL program");}
 gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
 if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
  const message=gl.getProgramInfoLog(program)||"unknown program error";
  gl.deleteProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment);
  throw Error(message);
 }
 const vertexBuffer=gl.createBuffer();
 if(!vertexBuffer)throw Error("Could not allocate vertex buffer");
 gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
 gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
 const position=gl.getAttribLocation(program,"aPosition");
 const resolution=gl.getUniformLocation(program,"uResolution");
 const rotation=gl.getUniformLocation(program,"uRotation");
 const time=gl.getUniformLocation(program,"uTime");
 const color=gl.getUniformLocation(program,"uAccent");
 gl.useProgram(program);gl.enableVertexAttribArray(position);
 gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);gl.disable(gl.DEPTH_TEST);
 return {
  render:(elapsed,yaw,pitch,accent)=>{
   gl.viewport(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight);
   gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
   gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
   gl.uniform2f(resolution,gl.drawingBufferWidth,gl.drawingBufferHeight);
   gl.uniform2f(rotation,yaw,pitch);gl.uniform1f(time,elapsed);gl.uniform3f(color,...accent);
   gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
  },
  dispose:()=>{gl.disableVertexAttribArray(position);gl.deleteBuffer(vertexBuffer);gl.deleteProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment);}
 };
}
