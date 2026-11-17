# PARK ME – חונים במכללה

PARK ME היא אפליקציה שמראה לסטודנטים במכללה האקדמית תל אביב-יפו אילו חניות בחניון המכללה פנויות. סטודנטים מדווחים על כניסה (check-in) כשהם חונים ועל יציאה (check-out) כשהם עוזבים, וכך כולם רואים את תפוסת החניון בזמן אמת.
החניון כולל 200 חניות ב-10 שורות (A–J), ובהן חניות נכים, חניות סגל שמורות וחניות טעינה לרכב חשמלי.
השרת בנוי ב-Node.js וב-Express, מחולק ל-routes ול-controllers, ומחזיר נתונים בפורמט JSON עבור שתי ישויות: חניות (spots) ורשומות חנייה (parkings).

## נתיבים (Routes)

| שיטת HTTP | פונקציית Controller | כתובת API | מה מוחזר |
|---|---|---|---|
| GET | `spotsController.getSpots` | `/api/spots` | מערך של כל 200 החניות |
| GET | `spotsController.getSummary` | `/api/spots/summary` | סיכום: פנויות, תפוסות, שמורות ומדווחות, ופנויות לפי שורה ולפי סוג |
| GET | `spotsController.searchSpots` | `/api/spots/search?status=free&type=ev` | חניות לפי סינון (`status`, `type`, `row`) |
| GET | `spotsController.getSpotById` | `/api/spots/:id` | חנייה אחת, למשל `C-14`, או 404 |
| POST | `spotsController.addSpot` | `/api/spots` | הוספת חנייה. כרגע מחזיר את כל החניות |
| PUT | `spotsController.updateSpot` | `/api/spots/:id` | עדכון חנייה. כרגע מחזיר את כל החניות |
| DELETE | `spotsController.deleteSpot` | `/api/spots/:id` | מחיקת חנייה. כרגע מחזיר את כל החניות |
| GET | `parkingsController.getParkings` | `/api/parkings` | מערך של כל רשומות החנייה |
| GET | `parkingsController.getActiveParkings` | `/api/parkings/active` | רק החניות הפעילות (ללא שעת יציאה) |
| GET | `parkingsController.searchParkings` | `/api/parkings/search?plate=12-345-67` | רשומות לפי סינון (`plate`, `spotId`) |
| GET | `parkingsController.getParkingById` | `/api/parkings/:id` | רשומה אחת, למשל `4`, או 404 |
| POST | `parkingsController.addParking` | `/api/parkings` | check-in. כרגע מחזיר את כל הרשומות |
| PUT | `parkingsController.updateParking` | `/api/parkings/:id` | check-out או הארכה. כרגע מחזיר את כל הרשומות |
| DELETE | `parkingsController.deleteParking` | `/api/parkings/:id` | ביטול check-in. כרגע מחזיר את כל הרשומות |

נתיבים נוספים ב-`app.js` (ללא controller):
- `GET /` – הודעת פתיחה: שם הפרויקט, תיאור קצר ורשימת הנתיבים.
- כל כתובת אחרת – סטטוס `404` ו-`{ "error": "Route not found", "path": "<הנתיב שהתבקש>" }`.

## הרצת השרת

דרישות: Node.js מותקן במחשב.

```bash
cd park-me-server
npm install
npm start
```

השרת עולה בכתובת `http://localhost:3000`
