(function () {
  var L = document.getElementById("loader"), D = document.documentElement; if (!L) return;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, t0 = performance.now(), p = 0, b = 0, out = false;
  var ok = { dom: document.readyState !== "loading", load: document.readyState === "complete", fonts: false };
  D.classList.add("intro");
  function lock(on) { [].forEach.call(document.body.children, function (e) { if (e !== L && e.tagName !== "SCRIPT" && e.tagName !== "NOSCRIPT") on ? e.setAttribute("inert", "") : e.removeAttribute("inert"); }); }
  function fonts() { var d = function () { ok.fonts = true; }; (document.fonts ? document.fonts.ready : Promise.resolve()).then(d, d); setTimeout(d, 2500); }
  document.addEventListener("DOMContentLoaded", function () { ok.dom = true; if (!out) lock(true); });
  addEventListener("load", function () { ok.load = true; fonts(); });
  if (ok.load) fonts();
  function exit() {
    if (out) return; out = true; lock(false); D.classList.remove("intro");
    L.classList.add(reduce ? "fade" : "out"); dispatchEvent(new Event("intro:exit"));
    setTimeout(function () { L.remove(); dispatchEvent(new Event("intro:done")); }, reduce ? 350 : 950);
  }
  function tick(now) {
    if (out) return; var t = (now - t0) / (reduce ? 250 : 900), cap = 100 * (1 - Math.pow(1 - Math.min(1, t), 3));
    var target = ((ok.dom ? 1 : 0) + (ok.load ? 1 : 0) + (ok.fonts ? 1 : 0)) / 3 * 100;
    p = Math.max(p, Math.min(target, cap)); var bt = p >= 100 ? 100 : Math.max(0, p - 12); b += (bt - b) * (reduce ? 1 : 0.22);
    L.style.setProperty("--f", p + "%"); L.style.setProperty("--b", b + "%"); L.style.setProperty("--p", p / 100);
    document.getElementById("lpct").textContent = Math.round(p) + " %";
    if (p >= 100 && b > 99.5) exit(); else requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick); setTimeout(exit, 5000);
})();
