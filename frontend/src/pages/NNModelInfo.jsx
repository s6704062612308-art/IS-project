import { useState } from 'react'

export default function NNModelInfo() {
  const [dataset, setDataset] = useState('gaming')

  return (
    <div className="container">
      <div className="card">
        <h1>หน้า 2: Neural Network Model</h1>
        <p>อธิบายการพัฒนา Multi-Layer Perceptron สำหรับทั้ง 2 Dataset</p>
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
              <td>Neural Network ไวต่อ scale ของข้อมูลมาก</td>
            </tr>
            <tr>
              <td>Normalize Target</td>
              <td>(y - mean) / std</td>
              <td>ช่วยให้ gradient ไม่ explode ระหว่างเทรน</td>
            </tr>
          </tbody>
        </table>
        <div className="info-box">
          Target ถูก normalize ก่อนเทรน แล้วแปลงกลับด้วย y_pred * std + mean หลัง predict
        </div>
      </div>

      {/* 3. โครงสร้างโมเดล */}
      <div className="card">
        <h2>3. โครงสร้างโมเดล (Architecture)</h2>
        <p>Input dimension: {dataset === 'gaming' ? '14 features' : '10 features'}</p>
        <br />
        <table>
          <thead>
            <tr><th>Layer</th><th>Nodes</th><th>Activation</th></tr>
          </thead>
          <tbody>
            <tr><td>Input</td><td>{dataset === 'gaming' ? '14' : '10'}</td><td>—</td></tr>
            <tr><td>Hidden 1</td><td>128</td><td>ReLU</td></tr>
            <tr><td>Hidden 2</td><td>64</td><td>ReLU</td></tr>
            <tr><td>Hidden 3</td><td>32</td><td>ReLU</td></tr>
            <tr><td>Output</td><td>1</td><td>Linear</td></tr>
          </tbody>
        </table>

        <div className="cols-3" style={{ marginTop: '1rem' }}>
          <div>
            <h3>Activation Function: ReLU</h3>
            <p>f(x) = max(0, x)</p>
            <br />
            <p>ลดปัญหา vanishing gradient และคำนวณเร็ว เหมาะกับ regression task</p>
          </div>
          <div>
            <h3>Optimizer: Adam</h3>
            <p>ปรับ learning rate อัตโนมัติสำหรับแต่ละ parameter</p>
            <br />
            <code>learning_rate=0.001</code>
          </div>
          <div>
            <h3>Loss Function: MSE</h3>
            <p>Mean Squared Error วัดความแตกต่างระหว่าง predicted และ actual</p>
            <br />
            <code>loss = mean((y - y_pred)^2)</code>
          </div>
        </div>
      </div>

      {/* 4. Hyperparameters */}
      <div className="card">
        <h2>4. Hyperparameters</h2>
        <table>
          <thead>
            <tr><th>Parameter</th><th>ค่าที่ใช้</th><th>เหตุผล</th></tr>
          </thead>
          <tbody>
            <tr><td>hidden_layer_sizes</td><td>(128, 64, 32)</td><td>ลดขนาดทีละชั้นเพื่อ extract features</td></tr>
            <tr><td>activation</td><td>relu</td><td>เหมาะกับ regression ลด vanishing gradient</td></tr>
            <tr><td>solver</td><td>adam</td><td>ปรับ learning rate อัตโนมัติ</td></tr>
            <tr><td>learning_rate_init</td><td>0.001</td><td>จุดเริ่มต้นที่เหมาะสม</td></tr>
            <tr><td>max_iter</td><td>500</td><td>จำนวน iteration สูงสุด</td></tr>
            <tr><td>early_stopping</td><td>True</td><td>หยุดเมื่อ validation score ไม่ดีขึ้น</td></tr>
            <tr><td>validation_fraction</td><td>0.1</td><td>ใช้ 10% ของ train set เป็น validation</td></tr>
            <tr><td>n_iter_no_change</td><td>30</td><td>รอ 30 รอบก่อนหยุด</td></tr>
            <tr><td>random_state</td><td>42</td><td>ให้ผลลัพธ์ reproducible</td></tr>
          </tbody>
        </table>
      </div>

      {/* 5. ขั้นตอนการพัฒนา */}
      <div className="card">
        <h2>5. ขั้นตอนการพัฒนาโมเดล</h2>
        <table>
          <tbody>
            <tr><td>1</td><td>โหลดข้อมูลจาก CSV</td></tr>
            <tr><td>2</td><td>ทำ Preprocessing (Impute, Encode, Split, Scale)</td></tr>
            <tr><td>3</td><td>Normalize target ด้วย (y - mean) / std</td></tr>
            <tr><td>4</td><td>สร้าง MLPRegressor ตาม architecture ที่กำหนด</td></tr>
            <tr><td>5</td><td>เทรนโมเดลด้วย X_train_scaled และ y_train_normalized</td></tr>
            <tr><td>6</td><td>Denormalize ผลลัพธ์กลับด้วย y_pred * std + mean</td></tr>
            <tr><td>7</td><td>วัดผลด้วย MAE, RMSE, R2</td></tr>
            <tr><td>8</td><td>บันทึกโมเดลและ y_stats ด้วย joblib</td></tr>
          </tbody>
        </table>
      </div>

      {/* 6. ผลลัพธ์ */}
      <div className="card">
        <h2>6. ผลลัพธ์ของโมเดล</h2>
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

      {/* 7. แหล่งอ้างอิง */}
      <div className="card">
        <h2>7. แหล่งอ้างอิง</h2>
        <table>
          <tbody>
            <tr><td>1</td><td>LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep Learning. Nature, 521, 436-444.</td></tr>
            <tr><td>2</td><td>Kingma, D.P. & Ba, J. (2014). Adam: A Method for Stochastic Optimization. arXiv:1412.6980.</td></tr>
            <tr><td>3</td><td>Rumelhart, D.E. et al. (1986). Learning Representations by Back-propagating Errors. Nature, 323, 533-536.</td></tr>
            <tr><td>4</td><td>Nair, V. & Hinton, G.E. (2010). Rectified Linear Units Improve Restricted Boltzmann Machines. ICML.</td></tr>
            <tr><td>5</td><td>Scikit-learn MLPRegressor Documentation. https://scikit-learn.org/stable/modules/neural_networks_supervised.html</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}