/*
 * 網站內容設定：修改本檔即可更改網站名稱、首頁文字、個人介紹與社交連結。
 * 請使用普通文字；字串中的雙引號請寫成 \"。
 */
var SITE_CONFIG = {
  title: "havery homepage",
  heroTitle: "Havery Homepage",
  heroSubtitle: "Welcome to my homepage!",
  owner: "havery",
  avatarImage: "assets/avatar.jpg",
  year: "2026",
  description: "Welcome to a corner of the Internet's pile of information.",
  bio: " ",
  social: [
    { name: "Email", url: "mailto:havery_123@hotmail.com" },
    { name: "GitHub", url: "https://github.com/wmh723" },
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61561132361108" },
    { name: "Youtube", url: "https://www.youtube.com/channel/UCf48ILFtmUFC4zIZfnJ0Rew" },
    { name: "Twitter", url: "https://www.x.com/havery2000" },
    { name: "Instagram", url: "https://www.instagram.com/havery2000/" },
    { name: "Bluesky", url: "https://bsky.app/profile/havery2000.bsky.social" }
  ]
};

/*
 * 新增文章時，在這裡複製一筆並修改：
 * id 必須與 posts/ 內的檔名一致（不含 .md）。
 * date 使用 YYYY-MM-DD。
 */
var POSTS = [
    { id: "welcome", title: "歡迎來到我的網站", date: "2026-11-05", tags: " ", summary: "歡迎" },
  { id: "markdown-test", title: "測試", date: "2026-11-05", tags: "TEST", summary: "Markdown測試" }
];
