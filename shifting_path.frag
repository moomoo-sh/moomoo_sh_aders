#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const float tiling = 4.0;
const float half_pi = 1.57079632679;

float rand (vec2 uv) {
    return fract(sin(dot(uv.xy,vec2(12.9898,78.233)))*45758.5453123);
}

mat2 rotate2d(float angle)
{
    return mat2(cos(angle), -sin(angle),
                sin(angle), cos(angle));
}

float sdCircle(vec2 p, float r)
{
    return length(p) - r;
}

float ring(vec2 p, float r, float t) 
{
    float d = sdCircle(p, r);
    float pix = 3.*tiling/u_resolution.y;
    return smoothstep(t, t+pix, abs(d));
}

void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution.y;
    uv *= tiling;
    
    vec2 ipos = floor(uv);
    vec2 fpos = fract(uv)*2.0-1.0;
    
    float rnd = rand(ipos);
    
    float tiling2 = tiling*tiling;
    float angle = tiling2*sin(2.0*half_pi*u_time/tiling2+tiling2*rnd);
    angle = half_pi * smoothstep(0.0, half_pi, angle);
    fpos = rotate2d(angle) * fpos;
          
    if (fpos.x < -fpos.y) fpos = -fpos;
    gl_FragColor = vec4(vec3(1.0-ring(fpos-1.0, 1.0, 0.4)),1.0);
}