const { test, expect } = require("@playwright/test");
require("dotenv").config();

// test.describe.parallel("API Testing", () => {
//   test("Initialize new SPOT account", async ({ request }) => {
//     const headers = {
//       uid: process.env.UID,
//     };

//     const response = await request.post(
//       `${process.env.API_BASE_URL}hotel/init`,
//       {
//         data: {
//           username: "daitrinh",
//           password: "12345678@",
//           email: "dai.trinhduc@tabilife.co.jp",
//           template_hotel_id: "UwwC2NRzhwYycbNsndCi",
//           hotel_name: "スプリント27",
//           hotel_icon_url:
//             "https://firebasestorage.googleapis.com/v0/b/test-38739.appspot.com/o/Hotel%20Logo%2Fkyoto.png?alt=media&token=53bc2db8-e037-47c5-8828-70633baa337e",
//           access_right: {
//             chatbot: true,
//             chatroom: {
//               cms_translation: "",
//               chatroom_enabled: false,
//               spot_home_enabled: false,
//               chatroom_translation: false,
//               dedicated_page_enabled: false,
//             },
//             jha: {
//               filter_condition: false,
//               membership_page_access: false,
//             },
//             mailList: false,
//             spot_edit: true,
//             notification_enabled: true,
//             coupon_enabled: false,
//             popup_enabled: false,
//           },
//           location: {
//             city: "shinjukucity",
//             country: "japan",
//             ward: "shinjukuward",
//             prefecture: "tokyo",
//           },
//         },
//         headers,
//       }
//     );

//     const responseBody = JSON.parse(await response.text());
//     expect(response.status()).toBe(200);
//     expect(responseBody.message).toBe("success");
//   });

//   test("Batch insert the ADs into hotel's banner slot", async ({ request }) => {
//     const headers = {
//       uid: process.env.UID,
//     };

//     const response = await request.post(
//       `${process.env.API_BASE_URL}advertisement`,
//       {
//         data: {
//           key: ["en-US", "ja-JP"],
//           city: "",
//           hotelId: ["chdPTCbaheS4qCtrHi5o", "SNDgVWv3Xy7Ep3vyCnlV"],
//           ward: "",
//           prefecture: "",
//           value: [
//             {
//               link: "",
//               name: "en",
//               mediaTypeValue: "画像/GIF",
//               img: {
//                 name: "hinh-anh-xe-lamborghini-dep-nhat-34.jpg",
//                 extname: "image/jpeg",
//                 url: "https://firebasestorage.googleapis.com/v0/b/test-38739.appspot.com/o/hotelimages%2F1701658190686_0.jpg?alt=media&token=b7d58166-e908-42ff-8210-0349a5a2557f",
//                 redirectUrl: "https://tabilife.co.jp/",
//               },
//               video: null,
//               url: null,
//             },
//             {
//               link: "",
//               name: "jp",
//               mediaTypeValue: "video",
//               img: null,
//               video: {
//                 name: "hinh-anh-xe-lamborghini-dep-nhat-34.jpg",
//                 extname: "video/mp4",
//                 url: "https://firebasestorage.googleapis.com/v0/b/test-38739.appspot.com/o/hotelimages%2F1663258825088_0.mp4?alt=media&token=05fd99fb-9094-4df2-ab54-b32dfcce16d6",
//                 redirectUrl: "https://www.facebook.com/",
//               },
//               url: null,
//             },
//           ],
//         },
//         headers,
//       }
//     );

//     const responseBody = JSON.parse(await response.text());
//     expect(response.status()).toBe(200);
//     expect(responseBody.message).toBe("success");
//   });
// });
