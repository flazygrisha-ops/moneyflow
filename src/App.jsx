import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

/* ================= GLOBAL STYLE ================= */

const GlobalStyles = () => (
  <style>{`
    body {
      margin:0;
      font-family: Inter, system-ui, Arial;
      background: linear-gradient(180deg,#0b0b0b,#111111);
      color:white;
    }

    h1,h2,h3 {
      letter-spacing:-0.02em;
      margin:0;
    }

    a { color:inherit; text-decoration:none; }
  `}</style>
);

/* ================= UI ================= */

const Card = ({ children }) => (
  <motion.div
    whileHover={{
      y: -8,
      scale: 1.02,
      boxShadow: "0 0 35px rgba(255,140,0,0.45)"
    }}
    transition={{ type: "spring", stiffness: 200 }}
    style={{
      background: "rgba(25,25,25,0.9)",
      borderRadius: 20,
      padding: 24,
      border: "1px solid rgba(255,140,0,0.2)",
      boxShadow: "0 20px 40px rgba(255,140,0,0.15)"
    }}
  >
    {children}
  </motion.div>
);

const Button = ({ children, onClick }) => (
  <motion.button
    whileHover={{
      scale: 1.07,
      boxShadow: "0 0 20px rgba(255,140,0,0.7)"
    }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
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

/* ================= DATA ================= */

const earningMethods = [
  {
    title: "Фриланс",
    income: "$500–3000",
    desc: "Дизайн, разработка, тексты и удалённые услуги."
  },
  {
    title: "Партнёрские программы",
    income: "$200–5000",
    desc: "Доход за рекомендации сервисов и продуктов."
  },
  {
    title: "Создание контента",
    income: "$0–10000+",
    desc: "YouTube, TikTok и личный бренд."
  }
];

const incomeData = [
  { month: "Янв", income: 6159 },
  { month: "Фев", income: 7173 },
  { month: "Мар", income: 6900 },
  { month: "Апр", income: 8421 },
  { month: "Май", income: 9886 },
  { month: "Июн", income: 11200 },
  { month: "Июл", income: 10567 },
  { month: "Авг", income: 12451 },
  { month: "Сен", income: 13186 },
  { month: "Окт", income: 12891 },
  { month: "Ноя", income: 13776 },
  { month: "Дек", income: 14263 }
];

const defaultReviews = [
  { name: "Алексей", text: "Начал с фриланса и вышел на $1200 уже через 2 месяца." },
  { name: "Марина", text: "Очень понятные направления заработка. Реально работает." },
  { name: "Дмитрий", text: "Лучший старт для онлайн-дохода, который я видел." }
];

/* ================= APP ================= */

export default function App() {
  const [showContact, setShowContact] = useState(false);
  const [email, setEmail] = useState("");

  /* ===== REVIEWS STATE ===== */

  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  // загрузка из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("moneyflow_reviews");
    setReviews(saved ? JSON.parse(saved) : defaultReviews);
  }, []);

  // сохранение
  useEffect(() => {
    localStorage.setItem("moneyflow_reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = () => {
    if (!name || !text) return;

    setReviews([{ name, text }, ...reviews]);
    setName("");
    setText("");
  };

  /* ===== SOCIALS ===== */

  const socials = {
    tiktok: "https://tiktok.com/@yourprofile",
    instagram: "https://instagram.com/yourprofile"
  };

  const sendEmail = () => {
    if (!email) return;
    window.location.href =
      `mailto:flazygrisha@gmail.com?subject=MoneyFlow&body=Ответьте на: ${email}`;
  };

  return (
    <>
      <GlobalStyles />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 70
          }}
        >
          <h1>🔥 MoneyFlow</h1>

          <Button onClick={() => setShowContact(!showContact)}>
            Связаться
          </Button>
        </motion.div>

        {/* HERO */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <h2 style={{ fontSize: 44 }}>
            Найди свой способ заработка
          </h2>

          <p style={{ color: "#aaa", marginTop: 12 }}>
            Тёмная система роста дохода в интернете 🚀
          </p>
        </motion.div>

        {/* CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 24,
            marginBottom: 90
          }}
        >
          {earningMethods.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card>
                <h3>{m.title}</h3>
                <p style={{ color: "#bbb" }}>{m.desc}</p>
                <p>💰 Доход: <b>{m.income}</b></p>
                <Button>Подробнее</Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* INCOME CHART */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{ marginBottom: 90 }}>
          <h2 style={{ marginBottom: 20 }}>📈 Рост дохода пользователей</h2>

          <Card>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={incomeData}>
                  <XAxis dataKey="month" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip />
                  <Bar dataKey="income" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* REVIEWS */}
        <div style={{ marginBottom: 90 }}>
          <h2 style={{ marginBottom: 25 }}>⭐ Отзывы</h2>

          {/* ADD REVIEW */}
          <Card>
            <input
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding:10, marginRight:10, borderRadius:8 }}
            />

            <input
              placeholder="Ваш отзыв..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ padding:10, marginRight:10, borderRadius:8, width:250 }}
            />

            <Button onClick={addReview}>Добавить</Button>
          </Card>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 20,
              marginTop: 20
            }}
          >
            {reviews.map((r, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}>
                <Card>
                  <h3>{r.name}</h3>
                  <p style={{ color: "#bbb" }}>{r.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ textAlign: "center", marginBottom: 70 }}
        >
          <h2>📩 Связаться со мной</h2>

          <Button onClick={() => setShowContact(!showContact)}>
            Открыть форму
          </Button>

          {showContact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: 20 }}
            >
              <input
                placeholder="Введите ваш Gmail..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  border: "none",
                  width: 260,
                  marginRight: 10
                }}
              />

              <Button onClick={sendEmail}>
                Отправить
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* SOCIALS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ textAlign: "center", marginBottom: 70 }}
        >
          <h2 style={{ marginBottom: 20 }}>🌐 Социальные сети</h2>

          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            <Button onClick={() => window.open(socials.tiktok, "_blank")}>
              🎵 TikTok
            </Button>

            <Button onClick={() => window.open(socials.instagram, "_blank")}>
              📸 Instagram
            </Button>
          </div>
        </motion.div>

        {/* FOOTER */}
        <footer
          style={{
            textAlign: "center",
            color: "#666",
            paddingBottom: 20
          }}
        >
          © 2025 MoneyFlow — Dark Edition
        </footer>
      </div>
    </>
  );
}