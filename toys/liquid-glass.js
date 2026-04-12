const SurfaceEquations = { 
    convex_squircle: (x) => Math.pow(1 - Math.pow(1 - x, 4), 1 / 4) 
};

class Spring { 
    constructor(v, s = 300, d = 20) { 
        this.value = v; 
        this.target = v; 
        this.velocity = 0; 
        this.stiffness = s; 
        this.damping = d; 
    } 
    setTarget(t) { 
        this.target = t; 
    } 
    update(dt) { 
        const f = (this.target - this.value) * this.stiffness;
        const df = this.velocity * this.damping; 
        this.velocity += (f - df) * dt; 
        this.value += this.velocity * dt; 
        return this.value; 
    } 
    isSettled() { 
        return Math.abs(this.target - this.value) < 0.001 && Math.abs(this.velocity) < 0.001; 
    } 
}

function calculateDisplacementMap1D(gt, bw, sf, ri, s = 128) { 
    const e = 1 / ri;
    const r =[]; 
    for (let i = 0; i < s; i++) { 
        const x = i / s;
        const y = sf(x);
        const dx = x < 1 ? 0.0001 : -0.0001;
        const d = (sf(Math.max(0, Math.min(1, x + dx))) - y) / dx;
        const m = Math.sqrt(d * d + 1);
        const n =[-d / m, -1 / m];
        const dt = n[1];
        const k = 1 - e * e * (1 - dt * dt); 
        
        if (k < 0) {
            r.push(0); 
        } else { 
            const rf =[
                -(e * dt + Math.sqrt(k)) * n[0], 
                e - (e * dt + Math.sqrt(k)) * n[1]
            ]; 
            r.push(rf[0] * ((y * bw + gt) / rf[1])); 
        } 
    } 
    return r; 
}

function calculateDisplacementMap2D(cw, ch, ow, oh, rad, bw, md, pMap) { 
    const img = new ImageData(cw, ch); 
    for (let i = 0; i < img.data.length; i += 4) {
        img.data[i] = 128;
        img.data[i + 1] = 128;
        img.data[i + 3] = 255;
    } 
    const rSq = rad * rad;
    const rp1Sq = (rad + 1) ** 2;
    const rmBwSq = Math.max(0, rad - bw) ** 2;
    const wB = ow - rad * 2;
    const hB = oh - rad * 2;
    const oX = (cw - ow) / 2;
    const oY = (ch - oh) / 2; 

    for (let y1 = 0; y1 < oh; y1++) {
        for (let x1 = 0; x1 < ow; x1++) {
            const idx = ((oY + y1) * cw + oX + x1) * 4;
            const x = x1 < rad ? x1 - rad : x1 >= ow - rad ? x1 - rad - wB : 0;
            const y = y1 < rad ? y1 - rad : y1 >= oh - rad ? y1 - rad - hB : 0;
            const dSq = x * x + y * y; 

            if (dSq <= rp1Sq && dSq >= rmBwSq) {
                const dist = Math.sqrt(dSq);
                const op = dSq < rSq ? 1 : 1 - (dist - rad) / (Math.sqrt(rp1Sq) - rad);
                const bIdx = Math.floor(Math.max(0, Math.min(1, (rad - dist) / bw)) * pMap.length);
                const dVal = pMap[Math.max(0, Math.min(bIdx, pMap.length - 1))] || 0;
                const dX = md > 0 ? (-(dist > 0 ? x / dist : 0) * dVal) / md : 0;
                const dY = md > 0 ? (-(dist > 0 ? y / dist : 0) * dVal) / md : 0; 

                img.data[idx] = Math.max(0, Math.min(255, 128 + dX * 127 * op)); 
                img.data[idx + 1] = Math.max(0, Math.min(255, 128 + dY * 127 * op));
            }
        }
    } 
    return img; 
}

function calculateSpecularHighlight(ow, oh, rad, bw) { 
    const img = new ImageData(ow, oh);
    const sVec =[Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)];
    const rSq = rad * rad;
    const rp1Sq = (rad + 1) ** 2;
    const rmSSq = Math.max(0, (rad - 1.5) ** 2); 

    for (let y1 = 0; y1 < oh; y1++) {
        for (let x1 = 0; x1 < ow; x1++) {
            const x = x1 < rad ? x1 - rad : x1 >= ow - rad ? x1 - rad - (ow - rad * 2) : 0;
            const y = y1 < rad ? y1 - rad : y1 >= oh - rad ? y1 - rad - (oh - rad * 2) : 0;
            const dSq = x * x + y * y; 

            if (dSq <= rp1Sq && dSq >= rmSSq) {
                const dist = Math.sqrt(dSq);
                const op = dSq < rSq ? 1 : 1 - (dist - rad) / (Math.sqrt(rp1Sq) - rad);
                const dp = Math.abs((dist > 0 ? x / dist : 0) * sVec[0] + (dist > 0 ? -y / dist : 0) * sVec[1]);
                const cf = dp * Math.sqrt(1 - (1 - Math.max(0, Math.min(1, (rad - dist) / 1.5))) ** 2);
                const c = Math.min(255, 255 * cf);
                const idx = (y1 * ow + x1) * 4; 

                img.data[idx] = img.data[idx + 1] = img.data[idx + 2] = c; 
                img.data[idx + 3] = Math.min(255, c * cf * op);
            }
        }
    } 
    return img; 
}

function imageDataToDataURL(img) { 
    const c = document.createElement("canvas"); 
    c.width = img.width; 
    c.height = img.height; 
    c.getContext("2d").putImageData(img, 0, 0); 
    return c.toDataURL(); 
}

let useBackdropFilter = false; 
function detectFeatures() { 
    const t = document.createElement("div"); 
    t.style.backdropFilter = "url(#test)"; 
    useBackdropFilter = !!window.chrome && t.style.backdropFilter.includes("url"); 
    if (useBackdropFilter) document.body.classList.add("use-backdrop-filter"); 
}

/* Demo Engine Mechanics Unmodified Above */

function initLensDemo() { 
    const s = { bezelWidth: 30, glassThickness: 150, refractiveIndex: 1.5, refractionScale: 1.5, objectWidth: 200, objectHeight: 140, radius: 70, isDragging: false, dragOffset: {x: 0, y: 0}, velocityX: 0, velocityY: 0, lastX: 0, lastY: 0, lastTime: 0 }; 
    const sp = { scale: new Spring(0.85, 400, 25), scaleX: new Spring(1, 400, 30), scaleY: new Spring(1, 400, 30), ox: new Spring(0, 400, 30), oy: new Spring(4, 400, 30), blur: new Spring(12, 400, 30), alpha: new Spring(0.15, 300, 25), rb: new Spring(0.8, 300, 18) }; 
    let af = null; 
    const gEl = document.getElementById("lensGlassElement"), gIn = document.getElementById("lensGlassInner"), dA = document.getElementById("lensDemoArea"), cIn = document.getElementById("lensCloneInner"); 
    
    const pc = calculateDisplacementMap1D(s.glassThickness, s.bezelWidth, SurfaceEquations.convex_squircle, s.refractiveIndex); 
    s.md = Math.max(...pc.map(Math.abs)); 
    
    document.getElementById("lensDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(s.objectWidth, s.objectHeight, s.objectWidth, s.objectHeight, s.radius, s.bezelWidth, s.md || 1, pc))); 
    document.getElementById("lensSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(s.objectWidth, s.objectHeight, s.radius, s.bezelWidth))); 
    
    if (!useBackdropFilter) document.getElementById("lensContentClone").style.filter = "url(#lensLiquidGlassFilter)"; 
    
    function updC() {
        if (useBackdropFilter) return;
        const aR = dA.getBoundingClientRect();
        cIn.style.width = aR.width + "px";
        cIn.style.height = aR.height + "px";
        cIn.style.transform = `translate(${-(parseFloat(gEl.style.left) || 0)}px, ${-(parseFloat(gEl.style.top) || 0)}px)`;
    } 
    
    function loop() {
        const dt = Math.min(0.032, 1 / 60); 
        sp.scale.setTarget(s.isDragging ? 1 : 0.85);
        sp.ox.setTarget(s.isDragging ? 4 : 0);
        sp.oy.setTarget(s.isDragging ? 16 : 4);
        sp.blur.setTarget(s.isDragging ? 24 : 12);
        sp.alpha.setTarget(s.isDragging ? 0.22 : 0.15);
        sp.rb.setTarget(s.isDragging ? 1 : 0.8); 
        
        const vM = Math.sqrt(s.velocityX ** 2 + s.velocityY ** 2);
        const sq = Math.min(0.15, vM / 3000);
        
        if (vM > 50) {
            const vx = s.velocityX / vM, vy = s.velocityY / vM;
            sp.scaleX.setTarget(1 + sq * Math.abs(vx) - sq * 0.5 * Math.abs(vy));
            sp.scaleY.setTarget(1 + sq * Math.abs(vy) - sq * 0.5 * Math.abs(vx));
        } else {
            sp.scaleX.setTarget(1);
            sp.scaleY.setTarget(1);
        } 
        
        const sc = sp.scale.update(dt), sx = sp.scaleX.update(dt), sy = sp.scaleY.update(dt), ox = sp.ox.update(dt), oy = sp.oy.update(dt), b = sp.blur.update(dt), a = sp.alpha.update(dt); 
        
        gEl.style.transform = `scale(${sc * sx}, ${sc * sy})`;
        gIn.style.boxShadow = `${ox}px ${oy}px ${b}px rgba(0,0,0,${a}), inset ${ox * 0.3}px ${oy * 0.4}px 16px rgba(0,0,0,${a * 0.6}), inset ${-ox * 0.3}px ${-oy * 0.4}px 16px rgba(255,255,255,${a * 0.48})`; 
        document.getElementById("lensDisplacementMap").setAttribute("scale", s.md * s.refractionScale * sp.rb.update(dt));
        
        if (!s.isDragging) { s.velocityX *= 0.95; s.velocityY *= 0.95; } 
        
        if (!(Object.values(sp).every(x => x.isSettled()) && Math.abs(s.velocityX) < 1 && Math.abs(s.velocityY) < 1)) af = requestAnimationFrame(loop);
        else af = null;
    } 
    
    gEl.addEventListener("pointerdown", e => {
        e.preventDefault(); 
        s.isDragging = true; 
        gEl.setPointerCapture(e.pointerId);
        const r = gEl.getBoundingClientRect(), cs = sp.scale.value;
        s.dragOffset.x = (e.clientX - r.left) / cs;
        s.dragOffset.y = (e.clientY - r.top) / cs;
        s.lastX = e.clientX; 
        s.lastY = e.clientY; 
        s.lastTime = performance.now();
        s.velocityX = 0; 
        s.velocityY = 0;
        if (!af) af = requestAnimationFrame(loop);
    }); 
    
    gEl.addEventListener("pointermove", e => {
        if (!s.isDragging) return;
        e.preventDefault();
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const cy = e.touches ? e.touches[0].clientY : e.clientY;
        const dt = Math.max(1, performance.now() - s.lastTime) / 1000;
        s.velocityX = (cx - s.lastX) / dt;
        s.velocityY = (cy - s.lastY) / dt;
        s.lastX = cx; 
        s.lastY = cy; 
        s.lastTime = performance.now();
        const aR = dA.getBoundingClientRect();
        let nx = cx - aR.left - s.dragOffset.x;
        let ny = cy - aR.top - s.dragOffset.y;
        
        gEl.style.left = (nx < 0 ? nx * 0.3 : nx > aR.width - s.objectWidth ? aR.width - s.objectWidth + (nx - (aR.width - s.objectWidth)) * 0.3 : nx) + "px";
        gEl.style.top = (ny < 0 ? ny * 0.3 : ny > aR.height - s.objectHeight ? aR.height - s.objectHeight + (ny - (aR.height - s.objectHeight)) * 0.3 : ny) + "px";
        updC();
    }); 
    
    gEl.addEventListener("pointerup", () => {
        s.isDragging = false;
        if (!af) af = requestAnimationFrame(loop);
    });
    
    window.addEventListener("resize", updC);
    updC();
    if (!af) af = requestAnimationFrame(loop); 
}

function initSliderDemo() { 
    const c = { w: 90, h: 60, r: 30, tw: 330, th: 18, bw: 16, gt: 80, ri: 1.45, sr: 0.6, sd: 1 };
    const s = { val: 10, pd: false, md: 0 };
    const sp = { sc: new Spring(c.sr, 2000, 80), bo: new Spring(1, 2000, 80), sr: new Spring(0.4, 100, 10) }; 
    let af = null;
    
    const th = document.getElementById("sliderThumb"), tr = document.getElementById("sliderTrack"), fi = document.getElementById("sliderFill"), ci = document.getElementById("sliderThumbCloneInner"); 
    const pc = calculateDisplacementMap1D(c.gt, c.bw, SurfaceEquations.convex_squircle, c.ri);
    s.md = Math.max(...pc.map(Math.abs)); 
    
    document.getElementById("sliderDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(c.w, c.h, c.w, c.h, c.r, c.bw, s.md || 1, pc)));
    document.getElementById("sliderSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(c.w, c.h, c.r, c.bw))); 
    
    if (!useBackdropFilter) document.getElementById("sliderThumbClone").style.filter = "url(#sliderGlassFilter)"; 
    
    function upd() {
        fi.style.width = s.val + "%";
        const tx = (c.w * c.sr) / 2 + (s.val / 100) * (c.tw - c.w * c.sr) - c.w / 2;
        th.style.left = tx + "px";
        if (!useBackdropFilter) {
            const aR = document.getElementById("sliderDemoArea").getBoundingClientRect();
            const cl = (aR.width - c.tw) / 2;
            const ct = (aR.height - c.h) / 2;
            ci.style.width = aR.width + "px";
            ci.style.height = aR.height + "px";
            ci.style.transform = `translate(${-(cl + tx)}px, ${-ct}px)`;
            ci.style.setProperty("--track-left", `${cl}px`);
            ci.style.setProperty("--track-top", `${ct + (c.h - c.th) / 2}px`);
            ci.style.setProperty("--fill-width", s.val.toString());
        }
    } 
    
    function loop() {
        const dt = Math.min(0.032, 1 / 60);
        sp.sc.setTarget(s.pd ? c.sd : c.sr);
        sp.bo.setTarget(s.pd ? 0.1 : 1);
        sp.sr.setTarget(s.pd ? 0.9 : 0.4);
        
        const sc = sp.sc.update(dt), bo = sp.bo.update(dt);
        th.style.transform = `scale(${sc})`;
        th.style.backgroundColor = `rgba(255,255,255,${bo})`;
        document.getElementById("sliderThumbClone").style.opacity = 1 - bo;
        document.getElementById("sliderDisplacementMap").setAttribute("scale", s.md * sp.sr.update(dt));
        
        if (!Object.values(sp).every(x => x.isSettled())) af = requestAnimationFrame(loop);
        else af = null;
    } 
    
    th.addEventListener("pointerdown", e => {
        e.preventDefault(); 
        s.pd = true; 
        if (!af) af = requestAnimationFrame(loop);
    });
    
    window.addEventListener("pointermove", e => {
        if (!s.pd) return;
        e.preventDefault();
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const wR = c.w * c.sr;
        const x0 = tr.getBoundingClientRect().left + wR / 2;
        const tw = c.tw - wR;
        s.val = Math.max(0, Math.min(100, ((Math.max(x0, Math.min(x0 + tw, cx)) - x0) / tw) * 100));
        upd();
    });
    
    window.addEventListener("pointerup", () => {
        s.pd = false;
        if (!af) af = requestAnimationFrame(loop);
    });
    
    window.addEventListener("resize", upd);
    upd();
    af = requestAnimationFrame(loop); 
}

function initSwitchDemo() { 
    const c = { tw: 160, th: 67, w: 146, h: 92, r: 46, bw: 19, gt: 47, ri: 1.5, sr: 0.65, sa: 0.9 };
    const s = { chk: true, pd: false, ix: 0, xr: 1, md: 0 };
    const sp = { xr: new Spring(1, 1000, 80), sc: new Spring(c.sr, 2000, 80), bo: new Spring(1, 2000, 80), tc: new Spring(1, 1000, 80), sr: new Spring(0.4, 100, 10) }; 
    
    c.ro = ((1 - c.sr) * c.w) / 2;
    c.tr = c.tw - c.th - (c.w - c.h) * c.sr; 
    let af = null;
    
    const th = document.getElementById("switchThumb"), tr = document.getElementById("switchTrack"), ci = document.getElementById("switchThumbCloneInner"); 
    const pc = calculateDisplacementMap1D(c.gt, c.bw, SurfaceEquations.convex_squircle, c.ri);
    s.md = Math.max(...pc.map(Math.abs)); 
    
    document.getElementById("switchDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(c.w, c.h, c.w, c.h, c.r, c.bw, s.md || 1, pc)));
    document.getElementById("switchSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(c.w, c.h, c.r, c.bw))); 
    
    if (!useBackdropFilter) document.getElementById("switchThumbClone").style.filter = "url(#switchGlassFilter)"; 
    
    function loop() {
        const dt = Math.min(0.032, 1 / 60);
        sp.sc.setTarget(s.pd ? c.sa : c.sr);
        sp.bo.setTarget(s.pd ? 0.1 : 1);
        sp.sr.setTarget(s.pd ? 0.9 : 0.4);
        
        if (!s.pd) sp.xr.setTarget(s.chk ? 1 : 0);
        sp.tc.setTarget(s.pd ? (s.xr > 0.5 ? 1 : 0) : (s.chk ? 1 : 0));
        
        const xr = sp.xr.update(dt), sc = sp.sc.update(dt), bo = sp.bo.update(dt), tc = sp.tc.update(dt);
        const tx = -c.ro + (c.th - c.h * c.sr) / 2 + xr * c.tr;
        
        th.style.left = tx + "px";
        th.style.transform = `translateY(-50%) scale(${sc})`;
        th.style.backgroundColor = `rgba(255,255,255,${bo})`;
        th.style.boxShadow = s.pd ? "0 4px 22px rgba(0,0,0,0.1), inset 2px 7px 24px rgba(0,0,0,0.09), inset -2px -7px 24px rgba(255,255,255,0.09)" : "0 10px 30px rgba(0,0,0,0.5)";
        document.getElementById("switchThumbClone").style.opacity = 1 - bo;
        
        const r = Math.round(255 + (139 - 255) * tc);
        const g = Math.round(255 + (92 - 255) * tc);
        const b_ = Math.round(255 + (246 - 255) * tc);
        const a = 0.05 + (0.5 - 0.05) * tc;
        const tBg = `rgba(${r}, ${g}, ${b_}, ${a})`;
        tr.style.backgroundColor = tBg;
        
        if (!useBackdropFilter) {
            const aR = document.getElementById("switchDemoArea").getBoundingClientRect();
            const cl = (aR.width - c.tw) / 2;
            const ct = (aR.height - c.th) / 2;
            ci.style.width = aR.width + "px";
            ci.style.height = aR.height + "px";
            ci.style.transform = `translate(${-(cl + tx)}px, ${-(ct + (c.th / 2 - c.h / 2))}px)`;
            ci.style.setProperty("--switch-track-color", tBg);
            ci.style.setProperty("--track-left", `${cl}px`);
            ci.style.setProperty("--track-top", `${ct}px`);
        }
        document.getElementById("switchDisplacementMap").setAttribute("scale", s.md * sp.sr.update(dt));
        
        if (!Object.values(sp).every(x => x.isSettled())) af = requestAnimationFrame(loop);
        else af = null;
    } 
    
    th.addEventListener("mousedown", e => {
        e.preventDefault(); e.stopPropagation();
        s.pd = true; s.ix = e.clientX; s.xr = s.chk ? 1 : 0;
        if (!af) af = requestAnimationFrame(loop);
    });
    
    th.addEventListener("touchstart", e => {
        e.preventDefault(); e.stopPropagation();
        s.pd = true; s.ix = e.touches[0].clientX; s.xr = s.chk ? 1 : 0;
        if (!af) af = requestAnimationFrame(loop);
    }, {passive: false});
    
    window.addEventListener("mousemove", e => {
        if (!s.pd) return; e.stopPropagation();
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const r = (s.chk ? 1 : 0) + (cx - s.ix) / c.tr;
        s.xr = Math.min(1, Math.max(0, r)) + ((r < 0 ? 1 : -1) * (r < 0 ? -r : r > 1 ? r - 1 : 0)) / 22;
        sp.xr.setTarget(s.xr);
        if (!af) af = requestAnimationFrame(loop);
    });
    
    window.addEventListener("touchmove", e => {
        if (!s.pd) return; e.stopPropagation();
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const r = (s.chk ? 1 : 0) + (cx - s.ix) / c.tr;
        s.xr = Math.min(1, Math.max(0, r)) + ((r < 0 ? 1 : -1) * (r < 0 ? -r : r > 1 ? r - 1 : 0)) / 22;
        sp.xr.setTarget(s.xr);
        if (!af) af = requestAnimationFrame(loop);
    }, {passive: false});
    
    window.addEventListener("mouseup", e => {
        if (s.pd) {
            s.pd = false;
            s.chk = Math.abs(e.clientX - s.ix) < 4 ? !s.chk : s.xr > 0.5;
            if (!af) af = requestAnimationFrame(loop);
        }
    });
    
    window.addEventListener("touchend", e => {
        if (s.pd) {
            s.pd = false;
            s.chk = Math.abs((e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - s.ix) < 4 ? !s.chk : s.xr > 0.5;
            if (!af) af = requestAnimationFrame(loop);
        }
    });
    
    tr.addEventListener("click", e => {
        if (e.target === tr) {
            s.chk = !s.chk;
            if (!af) af = requestAnimationFrame(loop);
        }
    });
    
    window.addEventListener("resize", () => {
        if (!af) af = requestAnimationFrame(loop);
    });
    
    af = requestAnimationFrame(loop); 
}

function initDockDemo() { 
    const c = { w: 80, h: 66, r: 33, iw: 80, bw: 26, gt: 120, ri: 2.0, md: 0 };
    const s = { ai: 0, id: false, go: c.w / 2 };
    const sp = { x: new Spring(0, 450, 26), sx: new Spring(1, 500, 24), sy: new Spring(1, 500, 24), sc: new Spring(1, 400, 20) }; 
    let af = null;
    
    const tr = document.getElementById('dockTrack'), bu = document.getElementById('dockBubble'), it = document.querySelectorAll('#dockDemoArea .dock-item'), cw = document.getElementById('dockCloneWorld'); 
    const pc = calculateDisplacementMap1D(c.gt, c.bw, SurfaceEquations.convex_squircle, c.ri);
    c.md = Math.max(...pc.map(Math.abs)); 
    
    document.getElementById("dockDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(c.w, c.h, c.w, c.h, c.r, c.bw, c.md || 1, pc)));
    document.getElementById("dockSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(c.w, c.h, c.r, c.bw))); 
    
    if (!useBackdropFilter) {
        cw.innerHTML = document.getElementById('dockRealWorld').outerHTML;
        document.getElementById('dockBubbleClone').style.filter = "url(#dockGlassFilter)";
    } 
    
    function uAI(tx) {
        const mx = (it.length - 1) * c.iw;
        const cx = Math.max(0, Math.min(tx, mx));
        const hi = Math.round(cx / c.iw);
        if (hi !== s.ai) {
            s.ai = hi;
            it.forEach(e => e.classList.remove('active'));
            if (it[hi]) it[hi].classList.add('active');
        }
    } 
    
    function loop() {
        const dt = Math.min(0.032, 1 / 60);
        const bs = sp.sc.update(dt);
        const vx = Math.abs(sp.x.velocity);
        const st = vx / 1200;
        
        sp.sx.setTarget(1 + st);
        sp.sy.setTarget(Math.max(0.6, 1 - st * 0.3));
        
        const cx = sp.x.update(dt), sx = sp.sx.update(dt) * bs, sy = sp.sy.update(dt) * bs;
        bu.style.transform = `translateX(${cx}px) scale(${sx}, ${sy})`;
        document.getElementById("dockDisplacementMap").setAttribute("scale", c.md * sx * 1.5);
        
        if (!useBackdropFilter) {
            const tR = tr.getBoundingClientRect();
            const dR = document.getElementById('dockDemoArea').getBoundingClientRect();
            const gx = tR.left - dR.left + 8 + cx;
            const gy = tR.top - dR.top + 7;
            cw.style.transform = `scale(${1 / sx}, ${1 / sy}) translate(${-gx}px, ${-gy}px)`;
        }
        
        if (!Object.values(sp).every(x => x.isSettled())) af = requestAnimationFrame(loop);
        else af = null;
    } 
    
    tr.addEventListener('pointerdown', e => {
        s.id = true;
        tr.setPointerCapture(e.pointerId);
        tr.classList.add('dragging');
        sp.sc.setTarget(1.25);
        
        const prx = e.clientX - tr.getBoundingClientRect().left - 8;
        const cx = sp.x.value;
        if (prx >= cx && prx <= cx + c.w) { s.go = prx - cx; } 
        else { s.go = c.w / 2; }
        
        let tx = prx - s.go;
        tx = Math.max(0, Math.min(tx, (it.length - 1) * c.iw));
        sp.x.setTarget(tx);
        uAI(tx);
        if (!af) af = requestAnimationFrame(loop);
    }); 
    
    tr.addEventListener('pointermove', e => {
        if (!s.id) return;
        const prx = e.clientX - tr.getBoundingClientRect().left - 8;
        let rtx = prx - s.go;
        let tx = rtx;
        let mx = (it.length - 1) * c.iw;
        let mo = 15;
        
        if (rtx < 0) tx = -mo * (1 - Math.exp(rtx / 50));
        else if (rtx > mx) tx = mx + mo * (1 - Math.exp(-(rtx - mx) / 50));
        
        sp.x.setTarget(tx);
        uAI(tx);
        if (!af) af = requestAnimationFrame(loop);
    }); 
    
    const ed = (e) => {
        if (!s.id) return;
        s.id = false;
        tr.releasePointerCapture(e.pointerId);
        tr.classList.remove('dragging');
        sp.sc.setTarget(1);
        sp.x.setTarget(s.ai * c.iw);
        if (!af) af = requestAnimationFrame(loop);
    };
    
    tr.addEventListener('pointerup', ed);
    tr.addEventListener('pointercancel', ed);
    
    window.addEventListener('resize', () => {
        if (!af) af = requestAnimationFrame(loop);
    });
    
    sp.x.value = sp.x.target = s.ai * c.iw;
    af = requestAnimationFrame(loop); 
}

function initCursorDemo() { 
    const c = { s: 90, r: 45, bw: 15, gt: 60, ri: 1.45, md: 0 };
    const s = { mx: 250, my: 250, ih: false, ip: false, hm: false };
    const sp = { x: new Spring(s.mx, 400, 25), y: new Spring(s.my, 400, 25), sc: new Spring(1, 350, 20), sa: new Spring(0.15, 300, 20) }; 
    let af = null;
    
    const cr = document.getElementById('liquidCursor'), i = document.getElementById('cursorInner'), dA = document.getElementById('cursorDemoArea'), cw = document.getElementById('cursorCloneWorld'), b = document.getElementById('cursorHoverBtn'); 
    const pc = calculateDisplacementMap1D(c.gt, c.bw, SurfaceEquations.convex_squircle, c.ri);
    c.md = Math.max(...pc.map(Math.abs)); 
    
    document.getElementById("cursorDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(c.s, c.s, c.s, c.s, c.r, c.bw, c.md || 1, pc)));
    document.getElementById("cursorSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(c.s, c.s, c.r, c.bw))); 
    
    if (!useBackdropFilter) {
        cw.innerHTML = document.getElementById('cursorRealWorld').outerHTML;
        document.getElementById('cursorClone').style.filter = "url(#cursorGlassFilter)";
    } 
    
    function loop() {
        const dt = Math.min(0.032, 1 / 60);
        sp.x.setTarget(s.mx);
        sp.y.setTarget(s.my);
        
        if (s.ip) { sp.sc.setTarget(0.7); sp.sa.setTarget(0.3); } 
        else if (s.ih) { sp.sc.setTarget(1.6); sp.sa.setTarget(0.1); } 
        else { sp.sc.setTarget(1); sp.sa.setTarget(0.15); }
        
        const cx = sp.x.update(dt), cy = sp.y.update(dt), cs = sp.sc.update(dt), sa = sp.sa.update(dt);
        const ox = cx - c.s / 2;
        const oy = cy - c.s / 2;
        
        cr.style.transform = `translate(${ox}px, ${oy}px) scale(${cs})`;
        i.style.boxShadow = `0 ${8 * cs}px ${20 * cs}px rgba(0,0,0,${sa}), inset 0 4px 12px rgba(255,255,255,0.2), inset 0 -4px 12px rgba(0,0,0,0.5)`;
        document.getElementById("cursorDisplacementMap").setAttribute("scale", c.md * 1.5 * cs);
        
        if (!useBackdropFilter) {
            const r = dA.getBoundingClientRect();
            cw.style.width = r.width + "px";
            cw.style.height = r.height + "px";
            cw.style.transform = `scale(${1 / cs}) translate(${-ox}px, ${-oy}px)`;
        }
        if (s.hm && !Object.values(sp).every(x => x.isSettled())) af = requestAnimationFrame(loop);
        else af = null;
    } 
    
    dA.addEventListener('mousemove', e => {
        const r = dA.getBoundingClientRect();
        s.mx = e.clientX - r.left;
        s.my = e.clientY - r.top;
        if (!s.hm) {
            s.hm = true;
            cr.classList.add('visible');
            sp.x.value = s.mx;
            sp.y.value = s.my;
        }
        if (!af) af = requestAnimationFrame(loop);
    });
    
    dA.addEventListener('mousedown', () => { s.ip = true; if (!af) af = requestAnimationFrame(loop); });
    dA.addEventListener('mouseup', () => { s.ip = false; if (!af) af = requestAnimationFrame(loop); });
    dA.addEventListener('mouseleave', () => { cr.classList.remove('visible'); s.hm = false; });
    dA.addEventListener('mouseenter', () => { if (s.hm) cr.classList.add('visible'); });
    
    b.addEventListener('mouseenter', () => { s.ih = true; if (!af) af = requestAnimationFrame(loop); });
    b.addEventListener('mouseleave', () => { s.ih = false; if (!af) af = requestAnimationFrame(loop); });
    
    af = requestAnimationFrame(loop); 
}

function initButtonDemo() { 
    const c = { w: 220, h: 74, r: 37, bw: 26, gt: 120, ri: 2.0, md: 0 };
    const s = { ih: false, ip: false };
    const sp = { sc: new Spring(1, 400, 20), sd: new Spring(8, 400, 20), rs: new Spring(0.8, 300, 20) }; 
    let af = null;
    
    const b = document.getElementById('liquidButton'), i = document.getElementById('liquidButtonInner'), cw = document.getElementById('liquidButtonCloneWorld'); 
    const pc = calculateDisplacementMap1D(c.gt, c.bw, SurfaceEquations.convex_squircle, c.ri);
    c.md = Math.max(...pc.map(Math.abs)); 
    
    document.getElementById("buttonDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(c.w, c.h, c.w, c.h, c.r, c.bw, c.md || 1, pc)));
    document.getElementById("buttonSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(c.w, c.h, c.r, c.bw))); 
    
    if (!useBackdropFilter) {
        cw.innerHTML = document.getElementById('buttonRealWorld').outerHTML;
        document.getElementById('liquidButtonClone').style.filter = "url(#buttonGlassFilter)";
    } 
    
    function loop() {
        const dt = Math.min(0.032, 1 / 60);
        if (s.ip) { sp.sc.setTarget(0.9); sp.sd.setTarget(2); sp.rs.setTarget(1.5); } 
        else if (s.ih) { sp.sc.setTarget(1.05); sp.sd.setTarget(16); sp.rs.setTarget(1.2); } 
        else { sp.sc.setTarget(1); sp.sd.setTarget(8); sp.rs.setTarget(0.8); }
        
        const sc = sp.sc.update(dt), sd = sp.sd.update(dt), rs = sp.rs.update(dt);
        b.style.transform = `scale(${sc})`;
        i.style.boxShadow = `0 ${sd}px ${sd * 3}px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 6px rgba(0,0,0,0.4), inset 0 0 12px rgba(255,255,255,0.1)`;
        document.getElementById("buttonDisplacementMap").setAttribute("scale", c.md * rs);
        
        if (!useBackdropFilter) {
            const aR = document.getElementById('buttonDemoArea').getBoundingClientRect();
            cw.style.width = aR.width + "px";
            cw.style.height = aR.height + "px";
            const ol = (aR.width - c.w) / 2;
            const ot = (aR.height - c.h) / 2;
            cw.style.transform = `scale(${1 / sc}) translate(${-ol}px, ${-ot}px)`;
        }
        if (!Object.values(sp).every(x => x.isSettled())) af = requestAnimationFrame(loop);
        else af = null;
    } 
    
    b.addEventListener('mouseenter', () => { s.ih = true; if (!af) af = requestAnimationFrame(loop); });
    b.addEventListener('mouseleave', () => { s.ih = false; s.ip = false; if (!af) af = requestAnimationFrame(loop); });
    b.addEventListener('mousedown', () => { s.ip = true; if (!af) af = requestAnimationFrame(loop); });
    b.addEventListener('mouseup', () => { s.ip = false; if (!af) af = requestAnimationFrame(loop); });
    
    b.addEventListener('touchstart', e => { e.preventDefault(); s.ip = true; if (!af) af = requestAnimationFrame(loop); }, {passive: false});
    b.addEventListener('touchend', e => { e.preventDefault(); s.ip = false; if (!af) af = requestAnimationFrame(loop); });
    
    window.addEventListener('resize', () => { if (!af) af = requestAnimationFrame(loop); });
    af = requestAnimationFrame(loop); 
}

function initTabsDemo() { 
    const config = { width: 130, height: 52, radius: 26, bezelWidth: 15, glassThickness: 60, refractiveIndex: 1.6, maxDisp: 0 }; 
    const state = { activeIndex: 0 }; 
    const springs = { x: new Spring(0, 300, 25), scaleX: new Spring(1.0, 350, 20) }; 
    
    const container = document.getElementById('tabsContainer'), indicator = document.getElementById('tabsIndicator'), items = document.querySelectorAll('.tabs-item'), cloneWorld = document.getElementById('tabsCloneWorld'); 
    let animationFrameId = null; 
    
    const precomputed = calculateDisplacementMap1D(config.glassThickness, config.bezelWidth, SurfaceEquations.convex_squircle, config.refractiveIndex); 
    config.maxDisp = Math.max(...precomputed.map(Math.abs)); 
    
    document.getElementById("tabsDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(config.width, config.height, config.width, config.height, config.radius, config.bezelWidth, config.maxDisp || 1, precomputed))); 
    document.getElementById("tabsSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(config.width, config.height, config.radius, config.bezelWidth))); 
    
    if (!useBackdropFilter) { 
        cloneWorld.innerHTML = document.getElementById('tabsRealWorld').outerHTML; 
        document.getElementById('tabsIndicatorClone').style.filter = "url(#tabsGlassFilter)"; 
    } 
    
    function updateTabs() { 
        const totalWidth = 400 - 8; 
        const tabWidth = totalWidth / 3; 
        springs.x.setTarget(state.activeIndex * tabWidth); 
        const stretchAmount = Math.abs(springs.x.target - springs.x.value) / tabWidth; 
        springs.scaleX.velocity += stretchAmount * 5; 
        
        items.forEach((item, idx) => { 
            if (idx === state.activeIndex) item.classList.add('active'); 
            else item.classList.remove('active'); 
        }); 
        
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); 
    } 
    
    function loop() { 
        const dt = Math.min(0.032, 1 / 60); 
        springs.scaleX.setTarget(1.0); 
        const cx = springs.x.update(dt), sx = springs.scaleX.update(dt); 
        indicator.style.transform = `translateX(${cx}px) scaleX(${sx})`; 
        document.getElementById("tabsDisplacementMap").setAttribute("scale", config.maxDisp * sx * 1.5); 
        
        if (!useBackdropFilter) { 
            const contRect = container.getBoundingClientRect(); 
            const demoRect = document.getElementById('tabsDemoArea').getBoundingClientRect(); 
            const globalX = contRect.left - demoRect.left + 4 + cx; 
            const globalY = contRect.top - demoRect.top + 3; 
            
            cloneWorld.style.width = demoRect.width + "px"; 
            cloneWorld.style.height = demoRect.height + "px"; 
            cloneWorld.style.transform = `scaleX(${1 / sx}) translate(${-globalX}px, ${-globalY}px)`; 
        } 
        if (!Object.values(springs).every(s => s.isSettled())) animationFrameId = requestAnimationFrame(loop); 
        else animationFrameId = null; 
    } 
    
    items.forEach((item, index) => { 
        item.addEventListener('click', () => { 
            if (state.activeIndex !== index) { 
                state.activeIndex = index; 
                updateTabs(); 
            } 
        }); 
    }); 
    
    const tabWidth = (400 - 8) / 3; 
    indicator.style.width = tabWidth + "px"; 
    config.width = tabWidth; 
    springs.x.value = springs.x.target = state.activeIndex * tabWidth; 
    animationFrameId = requestAnimationFrame(loop); 
}

function initDialDemo() { 
    const config = { size: 140, radius: 70, bezelWidth: 20, glassThickness: 80, refractiveIndex: 1.8, maxDisp: 0 }; 
    const state = { isDragging: false, currentAngle: 0, startAngleOffset: 0, lastAngle: 0 }; 
    const springs = { angle: new Spring(0, 400, 30), scale: new Spring(1, 400, 20) }; 
    
    const dial = document.getElementById('liquidDial'), container = document.getElementById('dialContainer'), cloneWorld = document.getElementById('liquidDialCloneWorld'); 
    let animationFrameId = null; 
    
    const precomputed = calculateDisplacementMap1D(config.glassThickness, config.bezelWidth, SurfaceEquations.convex_squircle, config.refractiveIndex); 
    config.maxDisp = Math.max(...precomputed.map(Math.abs)); 
    
    document.getElementById("dialDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(config.size, config.size, config.size, config.size, config.radius, config.bezelWidth, config.maxDisp || 1, precomputed))); 
    document.getElementById("dialSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(config.size, config.size, config.radius, config.bezelWidth))); 
    
    if (!useBackdropFilter) document.getElementById('liquidDialClone').style.filter = "url(#dialGlassFilter)"; 
    
    function loop() { 
        const dt = Math.min(0.032, 1 / 60); 
        springs.scale.setTarget(state.isDragging ? 1.05 : 1.0); 
        const ang = springs.angle.update(dt), sc = springs.scale.update(dt); 
        dial.style.transform = `scale(${sc}) rotate(${ang}deg)`; 
        
        if (!useBackdropFilter) { 
            const areaRect = document.getElementById('dialDemoArea').getBoundingClientRect(); 
            cloneWorld.style.width = areaRect.width + "px"; 
            cloneWorld.style.height = areaRect.height + "px"; 
            const offsetLeft = (areaRect.width - config.size) / 2;
            const offsetTop = (areaRect.height - config.size) / 2; 
            cloneWorld.style.transform = `rotate(${-ang}deg) scale(${1 / sc}) translate(${-offsetLeft}px, ${-offsetTop}px)`; 
        } 
        if (!Object.values(springs).every(sp => sp.isSettled())) animationFrameId = requestAnimationFrame(loop); 
        else animationFrameId = null; 
    } 
    
    function getAngleFromEvent(e) { 
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2; 
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY; 
        return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI); 
    } 
    
    dial.addEventListener('pointerdown', (e) => { 
        state.isDragging = true; 
        dial.setPointerCapture(e.pointerId); 
        state.lastAngle = getAngleFromEvent(e); 
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); 
    }); 
    
    dial.addEventListener('pointermove', (e) => { 
        if (!state.isDragging) return; 
        const rawAngle = getAngleFromEvent(e); 
        let delta = rawAngle - state.lastAngle; 
        if (delta > 180) delta -= 360; 
        if (delta < -180) delta += 360; 
        state.currentAngle += delta; 
        state.lastAngle = rawAngle; 
        springs.angle.setTarget(state.currentAngle); 
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); 
    }); 
    
    dial.addEventListener('pointerup', () => { 
        state.isDragging = false; 
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); 
    }); 
    
    animationFrameId = requestAnimationFrame(loop); 
}

function initInputDemo() { 
    const config = { width: 340, height: 60, radius: 30, bezelWidth: 15, glassThickness: 60, refractiveIndex: 1.5, maxDisp: 0 }; 
    const springs = { scale: new Spring(1.0, 400, 20), scaleX: new Spring(1.0, 400, 25), scaleY: new Spring(1.0, 400, 25) }; 
    let isFocused = false; 
    
    const wrapper = document.getElementById('inputWrapper'), field = document.getElementById('inputField'), cloneWorld = document.getElementById('inputCloneWorld'); 
    let animationFrameId = null; 
    
    const precomputed = calculateDisplacementMap1D(config.glassThickness, config.bezelWidth, SurfaceEquations.convex_squircle, config.refractiveIndex); 
    config.maxDisp = Math.max(...precomputed.map(Math.abs)); 
    
    document.getElementById("inputDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(config.width, config.height, config.width, config.height, config.radius, config.bezelWidth, config.maxDisp || 1, precomputed))); 
    document.getElementById("inputSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(config.width, config.height, config.radius, config.bezelWidth))); 
    
    if (!useBackdropFilter) { 
        cloneWorld.innerHTML = document.getElementById('inputRealWorld').outerHTML; 
        document.getElementById('inputClone').style.filter = "url(#inputGlassFilter)"; 
    } 
    
    function loop() { 
        const dt = Math.min(0.032, 1 / 60); 
        springs.scale.setTarget(isFocused ? 1.05 : 1.0); 
        springs.scaleX.setTarget(1.0); 
        springs.scaleY.setTarget(1.0); 
        
        const s = springs.scale.update(dt), sx = springs.scaleX.update(dt), sy = springs.scaleY.update(dt); 
        wrapper.style.transform = `scale(${s * sx}, ${s * sy})`; 
        document.getElementById("inputDisplacementMap").setAttribute("scale", config.maxDisp * (s * sx)); 
        
        if (!useBackdropFilter) { 
            const areaRect = document.getElementById('inputDemoArea').getBoundingClientRect(); 
            cloneWorld.style.width = areaRect.width + "px"; 
            cloneWorld.style.height = areaRect.height + "px"; 
            const offsetLeft = (areaRect.width - config.width) / 2; 
            const offsetTop = (areaRect.height - config.height) / 2; 
            cloneWorld.style.transform = `scale(${1 / (s * sx)}, ${1 / (s * sy)}) translate(${-offsetLeft}px, ${-offsetTop}px)`; 
        } 
        if (!Object.values(springs).every(sp => sp.isSettled())) animationFrameId = requestAnimationFrame(loop); 
        else animationFrameId = null; 
    } 
    
    field.addEventListener('focus', () => { 
        isFocused = true; 
        wrapper.classList.add('focused'); 
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); 
    }); 
    
    field.addEventListener('blur', () => { 
        isFocused = false; 
        wrapper.classList.remove('focused'); 
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); 
    }); 
    
    field.addEventListener('input', () => { 
        springs.scaleX.velocity += 1.5; 
        springs.scaleY.velocity -= 1.0; 
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); 
    }); 
    
    animationFrameId = requestAnimationFrame(loop); 
}

function initVolDemo() { 
    const config = { width: 80, height: 320, radius: 40, bezelWidth: 20, glassThickness: 100, refractiveIndex: 1.6, maxDisp: 0 }; 
    const state = { value: 30, isDragging: false }; 
    const springs = { fill: new Spring(30, 300, 25), squishY: new Spring(1.0, 400, 20), squishX: new Spring(1.0, 400, 20) }; 
    
    const container = document.getElementById('volContainer'), glass = document.getElementById('volGlass'), fill = document.getElementById('volFill'), cloneWorld = document.getElementById('volCloneWorld'); 
    let animationFrameId = null; 
    
    const precomputed = calculateDisplacementMap1D(config.glassThickness, config.bezelWidth, SurfaceEquations.convex_squircle, config.refractiveIndex); 
    config.maxDisp = Math.max(...precomputed.map(Math.abs)); 
    
    document.getElementById("volDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(config.width, config.height, config.width, config.height, config.radius, config.bezelWidth, config.maxDisp || 1, precomputed))); 
    document.getElementById("volSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(config.width, config.height, config.radius, config.bezelWidth))); 
    
    if (!useBackdropFilter) { 
        cloneWorld.innerHTML = document.getElementById('volRealWorld').outerHTML; 
        document.getElementById('volClone').style.filter = "url(#volGlassFilter)"; 
    } 
    
    function loop() { 
        const dt = Math.min(0.032, 1 / 60); 
        let overpull = 0; 
        
        if (state.value > 100) overpull = state.value - 100; 
        else if (state.value < 0) overpull = state.value; 
        
        springs.squishY.setTarget(Math.max(0.65, Math.min(1.35, 1.0 + (overpull * 0.006)))); 
        springs.squishX.setTarget(Math.max(0.75, Math.min(1.25, 1.0 - (overpull * 0.003)))); 
        
        let visualVal = Math.max(0, Math.min(100, state.value)); 
        springs.fill.setTarget(visualVal); 
        
        const f = springs.fill.update(dt), sy = springs.squishY.update(dt), sx = springs.squishX.update(dt); 
        fill.style.height = `${f}%`; 
        glass.style.transform = `scale(${sx}, ${sy})`; 
        document.getElementById("volDisplacementMap").setAttribute("scale", config.maxDisp * sx); 
        
        if (!useBackdropFilter) { 
            const areaRect = document.getElementById('volDemoArea').getBoundingClientRect(); 
            cloneWorld.style.width = areaRect.width + "px"; 
            cloneWorld.style.height = areaRect.height + "px"; 
            const offsetLeft = (areaRect.width - config.width) / 2; 
            const offsetTop = (areaRect.height - config.height) / 2; 
            cloneWorld.style.transform = `scale(${1 / sx}, ${1 / sy}) translate(${-offsetLeft}px, ${-offsetTop - config.height}px)`; 
        } 
        
        if (!Object.values(springs).every(sp => sp.isSettled())) animationFrameId = requestAnimationFrame(loop); 
        else animationFrameId = null; 
    } 
    
    function updateValueFromEvent(e) { 
        const rect = container.getBoundingClientRect(); 
        const clientY = e.touches ? e.touches[0].clientY : e.clientY; 
        const percentage = 100 - ((clientY - rect.top) / rect.height) * 100; 
        
        if (state.isDragging) { 
            if (percentage > 100) state.value = 100 + (percentage - 100) * 0.35;
            else if (percentage < 0) state.value = percentage * 0.35;
            else state.value = percentage;
        } else { 
            state.value = Math.max(0, Math.min(100, percentage)); 
        } 
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); 
    } 
    
    container.addEventListener('pointerdown', (e) => { 
        state.isDragging = true; 
        container.setPointerCapture(e.pointerId); 
        updateValueFromEvent(e); 
    }); 
    container.addEventListener('pointermove', (e) => { 
        if (state.isDragging) updateValueFromEvent(e); 
    }); 
    container.addEventListener('pointerup', () => { 
        state.isDragging = false; 
        state.value = Math.max(0, Math.min(100, state.value)); 
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); 
    }); 
    
    animationFrameId = requestAnimationFrame(loop); 
}

function initFabDemo() {
    const btnConfig = { size: 70, radius: 35, bezelWidth: 20, glassThickness: 100, refractiveIndex: 1.8, maxDisp: 0 };
    const menuConfig = { width: 70, height: 160, radius: 35, bezelWidth: 20, glassThickness: 100, refractiveIndex: 1.8, maxDisp: 0 };
    
    const state = { isOpen: false, baseMenuX: 0, baseMenuY: 0, baseBtnX: 0, baseBtnY: 0 };
    
    const springs = { 
        menuScale: new Spring(0.4, 400, 25), 
        menuY: new Spring(60, 400, 25), 
        menuOpacity: new Spring(0, 300, 20),
        btnScale: new Spring(1.0, 500, 20)
    };
    
    const wrapper = document.getElementById('fabWrapper'), demoArea = document.getElementById('fabDemoArea');
    const btnGlass = document.getElementById('fabBtnGlass'), menuGlass = document.getElementById('fabMenuGlass');
    const btnCloneWorld = document.getElementById('fabBtnCloneWorld'), menuCloneWorld = document.getElementById('fabMenuCloneWorld');
    let animationFrameId = null;

    const preBtn = calculateDisplacementMap1D(btnConfig.glassThickness, btnConfig.bezelWidth, SurfaceEquations.convex_squircle, btnConfig.refractiveIndex);
    btnConfig.maxDisp = Math.max(...preBtn.map(Math.abs));
    document.getElementById("fabBtnDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(btnConfig.size, btnConfig.size, btnConfig.size, btnConfig.size, btnConfig.radius, btnConfig.bezelWidth, btnConfig.maxDisp || 1, preBtn)));
    document.getElementById("fabBtnSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(btnConfig.size, btnConfig.size, btnConfig.radius, btnConfig.bezelWidth)));

    const preMenu = calculateDisplacementMap1D(menuConfig.glassThickness, menuConfig.bezelWidth, SurfaceEquations.convex_squircle, menuConfig.refractiveIndex);
    menuConfig.maxDisp = Math.max(...preMenu.map(Math.abs));
    document.getElementById("fabMenuDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(menuConfig.width, menuConfig.height, menuConfig.width, menuConfig.height, menuConfig.radius, menuConfig.bezelWidth, menuConfig.maxDisp || 1, preMenu)));
    document.getElementById("fabMenuSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(menuConfig.width, menuConfig.height, menuConfig.radius, menuConfig.bezelWidth)));

    if (!useBackdropFilter) {
        const realHTML = document.getElementById('fabRealWorld').outerHTML;
        btnCloneWorld.innerHTML = realHTML; 
        menuCloneWorld.innerHTML = realHTML;
        document.getElementById('fabBtnClone').style.filter = "url(#fabBtnGlassFilter)";
        document.getElementById('fabMenuClone').style.filter = "url(#fabMenuGlassFilter)";
    }

    function updateClonePositions() {
        if (useBackdropFilter) return;
        const areaRect = demoArea.getBoundingClientRect();
        
        const origMenuTrans = menuGlass.style.transform; 
        const origBtnTrans = btnGlass.style.transform;
        
        menuGlass.style.transform = 'none'; 
        btnGlass.style.transform = 'none';
        
        const menuRect = menuGlass.getBoundingClientRect(); 
        const btnRect = btnGlass.getBoundingClientRect();
        
        menuGlass.style.transform = origMenuTrans; 
        btnGlass.style.transform = origBtnTrans;

        state.baseMenuX = menuRect.left - areaRect.left; 
        state.baseMenuY = menuRect.top - areaRect.top;
        state.baseBtnX = btnRect.left - areaRect.left; 
        state.baseBtnY = btnRect.top - areaRect.top;

        btnCloneWorld.style.width = areaRect.width + "px"; 
        btnCloneWorld.style.height = areaRect.height + "px";
        menuCloneWorld.style.width = areaRect.width + "px"; 
        menuCloneWorld.style.height = areaRect.height + "px";
    }

    function loop() {
        const dt = Math.min(0.032, 1 / 60);

        if (state.isOpen) { 
            springs.menuScale.setTarget(1.0); 
            springs.menuY.setTarget(0); 
            springs.menuOpacity.setTarget(1); 
        } else { 
            springs.menuScale.setTarget(0.4); 
            springs.menuY.setTarget(60); 
            springs.menuOpacity.setTarget(0); 
        }

        springs.btnScale.setTarget(1.0);

        const ms = springs.menuScale.update(dt), my = springs.menuY.update(dt), mo = springs.menuOpacity.update(dt), bs = springs.btnScale.update(dt);

        menuGlass.style.transform = `translateY(${my}px) scale(${ms})`;
        menuGlass.style.opacity = Math.max(0, mo); 
        btnGlass.style.transform = `scale(${bs})`;

        document.getElementById("fabBtnDisplacementMap").setAttribute("scale", btnConfig.maxDisp * bs);
        document.getElementById("fabMenuDisplacementMap").setAttribute("scale", menuConfig.maxDisp * ms);

        if (!useBackdropFilter) {
            btnCloneWorld.style.transform = `scale(${1 / bs}) translate(${-state.baseBtnX}px, ${-state.baseBtnY}px)`;
            menuCloneWorld.style.transform = `scale(${1 / ms}) translate(${-state.baseMenuX}px, ${-(state.baseMenuY + my)}px)`;
        }

        if (!Object.values(springs).every(sp => sp.isSettled())) animationFrameId = requestAnimationFrame(loop);
        else animationFrameId = null;
    }

    btnGlass.addEventListener('click', () => {
        state.isOpen = !state.isOpen;
        wrapper.classList.toggle('open', state.isOpen);
        springs.btnScale.velocity -= 3.0;
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop);
    });

    window.addEventListener('resize', () => { 
        updateClonePositions(); 
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); 
    });
    
    setTimeout(() => { 
        updateClonePositions(); 
        animationFrameId = requestAnimationFrame(loop); 
    }, 100);
}

function initStepperDemo() { 
    const config = { width: 180, height: 70, radius: 35, bezelWidth: 20, glassThickness: 80, refractiveIndex: 1.6, maxDisp: 0 }; 
    const state = { val: 1 }; 
    const springs = { x: new Spring(0, 400, 20), scaleX: new Spring(1, 400, 25), scaleY: new Spring(1, 400, 25) }; 
    
    const wrapper = document.getElementById('stepperWrapper'), glass = document.getElementById('stepperGlass'), valEl = document.getElementById('stepVal'), cloneWorld = document.getElementById('stepperCloneWorld'), demoArea = document.getElementById('stepperDemoArea'); 
    let animationFrameId = null; 
    
    const precomputed = calculateDisplacementMap1D(config.glassThickness, config.bezelWidth, SurfaceEquations.convex_squircle, config.refractiveIndex); 
    config.maxDisp = Math.max(...precomputed.map(Math.abs)); 
    
    document.getElementById("stepperDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(config.width, config.height, config.width, config.height, config.radius, config.bezelWidth, config.maxDisp || 1, precomputed))); 
    document.getElementById("stepperSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(config.width, config.height, config.radius, config.bezelWidth))); 
    
    if (!useBackdropFilter) { 
        cloneWorld.innerHTML = document.getElementById('stepperRealWorld').outerHTML; 
        document.getElementById('stepperClone').style.filter = "url(#stepperGlassFilter)"; 
    } 
    
    function loop() { 
        const dt = Math.min(0.032, 1 / 60); 
        springs.x.setTarget(0); 
        springs.scaleX.setTarget(1); 
        springs.scaleY.setTarget(1); 
        
        const cx = springs.x.update(dt), sx = springs.scaleX.update(dt), sy = springs.scaleY.update(dt); 
        glass.style.transform = `translateX(${cx}px) scale(${sx}, ${sy})`; 
        document.getElementById("stepperDisplacementMap").setAttribute("scale", config.maxDisp * sx); 
        
        if (!useBackdropFilter) { 
            const areaRect = demoArea.getBoundingClientRect(); 
            cloneWorld.style.width = areaRect.width + "px"; 
            cloneWorld.style.height = areaRect.height + "px"; 
            const offsetLeft = (areaRect.width - config.width) / 2 + cx; 
            const offsetTop = (areaRect.height - config.height) / 2; 
            cloneWorld.style.transform = `scale(${1 / sx}, ${1 / sy}) translate(${-offsetLeft}px, ${-offsetTop}px)`; 
        } 
        if (!Object.values(springs).every(sp => sp.isSettled())) animationFrameId = requestAnimationFrame(loop); 
        else animationFrameId = null; 
    } 
    
    document.getElementById('stepMinus').addEventListener('mousedown', (e) => { 
        e.preventDefault(); 
        state.val = Math.max(0, state.val - 1); 
        valEl.innerText = state.val; 
        springs.x.velocity += 60; 
        springs.scaleX.velocity += 1.5; 
        springs.scaleY.velocity -= 1.0; 
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); 
    }); 
    
    document.getElementById('stepPlus').addEventListener('mousedown', (e) => { 
        e.preventDefault(); 
        state.val++; 
        valEl.innerText = state.val; 
        springs.x.velocity -= 60; 
        springs.scaleX.velocity += 1.5; 
        springs.scaleY.velocity -= 1.0; 
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); 
    }); 
    
    animationFrameId = requestAnimationFrame(loop); 
}

function initCheckboxDemo() {
    const config = { width: 64, height: 64, radius: 24, bezelWidth: 16, glassThickness: 60, refractiveIndex: 1.6, maxDisp: 0 };
    const state = { isChecked: true, isPressed: false };
    const springs = { scale: new Spring(1.0, 400, 20), checkScale: new Spring(1.0, 500, 25) };
    
    const wrapper = document.getElementById('checkboxWrapper'), glass = document.getElementById('checkboxGlass'), mark = document.getElementById('checkboxMark'), cloneWorld = document.getElementById('checkboxCloneWorld'), demoArea = document.getElementById('checkboxDemoArea');
    let animationFrameId = null;

    const precomputed = calculateDisplacementMap1D(config.glassThickness, config.bezelWidth, SurfaceEquations.convex_squircle, config.refractiveIndex);
    config.maxDisp = Math.max(...precomputed.map(Math.abs));

    document.getElementById("checkboxDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(config.width, config.height, config.width, config.height, config.radius, config.bezelWidth, config.maxDisp || 1, precomputed)));
    document.getElementById("checkboxSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(config.width, config.height, config.radius, config.bezelWidth)));

    if (!useBackdropFilter) {
        cloneWorld.innerHTML = document.getElementById('checkboxRealWorld').outerHTML;
        document.getElementById('checkboxClone').style.filter = "url(#checkboxGlassFilter)";
    }

    function loop() {
        const dt = Math.min(0.032, 1 / 60);
        springs.scale.setTarget(state.isPressed ? 0.8 : 1.0);
        springs.checkScale.setTarget(state.isChecked ? 1.0 : 0.0);

        const sc = springs.scale.update(dt), cSc = springs.checkScale.update(dt);

        glass.style.transform = `scale(${sc})`;
        mark.style.transform = `scale(${cSc})`;
        mark.style.opacity = Math.max(0, cSc);
        document.getElementById("checkboxDisplacementMap").setAttribute("scale", config.maxDisp * sc);

        if (!useBackdropFilter) {
            const areaRect = demoArea.getBoundingClientRect();
            cloneWorld.style.width = areaRect.width + "px";
            cloneWorld.style.height = areaRect.height + "px";
            const offsetLeft = (areaRect.width - config.width) / 2;
            const offsetTop = (areaRect.height - config.height) / 2;
            cloneWorld.style.transform = `scale(${1 / sc}) translate(${-offsetLeft}px, ${-offsetTop}px)`;
        }

        if (!Object.values(springs).every(sp => sp.isSettled())) animationFrameId = requestAnimationFrame(loop);
        else animationFrameId = null;
    }

    wrapper.addEventListener('mousedown', () => { state.isPressed = true; if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); });
    wrapper.addEventListener('touchstart', (e) => { e.preventDefault(); state.isPressed = true; if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); });
    
    const handleRelease = () => {
        if (state.isPressed) {
            state.isPressed = false;
            state.isChecked = !state.isChecked;
            if (!animationFrameId) animationFrameId = requestAnimationFrame(loop);
        }
    };

    wrapper.addEventListener('mouseup', handleRelease);
    wrapper.addEventListener('touchend', handleRelease);
    wrapper.addEventListener('mouseleave', () => { state.isPressed = false; if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); });

    animationFrameId = requestAnimationFrame(loop);
}

function initProgressDemo() {
    const config = { width: 300, height: 36, radius: 18, bezelWidth: 12, glassThickness: 50, refractiveIndex: 1.5, maxDisp: 0 };
    const state = { progress: 40 };
    const springs = { progress: new Spring(40, 200, 25), scaleY: new Spring(1.0, 400, 20) };
    
    const wrapper = document.getElementById('progressDemoArea'), glass = document.getElementById('progressGlass'), fill = document.getElementById('progressFill'), cloneWorld = document.getElementById('progressCloneWorld');
    let animationFrameId = null;

    const precomputed = calculateDisplacementMap1D(config.glassThickness, config.bezelWidth, SurfaceEquations.convex_squircle, config.refractiveIndex);
    config.maxDisp = Math.max(...precomputed.map(Math.abs));

    document.getElementById("progressDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(config.width, config.height, config.width, config.height, config.radius, config.bezelWidth, config.maxDisp || 1, precomputed)));
    document.getElementById("progressSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(config.width, config.height, config.radius, config.bezelWidth)));

    if (!useBackdropFilter) {
        cloneWorld.innerHTML = document.getElementById('progressRealWorld').outerHTML;
        document.getElementById('progressClone').style.filter = "url(#progressGlassFilter)";
    }

    function loop() {
        const dt = Math.min(0.032, 1 / 60);
        springs.progress.setTarget(state.progress);
        springs.scaleY.setTarget(1.0);

        const prog = springs.progress.update(dt);
        const sy = springs.scaleY.update(dt);

        fill.style.width = `${Math.max(0, Math.min(100, prog))}%`;
        glass.style.transform = `scaleY(${sy})`;
        document.getElementById("progressDisplacementMap").setAttribute("scale", config.maxDisp * sy);

        if (!useBackdropFilter) {
            const areaRect = wrapper.getBoundingClientRect();
            cloneWorld.style.width = areaRect.width + "px";
            cloneWorld.style.height = areaRect.height + "px";
            const offsetLeft = (areaRect.width - config.width) / 2;
            const offsetTop = (areaRect.height - config.height) / 2;
            cloneWorld.style.transform = `scaleY(${1 / sy}) translate(${-offsetLeft}px, ${-offsetTop}px)`;
        }

        if (!Object.values(springs).every(sp => sp.isSettled())) animationFrameId = requestAnimationFrame(loop);
        else animationFrameId = null;
    }

    wrapper.addEventListener('click', () => {
        state.progress = Math.floor(Math.random() * 100);
        springs.scaleY.velocity += 1.5; 
        if (!animationFrameId) animationFrameId = requestAnimationFrame(loop);
    });

    animationFrameId = requestAnimationFrame(loop);
}

function initTooltipDemo() {
    const config = { width: 140, height: 46, radius: 23, bezelWidth: 15, glassThickness: 60, refractiveIndex: 1.6, maxDisp: 0 };
    const state = { isHovered: false };
    const springs = { scale: new Spring(0.5, 400, 25), y: new Spring(20, 400, 25) };
    
    const trigger = document.getElementById('tooltipTrigger'), glass = document.getElementById('tooltipGlass'), cloneWorld = document.getElementById('tooltipCloneWorld'), demoArea = document.getElementById('tooltipDemoArea');
    let animationFrameId = null;

    const precomputed = calculateDisplacementMap1D(config.glassThickness, config.bezelWidth, SurfaceEquations.convex_squircle, config.refractiveIndex);
    config.maxDisp = Math.max(...precomputed.map(Math.abs));

    document.getElementById("tooltipDisplacementImage").setAttribute("href", imageDataToDataURL(calculateDisplacementMap2D(config.width, config.height, config.width, config.height, config.radius, config.bezelWidth, config.maxDisp || 1, precomputed)));
    document.getElementById("tooltipSpecularImage").setAttribute("href", imageDataToDataURL(calculateSpecularHighlight(config.width, config.height, config.radius, config.bezelWidth)));

    if (!useBackdropFilter) {
        cloneWorld.innerHTML = document.getElementById('tooltipRealWorld').outerHTML;
        document.getElementById('tooltipClone').style.filter = "url(#tooltipGlassFilter)";
    }

    function loop() {
        const dt = Math.min(0.032, 1 / 60);
        springs.scale.setTarget(state.isHovered ? 1.0 : 0.5);
        springs.y.setTarget(state.isHovered ? 0 : 20);

        const sc = springs.scale.update(dt), yPos = springs.y.update(dt);
        
        glass.style.transform = `translateY(${yPos}px) scale(${sc})`;
        glass.style.opacity = Math.max(0, (sc - 0.5) * 2);
        document.getElementById("tooltipDisplacementMap").setAttribute("scale", config.maxDisp * sc);

        if (!useBackdropFilter) {
            const areaRect = demoArea.getBoundingClientRect();
            const glassRect = glass.getBoundingClientRect();
            cloneWorld.style.width = areaRect.width + "px";
            cloneWorld.style.height = areaRect.height + "px";
            
            const origTrans = glass.style.transform;
            glass.style.transform = 'none';
            const baseRect = glass.getBoundingClientRect();
            glass.style.transform = origTrans;

            const offsetLeft = baseRect.left - areaRect.left;
            const offsetTop = baseRect.top - areaRect.top;

            cloneWorld.style.transform = `scale(${1 / sc}) translate(${-offsetLeft}px, ${-offsetTop - yPos}px)`;
        }

        if (!Object.values(springs).every(sp => sp.isSettled())) animationFrameId = requestAnimationFrame(loop);
        else animationFrameId = null;
    }

    trigger.addEventListener('mouseenter', () => { state.isHovered = true; if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); });
    trigger.addEventListener('mouseleave', () => { state.isHovered = false; if (!animationFrameId) animationFrameId = requestAnimationFrame(loop); });

    animationFrameId = requestAnimationFrame(loop);
}

document.addEventListener('DOMContentLoaded', () => {
    detectFeatures();
    initLensDemo();
    initSliderDemo();
    initSwitchDemo();
    initDockDemo();
    initCursorDemo();
    initButtonDemo();
    initTabsDemo();
    initDialDemo();
    initInputDemo();
    initVolDemo();
    initFabDemo();
    initStepperDemo();
    
    // Newly added components
    initCheckboxDemo();
    initProgressDemo();
    initTooltipDemo();
});
