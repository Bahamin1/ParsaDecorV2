# 🚀 راهنمای کامل آپلود سایت پارسا دکور

## 📋 مراحل آپلود سایت

### 1️⃣ **آماده‌سازی پروژه**

#### الف) بررسی فایل‌های ضروری:
\`\`\`bash
# این فایل‌ها باید موجود باشند:
- package.json ✅
- next.config.mjs ✅
- tailwind.config.ts ✅
- .env.example ✅
\`\`\`

#### ب) ایجاد فایل .env.local:
\`\`\`env
# کپی کن از .env.example و مقادیر رو پر کن
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
JWT_SECRET=your_secret_key
\`\`\`

### 2️⃣ **انتخاب سرویس هاستینگ**

#### 🥇 **Vercel (بهترین گزینه برای Next.js)**
- رایگان تا 100GB bandwidth
- خودکار deploy می‌کنه
- CDN سریع
- SSL رایگان

#### 🥈 **Netlify**
- رایگان تا 100GB bandwidth
- ساده و سریع
- SSL رایگان

#### 🥉 **GitHub Pages**
- رایگان کامل
- فقط static site
- محدودیت بیشتر

### 3️⃣ **روش آپلود با Vercel (توصیه شده)**

#### مرحله 1: ایجاد اکانت
1. برو به [vercel.com](https://vercel.com)
2. Sign up کن با GitHub
3. اکانت رو تایید کن

#### مرحله 2: آپلود پروژه
\`\`\`bash
# روش 1: از طریق GitHub
1. پروژه رو به GitHub آپلود کن
2. در Vercel روی "Import Project" کلیک کن
3. GitHub repo رو انتخاب کن
4. Deploy کن

# روش 2: مستقیم از کامپیوتر
1. Vercel CLI نصب کن: npm i -g vercel
2. در پوشه پروژه: vercel
3. سوالات رو جواب بده
4. منتظر deploy شدن باش
\`\`\`

#### مرحله 3: تنظیم Environment Variables
\`\`\`bash
# در Vercel Dashboard:
1. Settings > Environment Variables
2. این متغیرها رو اضافه کن:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - JWT_SECRET
   - ADMIN_REGISTRATION_KEY
\`\`\`

### 4️⃣ **روش آپلود با Netlify**

#### مرحله 1: ایجاد اکانت
1. برو به [netlify.com](https://netlify.com)
2. Sign up کن
3. اکانت رو تایید کن

#### مرحله 2: آپلود
\`\`\`bash
# روش 1: Drag & Drop
1. پروژه رو build کن: npm run build
2. فولدر .next رو zip کن
3. به Netlify برو و zip رو drag کن

# روش 2: از GitHub
1. پروژه رو به GitHub آپلود کن
2. در Netlify "New site from Git" کلیک کن
3. GitHub repo رو انتخاب کن
\`\`\`

### 5️⃣ **تنظیمات دامنه**

#### دامنه رایگان:
- Vercel: `your-site.vercel.app`
- Netlify: `your-site.netlify.app`

#### دامنه شخصی:
\`\`\`bash
# اگه دامنه داری (مثل parsadecor.com):
1. در تنظیمات هاست، Custom Domain اضافه کن
2. در DNS دامنه، CNAME record اضافه کن:
   - Name: www
   - Value: your-site.vercel.app
\`\`\`

### 6️⃣ **بررسی نهایی**

#### چک‌لیست قبل از آپلود:
- [ ] همه تصاویر موجود هستند
- [ ] فونت‌ها لود می‌شوند
- [ ] Navigation کار می‌کنه
- [ ] فرم‌ها کار می‌کنند
- [ ] موبایل responsive هست
- [ ] سرعت بارگذاری خوبه

## 🛠️ عیب‌یابی مشکلات رایج

### مشکل 1: Build Error
\`\`\`bash
# راه حل:
npm run build
# اگه error داد، مشکلات TypeScript رو حل کن
\`\`\`

### مشکل 2: تصاویر لود نمی‌شوند
\`\`\`javascript
// در next.config.mjs:
images: {
  unoptimized: true,
  domains: ['your-domain.com']
}
\`\`\`

### مشکل 3: فونت‌ها لود نمی‌شوند
\`\`\`css
/* در globals.css فونت‌ها رو local import کن */
@font-face {
  font-family: 'Vazirmatn';
  src: url('/fonts/Vazirmatn-Regular.woff2');
}
\`\`\`

### مشکل 4: API کار نمی‌کنه
\`\`\`bash
# Environment Variables رو چک کن
# Database connection رو تست کن
\`\`\`

## 📊 مانیتورینگ و آنالیز

### Google Analytics:
\`\`\`javascript
// در layout.tsx اضافه کن:
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
\`\`\`

### Performance Monitoring:
- Vercel Analytics (رایگان)
- Google PageSpeed Insights
- GTmetrix

## 🔄 آپدیت خودکار

### GitHub Actions:
\`\`\`yaml
# فایل .github/workflows/deploy.yml موجوده
# هر push به main branch خودکار deploy می‌شه
\`\`\`

## 💰 هزینه‌ها

### Vercel:
- Hobby Plan: رایگان (100GB bandwidth)
- Pro Plan: $20/ماه (1TB bandwidth)

### Netlify:
- Starter: رایگان (100GB bandwidth)
- Pro: $19/ماه (1TB bandwidth)

## 📞 پشتیبانی

اگه مشکلی داشتی:
1. Documentation رو بخون
2. Community forums رو چک کن
3. Support ticket بزن
4. یا از من بپرس! 😊
