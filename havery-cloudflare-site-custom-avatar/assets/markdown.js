/*
 * 輕量 Markdown 解析器（ES3），適合 IE6 / Firefox 8 / Opera 9。
 * 支援：# 標題、段落、粗體、斜體、行內程式碼、連結、圖片、
 * 無序/有序列表、引用、水平線、三反引號程式碼區塊。
 * 為了舊瀏覽器相容性，未使用 Promise、fetch、DOMParser 等 API。
 */
var LegacyMarkdown = {
  esc: function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  },
  inline: function (s) {
    var t = this.esc(s);
    t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
    t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    t = t.replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, '<img src="$2" alt="$1">');
    t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
    t = t.replace(/\[([^\]]+)\]\(([^:\s)]+)\)/g, '<a href="$2">$1</a>');
    return t;
  },
  toHTML: function (source) {
    var lines = String(source).replace(/\r/g, "").split("\n");
    var out = [], i = 0, line, inCode = false, code = [], listType = "", para = [];
    function flushPara() {
      if (para.length) { out.push("<p>" + LegacyMarkdown.inline(para.join(" ")) + "</p>"); para = []; }
    }
    function closeList() {
      if (listType) { out.push("</" + listType + ">"); listType = ""; }
    }
    while (i < lines.length) {
      line = lines[i];
      if (/^```/.test(line)) {
        flushPara(); closeList();
        if (!inCode) { inCode = true; code = []; }
        else { out.push("<pre><code>" + LegacyMarkdown.esc(code.join("\n")) + "</code></pre>"); inCode = false; }
        i++; continue;
      }
      if (inCode) { code.push(line); i++; continue; }
      if (/^\s*$/.test(line)) { flushPara(); closeList(); i++; continue; }
      if (/^(#{1,6})\s+/.test(line)) {
        flushPara(); closeList();
        var hashes = line.match(/^(#{1,6})/)[1].length;
        out.push("<h" + hashes + ">" + this.inline(line.substring(hashes + 1)) + "</h" + hashes + ">");
        i++; continue;
      }
      if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
        flushPara();
        var typ = /^\s*\d+\./.test(line) ? "ol" : "ul";
        if (listType != typ) { closeList(); out.push("<" + typ + ">"); listType = typ; }
        line = line.replace(/^\s*(?:[-*]|\d+\.)\s+/, "");
        out.push("<li>" + this.inline(line) + "</li>");
        i++; continue;
      }
      if (/^\s*&gt;\s?/.test(this.esc(line))) {
        flushPara(); closeList();
        out.push("<blockquote><p>" + this.inline(line.replace(/^\s*>\s?/, "")) + "</p></blockquote>");
        i++; continue;
      }
      if (/^\s*([-*_])\1\1+\s*$/.test(line)) { flushPara(); closeList(); out.push("<hr>"); i++; continue; }
      para.push(line); i++;
    }
    flushPara(); closeList();
    if (inCode) out.push("<pre><code>" + this.esc(code.join("\n")) + "</code></pre>");
    return out.join("\n");
  }
};
