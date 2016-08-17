Class(function Nodes() {
    Inherit(this, Controller);
    var _this = this;
    var $container;
    var _particles;
    var _canvas, _context, _output;
    var _dist = Mobile.phone ? 35 : 75;
    var _color = new Color(0xFF00000);
    var _mouseHit = 1;
    var _mouse = new Vector2();
    var _last = new Vector2();

    //*** Constructor
    (function() {
        Mouse.capture();
        initContainer();
        initParticles();
        initCanvas();
        addListeners();
        Render.startRender(loop);
    })();

    function initContainer() {
        $container = _this.container;
        $container.size('100%').bg('#000');
        Stage.addChild($container);
    }
    
    function initParticles() {
        _particles = [];
        
        var num = Device.mobile ? 100 : 600;
      
        if (!Device.mobile && Stage.height < 600) num = 200; //codepen height
      
        for (var i = 0; i < num; i++) {
            var particle = _this.initClass(NodeParticle);
            _particles.push(particle);
        }
    }
    
    function initCanvas() {
        _canvas = _this.initClass(Canvas, null)
        _canvas.size(Stage.width, Stage.height);
        _output = _this.initClass(Canvas, Stage.width, Stage.height);
        _context = _canvas.context;
        _context.fillStyle = '#fff';
        _context.strokeStyle = '#fff';
        _context.lineWidth = 1;
        _output.context.fillStyle = '#1a1a1a';
    }
    
    function loop(t) {
        var hue = 0.5 + Math.sin(t * .00025) * 0.5;
        
        _context.fillStyle = '#0d0d0d';
        _context.fillRect(0, 0, Stage.width, Stage.height);
        
        var r1 = Math.sin(t * .00095);
        var radius = (Stage.width * .1) + Math.cos(Math.pow(r1, 4)) * (Stage.width * .15);
      
        if (!Mouse.x) {
            Mouse.x = Stage.width/2;
            Mouse.y = Stage.height/2;
        }
        
        if (_last.x) {
            _mouse.set(Mouse.x, Mouse.y);
            _mouse.sub(_last);
            var vel = _mouse.length() / 16;
            radius += vel * 30;
        }
        _last.set(Mouse.x, Mouse.y);
        
        for (var i = _particles.length-1; i > -1; i--) {
            var p = _particles[i];
            p.ox += p.ovx;
            p.oy += p.ovy;
            
            if (p.ox < 0) {
                p.ovx *= -1;
                p.ox = 0;
            } else if (p.ox > Stage.width+50) {
                p.ovx *= -1;
                p.ox = Stage.width+50;
            }
            
            if (p.oy < 0) {
                p.ovy *= -1;
                p.oy = 0;
            } else if (p.oy > Stage.height-1) {
                p.ovy *= -1;
                p.oy = Stage.height-1;
            }
            
            var f, d, a;
            dx = Mouse.x - p.x;
            dy = Mouse.y - p.y;
            dSq = (dx*dx) + (dy*dy);
            if (Mouse.x == 0) dSq = 1000000;
            
            f = dSq / p.minDistSq;
            f = f < 0 ? 0 : f > 1 ? 1 : f;
            
            a = Math.atan2(dy, dx);
            f = -f * _mouseHit;
            
            p.fx -= Math.cos(a) * f; //+
            p.fy -= Math.sin(a) * f; //+
            
            p.fx += (p.ox - p.x) * 0.01 * p.mass;
            p.fy += (p.oy - p.y) * 0.01 * p.mass;
            
            p.vx += p.fx / p.mass;
            p.vy += p.fy / p.mass;
            
            p.x += p.vx;
            p.y += p.vy;
            
            p.vx *= 0.92;
            p.vy *= 0.92;
            
            p.fx = p.fy = 0;
            
            var dist = Utils.findDistance(_particles[i], Mouse) / radius;
            if (dist < 0) dist = 0;
            if (dist > 1) dist = 1;
            
            _color.setHSL(hue, 1 - dist, 1 - dist);
            _context.beginPath();
            _context.strokeStyle = '#' + _color.getHexString();
            for (var j = _particles.length-1; j > -1; j--) { 
                if (j == i) continue;
                if (Utils.findDistance(_particles[j], _particles[i]) < _dist) {
                    _context.moveTo(_particles[i].x+1, _particles[i].y+1);
                    _context.lineTo(_particles[j].x+1, _particles[j].y+1);
                }
            }
            _context.closePath();
            _context.stroke();
        }
        
        _output.context.drawImage(_context.canvas, 0, 0);
    }

    //*** Event handlers
    function addListeners() {
        __window.bind('touchstart', touch);
        __window.bind('touchend', touch);
        _this.events.subscribe(HydraEvents.RESIZE, resizeHandler);
    }
    
    function resizeHandler() {
        _output.size(Stage.width, Stage.height);
        _canvas.size(Stage.width, Stage.height);
        initParticles();
    }
    
    function touch(e) {
        if (e.type == 'mouseup' || e.type == 'touchend') {
            _mouseHit = 1;
        } else {
            _mouseHit = -1;
        }
     }
});

Class(function NodeParticle() {
    
    this.x = Utils.doRandom(0, Stage.width+100);
    this.y = Utils.doRandom(0, Stage.height+100);
    this.scale = 0;
    this.ovx = Utils.doRandom(-80, 80) / 100;
    this.ovy = Utils.doRandom(-80, 80) / 100;
    this.vx = 0;
    this.vy = 0;
    this.fx = 0;
    this.fy = 0;
    this.minDist = 10;
    this.minDistSq = this.minDist * this.minDist;
    this.mass = 1.25;
    this.sMass = this.mass;
    this.ox = this.x;
    this.oy = this.y;

}); 

Hydra.ready(function() {
    new Nodes();
});