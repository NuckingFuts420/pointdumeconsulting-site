// Visitor identification (RB2B) with a US-style opt-out notice. KEY is a public site ID.
(function () {
  var KEY = "R6G5YH54VD65";

  function get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function set(k) { try { window.localStorage.setItem(k, "1"); } catch (e) {} }

  if (get("pd_optout") !== "1" && !window.reb2b) {
    window.reb2b = { loaded: true };
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + KEY + "/" + KEY + ".js.gz";
    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(s, first);
  }

  if (get("pd_notice") === "1" || get("pd_optout") === "1") return;

  function show() {
    var bar = document.createElement("div");
    bar.id = "pd-notice";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Cookie notice");
    bar.innerHTML =
      '<span>This site uses cookies to see which companies visit. <a href="/privacy/">Privacy</a></span>' +
      '<button type="button" data-a="out">Opt out</button>' +
      '<button type="button" data-a="ok" class="ok">OK</button>';
    bar.addEventListener("click", function (e) {
      var a = e.target.getAttribute("data-a");
      if (!a) return;
      set("pd_notice");
      if (a === "out") { set("pd_optout"); window.location.reload(); } else { bar.remove(); }
    });
    document.body.appendChild(bar);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", show);
  else show();
})();
