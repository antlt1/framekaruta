import React, { useState } from "react";
import {khung} from "~/assets/khung";
import './Home.css';

const Home: React.FC = () => {
  // multi-select state: array of selected bit keys (lowercase)
  const [selected, setSelected] = useState<string[]>([]);
  const options = [
    'bone','clay','copper','essence','flower','ice','iron','leaf','magma','quartz','salt','stone','sugar','uranium','wax','wood','wool','zinc','oil'
  ];

  // filter: show frames that have at least 2 of the selected bits
  const filtered = khung.filter(item => {
    if (selected.length === 0) return true;
    if (selected.length === 1) return item.bit.map(b => b.toLowerCase()).includes(selected[0]);
    
    const lowerBits = item.bit.map(b => b.toLowerCase());
    // Đếm số bit được chọn mà frame này có
    const matchCount = selected.filter(sel => lowerBits.includes(sel)).length;
    
    // Frame phải có ít nhất 2 bit trong số các bit được chọn
    return matchCount >= 2;
  });

  return <>
    <div className="header-table">
      <div className="filter-group">
        <div className="checkbox-group">
          {options.map(opt => (
            <label key={opt} className="checkbox-label">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelected([...selected, opt]);
                  } else {
                    setSelected(selected.filter(s => s !== opt));
                  }
                }}
              />
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </label>
          ))}
        </div>
        {selected.length > 0 && (
          <div className="filter-info">
            <button className="clear-btn" onClick={() => setSelected([])}>Xóa hết</button>
            <span className="hint">
              {selected.length > 1 ? '(Hiện khung có ít nhất 2 bit trong số đã chọn)' : ''}
            </span>
          </div>
        )}
      </div>
    </div>

    <div className="content">
      {filtered.map((item: { title: string; link: string; cmd?: string; bit: string[] }) => (
        <div key={item.title} className="frame">
          <img src={item.link} alt={item.title} />
          <h2>{item.title}</h2>
          <p>{item.cmd}</p>
        </div>
      ))}
    </div>
  </>;
}

export default Home;