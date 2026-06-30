const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors"); // 1. استدعاء مكتبة CORS

const app = express();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

dotenv.config();

// 2. تحديث خيارات الاتصال بـ Mongoose (الإصدارات الحديثة لم تعد تحتاج useNewUrlParser)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Db connect successfully!"))
  .catch(err => console.log(err));

app.use(cors()); // 3. تفعيل الـ CORS للسماح لـ Vercel بالاتصال بالـ API
app.use(express.json());

// الروابط البرمجية (Routes)
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

// 4. جعل المنفذ ديناميكي ليناسب البيئة السحابية في Render
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Backend server is listening on port ${PORT}`);
});
