import { useState } from "react";
import axios from "axios";

const API = "https://ml-backend-onpb.onrender.com";

const GAMING_DEFAULTS = {
  genre: "Sports",
  rank: "Gold",
  voice: "Never",
  platform: "PC",
  season_pass: "Yes",
  active_status: "Active",
  purchases: 500,
  achievement: 5000,
  matches: 200,
  win_rate: 0.5,
  friends: 100,
  streaming: 10,
  latency: 50,
  dlc: 10,
};

const SALARY_DEFAULTS = {
  major: "Software Engineering",
  university: "มหาวิทยาลัยอื่น",
  job_role: "Software Developer",
  company_size: "Startup",
  province: "กรุงเทพ",
  gpa: 3.0,
  internship: 1,
  certifications: 2,
  toeic: 550,
  projects: 5,
};

export default function TestNNModel() {
  const [dataset, setDataset] = useState("gaming");
  const [gaming, setGaming] = useState(GAMING_DEFAULTS);
  const [salary, setSalary] = useState(SALARY_DEFAULTS);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGaming = (key, value) =>
    setGaming((prev) => ({ ...prev, [key]: value }));
  const handleSalary = (key, value) =>
    setSalary((prev) => ({ ...prev, [key]: value }));

  const predict = async () => {
    // Validate salary inputs
    if (dataset === "salary") {
      if (salary.gpa < 1 || salary.gpa > 4) {
        setError("GPA ต้องอยู่ระหว่าง 1.00 - 4.00");
        return;
      }
      if (salary.internship < 0 || salary.internship > 10) {
        setError("จำนวนครั้งที่ฝึกงานต้องอยู่ระหว่าง 0 - 10");
        return;
      }
      if (salary.toeic < 0 || salary.toeic > 990) {
        setError("คะแนน TOEIC ต้องอยู่ระหว่าง 0 - 990");
        return;
      }
      if (salary.certifications < 0 || salary.certifications > 20) {
        setError("จำนวน Certification ต้องอยู่ระหว่าง 0 - 20");
        return;
      }
      if (salary.projects < 0 || salary.projects > 50) {
        setError("จำนวนโปรเจกต์ต้องอยู่ระหว่าง 0 - 50");
        return;
      }
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      if (dataset === "gaming") {
        const res = await axios.post(`${API}/predict/gaming/nn`, {
          genre: gaming.genre,
          rank: gaming.rank,
          voice: gaming.voice,
          platform: gaming.platform,
          season_pass: gaming.season_pass,
          active_status: gaming.active_status,
          purchases: Number(gaming.purchases),
          achievement: Number(gaming.achievement),
          matches: Number(gaming.matches),
          win_rate: Number(gaming.win_rate),
          friends: Number(gaming.friends),
          streaming: Number(gaming.streaming),
          latency: Number(gaming.latency),
          dlc: Number(gaming.dlc),
        });
        setResult(res.data);
      } else {
        const res = await axios.post(`${API}/predict/salary/nn`, {
          major: salary.major,
          university: salary.university,
          job_role: salary.job_role,
          company_size: salary.company_size,
          province: salary.province,
          gpa: Number(salary.gpa),
          internship: Number(salary.internship),
          certifications: Number(salary.certifications),
          toeic: Number(salary.toeic),
          projects: Number(salary.projects),
        });
        setResult(res.data);
      }
    } catch (err) {
      setError(
        "ไม่สามารถเชื่อมต่อ Backend ได้ กรุณาตรวจสอบว่า FastAPI รันอยู่ที่ http://localhost:8000",
      );
    }
    setLoading(false);
  };

  const mae = dataset === "gaming" ? 5 : 3000;

  return (
    <div className="container">
      <div className="card">
        <h1>หน้า 4: ทดสอบ Neural Network Model</h1>
        <p>กรอกข้อมูลเพื่อพยากรณ์ผลลัพธ์ด้วย Multi-Layer Perceptron</p>
      </div>

      <div className="select-dataset">
        <button
          className={dataset === "gaming" ? "active" : ""}
          onClick={() => {
            setDataset("gaming");
            setResult(null);
            setError(null);
          }}
        >
          Gaming — hours_played_per_week
        </button>
        <button
          className={dataset === "salary" ? "active" : ""}
          onClick={() => {
            setDataset("salary");
            setResult(null);
            setError(null);
          }}
        >
          IT Salary — salary_thb
        </button>
      </div>

      <div className="card">
        <h2>กรอกข้อมูล</h2>

        {dataset === "gaming" ? (
          <div className="form-grid">
            <div className="form-group">
              <label>ประเภทเกมที่ชอบ</label>
              <select
                value={gaming.genre}
                onChange={(e) => handleGaming("genre", e.target.value)}
              >
                {["Sports", "RPG", "FPS", "MOBA"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>ระดับ Rank</label>
              <select
                value={gaming.rank}
                onChange={(e) => handleGaming("rank", e.target.value)}
              >
                {["Gold", "Silver", "Bronze", "Platinum"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>การใช้ Voice Chat</label>
              <select
                value={gaming.voice}
                onChange={(e) => handleGaming("voice", e.target.value)}
              >
                {["Never", "Often", "Sometimes"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Platform ที่ใช้</label>
              <select
                value={gaming.platform}
                onChange={(e) => handleGaming("platform", e.target.value)}
              >
                {["PC", "Console", "Mobile"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Season Pass</label>
              <select
                value={gaming.season_pass}
                onChange={(e) => handleGaming("season_pass", e.target.value)}
              >
                {["Yes", "No"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>สถานะการเล่น</label>
              <select
                value={gaming.active_status}
                onChange={(e) => handleGaming("active_status", e.target.value)}
              >
                {["Active", "Inactive"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>ยอดซื้อในเกม (บาท)</label>
              <input
                type="number"
                min={0}
                max={10000}
                value={gaming.purchases}
                onChange={(e) => handleGaming("purchases", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>คะแนนความสำเร็จ</label>
              <input
                type="number"
                min={0}
                max={50000}
                value={gaming.achievement}
                onChange={(e) => handleGaming("achievement", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>จำนวนแมตช์ที่เล่น</label>
              <input
                type="number"
                min={0}
                max={5000}
                value={gaming.matches}
                onChange={(e) => handleGaming("matches", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>อัตราชนะ (win rate)</label>
              <input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={gaming.win_rate}
                onChange={(e) => handleGaming("win_rate", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>จำนวนเพื่อนในเกม</label>
              <input
                type="number"
                min={0}
                max={1000}
                value={gaming.friends}
                onChange={(e) => handleGaming("friends", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>ชั่วโมงสตรีม</label>
              <input
                type="number"
                min={0}
                max={200}
                value={gaming.streaming}
                onChange={(e) => handleGaming("streaming", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>ค่า Latency (ms)</label>
              <input
                type="number"
                min={0}
                max={500}
                value={gaming.latency}
                onChange={(e) => handleGaming("latency", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>จำนวน DLC ที่มี</label>
              <input
                type="number"
                min={0}
                max={200}
                value={gaming.dlc}
                onChange={(e) => handleGaming("dlc", e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="form-grid">
            <div className="form-group">
              <label>สาขาวิชา</label>
              <select
                value={salary.major}
                onChange={(e) => handleSalary("major", e.target.value)}
              >
                {[
                  "Software Engineering",
                  "Data Science",
                  "Computer Science",
                  "Information Technology",
                  "Cybersecurity",
                  "Computer Engineering",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>มหาวิทยาลัย</label>
              <select
                value={salary.university}
                onChange={(e) => handleSalary("university", e.target.value)}
              >
                {[
                  "มหาวิทยาลัยอื่น",
                  "KMUTT",
                  "เชียงใหม่",
                  "จุฬาลงกรณ์",
                  "มหิดล",
                  "ขอนแก่น",
                  "ธรรมศาสตร์",
                  "มศว",
                  "เกษตรศาสตร์",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>ตำแหน่งงาน</label>
              <select
                value={salary.job_role}
                onChange={(e) => handleSalary("job_role", e.target.value)}
              >
                {[
                  "UX/UI Designer",
                  "Software Developer",
                  "Network Engineer",
                  "Data Analyst",
                  "DevOps Engineer",
                  "Data Scientist",
                  "IT Support",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>ขนาดบริษัท</label>
              <select
                value={salary.company_size}
                onChange={(e) => handleSalary("company_size", e.target.value)}
              >
                {[
                  "Startup",
                  "MNC (บริษัทข้ามชาติ)",
                  "SME",
                  "บริษัทใหญ่ไทย",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>จังหวัดที่ทำงาน</label>
              <select
                value={salary.province}
                onChange={(e) => handleSalary("province", e.target.value)}
              >
                {["กรุงเทพ", "ต่างจังหวัด", "ปริมณฑล"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>เกรดเฉลี่ย (GPA)</label>
              <input
                type="number"
                min={1}
                max={4}
                step={0.01}
                value={salary.gpa}
                onChange={(e) => handleSalary("gpa", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>จำนวนครั้งที่ฝึกงาน</label>
              <input
                type="number"
                min={0}
                max={10}
                value={salary.internship}
                onChange={(e) => handleSalary("internship", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>จำนวน Certification</label>
              <input
                type="number"
                min={0}
                max={20}
                value={salary.certifications}
                onChange={(e) => handleSalary("certifications", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>คะแนน TOEIC</label>
              <input
                type="number"
                min={0}
                max={990}
                value={salary.toeic}
                onChange={(e) => handleSalary("toeic", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>จำนวนโปรเจกต์</label>
              <input
                type="number"
                min={0}
                max={50}
                value={salary.projects}
                onChange={(e) => handleSalary("projects", e.target.value)}
              />
            </div>
          </div>
        )}

        <button className="btn-predict" onClick={predict} disabled={loading}>
          {loading ? "กำลังพยากรณ์..." : "พยากรณ์"}
        </button>
      </div>

      {error && <div className="error-box">{error}</div>}

      {result && (
        <div>
          <div className="result-box">
            <div className="result-label">ผลการพยากรณ์ (Neural Network)</div>
            <div className="result-value">
              {dataset === "gaming"
                ? `${result.prediction.toFixed(2)} ชั่วโมง`
                : `${result.prediction.toLocaleString()} บาท`}
            </div>
            <div className="result-unit">
              {dataset === "gaming" ? "ชั่วโมงต่อสัปดาห์" : "ต่อเดือน"}
            </div>
          </div>

          <div className="result-range">
            <div className="range-card">
              <div className="range-label">ต่ำสุด (- MAE)</div>
              <div className="range-value">
                {dataset === "gaming"
                  ? `${Math.max(result.prediction - mae, 0).toFixed(2)} ชั่วโมง`
                  : `${Math.max(result.prediction - mae, 0).toLocaleString()} บาท`}
              </div>
            </div>
            <div className="range-card">
              <div className="range-label">คาดการณ์</div>
              <div className="range-value">
                {dataset === "gaming"
                  ? `${result.prediction.toFixed(2)} ชั่วโมง`
                  : `${result.prediction.toLocaleString()} บาท`}
              </div>
            </div>
            <div className="range-card">
              <div className="range-label">สูงสุด (+ MAE)</div>
              <div className="range-value">
                {dataset === "gaming"
                  ? `${(result.prediction + mae).toFixed(2)} ชั่วโมง`
                  : `${(result.prediction + mae).toLocaleString()} บาท`}
              </div>
            </div>
          </div>

          <div className="info-box">
            ค่า MAE ในช่วงความเชื่อมั่นให้แทนที่ด้วยค่าจริงจาก Notebook
          </div>
        </div>
      )}
    </div>
  );
}
