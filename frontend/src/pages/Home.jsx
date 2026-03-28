export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1>ML Project: Gaming & IT Salary Prediction</h1>
        <p>ระบบพยากรณ์ข้อมูลด้วย Machine Learning และ Neural Network</p>
      </div>

      <hr className="divider" />

      <div className="cols-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="card">
          <h2>Dataset 1: Gaming</h2>
          <table>
            <tbody>
              <tr>
                <td>ที่มา</td>
                <td>gaming_dataset_imperfect.csv</td>
              </tr>
              <tr>
                <td>จำนวนข้อมูล</td>
                <td>925 rows, 16 columns</td>
              </tr>
              <tr>
                <td>Target</td>
                <td>hours_played_per_week</td>
              </tr>
              <tr>
                <td>Task</td>
                <td>Regression</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2>Dataset 2: IT Salary Thailand</h2>
          <table>
            <tbody>
              <tr>
                <td>ที่มา</td>
                <td>it_salary_thailand.csv</td>
              </tr>
              <tr>
                <td>จำนวนข้อมูล</td>
                <td>1,000 rows, 11 columns</td>
              </tr>
              <tr>
                <td>Target</td>
                <td>salary_thb</td>
              </tr>
              <tr>
                <td>Task</td>
                <td>Regression</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="cols-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="card">
          <h2>โมเดล 1: Ensemble (Voting Regressor)</h2>
          <table>
            <tbody>
              <tr>
                <td>โมเดลที่ 1</td>
                <td>Random Forest Regressor</td>
              </tr>
              <tr>
                <td>โมเดลที่ 2</td>
                <td>Gradient Boosting Regressor</td>
              </tr>
              <tr>
                <td>โมเดลที่ 3</td>
                <td>Extra Trees Regressor</td>
              </tr>
              <tr>
                <td>วิธีรวมผล</td>
                <td>ค่าเฉลี่ยของทั้ง 3 โมเดล</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2>โมเดล 2: Neural Network (MLP)</h2>
          <table>
            <tbody>
              <tr>
                <td>Architecture</td>
                <td>Input → 128 → 64 → 32 → 1</td>
              </tr>
              <tr>
                <td>Activation</td>
                <td>ReLU</td>
              </tr>
              <tr>
                <td>Optimizer</td>
                <td>Adam</td>
              </tr>
              <tr>
                <td>Early Stopping</td>
                <td>ใช้งาน (patience=30)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <p>เลือกหน้าจากเมนูด้านบนเพื่อดูรายละเอียดหรือทดสอบโมเดล</p>
      </div>
    </div>
  )
}