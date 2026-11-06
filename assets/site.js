/* ES3 JavaScript：避免 let/const、箭頭函式、JSON、querySelector 等新語法/API。 */
var LegacySite = {
  byId: function (id) { return document.getElementById(id); },
  setText: function (id, value) {
    var el = this.byId(id);
    if (el) {
      if (typeof el.textContent != "undefined") el.textContent = value;
      else el.innerText = value;
    }
  },
  escapeHTML: function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  },
  getParam: function (name) {
    var q = window.location.search.substring(1).split("&"), i, pair;
    for (i = 0; i < q.length; i++) {
      pair = q[i].split("=");
      if (decodeURIComponent(pair[0]) == name) return decodeURIComponent(pair[1] || "");
    }
    return "";
  },
  request: function (url, callback) {
    var xhr = null;
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
    else if (window.ActiveXObject) {
      try { xhr = new ActiveXObject("Microsoft.XMLHTTP"); }
      catch (e) { try { xhr = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e2) {} }
    }
    if (!xhr) { callback(false, "此瀏覽器無法建立 HTTP 請求。"); return; }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 0) callback(true, xhr.responseText);
        else callback(false, "讀取失敗（HTTP " + xhr.status + "）。");
      }
    };
    xhr.open("GET", url, true);
    xhr.send(null);
  },
  addSocial: function (targetId) {
    var target = this.byId(targetId), i, html = "";
    if (!target) return;
    for (i = 0; i < SITE_CONFIG.social.length; i++) {
      html += '<a href="' + this.escapeHTML(SITE_CONFIG.social[i].url) + '">' + this.escapeHTML(SITE_CONFIG.social[i].name) + '</a> &nbsp; ';
    }
    target.innerHTML = html;
  },
  init: function (page) {
    this.setText("site-title", SITE_CONFIG.title);
    this.setText("hero-title", SITE_CONFIG.heroTitle);
    this.setText("hero-subtitle", SITE_CONFIG.heroSubtitle);
    this.setText("about-name", SITE_CONFIG.owner);
    var avatar = this.byId("avatar-image");
    if (avatar && SITE_CONFIG.avatarImage) {
      avatar.src = SITE_CONFIG.avatarImage;
      avatar.alt = SITE_CONFIG.owner;
    }
    this.setText("about-description", SITE_CONFIG.description);
    this.setText("about-bio", SITE_CONFIG.bio);
    this.setText("copyright", SITE_CONFIG.owner + " · © " + SITE_CONFIG.year + " · " + SITE_CONFIG.title);
    this.addSocial("social-links");
    this.addSocial("about-social");
    if (page == "blog") this.renderList();
    if (page == "post") this.renderPost();
  },
  renderList: function () {
    var el = this.byId("post-list"), i, p, html = "";
    if (!el) return;
    for (i = 0; i < POSTS.length; i++) {
      p = POSTS[i];
      html += '<div class="post-row"><div class="post-date">' + this.escapeHTML(p.date) + '</div>';
      html += '<h2><a href="post.html?id=' + encodeURIComponent(p.id) + '">' + this.escapeHTML(p.title) + '</a></h2>';
      html += '<p>' + this.escapeHTML(p.summary || "") + '</p>';
      html += '<div class="tags">' + this.escapeHTML(p.tags || "") + '</div></div>';
    }
    if (!html) html = "<p>目前還沒有文章。</p>";
    el.innerHTML = html;
  },
  renderPost: function () {
    var id = this.getParam("id"), i, post = null, self = this, el = this.byId("article-content");
    for (i = 0; i < POSTS.length; i++) if (POSTS[i].id == id) post = POSTS[i];
    if (!post) { el.innerHTML = "<h1>找不到文章</h1><p>請返回博客列表。</p>"; return; }
    document.title = post.title + " | " + SITE_CONFIG.title;
    /* 正文只從 posts/ 目錄的 Markdown 檔案讀取，不需要在 JavaScript 中重複保存。 */
    this.request("posts/" + post.id + ".md", function (ok, data) {
      if (ok) el.innerHTML = '<div class="post-date">' + self.escapeHTML(post.date) + '</div><h1>' + self.escapeHTML(post.title) + '</h1><div class="tags">' + self.escapeHTML(post.tags || "") + '</div><div class="markdown">' + LegacyMarkdown.toHTML(data) + '</div>';
      else el.innerHTML = "<h1>文章載入失敗</h1><p>" + self.escapeHTML(data) + "</p><p>請確認 posts/" + self.escapeHTML(post.id) + ".md 存在，並透過 HTTP/HTTPS 網站網址開啟。</p>";
    });
  }
};
