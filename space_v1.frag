#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    
    float wave = 0.1*sin(50.0*st.y+u_time*10.0)+0.5;
    float dist = distance(st.x,wave)+sin(u_time);
    
    float line = float(mod(dist,10.0));
    float anim = abs(sin(line + u_time));
    
	gl_FragColor = vec4(line,anim,1.0,1.0);
}
