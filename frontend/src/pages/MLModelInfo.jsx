import { useState } from 'react'

export default function MLModelInfo() {
  const [dataset, setDataset] = useState('gaming')

  return (
    <div className="container">
      <div className="card">
        <h1>หน้า 1: Ensemble Machine Learning Model</h1>
        <p>อธิบายการพัฒนา Voting Regressor สำหรับทั้ง 2 Dataset</p>
      </div>

      <div className="select-dataset">
        <button
          className={dataset === 'gaming' ? 'active' : ''}
          onClick={() => setDataset('gaming')}
        >
          Gaming — hours_played_per_week
        </button>
        <button
          className={dataset === 'salary' ? 'active' : ''}
          onClick={() => setDataset('salary')}
        >
          IT Salary — salary_thb
        </button>
      </div>

      {/* 1. ที่มาของ Dataset */}
      <div className="card">
        <h2>1. ที่มาของ Dataset</h2>
        {dataset === 'gaming' ? (
          <table>
            <tbody>
              <tr><td>ชื่อไฟล์</td><td>gaming_dataset_imperfect.csv</td></tr>
              <tr><td>ที่มา</td><td>openai.com</td></tr>
              <tr><td>จำนวน</td><td>925 rows, 16 columns</td></tr>
              <tr><td>Target</td><td>hours_played_per_week (ชั่วโมงที่เล่นต่อสัปดาห์)</td></tr>
            </tbody>
          </table>
        ) : (
          <table>
            <tbody>
              <tr><td>ชื่อไฟล์</td><td>it_salary_thailand.csv</td></tr>
              <tr><td>ที่มา</td><td>claude.ai</td></tr>
              <tr><td>จำนวน</td><td>1,000 rows, 11 columns</td></tr>
              <tr><td>Target</td><td>salary_thb (เงินเดือน หน่วย: บาท)</td></tr>
            </tbody>
          </table>
        )}

        <h3>Features</h3>
        {dataset === 'gaming' ? (
          <table>
            <thead>
              <tr><th>Feature</th><th>ประเภท</th><th>คำอธิบาย</th></tr>
            </thead>
            <tbody>
              <tr><td>favorite_game_genre</td><td>Categorical</td><td>ประเภทเกมที่ชอบ</td></tr>
              <tr><td>rank_tier</td><td>Categorical</td><td>ระดับ rank</td></tr>
              <tr><td>voice_chat_usage</td><td>Categorical</td><td>การใช้ voice chat</td></tr>
              <tr><td>platform_used</td><td>Categorical</td><td>แพลตฟอร์มที่ใช้</td></tr>
              <tr><td>season_pass</td><td>Categorical</td><td>มี season pass หรือไม่</td></tr>
              <tr><td>active_status</td><td>Categorical</td><td>สถานะการเล่น</td></tr>
              <tr><td>in_game_purchases</td><td>Numerical</td><td>ยอดซื้อในเกม (บาท)</td></tr>
              <tr><td>achievement_points</td><td>Numerical</td><td>คะแนนความสำเร็จ</td></tr>
              <tr><td>matches_played</td><td>Numerical</td><td>จำนวนแมตช์ที่เล่น</td></tr>
              <tr><td>win_rate</td><td>Numerical</td><td>อัตราชนะ</td></tr>
              <tr><td>friends_count</td><td>Numerical</td><td>จำนวนเพื่อนในเกม</td></tr>
              <tr><td>streaming_hours</td><td>Numerical</td><td>ชั่วโมงสตรีม</td></tr>
              <tr><td>latency_ms</td><td>Numerical</td><td>ค่า latency (ms)</td></tr>
              <tr><td>dlc_owned</td><td>Numerical</td><td>จำนวน DLC ที่มี</td></tr>
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr><th>Feature</th><th>ประเภท</th><th>คำอธิบาย</th></tr>
            </thead>
            <tbody>
              <tr><td>major</td><td>Categorical</td><td>สาขาวิชา</td></tr>
              <tr><td>university</td><td>Categorical</td><td>มหาวิทยาลัย</td></tr>
              <tr><td>job_role</td><td>Categorical</td><td>ตำแหน่งงาน</td></tr>
              <tr><td>company_size</td><td>Categorical</td><td>ขนาดบริษัท</td></tr>
              <tr><td>province</td><td>Categorical</td><td>จังหวัดที่ทำงาน</td></tr>
              <tr><td>gpa</td><td>Numerical</td><td>เกรดเฉลี่ย</td></tr>
              <tr><td>internship_count</td><td>Numerical</td><td>จำนวนครั้งที่ฝึกงาน</td></tr>
              <tr><td>certifications</td><td>Numerical</td><td>จำนวน certification</td></tr>
              <tr><td>english_score_toeic</td><td>Numerical</td><td>คะแนน TOEIC</td></tr>
              <tr><td>projects_count</td><td>Numerical</td><td>จำนวนโปรเจกต์</td></tr>
            </tbody>
          </table>
        )}
      </div>

      {/* 2. การเตรียมข้อมูล */}
      <div className="card">
        <h2>2. การเตรียมข้อมูล (Data Preprocessing)</h2>
        <table>
          <thead>
            <tr><th>ขั้นตอน</th><th>วิธีการ</th><th>เหตุผล</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>จัดการ Missing Values</td>
              <td>SimpleImputer (strategy='median')</td>
              <td>ค่า median ไม่ถูกรบกวนจาก outlier</td>
            </tr>
            <tr>
              <td>แปลง Categorical</td>
              <td>LabelEncoder</td>
              <td>แปลง text เป็นตัวเลขสำหรับโมเดล</td>
            </tr>
            <tr>
              <td>แบ่งข้อมูล</td>
              <td>Train 80% / Test 20%</td>
              <td>ประเมินประสิทธิภาพบนข้อมูลที่โมเดลไม่เคยเห็น</td>
            </tr>
            <tr>
              <td>Normalize Features</td>
              <td>StandardScaler</td>
              <td>ทำให้ทุก feature อยู่ใน scale เดียวกัน</td>
            </tr>
          </tbody>
        </table>
        <div className="info-box">
          StandardScaler ใช้ fit_transform บน train set เท่านั้น และใช้ transform บน test set เพื่อป้องกัน data leakage
        </div>
      </div>

      {/* 3. ทฤษฎีอัลกอริทึม */}
      <div className="card">
        <h2>3. ทฤษฎีของอัลกอริทึม</h2>
        <div className="cols-3">
          <div>
            <h3>Random Forest</h3>
            <p>สร้าง Decision Tree หลายต้นจากการสุ่ม subset ของข้อมูลและ features แล้วเฉลี่ยผลลัพธ์ ช่วยลด variance และป้องกัน overfitting</p>
            <br />
            <code>n_estimators=200, max_depth=10</code>
          </div>
          <div>
            <h3>Gradient Boosting</h3>
            <p>สร้างต้นไม้ทีละต้นโดยแต่ละต้นแก้ไข error ของต้นก่อนหน้า ใช้ gradient descent เพื่อ minimize loss function</p>
            <br />
            <code>n_estimators=200, learning_rate=0.1, max_depth=5</code>
          </div>
          <div>
            <h3>Extra Trees</h3>
            <p>คล้าย Random Forest แต่สุ่ม threshold ของแต่ละ split แบบสุ่มทั้งหมด ทำให้ variance ต่ำกว่าและเร็วกว่า</p>
            <br />
            <code>n_estimators=200, max_depth=10</code>
          </div>
        </div>
        <hr className="divider" />
        <h3>Voting Regressor</h3>
        <p>รวมทั้ง 3 โมเดลโดยผลลัพธ์สุดท้าย = ค่าเฉลี่ยของการพยากรณ์จากทั้ง 3 โมเดล</p>
        <br />
        <code>prediction = (RF_pred + GB_pred + ET_pred) / 3</code>
      </div>

      {/* 4. ขั้นตอนการพัฒนา */}
      <div className="card">
        <h2>4. ขั้นตอนการพัฒนาโมเดล</h2>
        <table>
          <tbody>
            <tr><td>1</td><td>โหลดข้อมูลจาก CSV</td></tr>
            <tr><td>2</td><td>ทำ Preprocessing (Impute, Encode, Split, Scale)</td></tr>
            <tr><td>3</td><td>สร้างและเทรน RF, GB, ET แยกกัน</td></tr>
            <tr><td>4</td><td>รวมเป็น VotingRegressor แล้วเทรน</td></tr>
            <tr><td>5</td><td>พยากรณ์บน test set</td></tr>
            <tr><td>6</td><td>วัดผลด้วย MAE, RMSE, R2</td></tr>
            <tr><td>7</td><td>บันทึกโมเดลด้วย joblib</td></tr>
          </tbody>
        </table>
      </div>

      {/* 5. ผลลัพธ์ */}
      <div className="card">
        <h2>5. ผลลัพธ์ของโมเดล</h2>
        <table>
          <thead>
            <tr><th>Metric</th><th>ค่าที่ได้</th><th>ความหมาย</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>MAE</td>
              <td>ดูจาก Notebook</td>
              <td>ค่าเฉลี่ยความคลาดเคลื่อน {dataset === 'gaming' ? '(ชั่วโมง)' : '(บาท)'}</td>
            </tr>
            <tr>
              <td>RMSE</td>
              <td>ดูจาก Notebook</td>
              <td>ความคลาดเคลื่อน โดยโทษ error ขนาดใหญ่มากขึ้น</td>
            </tr>
            <tr>
              <td>R2</td>
              <td>ดูจาก Notebook</td>
              <td>สัดส่วนที่โมเดลอธิบายความแปรปรวนได้ (1.0 = perfect)</td>
            </tr>
          </tbody>
        </table>
        <div className="info-box">
          นำค่า MAE, RMSE, R2 จาก Notebook มาใส่ในตารางด้านบน
        </div>
      </div>

      {/* 6. แหล่งอ้างอิง */}
      <div className="card">
        <h2>6. แหล่งอ้างอิง</h2>
        <table>
          <tbody>
            <tr><td>1</td><td>Breiman, L. (2001). Random Forests. Machine Learning, 45(1), 5-32.</td></tr>
            <tr><td>2</td><td>Friedman, J.H. (2001). Greedy Function Approximation: A Gradient Boosting Machine. Annals of Statistics, 29(5), 1189-1232.</td></tr>
            <tr><td>3</td><td>Geurts, P., Ernst, D., & Wehenkel, L. (2006). Extremely Randomized Trees. Machine Learning, 63(1), 3-42.</td></tr>
            <tr><td>4</td><td>Pedregosa, F. et al. (2011). Scikit-learn: Machine Learning in Python. JMLR, 12, 2825-2830.</td></tr>
            <tr><td>5</td><td>Scikit-learn Documentation. https://scikit-learn.org</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}