import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

/* ================= GLOBAL ================= */

const GlobalStyles = () => (
  <style>{`
    body{
      margin:0;
      font-family:Inter,system-ui,Arial;
      background:radial-gradient(circle at top,#111,#050505);
      color:white;
    }
    h1,h2,h3{margin:0;letter-spacing:-0.02em;}
  `}</style>
);

/* ================= UI ================= */

const Card = ({ children }) => (
  <motion.div
    whileHover={{
      y: -6,
      scale: 1.02,
      boxShadow: "0 0 35px rgba(255,140,0,0.45)"
    }}
    transition={{ type: "spring", stiffness: 200 }}
    style={{
      background: "rgba(20,20,20,0.9)",
      borderRadius: 18,
      padding: 24,
      border: "1px solid rgba(255,140,0,0.2)",
      backdropFilter: "blur(10px)"
    }}
  >
    {children}
  </motion.div>
);

const Button = ({ children, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.95 }}
    {...props}
    style={{
      padding: "12px 18px",
      borderRadius: 12,
      border: "none",
      background: "linear-gradient(135deg,#ff7a00,#ffb347)",
      color: "#111",
      fontWeight: 700,
      cursor: "pointer"
    }}
  >
    {children}
  </motion.button>
);

/* INPUTS */

const Input = (props) => (
  <motion.input
    whileFocus={{ scale: 1.02 }}
    {...props}
    style={{
      width: "100%",
      padding: 14,
      marginBottom: 14,
      borderRadius: 12,
      border: "1px solid rgba(255,140,0,0.25)",
      background: "rgba(15,15,15,0.9)",
      color: "white",
      outline: "none"
    }}
  />
);

const TextArea = (props) => (
  <motion.textarea
    whileFocus={{ scale: 1.02 }}
    {...props}
    style={{
      width: "100%",
      padding: 14,
      marginBottom: 14,
      borderRadius: 12,
      border: "1px solid rgba(255,140,0,0.25)",
      background: "rgba(15,15,15,0.9)",
      color: "white",
      minHeight: 120,
      resize: "none",
      outline: "none"
    }}
  />
);

/* ================= DATA ================= */

const earningMethods = [
  { title: "Фриланс", income: "$500–3000", desc: "Удалённые услуги." },
  { title: "Партнёрки", income: "$200–5000", desc: "Доход с рекомендаций." },
  { title: "Контент", income: "$0–10000+", desc: "YouTube и TikTok." }
];

const incomeData = [
  { month: "Янв", income: 6159 },
  { month: "Фев", income: 7173 },
  { month: "Мар", income: 6900 },
  { month: "Апр", income: 8421 },
  { month: "Май", income: 9886 },
  { month: "Июн", income: 11200 }
];

const defaultReviews = [
  { name: "Алексей", text: "Вышел на $1200 за 2 месяца.", likes: 0 },
  { name: "Марина", text: "Очень понятный старт.", likes: 0 }
];

/* ===== TIPS 2026 ===== */

const earningTips2026 = [
  { title:"AI-навыки",text:"Освой AI-инструменты — главный рынок 2026."},
  { title:"Личный бренд",text:"Short-form видео дают бесплатный трафик."},
  { title:"Удалённые услуги",text:"Монтаж, дизайн, AI-боты — быстрый старт."},
  { title:"Несколько доходов",text:"Комбинируй фриланс + партнёрки + контент."}
];

/* ===== FAQ ===== */

const faqData = [
  { q:"Когда будет первый доход?",a:"Обычно 1–3 месяца регулярной работы."},
  { q:"Нужны вложения?",a:"Можно начать полностью без вложений."},
  { q:"Подходит новичкам?",a:"Да, опыт не требуется."},
  { q:"Самый быстрый способ?",a:"Фриланс и AI-услуги."}
];

/* ================= APP ================= */

export default function App() {

  const formRef = useRef();

  const [showContact,setShowContact]=useState(false);
  const [admin,setAdmin]=useState(false);

  const [toast,setToast]=useState("");

  const [senderName,setSenderName]=useState("");
  const [senderEmail,setSenderEmail]=useState("");
  const [message,setMessage]=useState("");

  const [reviews,setReviews]=useState([]);
  const [name,setName]=useState("");
  const [text,setText]=useState("");

  const [openFAQ,setOpenFAQ]=useState(null);

  /* REVIEWS SAVE */

  useEffect(()=>{
    const saved=localStorage.getItem("moneyflow_reviews");
    setReviews(saved?JSON.parse(saved):defaultReviews);
  },[]);

  useEffect(()=>{
    localStorage.setItem("moneyflow_reviews",JSON.stringify(reviews));
  },[reviews]);

  const addReview=()=>{
    if(!name||!text) return;
    setReviews([{name,text,likes:0},...reviews]);
    setName("");setText("");
    showToast("Отзыв добавлен ✅");
  };

  const deleteReview=(i)=>{
    setReviews(reviews.filter((_,x)=>x!==i));
  };

  const likeReview=(i)=>{
    const updated=[...reviews];
    updated[i].likes++;
    setReviews(updated);
  };

  const showToast=(msg)=>{
    setToast(msg);
    setTimeout(()=>setToast(""),2500);
  };

  /* EMAIL */

  const sendEmail=(e)=>{
    e.preventDefault();

    emailjs.sendForm(
      "service_yqlkn8f",
      "template_5sjl591",
      formRef.current,
      "pakfd8wgGBZJfHLHu"
    ).then(()=>{
      showToast("Сообщение отправлено 🚀");
      setSenderName("");
      setSenderEmail("");
      setMessage("");
    });
  };

  /* ================= UI ================= */

  return(
<>
<GlobalStyles/>

<div style={{maxWidth:1100,margin:"0 auto",padding:40}}>

{/* HEADER */}
<div style={{display:"flex",justifyContent:"space-between",marginBottom:70}}>
<h1>🔥 MoneyFlow</h1>

<div style={{display:"flex",gap:10}}>
<Button onClick={()=>setAdmin(!admin)}>
{admin?"Admin ON":"Admin"}
</Button>

<Button onClick={()=>setShowContact(!showContact)}>
Связаться
</Button>
</div>
</div>

{/* HERO */}
<div style={{textAlign:"center",marginBottom:80}}>
<h2 style={{fontSize:42}}>Найди свой способ заработка</h2>
<p style={{color:"#aaa"}}>Тёмная система роста дохода 🚀</p>
</div>

{/* CARDS */}
<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:24,
marginBottom:80}}>
{earningMethods.map((m,i)=>(
<Card key={i}>
<h3>{m.title}</h3>
<p style={{color:"#bbb"}}>{m.desc}</p>
<p>💰 {m.income}</p>
</Card>
))}
</div>

{/* CHART */}
<Card>
<div style={{height:300}}>
<ResponsiveContainer>
<BarChart data={incomeData}>
<XAxis dataKey="month" stroke="#aaa"/>
<YAxis stroke="#aaa"/>
<Tooltip/>
<Bar dataKey="income" radius={[8,8,0,0]}/>
</BarChart>
</ResponsiveContainer>
</div>
</Card>

{/* REVIEWS */}
<div style={{marginTop:80}}>
<h2>⭐ Отзывы</h2>

<Card>
<Input placeholder="Ваше имя" value={name} onChange={(e)=>setName(e.target.value)}/>
<Input placeholder="Ваш отзыв" value={text} onChange={(e)=>setText(e.target.value)}/>
<Button onClick={addReview}>Добавить</Button>
</Card>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",
gap:20,
marginTop:20}}>
{reviews.map((r,i)=>(
<Card key={i}>
<h3>{r.name}</h3>
<p style={{color:"#bbb"}}>{r.text}</p>

<div style={{display:"flex",gap:10,marginTop:10}}>
<Button onClick={()=>likeReview(i)}>👍 {r.likes}</Button>
{admin && (
<Button onClick={()=>deleteReview(i)}>Удалить</Button>
)}
</div>
</Card>
))}
</div>
</div>

{/* CONTACT */}
{showContact&&(
<div style={{marginTop:90}}>
<h2>📩 Связаться со мной</h2>

<Card>
<form ref={formRef} onSubmit={sendEmail}>
<Input name="user_name" placeholder="👤 Ваше имя" value={senderName} onChange={(e)=>setSenderName(e.target.value)} required/>
<Input name="user_email" placeholder="📧 Gmail" value={senderEmail} onChange={(e)=>setSenderEmail(e.target.value)} required/>
<TextArea name="message" placeholder="💬 Сообщение" value={message} onChange={(e)=>setMessage(e.target.value)} required/>
<Button type="submit">Отправить 🚀</Button>
</form>
</Card>
</div>
)}

{/* TIPS */}
<div style={{marginTop:90}}>
<h2>💡 Советы по заработку 2026</h2>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:24,
marginTop:20}}>
{earningTips2026.map((tip,i)=>(
<Card key={i}>
<h3>{tip.title}</h3>
<p style={{color:"#bbb"}}>{tip.text}</p>
</Card>
))}
</div>
</div>

{/* FAQ */}
<div style={{marginTop:90}}>
<h2>❓ FAQ</h2>

{faqData.map((f,i)=>(
<Card key={i}>
<div
style={{cursor:"pointer"}}
onClick={()=>setOpenFAQ(openFAQ===i?null:i)}
>
<h3>{f.q}</h3>
</div>

<AnimatePresence>
{openFAQ===i&&(
<motion.p
initial={{opacity:0,height:0}}
animate={{opacity:1,height:"auto"}}
exit={{opacity:0,height:0}}
style={{color:"#bbb",marginTop:10}}>
{f.a}
</motion.p>
)}
</AnimatePresence>
</Card>
))}
</div>

<footer style={{textAlign:"center",marginTop:80,color:"#666"}}>
© 2025 MoneyFlow
</footer>

{/* TOAST */}
<AnimatePresence>
{toast&&(
<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
exit={{opacity:0}}
style={{
position:"fixed",
bottom:30,
left:"50%",
transform:"translateX(-50%)",
background:"#111",
padding:"14px 22px",
borderRadius:12,
border:"1px solid orange"
}}>
{toast}
</motion.div>
)}
</AnimatePresence>

</div>
</>
);
}