export type BlogPost = {
    id: string;
    slug: string;
    titleEn: string;
    titleBn: string;
    categoryEn: string;
    categoryBn: string;
    publishDate: string;
    authorEn: string;
    authorBn: string;
    excerptEn: string;
    excerptBn: string;
    contentEn: string;
    contentBn: string;
    imageUrl?: string;
};

export const blogCategories = [
    { id: "buying-guide", labelEn: "Buying Guide", labelBn: "ক্রয় নির্দেশিকা" },
    { id: "legal-approval", labelEn: "Legal & Approval", labelBn: "আইন ও অনুমোদন" },
    { id: "investment-tips", labelEn: "Investment Tips", labelBn: "বিনিয়োগ টিপস" },
    { id: "market-insights", labelEn: "Market Insights", labelBn: "বাজার অন্তর্দৃষ্টি" },
];

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        slug: "buy-apartment-dhaka",
        titleEn: "How to Buy an Apartment in Dhaka – Complete Guide for Buyers",
        titleBn: "ঢাকায় অ্যাপার্টমেন্ট কিভাবে কিনবেন - ক্রেতাদের জন্য সম্পূর্ণ গাইড",
        categoryEn: "Buying Guide",
        categoryBn: "ক্রয় নির্দেশিকা",
        publishDate: "2024-03-01",
        authorEn: "S & D Sweet Home Developers Ltd.",
        authorBn: "এস অ্যান্ড ডি সুইট হোম ডেভেলপার্স লিমিটেড।",
        excerptEn: "A comprehensive guide on what to look out for when buying a residential apartment in Dhaka, Bangladesh. Covering budget, location, legal documents, and construction quality.",
        excerptBn: "বাংলাদেশের ঢাকায় একটি আবাসিক অ্যাপার্টমেন্ট কেনার সময় কী কী বিষয়ে লক্ষ্য রাখতে হবে তার একটি বিস্তৃত নির্দেশিকা। বাজেট, অবস্থান, আইনি নথিপত্র এবং নির্মাণের গুণমান অন্তর্ভুক্ত।",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200",
        contentEn: `<h2>Budget Planning</h2>
<p>Buying an apartment in Dhaka requires careful financial planning. The real estate market in Dhaka offers a wide range of properties, from affordable units in developing areas to luxury apartments in premium neighborhoods like Gulshan, Banani, and Dhanmondi. Start by evaluating your savings, determining how much down payment you can afford, and calculating your eligibility for home loans. Consider additional costs such as registration fees, VAT, utility connections, and interior decorations.</p>

<h2>Location Selection</h2>
<p>The location of your apartment dictates your lifestyle and property validation. Choose a neighborhood that aligns with your daily commute, family needs, and future prospects. Areas with good connectivity, nearby schools, hospitals, and shopping centers always retain higher property values. Also, check for upcoming infrastructure projects like Metro Rail stations or expressways, which can significantly boost the area's value.</p>

<h2>RAJUK Approval Check</h2>
<p>Never invest in a project without verifying its RAJUK (Rajdhani Unnayan Kartripakkha) approval. A RAJUK-approved plan ensures that the building is legally constructed according to safety rules, FAR (Floor Area Ratio) regulations, and proper zoning laws. Always ask the developer to provide the RAJUK approval copy and verify it to protect yourself from future legal complexities.</p>

<h2>Legal Documents</h2>
<p>Reviewing legal documents is the most crucial step in real estate transactions. Essential documents include the original land deed, CS, RS, SA, and City Jorip parcha (records of right), mutation document, and the power of attorney if it's a joint-venture project. It's highly recommended to hire a professional property lawyer to vet these documents before signing any agreement.</p>

<h2>Construction Quality</h2>
<p>Inspect the construction quality and materials used. Reputed developers like S & D Sweet Home Developers Ltd. maintain transparency regarding the grade of steel, cement, electrical cables, and plumbing fittings used in their projects. Check the structural design for earthquake resistance and ensure that standard safety measures are implemented during construction.</p>

<h2>Registration Process</h2>
<p>The final step is the registration of the property. Once all payments are cleared, the flat is registered in your name through the local Sub-Registry Office. The registration process involves paying stamp duty, registration fees, local government taxes, and VAT. Ensure that you collect the main deed after the registration is complete and promptly apply for the mutation (Namjari) of the property in your name.</p>

<h2>Frequently Asked Questions</h2>
<h3>Can non-resident Bangladeshis (NRB) take home loans?</h3>
<p>Yes, many banks and financial institutions in Bangladesh offer specialized home loan schemes for NRBs with attractive interest rates.</p>
<h3>Are under-construction flats cheaper?</h3>
<p>Generally, under-construction flats operate on installment basis and can be more budget-friendly initially compared to ready flats, though they require a waiting period.</p>`,
        contentBn: `<h2>বাজেট পরিকল্পনা</h2>
<p>ঢাকায় একটি অ্যাপার্টমেন্ট কেনার জন্য সতর্ক আর্থিক পরিকল্পনা প্রয়োজন। আপনার সঞ্চয় মূল্যায়ন করুন এবং হোম লোনের জন্য আপনার যোগ্যতা হিসাব করুন।</p>

<h2>অবস্থান নির্বাচন</h2>
<p>আপনার অ্যাপার্টমেন্টের অবস্থান আপনার জীবনধারা এবং সম্পত্তির মূল্য নির্ধারণ করে। ভালো যোগাযোগ ব্যবস্থা, কাছাকাছি স্কুল, হাসপাতাল এবং শপিং সেন্টার আছে এমন এলাকা বেছে নিন।</p>

<h2>রাজউক অনুমোদন চেক</h2>
<p>রাজউকের (রাজধানী উন্নয়ন কর্তৃপক্ষ) অনুমোদন যাচাই না করে কোনো প্রজেক্টে বিনিয়োগ করবেন না।</p>

<h2>আইনি নথিপত্র</h2>
<p>রিয়েল এস্টেট লেনদেনের ক্ষেত্রে আইনি নথিপত্র পর্যালোচনা করা সবচেয়ে গুরুত্বপূর্ণ পদক্ষেপ। কোনো চুক্তিতে স্বাক্ষর করার আগে এই নথিগুলো যাচাই করার জন্য একজন পেশাদার সম্পত্তি আইনজীবী নিয়োগ করা অত্যন্ত বাঞ্ছনীয়।</p>

<h2>নির্মাণের গুণমান</h2>
<p>নির্মাণের গুণমান এবং ব্যবহৃত উপকরণ সাবধানে পরীক্ষা করুন। এস অ্যান্ড ডি সুইট হোম ডেভেলপার্স লিমিটেডের মতো স্বনামধন্য ডেভেলপাররা তাদের প্রকল্পগুলিতে ব্যবহৃত স্টিল, সিমেন্ট, এবং প্লাম্বিং ফিটিংসে স্বচ্ছতা বজায় রাখে।</p>

<h2>নিবন্ধন প্রক্রিয়া</h2>
<p>চূড়ান্ত পর্যায় হলো সম্পত্তির নিবন্ধন। সমস্ত অর্থ প্রদানের পর, স্থানীয় সাব-রেজিস্ট্র্রি অফিসের মাধ্যমে ফ্ল্যাটটি আপনার নামে নিবন্ধিত হয়।</p>

<h2>সচরাচর জিজ্ঞাস্য</h2>
<h3>প্রবাসী বাংলাদেশীরা কি হোম লোন নিতে পারবেন?</h3>
<p>হ্যাঁ, বাংলাদেশের অনেক ব্যাংক এবং আর্থিক প্রতিষ্ঠান প্রবাসী বাংলাদেশীদের জন্য আকর্ষণীয় সুদে হোম লোন প্রদান করে।</p>
<h3>নির্মাণাধীন ফ্ল্যাট কি সস্তা?</h3>
<p>সাধারণত, নির্মাণাধীন ফ্ল্যাট রেডি ফ্ল্যাটের তুলনায় প্রাথমিকভাবে বেশি বাজেট-বান্ধব হতে পারে, তবে এর জন্য অপেক্ষা করতে হয়।</p>`
    },
    {
        id: "2",
        slug: "rajuk-approval-process",
        titleEn: "RAJUK Approval Process for Real Estate Projects in Bangladesh",
        titleBn: "বাংলাদেশে রিয়েল এস্টেট প্রকল্পের জন্য রাজউক অনুমোদন প্রক্রিয়া",
        categoryEn: "Legal & Approval",
        categoryBn: "আইন ও অনুমোদন",
        publishDate: "2024-03-05",
        authorEn: "S & D Sweet Home Developers Ltd.",
        authorBn: "এস অ্যান্ড ডি সুইট হোম ডেভেলপার্স লিমিটেড।",
        excerptEn: "Understand why RAJUK approval is crucial for your apartment and what steps developers take to acquire proper planning permission in Dhaka.",
        excerptBn: "আপনার অ্যাপার্টমেন্টের জন্য রাজউক অনুমোদন কেন গুরুত্বপূর্ণ এবং ঢাকায় যথাযথ পরিকল্পনা অনুমতি অর্জনের জন্য ডেভেলপাররা কী কী পদক্ষেপ নেয় তা বুঝে নিন।",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200",
        contentEn: `<h2>What is RAJUK?</h2>
<p>RAJUK (Rajdhani Unnayan Kartripakkha) is the capital development authority of the Government of Bangladesh. It is responsible for coordinating urban development in Dhaka and its adjoining areas. For any real estate construction—be it residential or commercial—getting layout and building plan approval from RAJUK is legally mandatory to ensure planned urbanization and structural safety.</p>

<h2>Why Approval is Important</h2>
<p>RAJUK approval is the ultimate proof that a building is legally constructed. Without it, the property is considered illegal and runs the risk of demolition by government authorities at any time. Furthermore, utility connections like gas and electricity cannot be legally established without authorized building plans. Banks will not approve any home loan without valid RAJUK approval, making it vital for both developers and buyers.</p>

<h2>Steps for Approval</h2>
<p>The RAJUK approval process generally involves three main steps:</p>
<ol>
  <li><strong>Land Use Clearance (Town Planning Clearance):</strong> Ensures that the proposed construction aligns with the city's master plan and zoning laws.</li>
  <li><strong>Special Project Approval (if applicable):</strong> For large-scale projects, high-rises (over 10 floors), or specialized commercial complexes, clearance from various agencies (Traffic, Fire Service, Civil Aviation, etc.) is required.</li>
  <li><strong>Building Plan Approval:</strong> The final architectural and structural drawings are submitted. RAJUK engineers verify if the design complies with the Bangladesh National Building Code (BNBC) and Floor Area Ratio (FAR) guidelines before granting final permission to start construction.</li>
</ol>

<h2>Documents Required</h2>
<p>The paperwork required is extensive and meticulous. Common documents include:</p>
<ul>
  <li>Land ownership documents (Title Deed, Bia Deed, CS, RS, SA, City Jorip).</li>
  <li>Up-to-date land tax receipts and mutation documents.</li>
  <li>Soil test reports.</li>
  <li>Structural and architectural drawings signed by registered engineers and architects.</li>
  <li>NOC (No Objection Certificates) from relevant authorities.</li>
</ul>

<h2>How Buyers Verify Approval</h2>
<p>As a buyer, you must always take a proactive approach to verify RAJUK approval. Always ask the developer for the RAJUK approved plan copy. Check if the building is strictly following the approved design, specifically noticing if there are unauthorized deviations from the FAR rules. You can also visit the RAJUK office with the project's file number or check their website to verify the authenticity of the approval.</p>

<h2>Frequently Asked Questions</h2>
<h3>Can I get utilities connected without RAJUK approval?</h3>
<p>No, utility providers legally require the RAJUK approved building plan to provide permanent connections.</p>
<h3>Are all S & D Sweet Home projects approved by RAJUK?</h3>
<p>Yes, as a REHAB and RAJUK enlisted developer, all of our projects maintain strictly approved layouts ensuring complete legal safety for your investment.</p>`,
        contentBn: `<h2>রাজউক কী?</h2>
<p>রাজউক (রাজধানী উন্নয়ন কর্তৃপক্ষ) বাংলাদেশ সরকারের রাজধানী উন্নয়ন কর্তৃপক্ষ। ঢাকা এবং এর আশেপাশের এলাকার নগর উন্নয়নের সমন্বয় করা এর দায়িত্ব।</p>

<h2>অনুমোদন কেন গুরুত্বপূর্ণ</h2>
<p>রাজউকের অনুমোদন হলো চূড়ান্ত প্রমাণ যে একটি ভবন আইনত নির্মিত হয়েছে। এটি ছাড়া সম্পত্তি অবৈধ বলে বিবেচিত হয় এবং সরকারি কর্তৃপক্ষের দ্বারা যেকোনো সময় ভেঙে ফেলার ঝুঁকি থাকে।</p>

<h2>অনুমোদনের পদক্ষেপ</h2>
<p>রাজউক অনুমোদন প্রক্রিয়ায় সাধারণত তিনটি প্রধান ধাপ থাকে: ভূমি ব্যবহারের ছাড়পত্র, বিশেষ প্রকল্প অনুমোদন (প্রযোজ্য ক্ষেত্রে), এবং ভবনের প্ল্যান অনুমোদন।</p>

<h2>প্রয়োজনীয় নথিপত্র</h2>
<p>ভূমির মালিকানার নথিপত্র, মাটি পরীক্ষার রিপোর্ট, নিবন্ধিত প্রকৌশলী এবং স্থপতিদের দ্বারা স্বাক্ষরিত কাঠামোগত এবং স্থাপত্য আঁকা, এবং প্রাসঙ্গিক কর্তৃপক্ষের কাছ থেকে এনওসি (অনাপত্তি সনদ)।</p>

<h2>ক্রেতারা কীভাবে অনুমোদন যাচাই করবেন</h2>
<p>একজন ক্রেতা হিসেবে, আপনার সর্বদা ডেভেলপারকে রাজউক অনুমোদিত প্ল্যানের কপি চাইতে হবে। অনুমোদনের সত্যতা যাচাই করতে আপনি প্রকল্পের ফাইল নম্বর সহ রাজউক অফিসে যেতে পারেন।</p>

<h2>সচরাচর জিজ্ঞাস্য</h2>
<h3>আমি কি রাজউক অনুমোদন ছাড়া ইউটিলিটি সংযোগ পেতে পারি?</h3>
<p>না, ইউটিলিটি প্রদানকারীদের স্থায়ী সংযোগ প্রদানের জন্য আইনত রাজউক অনুমোদিত বিল্ডিং প্ল্যান প্রয়োজন।</p>`
    }
];
