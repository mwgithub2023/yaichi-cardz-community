export const siteConfig = {
  siteUrl: "https://yaichi-cardz-community.pages.dev/",
  brandName: "YAICHI x CARDZ.Game",
  brandParts: {
    yaichi: "YAICHI",
    connector: "x",
    cardz: "CARDZ.Game",
  },
  headline: "PTCG 新手必入社區",
  subheadline:
    "WhatsApp 4 號群開放中。入群即可問卡價、PSA、開包、收藏，了解 CARDZ.Game 的區塊鏈上鏈紀錄，並使用群內 TCG AI 通用百科全書。",
  whatsappUrl: "https://chat.whatsapp.com/F9Uk8iyGFq88LuTJcBqvqS?s=cl&p=i&ilr=0",
  telegramUrl: "https://t.me/TCG_asia",
  group: {
    currentNumber: 4,
    filledGroups: 3,
    approxMembersPerGroup: 2000,
  },
  offer: {
    label: "新會員限定",
    text: "加入即接收專屬迎新禮包、開包活動與限定優惠通知。",
  },
  aiFeature: {
    title: "AI 通用百科全書",
    body: "專門解決 TCG 問題：大至查價，小至卡片歷史，甚至未來價格走勢，都可以即時問。",
    points: ["即時查價", "卡片歷史", "走勢預測"],
  },
  technologyFeature: {
    eyebrow: "CARDZ.Game Trust Layer",
    title: "區塊鏈上鏈紀錄",
    body: "把開包關鍵結果寫入區塊鏈紀錄，讓結果可追溯、不可篡改，減少黑箱操作空間，建立更公平公正的 TCG 開包體驗。",
    points: ["區塊鏈上鏈", "去中心化紀錄", "不可篡改", "公平公正"],
    note: "CARDZ.Game 的重點是把信任直接做進流程：用鏈上紀錄保存關鍵結果，讓玩家不只聽平台承諾，而是可以相信紀錄本身。",
  },
} as const;

export function getApproxMemberCount() {
  return siteConfig.group.filledGroups * siteConfig.group.approxMembersPerGroup;
}
